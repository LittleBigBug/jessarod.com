import { readdir, writeFile } from 'node:fs/promises';
import { format } from "./src/lib/util/string.js";

const template = `// auto-generated file, 'npm run gen:gallery'
export const GALLERIES = {0};
export const IMAGES_BY_GALLERY = {1};
export const TOTAL_IMAGE_COUNT = {2};`;

try {

  const galleries = await readdir(`./static/img/gallery`);

  const imagesRead = (await Promise.all(
    galleries.map(
      (gallery) =>
        readdir(`./static/img/gallery/${gallery}`)
    )));
  const imgCt = imagesRead.reduce((acc, images) => acc + images.length, 0);
  const images = imagesRead.reduce(
    (acc, images, i) =>
      ({ ...acc, [galleries[i]]: images }), { });

  const galleryCfg = format(template,
    JSON.stringify(galleries),
    JSON.stringify(images),
    imgCt);

  await writeFile("./src/lib/config/gallery.js", galleryCfg);

  console.log("done!");

} catch (e) { console.error(e); }