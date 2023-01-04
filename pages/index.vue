<template>
  <div class="container">
    <div class="row">
      <div
        class="col-12 col-xl-9 col-lg-8 offset-lg-1 offset-xl-0 pl-lg-5 admin-left-side"
      >
        <div class="row">
          <div
            class="col-12 p-0 col-md-11 justify-content-center text-left mt-5"
          > 
            <div class="row line-chart">
              <div class="col-md-12">
                <div class="cards">
                  <iframe
                    src="https://dune.xyz/embeds/395828/755409/2d131dd7-a565-4ae6-875c-4d7bee163bf2"
                    height="500"
                    width="100%"
                    title="chart 5"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-3 col-lg-3 admin-right-side pl-md-0 mt-md-5">
        <div class="cards">
          <iframe
            src="https://dune.xyz/embeds/395442/754726/c9d5baae-33e5-412a-834a-fb90ad6be4e0"
            height="250"
            width="100%"
            title="chart 1"
          ></iframe>
        </div>
        <div class="cards">
          <iframe
            src="https://dune.xyz/embeds/417869/797100/c9ea90ea-a3e7-4e12-88ec-1c7b89e73afe"
            height="250"
            width="100%"
            title="chart 2"
          ></iframe>
        </div>
        <div class="cards">
          <iframe
            src="https://dune.xyz/embeds/417906/797152/6470e53b-3c75-4629-ad03-fcc45d7be7dd"
            height="250"
            width="100%"
            title="chart 3"
          ></iframe>
        </div>
        <div class="cards">
          <iframe
            src="https://dune.xyz/embeds/417899/797146/f06688fa-8fb6-4dba-a4ad-f8fb071f6859"
            height="250"
            width="100%"
            title="chart 3"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  loading: false,
  name: "dashboard",
  layout: "dashboard",
  computed: {},
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });
  },
};
</script>

<style lang="scss" scoped>
.admin-left-side {
  margin-bottom: 150px;
  .line-chart {
    padding: 30px;
    margin: 15px 15px;
    position: relative;

    iframe {
      border: none;
      display: flex;
      flex-direction: column;
      width: 100%;
      min-height: 107px;
      background: #ffffff;
      box-shadow: 2px 4px 42px rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      align-self: center;
      margin-bottom: 32px;
      padding: 30px;
      margin: 15px 15px;
      font-family: Montserrat-Medium;
      position: relative;
      a,
      span,
      p,
      div {
        font-family: Montserrat-Medium;
      }
    }
  }
}
@media (max-width: 768px) {
  .admin-left-side {
    .line-chart {
      padding: 5px;
      margin: 0;
      iframe {
        padding: 5px 15px;
        margin: 5px;
      }
    }
  }
}
.admin-right-side {
  margin-bottom: 150px;
  .cards {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 107px;
    background: #ffffff;
    box-shadow: 2px 4px 42px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    align-self: center;
    margin-bottom: 32px;
    padding: 30px;
    margin: 15px 15px;
    position: relative;
    iframe {
      border: none;
      font-family: Montserrat-Medium;
      a,
      span,
      p,
      div {
        font-family: Montserrat-Medium;
      }
    }
  }
  @media (max-width: 678px) {
    .cards {
      margin: 0 0 15px 0;
    }
  }
}
</style>
