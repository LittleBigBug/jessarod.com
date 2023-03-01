import jimp from "jimp";
import { dirname } from 'path';
import { promisify } from 'util';
import { exec as execSync } from "child_process";
import { mkdir, readdir, copyFile, access } from "node:fs/promises";

const exec = promisify(execSync);

const homeImages = [
  'architecture/mughal.jpeg',
  'capstone/close_1.jpeg',
  'digital/1spaceship_render.png',
  'photography/abandoned_pa_turnpike_final.jpg',
];

try {

  /*
    Asynchronously auto-generates thumbnails for all home images
   */

  console.log("Generating home image thumbnails...");
  await Promise.all(
    homeImages.map(async (path) => {
      const thumbPath = `./static/img/gallery_home_thumb/${path}`

      try {
        await access(thumbPath);
        return;
      } catch { }

      console.log(`Generating home image thumb ${thumbPath}`);

      const image = await jimp.read(`./static/img/gallery/${path}`);

      if (image.getWidth() < 1500) {
        await copyFile(path, thumbPath)
        return;
      }

      await image.resize(1500, jimp.AUTO);
      await image.writeAsync(thumbPath);

      console.log(`Generated thumb! ${thumbPath}`);
    }));

  console.log("done!");

} catch (e) { console.error(e); }