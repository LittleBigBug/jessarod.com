<script>
    import { setContext } from "svelte";
    import { writable } from 'svelte/store';
    import { clamp } from '$lib/util/math';
    import { storeKeys } from '$lib/config';
    import FixedContainer from "./FixedContainer.svelte";

    const scrollPct = writable(0);
    const scrollerOffset = writable(0);

    setContext(storeKeys.HORIZONTAL_SCROLL_PCT, scrollPct);
    setContext(storeKeys.HORIZONTAL_SCROLLER_OFFSET, scrollerOffset);

    let y, scroller;
    let width = 0, heightStore;

    $: height = heightStore && $heightStore;
    $: scrollSize = width + height;
    $: scrollerOffset.set(scroller?.offsetTop);
    $: translation = clamp(y - $scrollerOffset, 0, scrollSize);
    $: scrollPct.set(translation / scrollSize);
    $: style = [
        `--scroll-size: ${scrollSize}px`,
        `--offset: -${translation}px`,
    ].join(';');
</script>

<div class="scroller" {style} bind:this={scroller}>
    <FixedContainer
      fillScreenHeight
      scrollOnlySpacing
      spacingHeight={scrollSize}
      bind:height={heightStore}
    >
        <div class="content" bind:offsetWidth={width}>
            <slot />
        </div>
    </FixedContainer>
</div>

<svelte:window bind:scrollY={y} />

<style lang="scss">
    .scroller {
        width: 100%;
        height: var(--scroll-size);
        background: transparent;

        .content {
            height: 100%;
            display: inline-flex;
            transform: translateX(var(--offset));
        }
    }
</style>