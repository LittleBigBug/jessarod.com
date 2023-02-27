<script>
    import { writable } from "svelte/store";
    import { getContext, onMount } from "svelte";
    import { storeKeys } from "$lib/config";

    export let once = false;
    export let visible = false;
    export let noLazyLoad = false;

    const visibleStore = writable(false);

    let div, mounted = false, added = false;

    const addObserver = getContext(storeKeys.OBSERVER);
    onMount(() => (mounted = true));

    const add = () => {
        if (added) return;
        added = true;
        addObserver(div, visibleStore);
    };

    $: visible = (once && visible) || $visibleStore;
    $: div && mounted && !added && add();
</script>

<div class="observed-container" bind:this={div}>
    {#if noLazyLoad || visible}
        <slot />
    {/if}
</div>
