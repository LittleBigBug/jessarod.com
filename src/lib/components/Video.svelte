<script>
  import { Player, Video, DefaultUi, DefaultControls } from "@vime/svelte";

  export let src;
  export let poster;
  export let autoplay = false;
</script>

<div on:click={(event) => event.stopPropagation()}>
  <Player {autoplay}>
    <Video {poster}>
      <source data-src={src} {src} type="video/mp4">
    </Video>
    <DefaultUi noControls>
      <DefaultControls hideOnMouseLeave activeDuration={1500} />
    </DefaultUi>
  </Player>
</div>

<style lang="scss">
  div {
      display: flex;
      aspect-ratio: 16 / 9;
      height: 100%;
      justify-content: center;
      align-items: center;

      :global(vm-player) {
          width: 100%;
          height: 100%;
          display: inline-block;
          background: rgba(33, 33, 33, 0.98);
          border-radius: 6px;
      }
  }
</style>