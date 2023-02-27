import { writable } from "svelte/store";

export const PAGE = {
  PAGE_HOME: 'home',
  PAGE_GALLERY: 'gallery',
};

export const page = writable();