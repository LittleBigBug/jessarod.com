import { get, writable } from "svelte/store";

export const fixedContainers = {
    ...writable([]),
    add(fixedHeight) {
        const i = get(this).length;
        this.update((containers) => [...containers, { fixedHeight, isFixed: false }]);
        return i;
    },
    getOffset(i) {
        const containers = get(this);
        let offset = 0;
        for (let k = 0; k < i; k++) offset += containers[k].fixedHeight;
        return offset;
    }
};