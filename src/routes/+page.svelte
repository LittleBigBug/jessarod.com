<script>
    import Title from "../lib/components/Title.svelte";
    import Cubes from "../lib/components/interactive/Cubes.svelte";
    import BrushTrail from "../lib/components/interactive/BrushTrail.svelte";
    import FixedContainer from "../lib/components/FixedContainer.svelte";
    import HorizontalScroller from "../lib/components/HorizontalScroller.svelte";
    let height;
</script>

<FixedContainer bind:height>
    <section class="landing" class:small={$height < 200}>
        <Cubes />
        <div class="intro">
            <span class="subtitle">
                Experienced Artist
            </span>
            <Title text="Jessica Rodriguez"
                   gradient="linear-gradient(to bottom right, #fff, #000)"
            />
            <div class="mediums">
                <span>Fine Arts</span>
                <span>Graphic & Media Design</span>
                <span>3D Modeling</span>
            </div>
        </div>
        <div class="contact">
            <span class="email">jess@yasfu.net</span>
        </div>
    </section>
</FixedContainer>

<HorizontalScroller>
    <section class="gallery">
        <Title text="Gallery"
               gradient="linear-gradient(to bottom right, #fff 45%, #000)"
        />
    </section>
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
        font-size: 45px;
        font-weight: 800;
      }
    }

    .landing {
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: left;
      padding-left: 5em;

      &.small {
        .title {
          font-size: 44px !important;
          line-height: 44px !important;
        }
        .mediums {
          max-height: 0;
          opacity: 0;
        }
      }

      .mediums {
        max-height: 100px;
        transition: max-height 500ms, opacity 500ms;
        display: flex;
        flex-direction: row;
        font-size: 18px;
        gap: 20px;

        span {

        }
      }

      .intro {
        gap: 6px;
        z-index: 2;
        position: relative;
        pointer-events: none;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .subtitle {
          font-size: 16px;
          line-height: 20px;
        }
        :global(.title) {
          transition: font-size 0.5s ease, line-height 0.5s ease;
          font-size: 58px;
          line-height: 60px;
        }
      }

      .contact {

      }
    }

    .gallery {
      background: aquamarine;
    }

    .about {
      height: 55vh;

      .title {
        color: transparent;
        background: linear-gradient(to bottom, #919191, #76879d);
        background-clip: text;
        -webkit-background-clip: text;
      }
      .text {
        color: #c5c5c5;
        text-shadow: black 2px 2px 2px;
        font-size: 18px;
        max-width: 40em;
        text-align: right;
      }
      .details {
        height: 100%;
        position: relative;
        z-index: 5;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        gap: 8em;
      }
    }

    /**
        Renderer styles
     */
    :global(.cubes) {
      width: 100%;
      height: 100%;
      position: absolute;
      background: black;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      /* Stats */
      :global(div) {
        top: auto !important;
        left: auto !important;
        right: 4px;
        bottom: 4px;
      }

      :global(canvas) {
        background: black;
      }

      &::after {
        content: '';
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background:
                linear-gradient(to bottom, transparent, transparent 90%, black),
                linear-gradient(to bottom right, transparent, transparent 90%, black),
                linear-gradient(to bottom left, transparent, transparent 90%, black);
      }
    }

    :global(.brush) {
      position: absolute;

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
        background:
                linear-gradient(to bottom, transparent, transparent 90%, black),
                linear-gradient(to bottom right, transparent, transparent 90%, black),
                linear-gradient(to bottom left, transparent, transparent 90%, black),
                linear-gradient(to top, transparent, transparent 90%, black),
                linear-gradient(to top right, transparent, transparent 90%, black),
                linear-gradient(to top left, transparent, transparent 90%, black);
      }
    }

    :global(.brush),
    :global(.observed-container) {
      width: 100%;
      height: 100%;
      position: absolute;
      background: black;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
</style>
