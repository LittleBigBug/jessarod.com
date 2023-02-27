import { format } from "$lib/util/string";
import { derived, writable } from "svelte/store";
import { GALLERIES, IMAGES_BY_GALLERY } from "$lib/config/gallery";

export const pathFormat = '/img/{0}/{1}/{2}';

export const showing = writable();
export const gallery = writable();
export const fileName = derived([showing, gallery],
  ([$showing, $gallery]) => $showing !== undefined && $gallery && IMAGES_BY_GALLERY[$gallery][$showing]);
export const fullPathSrc = derived([fileName, gallery],
  ([$fileName, $gallery]) => format(pathFormat, 'gallery', $gallery, $fileName));
export const isVideo = derived([fileName],
  ([$fileName]) => $fileName && $fileName.endsWith('mp4'));
export const thumb = derived([isVideo, fileName, gallery],
  ([$isVideo, $fileName, $gallery]) =>
    $isVideo ?
      format(pathFormat, 'gallery_thumb', $gallery, $fileName).replace('.mp4', '.jpg') :
      format(pathFormat, 'gallery', $gallery, $fileName));

const controls = (dir, [$showing, $gallery]) => {
  if ($showing === undefined || !$gallery) return;
  if (IMAGES_BY_GALLERY[$gallery][$showing + dir])
    return { gallery: $gallery, showing: $showing + dir };
  const galleryIdx = GALLERIES.find((g) => $gallery === g);
  if (galleryIdx < 0) return;
  const galleryName = GALLERIES[galleryIdx + dir];
  const images = galleryName && IMAGES_BY_GALLERY[galleryName];
  if (!images) return;
  return { gallery: galleryName, showing: dir > 0 ? 0 : images.length - 1 };
};

export const prev = derived([showing, gallery], controls.bind(null, -1));
export const next = derived([showing, gallery], controls.bind(null, 1));
