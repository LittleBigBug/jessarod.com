<script>
    import {
        startCubes,
        mouseMove,
        mouseLeave,
        mouseDown
    } from "$lib/three/cubes";
    import Interactive from "$lib/components/interactive/Interactive.svelte";
</script>

<Interactive noLazyLoad class="cubes" startRender={startCubes} {mouseMove} {mouseLeave} {mouseDown} />
