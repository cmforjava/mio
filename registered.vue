<template>
  <div class="control">
    <div class="header-top">
      <top></top>
    </div>
    <div class="middle_centre">
      <div class="msg-content" style="background:#fff;">
        <msg title="申请成为代理，若有疑问，请联系平台" class="msg-hd" :buttons="buttons" icon="info"></msg>
      </div>
      <group :gutter="10" label-width="5em" label-margin-right="1em" label-align="justify">
        <x-input
                title="手机号"
                placeholder="请输入手机号"
                v-model="form.telephone"
                :max="13"
                is-type="china-mobile"
                keyboard="number"
                :show-clear="false"
        ></x-input>
        <x-input title="验证码" placeholder="请输入验证码" v-model="form.code" :show-clear="false">
          <x-button
                  class="btn"
                  style="border-radius:99px;"
                  slot="right"
                  @click.native="getSms"
                  type="warn"
                  plain
                  mini
                  :disabled="!(is_mobile && (second === 0 ) )"
          >
            <span class="cod-txt">发送验证码</span>
            <span v-show="second > 0 " class="cod-txt">({{ second }})</span>
          </x-button>
        </x-input>
        <x-address
                title="城市"
                v-model="address"
                :list="addressData"
                @on-shadow-change="onShadowChange"
                placeholder="请选择"
                value-text-align="left"
        ></x-address>
        <x-textarea
                :rows="2"
                :cols="30"
                title="详细地址"
                v-model="form.address_str"
                :show-counter="false"
                placeholder="请输入详细地址"
                :show-clear="false"
        ></x-textarea>
        <x-input title="真实姓名" placeholder="请填写真实姓名" v-model="form.name" :show-clear="false"></x-input>
        <x-input
                required
                title="身份证号"
                v-model="form.identification_card"
                type="number"
                @on-click-clear-icon="clearIdCard"
                placeholder="请填写身份证号"
                :max="18"
                :show-clear="false"
        ></x-input>
        <flexbox :gutter="0">
          <flexbox-item>
            <div class="identity-content" style="padding-right: 0.4em;">
              <div class="identity-content-one" v-if="!getBusinessIdentity">
                <div class="identity-content-icon">
                  <!-- <img src="@icon/icon_camera.png" > -->
                  <p class="identity-content-icon-text" @click="nativefile">点击上传正面照</p>
                  <!--                  <input type="file" @change="setFile" id="positiveFile">-->
                </div>
              </div>
              <div class="identity-content-two" v-else>
                <img @click="nativefile" :src="getBusinessIdentity">
              </div>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="identity-content" style="padding-left: 0.4em;">
              <div class="identity-content-one" v-if="!getBusinessIdentityBack">
                <div class="identity-content-icon">
                  <!-- <img src="@icon/icon_camera.png"> -->
                  <p class="identity-content-icon-text" @click="nativefileback">点击上传背面照</p>
                  <!--                  <input type="file" @change="setFile2" id="oppositeFile">-->
                </div>
              </div>
              <div class="identity-content-two" v-else>
                <img @click="nativefileback" :src="getBusinessIdentityBack">
              </div>
            </div>
          </flexbox-item>
        </flexbox>
      </group>
      <div class="account_btn" style="    margin-bottom: 0.77em;">
        <x-button
                type="warn"
                class="btn-submit btn"
                style="border-radius: 99px"
                @click.native="handleSubmit"
        >提交申请</x-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { getSms, register } from "@/api/common";
  import { mapGetters } from "vuex";
  import { setInterval } from "timers";
  import { ChinaAddressV4Data, Value2nameFilter as value2name } from "vux";
  import { is_mobile } from "@/utils/validate";
  export default {
    data() {
      const _this = this;
      return {
        address: [],
        addressData: ChinaAddressV4Data,

        buttons: [
          {
            type: "default",
            text: "联系平台",
            onClick: () => _this.callPhone()
          }
        ],
        form: {
          status: 1,
          telephone: null,
          code: "",
          name: "",
          identification_card: "",
          address: "",
          province: 0,
          district: 0,
          city: 0,
          province_code: 0,
          district_code: 0,
          city_code: 0,
          password: 123456,
          address_str: ""
        },
        second: 0
      };
    },
    computed: {
      is_mobile() {
        return is_mobile(`${this.form.telephone}`);
      },
      ...mapGetters([
        "getOss",
        "getBusinessIdentity",
        "getBusinessIdentityBack",
        "register_info"
      ])
    },
    methods: {
      callPhone() {
        window.location.href = "tel:057912345614";
      },
      clearIdCard() {
        this.form.identification_card = "";
      },
      getSms() {
        this.second = 60;
        getSms({ phone: this.form.telephone }).then(response => {
          if (response.success) {
            this.$vux.toast.text(response.message);
          }
        });
      },

      onShadowChange(ids, names) {
        this.form.province = names[0];
        this.form.province_code = ids[0];
        this.form.city = names[1];
        this.form.city_code = ids[1];
        this.form.district = names[2];
        this.form.district_code = ids[2];
      },
      nativefile(){
        let that = this
        let dataURLtoBlob = (dataurl)=> {
          var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                  bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
          while(n--){
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new Blob([u8arr], {type:mime});
        }
        let mcamera = plus.camera
        let camera = mcamera.getCamera(1)
        camera.captureImage((res)=>{
          plus.io.resolveLocalFileSystemURL(res, (entry)=>{
            entry.file((file)=>{
              let reader = new plus.io.FileReader();
              reader.onloadend = function ( e ) {
                let blob = dataURLtoBlob(e.target.result);
                //BLOB对象转换为FILE对象
                let newfile=new File([blob],file.name);
                that.getOss
                        .put(newfile.name, newfile, {
                          progress: function*(percentage, cpt) {}
                        })
                        .then(results => {
                          that.$store.commit("SET_BUSINESSIDENTITY", results.url);
                          // console.log('success')
                        })
                        .catch(err => {
                          console.log(err);
                        })
              };
              reader.readAsDataURL( file );
            })

          },  (err)=>{

          })
        },()=>{},{})
      },
      nativefileback(){
        let that = this
        let dataURLtoBlob = (dataurl)=> {
          var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                  bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
          while(n--){
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new Blob([u8arr], {type:mime});
        }
        let mcamera = plus.camera
        let camera = mcamera.getCamera(1)
        camera.captureImage((res)=>{
          plus.io.resolveLocalFileSystemURL(res, (entry)=>{
            entry.file((file)=>{
              let reader = new plus.io.FileReader();
              reader.onloadend = function ( e ) {
                let blob = dataURLtoBlob(e.target.result);
                //BLOB对象转换为FILE对象
                let newfile=new File([blob],file.name);
                that.getOss
                        .put(newfile.name, newfile, {
                          progress: function*(percentage, cpt) {}
                        })
                        .then(results => {
                          that.$store.commit("SET_BUSINESSIDENTITYBACK", results.url);
                          // console.log('success')
                        })
                        .catch(err => {
                          console.log(err);
                        })
              };
              reader.readAsDataURL( file );
            })

          },  (err)=>{

          })
        },()=>{},{})
      },
      fileClick(imgData) {
        document.getElementById("positiveFile").click();
      },
      fileClick2(imgData) {
        document.getElementById("oppositeFile").click();
      },
      setFile(e) {
        this.getOss
                .put(e.target.files[0].name, e.target.files[0], {
                  progress: function*(percentage, cpt) {}
                })
                .then(results => {
                  console.log("results", results.url);
                  this.$store.commit("SET_BUSINESSIDENTITY", results.url);
                  // console.log('success')
                })
                .catch(err => {
                  console.log(err);
                });
      },
      setFile2(e) {
        this.getOss
                .put(e.target.files[0].name, e.target.files[0], {
                  progress: function*(percentage, cpt) {}
                })
                .then(results => {
                  console.log("results", results.url);
                  this.$store.commit("SET_BUSINESSIDENTITYBACK", results.url);
                  // console.log('success')
                })
                .catch(err => {
                  console.log(err);
                });
      },

      handleSubmit() {
        if (!this.is_mobile) {
          return this.$vux.toast.text("请输入正确的手机号");
        }

        if (!this.form.code) {
          return this.$vux.toast.text("请输入验证码");
        }
        // if (!this.form.code) {
        //   return this.$vux.toast.text("请选择城市");
        // }
        if (!this.form.address_str) {
          return this.$vux.toast.text("请输入详细地址");
        }
        if (!this.form.name) {
          return this.$vux.toast.text("请输入真实姓名");
        }
        if (!this.form.identification_card) {
          return this.$vux.toast.text("请输入身份证号");
        }

        if (!this.getBusinessIdentity) {
          return this.$vux.toast.text({ content: "请上传身份证人像面" });
        }
        if (!this.getBusinessIdentityBack) {
          return this.$vux.toast.text({ content: "请上传身份证国徽面" });
        }
        register({
          ...this.form,
          username: this.form.name,
          grade_id: this.register_info.grade_id,
          inviter_id: this.register_info.inviter.id,
          img_identification_card: this.getBusinessIdentity,
          img_back_identification_card: this.getBusinessIdentityBack
        })
                .then(response => {
                  if (response.success) {
                    this.$vux.toast.text(response.message);
                    this.$router.push({ path: "/tips/verify" });
                  }
                })
                .catch(({ data }) => this.$vux.toast.text(data.message));
      },
      countup() {
        setInterval(() => {
          if (this.second <= 0) {
            return;
          }
          this.second -= 1;
        }, 1000);
      }
    },
    created() {
      // console.log(this.register_info);
      this.countup();
    },
    mounted(){

    }
  };
</script>


<style lang="less" scoped>
  @import "../../assets/less/variable.less";
  .msg-hd {
    width: 70%;
    margin: auto;
  }
  .identity-content {
    width: 100%;
    padding: 0.8em;
    height: 19vh;
    box-sizing: border-box;
    &-one {
      overflow: hidden;
      background: #eee;
      width: 100%;
      height: 100%;
    }
    &-icon {
      margin: auto;
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 100%;
      &-text {
        margin-top: 6vh;
        color: @titleColor;
        text-align: center;
        width: 100%;
      }
      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        -ms-filter: "alpha(opacity=0)";
        overflow: hidden;
      }
    }
    &-two {
      width: 100%;
      height: 100%;
      overflow: hidden;
      border: 1px solid #d9d9d9;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  @media screen and (max-width: 360px) {
    .cod-txt {
      font-size: 12px !important;
    }
    .weui-btn_mini {
      padding: 0 0.5em !important;
    }
  }
</style>
<style scoped>
  .msg-content >>> .weui-msg__icon-area {
    margin-bottom: 15px !important;
  }
  .msg-content >>> .weui-icon_msg {
    font-size: 5em !important;
    color: #ff625b !important;
  }
  .msg-content >>> .weui-msg__text-area {
    margin-bottom: 12px !important;
  }
  .msg-content >>> .weui-msg__title {
    font-size: 16px !important;
  }
  .msg-content >>> .weui-msg__opr-area {
    margin-bottom: 12px !important;
  }
  .msg-content >>> .weui-btn-area {
    margin-top: 0.8em !important;
  }
  .msg-content >>> .weui-btn-area > a {
    border-radius: 99px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    display: inline-block;
    padding: 0 1.32em;
    line-height: 2.3;
    font-size: 13px;
  }
  .msg-content >>> .weui-btn-area > a::after {
    border-radius: 99px;
    border: 1px solid rgba(0, 0, 0, 0) !important;
  }
</style>

