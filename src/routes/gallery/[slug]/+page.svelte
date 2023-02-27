<script>
  import { page } from "$app/stores";
  import GalleryPage from '../+page.svelte';

  $: jumpTo = $page.params.slug;
</script>

<GalleryPage {jumpTo} />