<section class="footer">
  <div class="made-by">
    <span>Made with</span>
    <div class="heart"></div>
    <span>by Ethan Jones</span>
  </div>
</section>

<style lang="scss">
    .footer {
        padding: 10px 20px;
    }

    .made-by {
        display: flex;
        gap: 5px;
        align-items: center;
        font-size: 14px;

        .heart {
            width: 20px;
            height: 20px;
            background-image: url("/img/icon/heart.webp");
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
        }
    }
</style>