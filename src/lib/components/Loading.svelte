<div class="loading"></div>

<style lang="scss">
  @keyframes loading {
      to { transform: translate(-50%, -50%) rotate(360deg); }
  }
  .loading {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 40px;
      height: 40px;
      z-index: -1;
      transform: translate(-50%, -50%) rotate(0deg);
      animation: loading 500ms linear infinite;
      background-image: url("/img/icon/load2.webp");
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
  }
</style>