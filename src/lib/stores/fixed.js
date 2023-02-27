import { get, writable } from "svelte/store";
import { v4 as uuid } from 'uuid';

export const fixedContainers = {
    ...writable([]),
    add(fixedHeight) {
        const id = uuid();
        this.update((containers) => [...containers, { fixedHeight, isFixed: false, id }]);
        return id;
    },
    remove(id) {
        this.update((containers) => containers.filter(({ id: i }) => i !== id))
    },
    getIndex(id) {
        return get(this).findIndex(({ id: i }) => i === id);
    },
    getOffset(id) {
        const containers = get(this);
        let offset = 0;
        const i = this.getIndex(id);
        console.log(id, i);
        for (let k = 0; k < i; k++) offset += containers[k].fixedHeight;
        return offset;
    }
};