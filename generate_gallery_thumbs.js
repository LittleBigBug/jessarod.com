import jimp from "jimp";
import { dirname } from 'path';
import { promisify } from 'util';
import { exec as execSync } from "child_process";
import { mkdir, readdir, copyFile, access } from "node:fs/promises";

const exec = promisify(execSync);

try {

  /*
    Asynchronously auto-generates thumbnails for all gallery images & videos
   */

  const galleries = await readdir(`./static/img/gallery`);
  const files = (await Promise.all(
    galleries.map(
      (gallery) =>
        readdir(`./static/img/gallery/${gallery}`)
    )))
    .map((files, i) =>
      files.map((file) => `./static/img/gallery/${galleries[i]}/${file}`))
    .reduce((acc, files) => [ ...acc, ...files ], []);

  const images = files.filter((img) => !img.endsWith(".mp4"));
  const videos = files.filter((img) => img.endsWith(".mp4"));

  console.log("Generating video thumbnails...");
  await Promise.all(
    videos.map(async (path) => {
      const thumbPath = path
        .replace('/gallery/', '/gallery_thumb/')
        .replace('.mp4', '.jpg');

      try {
        await access(thumbPath);
        return;
      } catch { }

      console.log(`Generating video thumb ${thumbPath}`);

      const dir = dirname(thumbPath);

      await mkdir(dir, { recursive: true });
      await exec(`ffmpeg -i ${path} -r 1 -s 608x342 -aspect 16:9 -vframes 1 -ss 00:00:3 ${thumbPath}`);

      console.log(`Generated thumb! ${thumbPath}`);
    }));

  console.log("Generating image thumbnails...");
  await Promise.all(
    images.map(async (path) => {
      const thumbPath = path.replace('/gallery/', '/gallery_thumb/');

      try {
        await access(thumbPath);
        return;
      } catch { }

      console.log(`Generating image thumb ${thumbPath}`);

      const image = await jimp.read(path);

      if (image.getWidth() < 600) {
        await copyFile(path, thumbPath)
        return;
      }

      await image.resize(600, jimp.AUTO);
      await image.writeAsync(thumbPath);

      console.log(`Generated thumb! ${thumbPath}`);
    }));

  console.log("done!");

} catch (e) { console.error(e); }