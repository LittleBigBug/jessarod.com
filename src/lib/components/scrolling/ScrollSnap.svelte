<script>
  import { v4 } from 'uuid';
  import { getContext } from "svelte";
  import { storeKeys } from "$lib/config";

  export let topScrollOffset;

  const id = v4();
  const snaps = getContext(storeKeys.SCROLL_SNAPS);

  let element;

  $: element && snaps.setSnap(id, element.offsetTop);
  $: topScrollOffset && snaps.setSnap(id, topScrollOffset);
</script>

{#if !topScrollOffset}
  <div class="snap-point" bind:this={element}></div>
{/if}

<style lang="scss">
  .snap-point {
      position: absolute;
      top: 0;
  }
</style>