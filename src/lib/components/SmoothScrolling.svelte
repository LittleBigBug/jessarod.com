<script>
    import debounce from "just-debounce";
    import { cubicOut, linear } from 'svelte/easing';
    import { tweened } from 'svelte/motion';
    import { clamp } from "../util/math";
    import { yScroll } from "../stores/window";

    export let enabled = true;
    export let scrollTime = 0.5;
    export let scrollDist = 170;

    export const scrollPosition = tweened(0, {
        duration: scrollTime * 1000,
        easing: cubicOut,
    });

    const resetScrollPosition = debounce(
        () =>
            scrollPosition.set(y, {
                delay: 0,
                duration: 0,
                easing: linear
            }),
        50, false,
    );

    let y = 0, lastScroll = 0;

    // Handle mouse wheel scrolling
    const mouseWheel = (e) => {
        if (!enabled) return;
        lastScroll = e.timeStamp;
        e.preventDefault();
        const { wheelDelta } = e;
        const delta = wheelDelta / 120;
        const max = window.scrollMaxY
            || (document.documentElement.scrollHeight - document.documentElement.clientHeight);
        const scrollTo = clamp(y - delta * scrollDist, 0, max);
        scrollPosition.set(scrollTo);
    };

    // Handle other scrolling (not smoothed)
    const scroll = (e) => {
        if (e.timeStamp - lastScroll < (scrollTime * 1000)) return;
        resetScrollPosition();
        yScroll.set(y);
    };

    $: window && window.scrollTo({ top: Math.round($scrollPosition) });
    $: enabled && yScroll.set($scrollPosition);
    $: !enabled && yScroll.set(y);
</script>

<svelte:window on:scroll={scroll} on:wheel|nonpassive={mouseWheel} bind:scrollY={y} />
