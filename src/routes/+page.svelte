<script>
  import { page, PAGE } from "$lib/stores/page";
  import Title from "$lib/components/Title.svelte";
  import BrushTrail from "$lib/components/interactive/BrushTrail.svelte";
  import HorizontalScroller from "$lib/components/scrolling/HorizontalScroller.svelte";
  import ScrollerSection from "$lib/components/scrolling/ScrollerSection.svelte";
  import GalleryTitle from "$lib/components/sections/GalleryTitle.svelte";
  import Capstone from "$lib/components/sections/Capstone.svelte";
  import Digital from "$lib/components/sections/Digital.svelte";
  import Architecture from "$lib/components/sections/Architecture.svelte";
  import Photography from "$lib/components/sections/Photography.svelte";

  page.set(PAGE.PAGE_HOME);
</script>

<HorizontalScroller fixed>
  <ScrollerSection>
    <GalleryTitle />
  </ScrollerSection>
  <ScrollerSection snap>
    <Capstone />
  </ScrollerSection>
  <ScrollerSection snap>
    <Digital />
  </ScrollerSection>
  <ScrollerSection snap>
    <Architecture />
  </ScrollerSection>
  <ScrollerSection snap>
    <Photography />
  </ScrollerSection>
</HorizontalScroller>

<section class="about">
  <BrushTrail />
  <div class="details">
    <Title text="About Me"
           gradient="linear-gradient(to bottom right, #fff 55%, #000)"
    />
    <span class="text">
        I have been making art since a very young age and enjoy exploring different styles and mediums.
        My art and interest have no limits as I have even experimented with painting using maple syrup.
        By far, my favorite medium has to be wood, and I have established my art style as a mix of fantastical realism.
    </span>
  </div>
</section>

<style lang="scss">
    :global(.container-spacing) {
        background: black;
    }

    section {
        position: relative;
        background: black;
        color: white;
        height: 500px;

        :global(.title) {
            font-size: 2.8rem;
            font-weight: 800;
        }
    }

    .gallery {
        height: 100%;
    }

    .about {
        min-height: 55vh;

        .title {
            color: transparent;
            background: linear-gradient(to bottom, #919191, #76879d);
            flex-shrink: 1;
            background-clip: text;
            -webkit-background-clip: text;
        }

        .text {
            color: #c5c5c5;
            text-shadow: black 2px 2px 2px;
            font-size: 1.125rem;
            max-width: 40em;
            text-align: right;
            padding: 0 20px;

            @media (max-width: 1075px) {
                text-align: center;
            }
        }

        .details {
            height: 100%;
            position: relative;
            z-index: 5;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            pointer-events: none;
            gap: 0 8em;
        }
    }

    :global(.brush) {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
        background: black;

        :global(canvas) {
            position: relative;
            background: black;
        }

        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, transparent, transparent 90%, black),
                        linear-gradient(to bottom right, transparent, transparent 90%, black),
                        linear-gradient(to bottom left, transparent, transparent 90%, black),
                        linear-gradient(to top, transparent, transparent 90%, black),
                        linear-gradient(to top right, transparent, transparent 90%, black),
                        linear-gradient(to top left, transparent, transparent 90%, black);
        }
    }
</style>
