<script>
  import { tick, onMount, getContext, setContext } from "svelte";
  import { writable } from "svelte/store";
  import { storeKeys } from "$lib/config";
  import { PAGE, page } from "$lib/stores/page";
  import { currentModal } from "$lib/stores/modal";
  import { capitalizeFirst } from "$lib/util/string";
  import { GALLERIES, TOTAL_IMAGE_COUNT } from "$lib/config/gallery";
  import Gallery from "$lib/components/Gallery.svelte";
  import LoadModal from "$lib/components/modal/LoadModal.svelte";

  page.set(PAGE.PAGE_GALLERY);

  export let jumpTo;

  const imgLoaded = {
    ...writable(0),
    inc() { this.update((s) => s + 1); }
  };

  setContext(storeKeys.GALLERY_IMAGES_LOADED, imgLoaded);

  const scrollPosition = getContext(storeKeys.SCROLL_POSITION);

  const openLoadModal = () =>
    currentModal.set({ name: 'load', component: LoadModal });
  const closeModal = () => currentModal.set(undefined);
  const scrollTo = () => {
    if (!jumpTo) return;
    const e = document.getElementById(jumpTo);
    if (!e) return;
    scrollPosition.set(e.offsetTop - 100);
  };

  $: allLoaded = $imgLoaded >= TOTAL_IMAGE_COUNT;
  $: allLoaded && scrollTo();
  $: !allLoaded && jumpTo && openLoadModal();
  $: allLoaded && jumpTo && closeModal();
</script>

<div class="gallery-page">
  <div class="page-title">Gallery</div>
  {#each GALLERIES as gallery}
    <div class="gallery" id="{gallery}">
      <div class="gallery-title">{capitalizeFirst(gallery)}</div>
      <Gallery {gallery} />
    </div>
  {/each}
</div>

<style lang="scss">
  .gallery-page {
      display: flex;
      flex-direction: column;
      gap: 50px;
      padding: 10px 40px;

      .page-title {
          text-align: center;
          font-size: 52px;
      }
      .gallery {
          display: flex;
          flex-direction: column;

          .gallery-title {
              font-size: 42px;
              font-weight: 600;
              text-align: left;
              margin-bottom: 10px;
          }
      }
  }
</style>