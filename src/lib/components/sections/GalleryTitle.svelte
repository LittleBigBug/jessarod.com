<div class="wrapper">
  <div class="splash"></div>
  <div class="arrows"></div>
  <h1>Gallery</h1>
  <h2>Keep scrolling to see my work!</h2>
</div>

<style lang="scss">
    .wrapper {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: white;
        text-align: center;

        h1 {
            font-size: 3.5em;
            line-height: 1em;
        }
        h1, h2 {
            margin: 0;
            z-index: 1;
            position: relative;
			      text-shadow: black 2px 2px 2px;
        }
        .splash {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 500px;
            aspect-ratio: 608 / 456;
            background-image: url("/img/splash.webp");
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            filter: grayscale(75%);
        }
        @keyframes arrows {
            from { opacity: 0.35; }
            50% { opacity: 0.5; }
            to { opacity: 0.35; }
        }
        .arrows {
            position: absolute;
            top: 50%;
            left: 90%;
            transform: translate(-50%, -50%);
            width: 50px;
            aspect-ratio: 206 / 254;
            background: #fff;
            animation: arrows 1500ms infinite;
            mask-image: url("/img/arrows_right.webp");
            mask-position: center;
            mask-size: contain;
            mask-repeat: no-repeat;
            -webkit-mask-image: url("/img/arrows_right.webp");
            -webkit-mask-position: center;
            -webkit-mask-size: contain;
            -webkit-mask-repeat: no-repeat;
        }
    }
</style>