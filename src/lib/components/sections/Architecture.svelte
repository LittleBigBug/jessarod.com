<div class="bg"></div>
<div class="content">
  <div class="title">Architecture</div>
  <div class="desc">Understanding and implementing architectural concepts</div>
  <div class="experience-with">With proficiency in:</div>
  <div class="tools">
    <div class="autocad" title="AutoDesk AutoCAD"></div>
    <div class="rhino" title="Rhino3D"></div>
  </div>
  <a class="gallery" href="/gallery/architecture">View Gallery</a>
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
		filter: blur(15px);
		background: url("/img/gallery/architecture/mughal.jpeg") 0 50%;
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
	  .experience-with {
		  margin-top: 20px;
	  }
	  .tools {
		  display: flex;
		  gap: 10px;

		  div {
			  width: 45px;
			  height: 45px;
			  background-size: contain;
			  background-position: center;
			  background-repeat: no-repeat;
		  }
		  .autocad {
			  background-image: url("/img/icon/autocad.webp");
		  }
		  .rhino {
			  background-image: url("/img/icon/rhino3d.webp");
		  }
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