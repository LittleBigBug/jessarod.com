import Stats from 'stats.js';
import {
    Clock,
    AmbientLight,
    BoxGeometry,
    Color,
    DirectionalLight,
    Group,
    HemisphereLight,
    InstancedMesh,
    MeshLambertMaterial,
    Object3D,
    OrthographicCamera,
    Plane,
    Raycaster,
    Scene,
    Vector2,
    Vector3,
    WebGLRenderer,
} from 'three';
import { FBM } from 'three-noise';

let scene, camera, renderer, stats, instancedMesh;

let conf = {
    n: 50,
    viewSize: 5,
    objectWidth: 3,
    objectMargin: 0,
    heightMin: 2,
    heightMax: 5,
    animatedHeightVariance: 0.3,
    mouseHeightVariance: 5,
    clickHeightVariance: 8,
    clickAnimationTime: 2,
    mouseAmplification: 8,
    clickAmplification: 10,
    color: 0x707070,
    emissiveColor: 0x333333,
    noise: {
        seed: Math.random() * 1000,
        scale: 0.03,
        octaves: 5,
        persistance: 0.65,
        lacunarity: 2,
        redistribution: 1,
        height: 0,
    }
};

const heightVarianceMax = conf.heightMax + conf.animatedHeightVariance;

let mouseOver = false, clickData = [];

const group = new Group();
const mouse = new Vector2();
const caster = new Raycaster();
const mousePlane = new Plane(new Vector3(0, 0, 1), 0);
const mousePosition = new Vector3();

const noise = new FBM(conf.noise);

if (import.meta.hot) {
    import.meta.hot.accept();
    import.meta.hot.dispose(location.reload.bind(location));
}

export const onWindowResize = (renderParent) => {
    if (!renderer) return;

    const ratio = renderParent.clientWidth / renderParent.clientHeight;
    camera.left = ratio * - conf.viewSize;
    camera.right = ratio * conf.viewSize;
    camera.top = - conf.viewSize;
    camera.bottom = conf.viewSize;
    camera.updateProjectionMatrix();
    renderer.setSize(renderParent.clientWidth, renderParent.clientHeight);
};

export const mouseLeave = () => (mouseOver = false);

export const mouseMove = (e) => {
    if (!renderer) return;

    mouseOver = true;

    const vec = new Vector3();
    camera.getWorldDirection(vec);

    vec.normalize();
    mousePlane.normal = vec;

    const rect = e.target.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    mouse.x = (mouseX / e.target.clientWidth) * 2 - 1;
    mouse.y = - (mouseY / e.target.clientHeight) * 2 + 1;

    caster.setFromCamera(mouse, camera);

    const [ intersect ] = caster.intersectObjects(scene.children);
    if (intersect) mousePosition.copy(intersect.point);
};

export const mouseDown = () => {
    if (!mouseOver || !renderer) return;

    const now = Date.now();
    clickData = clickData.filter(({ time }) => time + (1000 * conf.clickAnimationTime) >= now);
    clickData.push({
        pos: mousePosition.clone(),
        time: now,
    });
};

export const startCubes = (renderParent, dev = false) => {
    if (renderer) return;
    if (dev) stats = new Stats();

    renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(renderParent.clientWidth, renderParent.clientHeight);

    renderParent.appendChild(renderer.domElement);

    if (dev) renderParent.appendChild(stats.dom);

    camera = new OrthographicCamera(
        2, 2, 2, 2,
        -500, 1000);

    camera.position.set(80 / 4, 15, 80 / 6);
    camera.zoom = 0.75;
    camera.up = new Vector3(0, -1, 0);
    camera.lookAt(0, 0, 0);

    onWindowResize(renderParent);
    window.addEventListener('resize', onWindowResize.bind(null, renderParent));

    initScene();
    animate();
};

