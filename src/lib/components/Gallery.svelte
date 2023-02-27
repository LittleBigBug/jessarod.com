<script>
  import { getContext } from "svelte";
  import { storeKeys } from "$lib/config";
  import { format } from "$lib/util/string";
  import { IMAGES_BY_GALLERY } from "$lib/config/gallery";
  import { currentModal } from "$lib/stores/modal.js";
  import { pathFormat, gallery as galleryStore, showing } from "$lib/stores/showing";
  import ViewModal from "$lib/components/modal/ViewModal.svelte";

  export let gallery;

  const scrollLock = getContext(storeKeys.SCROLL_LOCK);
  const imgLoad = getContext(storeKeys.GALLERY_IMAGES_LOADED);

  const load = () => imgLoad.inc();
  const openModal = (i) => {
    showing.set(i);
    galleryStore.set(gallery);
    currentModal.set({ name: 'view', component: ViewModal });
  };

  $: images = IMAGES_BY_GALLERY[gallery] || [];
  $: scrollLock.set(!!$currentModal);
</script>

<div class="images">
  {#each images as image, i}
    <div class="img" class:video={image.endsWith('mp4')}  on:click={openModal.bind(null, i)}>
      <img
        on:load={load}
        src="{format(pathFormat, 'gallery_thumb', gallery, image).replace('.mp4', '.jpg')}"
        alt={image}
      />
    </div>
  {/each}
</div>

<style lang="scss">
  .images {
      line-height: 0;
      -webkit-column-count: 4;
      -webkit-column-gap: 15px;
      -moz-column-count: 4;
      -moz-column-gap: 15px;
      column-count: 4;
      column-gap: 15px;

      a {
          display: inline-block;
      }
      img {
          width: 100%;
          height: auto;
          margin-bottom: 15px;
          border-radius: 4px;
      }
      .img {
		      cursor: pointer;

          &.video {
              position: relative;

              &::after {
                  content: '';
                  position: absolute;
                  top: calc(50% - 15px);
                  left: 50%;
                  width: 80px;
                  height: 85px;
                  transition: width 200ms ease;
                  transform: translate(-50%, -50%);
                  background-image: url("/img/icon/play.webp");
                  background-repeat: no-repeat;
                  background-position: center;
                  background-size: contain;
              }
              &:hover::after {
                  width: 85px;
              }
          }
      }
  }
</style>