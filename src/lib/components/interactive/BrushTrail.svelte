<script>
    import {
        startPaint,
        mouseMove,
        mouseLeave,
        mouseDown,
        mouseUp
    } from "$lib/2d/paint.js";
    import Interactive from "$lib/components/interactive/Interactive.svelte";
</script>

<Interactive class="brush" startRender={startPaint} {mouseMove} {mouseLeave} {mouseDown} {mouseUp} />
