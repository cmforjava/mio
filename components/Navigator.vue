<template>
    <div class="nav-outer mrow" :style="outerStyle">
      <div class="left">
        <slot name="left"></slot>
      </div>
      <div class="mid">
        <slot name="mid">{{$route.meta.name}}</slot>
      </div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Navigator",
      data(){
          return {

          }
      },
      props: {
          outerStyle: {
            type: String,
            default: ''
          }
      }
    }
</script>

<style lang="scss" scoped>
  .nav-outer {
    width:100vw;
    height: 10.66vw;
  }
  .left {
    width: 10.66vw;
    display:flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 7.466vw;
      height: 7.466vw;
    }
  }
  .mid {
    flex: 1;
    display:flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
  }
  .right {
    width: 10.66vw;
    display:flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 7.466vw;
      height: 7.466vw;
    }
  }
</style>
