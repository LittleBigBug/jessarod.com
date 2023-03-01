<script>
    import { writable } from "svelte/store";
    import { onDestroy, setContext, createEventDispatcher } from "svelte";
    import { clamp } from '$lib/util/math';
    import { yScroll } from "$lib/stores/window";
    import { fixedContainers } from "$lib/stores/fixed";
    import { storeKeys } from "$lib/config";

    export let normalHeight = 400;
    export let fixedHeight = 100;
    export let spacingHeight = normalHeight;
    export let fillScreenHeight = false;
    export let scrollOnlySpacing = false;

    export const height = writable(normalHeight);

    const id = fixedContainers.add(fixedHeight);

    onDestroy(() => fixedContainers.remove(id));

    const pctToFixed = writable(
      fillScreenHeight || normalHeight === fixedHeight
        ? 1 : 0);

    setContext(storeKeys.FIXED_HEIGHT_TRANSITION_PCT, pctToFixed);

    const dispatch = createEventDispatcher();

    let container;
    let innerHeight = 0;

    const updateHeight = (innerHeight, scrolled) =>
      height.set(fillScreenHeight
        ? innerHeight - fixedOffset
        : Math.max(normalHeight - scrolled, fixedHeight));

    $: fixedOffset = fixedContainers.getOffset(id);
    $: z = 1000 - fixedContainers.getOffset(id);
    $: startTop = container?.offsetTop || 0;
    $: maxOffset = (scrollOnlySpacing ? spacingHeight : 5e+10);
    $: viewportRelation = $yScroll - startTop + fixedOffset;
    $: offset = clamp(viewportRelation, 0, maxOffset);
    $: fixed = viewportRelation >= 0 && viewportRelation <= maxOffset;
    $: scrolled = Math.max(0, $yScroll - startTop);
    $: normalHeight && fixedHeight && updateHeight(innerHeight, scrolled, fixedOffset);
    $: heightChangeDiff = normalHeight - fixedHeight;
    $: pctToFixed.set(heightChangeDiff > 0 ? clamp(scrolled / heightChangeDiff) : 1);
    $: style = [
      `--z: ${z}`,
      `--container-height: ${$height}px`,
      `--spacing-height: ${spacingHeight}px`,
      `--fixed-offset: ${fixedOffset}px`,
    ].join(';');
    $: height && dispatch('heightChange', { height: $height });
</script>

<svelte:window bind:innerHeight />

<div
    {style}
    class="container-spacing"
    bind:this={container}
>
    <div class="dynamic-container" class:fixed>
        <slot />
    </div>
</div>


<style lang="scss">
    .container-spacing {
        height: var(--spacing-height);
        width: 100%;
    }

    .dynamic-container {
        width: 100%;
        height: var(--container-height);
        overflow: hidden;
        z-index: var(--z);

        &.fixed {
            position: fixed;
            top: var(--fixed-offset);
        }
    }
</style>
