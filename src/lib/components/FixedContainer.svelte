<script>
    import { writable } from "svelte/store";
    import { createEventDispatcher } from "svelte";
    import { clamp } from '../util/math';
    import { yScroll } from "../stores/window";
    import {fixedContainers} from "$lib/stores/fixed.js";

    export let normalHeight = 400;
    export let fixedHeight = 100;
    export let spacingHeight = normalHeight;
    export let maxScroll = 100000;

    export const height = writable(normalHeight);

    export const i = fixedContainers.add(fixedHeight);

    export const fixedOffset = fixedContainers.getOffset(i);

    export let z = 1000 - i

    const dispatch = createEventDispatcher();

    let container;

    $: startTop = container?.offsetTop || 0;
    $: maxOffset = maxScroll - $height;
    $: offset = clamp($yScroll - startTop + fixedOffset, 0, maxOffset);
    $: scrolled = Math.max(0, $yScroll - startTop);
    $: height.set(Math.max(normalHeight - scrolled, fixedHeight));

    $: style = [
        `--z: ${z}`,
        `--container-height: ${$height}px`,
        `--spacing-height: ${spacingHeight}px`,
        `--offset-top: ${offset}px`,
    ].join(';');
    $: height && dispatch('heightChange', { height: $height });
</script>

<div
    {style}
    class="container-spacing"
    bind:this={container}
>
    <div class="dynamic-container">
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
      transform: translateY(var(--offset-top));
      position: absolute;
      overflow: hidden;
      z-index: var(--z);
    }
</style>
