<script>
    import Observer from "$lib/components/Visible/Observer.svelte";
    import SmoothScrolling from "$lib/components/SmoothScrolling.svelte";
</script>

<SmoothScrolling />

<Observer>
    <slot />
</Observer>

<style lang="scss">
    :global(body) {
      padding: 0;
      margin: 0;
      font-family: "Changa", "Arial", sans-serif;
    }
</style>
