<script>
    import { onMount } from "svelte";
    import { isDev } from "$lib/util/env";
    import DetectVisible from "$lib/components/visible/DetectVisible.svelte";

    export let mouseMove = () => {};
    export let mouseLeave = () => {};
    export let mouseDown = () => {};
    export let mouseUp = () => {};
    export let startRender = () => {};
    export let noLazyLoad = false;
    export let style = "";

    let canvas, started = false, mounted = false, visible = false;

    onMount(() => (mounted = true));

    const start = () => {
        if (started) return;
        started = true;
        startRender(canvas, { dev: isDev() });
    };

    $: mounted && canvas && (noLazyLoad || visible) && !started && start();
</script>

<DetectVisible once {noLazyLoad}>
    <div class="canvas {$$props.class}"
         {style}
         bind:this={canvas}
         on:mousemove={mouseMove} on:mouseout={mouseLeave}
         on:mousedown={mouseDown} on:mouseup={mouseUp}
    ></div>
</DetectVisible>