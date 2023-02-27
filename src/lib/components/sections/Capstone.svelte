<div class="bg"></div>
<div class="content">
  <div class="title">Capstone Final</div>
  <div class="desc">Proven skill with resin and other physical mediums in a beautiful capstone display</div>
  <a class="gallery" href="/gallery/capstone">View Gallery</a>
</div>

<style lang="scss">
  .bg {
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      filter: blur(20px);
	    background: url("/img/gallery/capstone/close_1.jpeg") 0 50%;
      background-size: cover;
      box-shadow: inset 2px 2px 4px 1px black;
      display: flex;
      align-items: center;
      justify-content: center;
  }
  .content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
	    text-shadow: black 2px 2px 2px;
      width: 100%;
      height: 100%;
      z-index: 2;

      .title {
          font-size: 32px;
      }
      .desc {
          font-size: 18px;
      }
      .gallery {
          font-size: 20px;
          margin-top: 20px;
          padding: 10px 30px;
          background: #000;
          border-radius: 4px;
          cursor: pointer;
          color: white;
          text-decoration: none;
          transition: color 300ms ease, background 300ms ease;

          &:hover {
              color: #c5c5c5;
			        background: #212121;
          }
      }
  }
</style>