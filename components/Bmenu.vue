<template>
  <div class="footer">
    <div class="footer-real mrow mfw mbw">
      <div class="mcol" @click="goTo('/')">
        <img
          class="migs64"
          :src="require(`@pb/${tab==1?'tabbar_home_active':'tabbar_charitable_normal'}.png`)"
          alt
        />
        <div>首页</div>
      </div>
      <div class="mcol" @click="goTo('/welfare')">
        <img
          class="migs64"
          :src="require(`@pb/${tab==2?'tabbar_charitable_active':'tabbar_charitable_normal'}.png`)"
          alt
        />
        <div>公益</div>
      </div>
      <div class="mcol" @click="goTo('/user')">
        <img
          class="migs64"
          :src="require(`@pb/${tab==3?'tabbar_my_active':'tabbar_charitable_normal'}.png`)"
          alt
        />
        <div>我的</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bmenu",
  data() {
    return {
      tab: 1
    };
  },
  props: {
    pretab: {
      type: Number,
      default: 1
    }
  },
  created() {
    this.tab = this.pretab;
  }
};
</script>

<style lang="scss">
.footer {
  height: 13.067vw;
}
.footer-real {
  position: fixed;
  bottom: 0;
  height: 13.067vw;
  .mcol {
    flex: 1;
  }
}
</style>