<script>
    import { writable, get } from "svelte/store";
    import { setContext } from "svelte";
    import { storeKeys } from "$lib/config";

    const itemsMap = writable(new Map());
    const observer = new IntersectionObserver(
        (entries) =>
            entries.forEach((entry) => {
                if (!$itemsMap.has(entry.target)) return;
                const visibleStore = $itemsMap.get(entry.target);
                console.log(get(visibleStore));
                visibleStore.set(entry.isIntersecting);
            }), { threshold: [0, 1] });

    const add = (item, visible) => {
        observer.observe(item);
        $itemsMap.set(item, visible);
    };

    setContext(storeKeys.OBSERVER, add);
</script>

<slot />
