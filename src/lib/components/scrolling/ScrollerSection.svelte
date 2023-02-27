<script>
    import { getContext, setContext } from "svelte";
    import { writable } from "svelte/store";
    import { storeKeys } from "$lib/config";
    import ScrollSnap from "./ScrollSnap.svelte";

    const topScrollOffset = writable(0);

    setContext(storeKeys.SECTION_TOP_SCROLLER_OFFSET, topScrollOffset);

    const scrollerOffset = getContext(storeKeys.HORIZONTAL_SCROLLER_OFFSET);

    export let snap = false;

    let section;

    $: leftOffset = section?.offsetLeft || 0;
    $: topScrollOffset.set((scrollerOffset && $scrollerOffset || 0) + leftOffset);
</script>

<div class="scroll-section" bind:this={section}>
    {#if snap}
        <ScrollSnap topScrollOffset={$topScrollOffset} />
    {/if}
    <slot />
</div>

<style lang="scss">
    .scroll-section {
        width: 100vw;
        min-width: 100vw;
        height: 100%;
        position: relative;
    }
</style>