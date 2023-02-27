<script>
    export let text = "";
    export let shadow = "#000 1px 1px 8px";
    export let gradient = "";
    export let click;
</script>

<div class="title"
     on:click={click}
     class:clickable={!!click}
     class:gradient={gradient !== ""}
     style="--shadow: {shadow}; --gradient: {gradient};"
>
    <div class="shadow">{text}</div>
    <div class="text">{text}</div>
</div>

<style lang="scss">
    .title {
        position: relative;

        .shadow {
            top: 0;
            left: 0;
            z-index: -1;
            position: absolute;
            color: transparent;
            text-shadow: var(--shadow);
            width: 100%;
        }
        .text {
            z-index: 1;
        }
        &.gradient {
            .text {
                color: transparent;
                background: var(--gradient);
                background-clip: text;
                -webkit-background-clip: text;
            }
        }
        &.clickable {
            cursor: pointer;
            pointer-events: all;
        }
    }
</style>