const initScene = () => {
    scene = new Scene();
    scene.background = new Color(0x000000);

    scene.add(new AmbientLight(0xbbbbbb));
    scene.add(new HemisphereLight(0xbbbbbb, 0x000000, 1));

    const light = new DirectionalLight(0x707070, 20);
    light.castShadow = true;
    light.position.set(10, 5, 10);

    scene.add(light);

    const geo = new BoxGeometry(conf.objectWidth, conf.objectWidth + 2, conf.objectWidth);

    const material = new MeshLambertMaterial({
        color: conf.color,
        emissive: conf.emissiveColor,
    });

    instancedMesh = new InstancedMesh(geo, material, Math.pow(conf.n, 2));

    for (let i = 0; i < conf.n; i++) {
        for (let j = 0; j < conf.n; j++) {
            const proxyObject = new Object3D();

            const y = (noise.get2(new Vector2(i, j)) / 0.5) * conf.heightMax;
            const x = (-conf.n / 2 + i) * (conf.objectWidth + conf.objectMargin);
            const z = (-conf.n / 2 + j) * (conf.objectWidth + conf.objectMargin);

            proxyObject.position.set(x, -10, z);
            proxyObject.color = new Color(0, 0, 0);
            proxyObject.destination = new Vector3(x, y, z);
            proxyObject.startY = y;

            group.add(proxyObject);
        }
    }

    scene.add(instancedMesh);
};

const clock = new Clock();

const animate = () => {
    stats.begin();

    const delta = clock.getDelta();
    const elapsed = clock.elapsedTime;

    const now = Date.now();

    const sqMouseAmp = Math.pow(conf.mouseAmplification, 2);
    const sqClickAmp = Math.pow(conf.clickAmplification, 2);

    const clickAnimTime = conf.clickAnimationTime * 1000;

    group.updateMatrixWorld();
    group.children.forEach((o, i) => {
        const pos = o.position.clone().lerp(o.destination || o.position, 0.015);
        o.position.copy(pos);

        const dest = o.destination.clone();
        dest.y = o.startY + (Math.sin(elapsed + i % conf.n) * conf.animatedHeightVariance)
            - (conf.animatedHeightVariance / 2);

        const fixedPos = o.position.clone();
        fixedPos.y = o.startY;

        if (mouseOver) {
            const distance = fixedPos.distanceToSquared(mousePosition);
            if (distance <= sqMouseAmp)
                dest.y += conf.mouseHeightVariance
                    * ((sqMouseAmp - distance) / sqMouseAmp);
        }

        let clickAmp = 0;
        let clickColorAmp = 0;

        for (const { pos, time } of clickData) {
            if (time + clickAnimTime < now) continue;
            const distance = fixedPos.distanceToSquared(pos);
            if (distance > sqClickAmp) continue;
            const timeAmp = ((clickAnimTime - (now - time)) / clickAnimTime);
            clickAmp += conf.clickHeightVariance
                * ((sqClickAmp - distance) / sqClickAmp)
                * timeAmp;
            clickColorAmp = Math.max(clickColorAmp, timeAmp);
            if (clickAmp >= conf.clickHeightVariance) break;
        }

        dest.y += Math.min(clickAmp, conf.clickHeightVariance);

        o.destination.copy(dest);

        const colCoef = Math.round(o.position.y / heightVarianceMax * 100) / 100 + 0.08;
        let colorGoal = new Color(colCoef, colCoef, colCoef);
        if (clickColorAmp > 0) colorGoal = colorGoal.lerp(new Color(0x343057), clickColorAmp);

        o.color = o.color.lerp(colorGoal, 0.02);

        instancedMesh.setColorAt(i, o.color);
        instancedMesh.setMatrixAt(i, o.matrixWorld);
        instancedMesh.instanceColor.needsUpdate = true;
    });

    instancedMesh.instanceMatrix.needsUpdate = true;

    renderer.render(scene, camera);

    stats?.end();

    requestAnimationFrame(animate);
}
