<script>
    import Nav from "$lib/components/Nav.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import Modal from "$lib/components/modal/Modal.svelte";
    import Observer from "$lib/components/Visible/Observer.svelte";
    import SmoothScrolling from "$lib/components/scrolling/SmoothScrolling.svelte";
</script>

<SmoothScrolling>
    <Observer>
        <Nav />
        <slot />
        <Footer />
    </Observer>

    <Modal />
</SmoothScrolling>

<style lang="scss">
    :global(body) {
        padding: 0;
        margin: 0;
        font-family: "Changa", "Arial", sans-serif;
        background: black;
        color: white;
    }
</style>
