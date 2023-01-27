<script>
    import { writable } from "svelte/store";
    import { getContext, onMount } from "svelte";

    export let once = false;
    export let visible = false;

    const visibleStore = writable(false);

    let div, mounted = false, added = false;

    const addObserver = getContext('observer');
    onMount(() => (mounted = true));

    const add = () => {
        if (added) return;
        added = true;
        addObserver(div, visibleStore);
    };

    $: visible = (once && visible) || $visibleStore;
    $: div && mounted && !added && add();
</script>

<div class="observed-container" bind:this={div}>
    <slot />
</div>
