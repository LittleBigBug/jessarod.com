<script>
  import { goto } from "$app/navigation";
  import { PAGE, page } from "$lib/stores/page";
  import Title from "$lib/components/Title.svelte";
  import Cubes from "$lib/components/interactive/Cubes.svelte";
  import FixedContainer from "$lib/components/scrolling/FixedContainer.svelte";

  let height;

  $: isHome = $page === PAGE.PAGE_HOME;
</script>

<FixedContainer bind:height normalHeight={isHome ? 400 : 230}>
  <section class="landing" class:small={$height < 200}>
    <Cubes />
    <div class="intro">
      <Title text="Jessica Rodriguez"
             gradient="linear-gradient(to bottom right, #fff, #000)"
             click={() => goto('/')}
      />
      <div class="subtitle">
        <span class="position">Experienced Artist</span>
        <div class="contact">
          <a class="resume" target="_blank" href="/jess_rodriguez_resume.pdf">Download Resume</a>
          <span class="email">hire@jessarod.com</span>
        </div>
      </div>
    </div>
    <div class="small-email">
      <a class="resume" target="_blank" href="/jess_rodriguez_resume.pdf">Download Resume</a>
      <span>hire@jessarod.com</span>
    </div>
  </section>
</FixedContainer>

<style lang="scss">
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

  @media (max-width: 870px) {
      :global(.title) {
          font-size: 3rem;
          text-align: center;
          align-self: center;
      }

      .landing {
          padding: 0 !important;
          justify-content: center;
          flex-direction: column;
      }

      .intro {
          align-items: center;
      }

      .subtitle {
          text-align: center;
          align-self: center;
      }

      .small-email {
          align-items: start !important;
          padding: 0 10px;
      }
  }

  @media (max-width: 514px) {
      .small-email {
          margin: 0 auto;
      }
  }

	.landing {
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: left;
      padding: 0 5em;

      .intro {
        gap: 6px;
        z-index: 2;
        position: relative;
        pointer-events: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        flex-grow: 1;

        .subtitle {
            transition: max-height 0.5s ease,
            opacity 0.35s ease;
            font-size: 1.2rem;
            line-height: 1.5rem;
            text-shadow: black 2px 2px 2px;
            max-height: 90px;

            .position {
                color: #c0c0c0;
                font-size: 1.45rem;
                line-height: 2.5rem;
            }

            .contact {
                span, a {
                    display: block;
                }
            }
        }

        :global(.title) {
            transition: font-size 0.5s ease,
            line-height 0.5s ease;
            font-size: 3.625rem;
            line-height: 3.75rem;
        }
      }

      .small-email {
          opacity: 0;
          display: none;
          z-index: 2;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          text-shadow: black 2px 2px 2px;
          transition: opacity 0.5s ease;
          font-size: 1.125rem;
          pointer-events: none;
      }

      &.small {
          :global(.title) {
              font-size: 2.75rem !important;
              line-height: 2.75rem !important;
          }

          .subtitle {
              max-height: 0;
              opacity: 0;
          }

          .small-email {
              opacity: 1;
              line-height: 12px;
              pointer-events: all;
              display: flex;
          }
      }
	}

  a {
	  cursor: pointer;
	  pointer-events: all;
	  transition: color 300ms ease;
	  text-decoration: none;
	  color: #68919b;

	  &:hover {
		  color: #465d62;
	  }
  }

  // Renderer Styling

  :global(.cubes) {
	  width: 100%;
	  height: 100%;
	  position: absolute;
	  background: black;
	  top: 0;
	  left: 0;
	  right: 0;
	  bottom: 0;

	  // Stats
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
		  background: linear-gradient(to bottom, transparent, transparent 90%, black),
		  linear-gradient(to bottom right, transparent, transparent 90%, black),
		  linear-gradient(to bottom left, transparent, transparent 90%, black);
	  }
  }

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