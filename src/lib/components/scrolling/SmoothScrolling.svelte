<script>
    import debounce from "just-debounce";
    import { setContext } from "svelte";
    import { page } from "$app/stores";
    import { quadOut, linear } from 'svelte/easing';
    import { tweened } from 'svelte/motion';
    import { clamp } from "../../util/math.js";
    import { yScroll } from "../../stores/window.js";
    import { writable } from "svelte/store";
    import { storeKeys } from "$lib/config";

    export let disabled = false;
    export let scrollTime = 0.5;
    export let scrollDist = 170;
    export let mouseDelta = 120;
    export let snapRounding = scrollDist - 2;

    const scrollLock = writable(false);

    const scrollSnaps = {
      ...writable({ }),
      setSnap(id, offset) {
        this.update((s) => ({
          ...s,
          [id]: offset,
        }))
      },
    };

    const scrollPosition = tweened(0, {
        duration: scrollTime * 1000,
        easing: quadOut,
    });

    setContext(storeKeys.SCROLL_LOCK, scrollLock);
    setContext(storeKeys.SCROLL_SNAPS, scrollSnaps);
    setContext(storeKeys.SCROLL_POSITION, scrollPosition);

    let y = 0, lastScroll = 0, scrollTo = 0;

    const resetScrollPosition = (pos, delay) => {
      scrollTo = pos;
      scrollPosition.set(pos, delay ? undefined : {
        delay: 0,
        duration: 0,
        easing: linear,
      })
    };

    const debounceResetScrollPosition = debounce(resetScrollPosition, 50, false);

    // Smooth out mouse wheel scrolling
    const mouseWheel = (e) => {
      if (disabled) return;
      lastScroll = Date.now();
      e.preventDefault();
      if ($scrollLock) return;
      const { wheelDelta } = e;
      const delta = wheelDelta / mouseDelta;
      const max = window.scrollMaxY
          || (document.documentElement.scrollHeight - document.documentElement.clientHeight);
      scrollTo = clamp((scrollTo || y) - delta * scrollDist, 0, max);
      const snapOffset = Object.values($scrollSnaps).find((offset) => Math.abs(offset - scrollTo) <= snapRounding);
      if (snapOffset) scrollTo = snapOffset;
      scrollPosition.set(scrollTo);
    };

    // Handle other scrolling (not smoothed)
    const scroll = () => {
      if ($scrollLock) return;
      if (Date.now() - lastScroll < (scrollTime * 1000)
        && y === Math.round($scrollPosition)) return;

      debounceResetScrollPosition(window.pageYOffset);
      yScroll.set(window.pageYOffset);
    };

    const scrollKeys = [
      'Space', 'Home', 'End', 'PageUp', 'PageDown',
      'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
    ];
    const prevent = (e) => $scrollLock && e.preventDefault();
    const preventScrollKeys = (e) =>
      $scrollLock && scrollKeys.includes(e.code) && e.preventDefault();
    const preventAutoScroll = (e) =>
      $scrollLock && e.button === 1 && e.preventDefault();

    $: window && !disabled && window.scrollTo({ top: Math.round($scrollPosition) });
    $: !disabled && yScroll.set($scrollPosition);
    $: disabled && yScroll.set(window.pageYOffset);
    $: $page && resetScrollPosition(0, true);
    $: scroll(y);
</script>

<div id="showScroll"></div>

<svelte:window
  bind:scrollY={y}
  on:wheel|nonpassive={mouseWheel}
  on:touchmove|nonpassive={prevent}
  on:mousedown|nonpassive={preventAutoScroll}
  on:keydown|nonpassive={preventScrollKeys}
/>

<slot />
