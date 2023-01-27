<script>
    import { clamp } from '../util/math';
    import FixedContainer from "./FixedContainer.svelte";

    export let scrollPct = 0;

    let y, scroller;
    let scrollSize = 0;
    let height = 0;

    $: max = scrollSize - height;
    $: scrollerOffset = scroller?.scrollTop;
    $: translation = clamp(y - scrollerOffset, 0, max);
    $: scrollPct = translation / max;
</script>

<div class="scroller" style="--scroll-size: {scrollSize}px; --offset: {translation}px" bind:this={scroller}>
    <FixedContainer
            normalHeight={screen.height}
            fixedHeight={screen.height}
            spacingHeight={scrollSize}
            maxScroll={scrollSize}
    >
        <div class="content" bind:offsetWidth={scrollSize} bind:offsetHeight={height}>
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
      pointer-events: none;

      &.content {
        transform: translateY(var(--offset));
      }
    }
</style>