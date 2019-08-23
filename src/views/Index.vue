<template>
  <div class="pages">
    <div v-show="shareVisible" class="share-wrap" @click="shareVisible = false">
      <i class="block"/>
    </div>

    <!-- 改动点 -->
    <div>
      <div
        v-for="(item, index) in list"
        :key="index"
      >
        <div v-if="item.showType==1||item.list.length==1" style="display: flex;line-height: 0;font-size:0">
          <a
            v-for="(__item, __index) in item.list"
            :key="__index"
            v-ilog="__item.needIlog ? __item.ilog : ''"
            style="flex: 1;align-items: flex-start"
            href="javascript:"
            @click="go2OutChain(__item.url)"
          >
            <img :src="__item.img" style="width: 100%">
          </a>
        </div>
        <div v-else
          class="banner-box"
          :data-id="index"
          v-touch:touchstart="touchStart" 
          v-touch:touchmove="touchMove" 
          v-touch:touchend="touchEnd"
          :style="`background:${(item.showBgType==1?item.showBgColor:'')} url(${(item.showBgType==1?'':item.carouselBg)}) 0 0/100% auto no-repeat;`">
          <div :data-id="index" class="item-box" :style="`width: 35rem;left: ${item.diff}px;transition:${sport?'all 0.2s':'all 0s'};`">
            <!-- <div :id="'width'+index" style="display:inline-block;width:33.333333%;"> -->
                <img
                  class="list-item"
                  :data-id="index"
                  v-for="(__item, __index) in item.list"
                  :key="__index"
                  v-ilog="__item.needIlog ? __item.ilog : ''"
                  @click="go2OutChain(__item.url)"
                  :src="__item.img">
            <!-- </div> -->
          </div>
          <div class="circle">
            <span 
              v-for="(__item, __index) in item.list"
              :key="__index"
              :class="current[index]==__index?'active':''+ ' ' + __index==0||__index==item.list.length-1?'hide':''"
              ></span>
          </div>
        </div>
      </div>
    </div>
    <div 
    v-show="visible.button"
    class="fix-bottom" 
    @click="go2OutChain(button.src)" 
    v-ilog="button.enableBtnIlog ? button.btnIlog : ''"
    :style="`color: ${button.color};background: url(${button.imgUrl}) 0 0/100% 100% no-repeat;`">{{button.btnTxt}}</div>
  </div>
</template>

<script>
import Share from "../base/share";
import { setTimeout } from 'timers';

const env = _util.url.get("env");
const activityInfoServerUrl =
  env === "test"
    ? "https://a-test.XXX.com"
    : env === "uat"
    ? "https://a-uat.XXX.com"
    : "https://a.XXX.com";

const ua = _global.device.weixin ? "wechat" : _global.device.app ? "app" : "h5";

function isIPhoneX(fn){
    var u = navigator.userAgent;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isIOS) {    	
        if (screen.height == 812 && screen.width == 375){
          //是iphoneX
          return true
        }else{
          //不是iphoneX
          return false
        } 
    }
}

let data = [
        {
          showType: 1,
          list: [
            {
              url: 'https://www.baidu.com?a=1',
              img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1249571024,2814416473&fm=26&gp=0.jpg'
            },
            {
              url: 'https://www.baidu.com?a=2',
              img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1249571024,2814416473&fm=26&gp=0.jpg'
            },
            {
              url: 'https://www.baidu.com?a=3',
              img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1249571024,2814416473&fm=26&gp=0.jpg'
            },
          ]
        },
        {
          showType: 2,
          list: [
            {
              url: 'https://www.baidu.com?a=1',
              img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1249571024,2814416473&fm=26&gp=0.jpg'
            },
            {
              url: 'https://www.baidu.com?a=2',
              img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1249571024,2814416473&fm=26&gp=0.jpg'
            },
            {
              url: 'https://www.baidu.com?a=3',
              img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1249571024,2814416473&fm=26&gp=0.jpg'
            },
          ]  
        }
      ]

