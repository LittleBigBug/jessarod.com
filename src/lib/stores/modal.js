import { derived, writable } from "svelte/store";

export const currentModal = writable();
export const modalName = derived([currentModal], ([$modal]) => $modal?.name);
export const modalComponent = derived([currentModal], ([$modal]) => $modal?.component);
export const modalData = derived([currentModal], ([$modal]) => $modal?.data);