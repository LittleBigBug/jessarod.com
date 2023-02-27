<script>
  import {
    showing,
    gallery,
    fileName,
    fullPathSrc,
    thumb,
    prev,
    next,
    isVideo
  } from "$lib/stores/showing.js";
  import { currentModal } from "$lib/stores/modal";
  import Video from "$lib/components/Video.svelte";
  import Loading from "$lib/components/Loading.svelte";

  export let data;

  const close = () => currentModal.set(undefined);
  const go = (store) => {
    console.log(store);
    if (!store) return;
    const { gallery: newGallery, showing: newShowing } = store;
    gallery.set(newGallery)
    showing.set(newShowing);
  };
</script>

<div class="show-modal">
  <div class="content">
    <Loading />
    {#if $isVideo}
      <Video
        src={$fullPathSrc}
        poster={$thumb}
        alt={$fileName}
        autoplay
      />
    {:else}
      <img
        src={$fullPathSrc}
        alt={$fileName}
        on:click={(event) => event.stopPropagation()}
      />
    {/if}
  </div>
  <div class="controls" on:click={(event) => event.stopPropagation()}>
    <div class="prev" class:hide={!$prev} on:click={go.bind(null, $prev)}>Prev</div>
    <div class="close" on:click={close}>Close</div>
    <div class="next" class:hide={!$next} on:click={go.bind(null, $next)}>Next</div>
  </div>
</div>

<style lang="scss">
    .show-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        gap: 20px;
        flex-direction: column;
        z-index: 99;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.55);
        backdrop-filter: blur(1px);

        .content {
            width: 100%;
            height: 85%;
            display: flex;
            position: relative;
            justify-content: center;
            align-items: center;

            img {
                max-height: 100%;
                max-width: 100%;
            }
        }
        .controls {
            display: flex;
            gap: 20px;

            div {
                cursor: pointer;
                background: #212121;
                padding: 10px 20px;
                border-radius: 4px;

                &.hide {
                    opacity: 0;
                }
            }
            .prev, .next {
                background: #5a7976;
            }
        }
	  }
</style>