export default {
  data() {
    return {
      shareVisible: false,
      isDebugger: false,
      list: [],
      sport: true,
      current: [],
      bannerTimer: {},
      startX: 0,
      diffX: 0,
      defalultX: 0,
      width: 345,
      button: {},
      visible: {},
    };
  },

  async mounted() {
    this.width = this.width/375*document.body.clientWidth;
    this.initPage();
  },

  methods: {
    touchStart(e) {
      const id = e.target.dataset.id;
      this.startX = e.targetTouches[0].pageX;
      this.defalultX = this.width*(-this.current[id]);
      // console.log(e, this.startX, this.defalultX, this.width, this.current[id])
    },
    touchMove(e) {
      const id = e.target.dataset.id;
      this.diffX = (e.targetTouches[0].pageX - this.startX) || 0;
      if(Math.abs(this.diffX)>10){
        e.preventDefault()
      }

      // this.list[id].diff = this.defalultX+ this.diffX
      let data = this.list[id]
      data.diff = this.defalultX+ this.diffX
      this.list.splice(id,1, data)

      this.sport = true
      // console.log(this.diffX, this.diff)
    },
    touchEnd(e) {
      // console.log(e, this.diffX)
      const id = e.target.dataset.id;
      if(this.diffX<-30){
        this.rightDown(id);
      }else if(this.diffX>30){
        this.leftDown(id);
      }else{

        let data = this.list[id];
        data.diff = -(this.width*this.current[id]);
        this.list.splice(id,1, data)
        // this.list[id].diff = -(this.width*this.current[id]);

        this.sport = true;
        this.bannerTimer['timer'+id] && clearInterval(this.bannerTimer['timer'+id]);
        this.bannerTimer['timer'+id] =  setInterval(()=>{
          this.swiperLeft(id);
        }, 3000);
      }
      // 清除第一次滑动之后点击也会滑动
      this.diffX = 0
    },
    leftDown(id){
        this.bannerTimer['timer'+id]&&clearInterval(this.bannerTimer['timer'+id])
        this.swiperRight(id);
        this.bannerTimer['timer'+id] =  setInterval(()=>{
            this.swiperLeft(id);
        },3300);
    },
    rightDown(id){
        this.bannerTimer['timer'+id]&&clearInterval(this.bannerTimer['timer'+id])
        this.swiperLeft(id);
        this.bannerTimer['timer'+id] =  setInterval(()=>{
            this.swiperLeft(id);
        },3300);
    },
    swiperRight(id){
        this.current[id] -= 1;
        // console.log(this.current[id])
        // this.list[id].diff = -(this.width*this.current[id])
        let data = this.list[id];
        data.diff = -(this.width*this.current[id]);
        this.list.splice(id,1, data)
        this.sport = true

        if(this.current[id]==0){
          this.current[id] = this.list[id].list.length-2;
          this.rightTimer&&clearTimeout(this.rightTimer);
          this.rightTimer = setTimeout(()=>{
            // this.list[id].diff = -(this.width*(this.list[id].list.length-2));
            let data = this.list[id];
            data.diff = -(this.width*(this.list[id].list.length-2));
            this.list.splice(id,1, data)
            
            this.sport = false
          },300)
        }
    },
    swiperLeft(id){
      this.current[id] += 1;
      // console.log(this.current[id], id, this.list)
      // this.list[id].diff = -(this.width*this.current[id])
      let data = this.list[id];
      data.diff = -(this.width*this.current[id]);
      this.list.splice(id,1, data)
      this.sport = true
      
      if(this.current[id]==this.list[id].list.length-1){
        this.current[id] = 1;
        this.rightTimer&&clearTimeout(this.rightTimer);
        this.rightTimer = setTimeout(()=>{
          // this.list[id].diff = -(this.width*this.current[id])
          let data = this.list[id];
          data.diff = -(this.width*this.current[id]);
          this.list.splice(id,1, data)
          this.sport = false
        },300)
      }
    },
    /* 去外链 */
    go2OutChain(url) {
      if (this.isDebugger || !url) return;
      let jumpUrl = `${url}`;
      location.href = jumpUrl;
    },

    /* 初始化页面 */
    async initPage() {
      if (top !== self) this.isDebugger = true;
      if (_util.url.get("console")) _global.use("vconsole", () => new VConsole());

      const fn = () => {
        return new Promise((resolve, reject) => {
          $.getJSON(
            `${activityInfoServerUrl}?callback=?&activityCode=${_util.url.get(
              "activityCode"
            )}`,
            res => {
              console.log(res);
              if (res.isSuccess === false) {
                _global.ui.toast(res.message);
                reject();
                return;
              }

              // 初始化分享
              window.shareConfig = {
                link: location.href,
                url: location.href,
                title: res.value.shareTitle,
                desc: res.value.shareDesc,
                description: res.value.shareDesc,
                imgUrl: res.value.shareImg,
                imageUrl: res.value.shareImg,
                logoUrl: res.value.shareImg,
                isSharePicture: true,
                success: () => {
                  _global.ui.toast("分享成功");
                  this.shareVisible = false;
                },
                fail() {
                  _global.ui.toast("分享失败");
                }
              };

              // 初始化微信分享信息
              if (_global.device.weixin) {
                Share.init(window.shareConfig);
                resolve();
                return;
              }
              resolve();
            }
          );
        });
      };

      try {
        // await fn();
        // 异步请求接口
        this.list = data;
        this.list.map((item)=>{
        if(item.showType==2){
            item.diff = -this.width;
            console.log(item)
            if(item.list && item.list instanceof Array && item.list.length>1){
              let first = item.list[0];
              let last = item.list[item.list.length-1];
              item.list.push(first);
              item.list.unshift(last);
              console.log(first, last, item.list)
            }
          }
        })
      } catch (err) {
        console.log(err);
        return;
      }
      console.log(1111, this.list)
      // 轮播只有是轮播图的情况下，给多个轮播列表 初始化数据
      this.list.map((item, index)=>{
        this.current.push(1);           // 当前id
        if(item.showType == 2&&item.list&&item.list.length>1){
          this.$set(this.bannerTimer, `timer${index}`, null);
          // this.diff['left'+index] = -this.width;  // 当前id对应的left值（由于滑动时但不松手，图片也要根据页面滑动，所以需要增加该字段）
          this.bannerTimer['timer'+index] && clearInterval(this.bannerTimer['timer'+index]);
          this.bannerTimer['timer'+index] =  setInterval(()=>{
              this.swiperLeft(index);
          }, 3000);
        }
      })

      

      const scrollStyle = $(`<style>
                ::-webkit-scrollbar {
                    width: 3px;
                }
                ::-webkit-scrollbar-track {
                    -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.35);
                    border-radius: 2px;
                }
                ::-webkit-scrollbar-thumb {
                    border-radius: 2px;
                    background: #000;
                    -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.35);
                }
                ::-webkit-scrollbar-thumb:window-inactive {
                    background: rgba(255, 0, 0, 0.35);
                }
            </style>`);

      if (this.isDebugger) $("head").append(scrollStyle);
    }
  }
};
</script>

