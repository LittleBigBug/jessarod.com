<script>
    import { onMount } from "svelte";
    import { isDev } from "$lib/util/env";
    import DetectVisible from "$lib/components/Visible/DetectVisible.svelte";

    export let mouseMove = () => {};
    export let mouseLeave = () => {};
    export let mouseDown = () => {};
    export let mouseUp = () => {};
    export let startRender = () => {};
    export let noLazyLoad = false;

    let canvas, started = false, mounted = false, visible = false;

    onMount(() => (mounted = true));

    const start = () => {
        if (started) return;
        started = true;
        startRender(canvas, { dev: isDev() });
    };

    $: mounted && canvas && (noLazyLoad || visible) && !started && start();
</script>

{#if !noLazyLoad}
    <DetectVisible bind:visible once>
        {visible}
        <div class="canvas {$$props.class}"
             bind:this={canvas}
             on:mousemove={mouseMove} on:mouseout={mouseLeave} on:mousedown={mouseDown} on:mouseup={mouseUp}
        />
    </DetectVisible>
{:else}
    <div class="canvas {$$props.class}"
         bind:this={canvas}
         on:mousemove={mouseMove} on:mouseout={mouseLeave} on:mousedown={mouseDown} on:mouseup={mouseUp}
    />
{/if}
