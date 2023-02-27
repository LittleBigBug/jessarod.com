<script>
  import { fade } from "svelte/transition";
  import { currentModal, modalComponent, modalData } from "$lib/stores/modal";

  const close = () => currentModal.set(undefined);
</script>

{#if $currentModal}
  <div class="modal-bg" on:click={close} transition:fade={{ duration: 100 }}>
    <div class="modal">
      <svelte:component this={$modalComponent} data={$modalData} />
    </div>
  </div>
{/if}

<style lang="scss">
	.modal-bg {
		position: fixed;
	  z-index: 2000;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  background: rgba(0, 0, 0, 0.55);
	  backdrop-filter: blur(1px);
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>