<script>
  import { getContext } from "svelte";
  import {
    startCubes,
    mouseMove,
    mouseLeave,
    mouseDown
  } from "$lib/three/cubes";
  import Interactive from "$lib/components/interactive/Interactive.svelte";
  import { storeKeys } from "$lib/config";

  const pctToFixed = getContext(storeKeys.FIXED_HEIGHT_TRANSITION_PCT);

  $: pct = pctToFixed ? $pctToFixed : 0;
  $: style = `--cubes-blur: ${pct * 2}px`;
</script>

<Interactive
  class="cubes"
  {style}
  noLazyLoad
  startRender={startCubes}
  {mouseMove} {mouseLeave} {mouseDown} />

<style lang="scss">
  :global(.cubes canvas) {
      filter: blur(var(--cubes-blur));
  }
</style>