<style scoped>
.pages{
  padding-bottom: 1.5rem;
  background: #ccc;
}
.hide{
  display: none;
}
.share-wrap {
  background: rgba(0, 0, 0, 0.65);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 5000;
}

.share-wrap i {
  z-index: 5000;
  position: fixed;
  right: 0.3rem;
  top: 1rem;
  width: 4.23rem;
  height: 2.73rem;
  background: url("../assets/weixinmask.png") no-repeat;
  background-size: 100%;
}

.banner-box {
  font-size:0;
  position: relative;
  width: 100%;
  margin: 0 auto;
  display: block;
  white-space: nowrap;
  overflow: hidden;
}

.item-box{
  position: relative;
  top: 0;
  padding: 0 13px;
  box-sizing: border-box;
}
.circle{
  display: flex;
  align-items: center;
  height: 0.34rem;
  justify-content: center;
}
.circle span{
  height: 5px;
  width: 5px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 100%;
}
.circle span+span{
  margin-left: 0.2rem;
}
.circle span.active{
  background: #fff;
}
.fix-bottom{
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 11;
  height: 1.5rem;
  font-size: 0.42rem;
  display: flex;
  align-items: center;
  font-weight: 600;
  justify-content: center;
}

.list-item{
  width: 6.7rem;
  border-radius: 0.2rem;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  margin-right: 0.1rem;
  margin-left: 0.1rem;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}
</style>
