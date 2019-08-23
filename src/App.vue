<template>
  	<div id="app">
		<router-view />
  	</div>
</template>

<style>
.dib {
  display: inline-block;
  *display: inline;
  *zoom: 1;
}

.dib-box {
  font-size: 0;
  /* 所有浏览器 */
  *word-spacing: -1px;
  /* IE6/7 */
}

@media (-webkit-min-device-pixel-ratio: 0) {
  .dib-box {
    letter-spacing: -5px;
    /* Safari 5- 等不支持 font-size: 0 的浏览器 */
  }
}

.dib-box .dib {
  vertical-align: top;
  font-size: 12px;
  letter-spacing: normal;
  word-spacing: normal;
  line-height: inherit;
}
#app {
  overflow: hidden;
}

.ui-toast {
  z-index: 9999;
  font-size: 0.28rem;
  border-radius: 0.1rem;
  padding: 0.25rem;
  min-height: 0.35rem;
}


/* common style */

html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline
}

article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section {
    display: block
}

ol,ul,menu {
    list-style: none
}

blockquote,q {
    quotes: none
}

blockquote:before,blockquote:after,q:before,q:after {
    content: '';
    content: none
}

table {
    border-collapse: collapse;
    border-spacing: 0
}

.g1 {
    width: 10%
}

.g2 {
    width: 20%
}

.g3 {
    width: 30%
}

.g4 {
    width: 40%
}

.g5 {
    width: 50%
}

.g6 {
    width: 60%
}

.g7 {
    width: 70%
}

.g8 {
    width: 80%
}

.g9 {
    width: 90%
}

.g10 {
    width: 100%
}

a {
    color: #333;
    text-decoration: none
}

input[type=submit],button {
    cursor: pointer;
    -webkit-appearance: none
}

strong,b,.b {
    font-weight: bold
}

.u {
    text-decoration: underline
}

.center {
    text-align: center
}

.tr {
    text-align: right
}

.tl {
    text-align: left
}

.tc {
    text-align: center
}

.fr {
    float: right
}

.fl {
    float: left
}

.f333 {
    color: #333
}

.f666 {
    color: #666
}

.f999 {
    color: #999
}

.f18 {
    font-size: 1.8rem
}

.f19 {
    font-size: 1.9rem
}

.f20 {
    font-size: 2.0rem
}

.f21 {
    font-size: 2.1rem
}

.f22 {
    font-size: 2.2rem
}

.f23 {
    font-size: 2.3rem
}

.f24 {
    font-size: 2.4rem
}

.f25 {
    font-size: 2.5rem
}

.f26 {
    font-size: 2.6rem
}

.f27 {
    font-size: 2.7rem
}

.f28 {
    font-size: 2.8rem
}

.f29 {
    font-size: 2.9rem
}

.f30 {
    font-size: 3.0rem
}

.f31 {
    font-size: 3.1rem
}

.f32 {
    font-size: 3.2rem
}

.f33 {
    font-size: 3.3rem
}

.f34 {
    font-size: 3.4rem
}

.f35 {
    font-size: 3.5rem
}

.f36 {
    font-size: 3.6rem
}

.f37 {
    font-size: 3.7rem
}

.f38 {
    font-size: 3.8rem
}

.f39 {
    font-size: 3.9rem
}

.f40 {
    font-size: 4.0rem
}

.show,.block {
    display: block
}

.hide {
    display: none
}

.yahei {
    font-family: "Microsoft YaHei"
}

.songti {
    font-family: SimSun
}

.verdana {
    font-family: Verdana
}

.vm {
    vertical-align: middle
}

.m5 {
    margin: 0.5rem
}

.m10 {
    margin: 1.0rem
}

.m15 {
    margin: 1.5rem
}

.m20 {
    margin: 2.0rem
}

.m25 {
    margin: 2.5rem
}

.mt5 {
    margin-top: 0.5rem
}

.mr5 {
    margin-right: 0.5rem
}

.mb5 {
    margin-bottom: 0.5rem
}

.ml5 {
    margin-left: 0.5rem
}

.mt10 {
    margin-top: 1.0rem
}

.mr10 {
    margin-right: 1.0rem
}

.mb10 {
    margin-bottom: 1.0rem
}

.ml10 {
    margin-left: 1.0rem
}

.mt15 {
    margin-top: 1.5rem
}

.mr15 {
    margin-right: 1.5rem
}

.mb15 {
    margin-bottom: 1.5rem
}

.ml15 {
    margin-left: 1.5rem
}

.mt20 {
    margin-top: 2.0rem
}

.mr20 {
    margin-right: 2.0rem
}

.mb20 {
    margin-bottom: 2.0rem
}

.ml20 {
    margin-left: 2.0rem
}

.p5 {
    padding: 0.5rem
}

.p10 {
    padding: 1.0rem
}

.p15 {
    padding: 1.5rem
}

.p20 {
    padding: 2.0rem
}

.p25 {
    padding: 2.5rem
}

.pt5 {
    padding-top: 0.5rem
}

.pr5 {
    padding-right: 0.5rem
}

.pb5 {
    padding-bottom: 0.5rem
}

.pl5 {
    padding-left: 0.5rem
}

.pt10 {
    padding-top: 1.0rem
}

.pr10 {
    padding-right: 1.0rem
}

.pb10 {
    padding-bottom: 1.0rem
}

.pl10 {
    padding-left: 1.0rem
}

.pt15 {
    padding-top: 1.5rem
}

.pr15 {
    padding-right: 1.5rem
}

.pb15 {
    padding-bottom: 1.5rem
}

.pl15 {
    padding-left: 1.5rem
}

.pt20 {
    padding-top: 2.0rem
}

.pr20 {
    padding-right: 2.0rem
}

.pb20 {
    padding-bottom: 2.0rem
}

.pl20 {
    padding-left: 2.0rem
}

.lh1 {
    line-height: 1
}

.lh2 {
    line-height: 2
}

.lh3 {
    line-height: 3
}

.noborder {
    border: 0 none
}

.rel {
    position: relative
}

.abs {
    position: absolute
}

.clearfix:before,.clearfix:after {
    content: " ";
    display: table
}

.clearfix:after {
    clear: both
}

.ellipsis {
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap
}

.ui-mask {
    opacity: 0;
    background-color: rgba(0,0,0,0.7);
    z-index: 998;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    -webkit-transition: all ease 0.5s;
    transition: all ease 0.5s;
    z-index: -1
}

.ui-mask-on {
    opacity: 1;
    z-index: 998
}

.ui-cup {
    font-size: 3.2rem;
    border-radius: 0.5rem;
    background-color: rgba(0,0,0,0.8);
    width: 90%;
    padding: 1rem;
    box-shadow: 0 0 0.5rem rgba(0,0,0,0.4);
    position: fixed;
    top: 50%;
    left: 50%;
    min-height: 2rem;
    z-index: -1;
    color: #fff;
    opacity: 0;
    height: 90%;
    overflow: auto;
    box-sizing: padding-box;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    -webkit-transition: all ease 0.5s;
    transition: all ease 0.5s
}

.ui-cup-on {
    opacity: 1;
    z-index: 1000
}

.ui-confirm {
    font-size: 0.32rem;
    border-radius: 0.08rem;
    background-color: #fff;
    width: 70%;
    text-align: left;
    position: fixed;
    left: 50%;
    top: 45%;
    min-height: 0.2rem;
    z-index: -1;
    opacity: 0;
    overflow: auto;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    -webkit-transition: all ease 0.5s;
    transition: all ease 0.5s
}

.ui-confirm .txt {
    border-bottom: 0.01rem solid #ccc;
    padding: 0.4rem 0.15rem;
    color: #000;
    text-align: center;
    -ms-word-break: break-all;
    word-break: break-all;
    font-size: 0.27rem
}

.ui-confirm .ok {
    text-align: center;
    color: #12C287;
    line-height: 2.5
}

.ui-confirm-on {
    opacity: 1;
    z-index: 1000;
    top: 50%
}

.ui-prompt {
    font-size: 0.32rem;
    border-radius: 0.08rem;
    background-color: #fff;
    width: 70%;
    text-align: center;
    position: fixed;
    left: 50%;
    top: 45%;
    min-height: 0.2rem;
    z-index: -1;
    opacity: 0;
    overflow: auto;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    -webkit-transition: all ease 0.5s;
    transition: all ease 0.5s
}

.ui-prompt .tit {
    font-weight: bold;
    line-height: 2.5
}

.ui-prompt .txt {
    border-bottom: 0.01rem solid #ccc;
    padding: 0.2rem 0.15rem;
    color: #000;
    text-align: center;
    -ms-word-break: break-all;
    word-break: break-all
}

.ui-prompt .control div {
    width: 50%;
    color: #12C287;
    display: inline-block;
    vertical-align: middle;
    line-height: 2.5
}

.ui-prompt .cancel {
    border-right: 0.01rem solid #ccc;
    box-sizing: border-box
}

.ui-prompt-on {
    opacity: 1;
    z-index: 1000;
    top: 50%
}

.ui-toast {
    font-size: 2.8rem;
    border-radius: 0.5rem;
    background-color: rgba(0,0,0,0.8);
    max-width: 60%;
    padding: 2.5rem;
    box-shadow: 0 0 4rem rgba(0,0,0,0.4);
    position: fixed;
    left: 50%;
    top: 45%;
    min-height: 3.5rem;
    z-index: -1;
    color: #fff;
    text-align: center;
    box-sizing: padding-box;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    -webkit-transition: all ease 0.5s;
    transition: all ease 0.5s;
    opacity: 0;
    word-break: break-all;
    word-wrap: break-word
}

.ui-toast-on {
    opacity: 1;
    top: 50%;
    z-index: 1000
}

.ui-snackbar {
    font-size: 2.8rem;
    background-color: rgba(0,0,0,0.8);
    width: 100%;
    padding: 2rem 1.5rem;
    box-shadow: 0 0 0.5rem rgba(0,0,0,0.4);
    position: fixed;
    left: 0;
    top: -50%;
    min-height: 5rem;
    z-index: -1;
    color: #fff;
    box-sizing: border-box;
    -webkit-transition: all ease 0.5s;
    transition: all ease 0.5s
}

.ui-snackbar .action {
    margin-right: 6rem;
    word-break: break-all;
    word-wrap: break-word
}

.ui-snackbar .action-btn {
    color: #12C287;
    line-height: 3rem;
    overflow: hidden
}

.ui-snackbar-on {
    opacity: 1;
    top: 0;
    z-index: 1000
}

.ui-loading {
    z-index: -1;
    padding: 3rem 2rem;
    border-radius: 0.6rem;
    background-color: rgba(40,40,40,0);
    text-align: center;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    -webkit-transition: all ease 0.5s;
    transition: all ease 0.5s;
    position: fixed;
    left: 50%;
    top: 45%;
    color: #fff
}

.ui-loading>i {
    display: inline-block;
    width: 6rem;
    height: 6rem;
    margin-bottom: 1rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAABO1BMVEX///9aXFlbW1tdXV1fX19iZGFjY2NkYmVlZWWytLFra2ttbW1zc3N0dHRzdXJ0dnN6fHl7e3t8en18fnt9fX2CgoKChIGDg4OEhISEgoWEhoOFhYWLi4uMjouNjY309vOTk5OUlpOVlZWVl5SWlJezs7OanJmbm5udnZ2jo6OlpaWmpqarq6usqq2tra3z8/OytLGzs7O1tbW2tra6vLm8vLy8vru9vb2+vr6+vL/Dw8PEwsXExsPLy8vMzsvNzc3T09PU1tPV1dXb29vY3dfa3Nnc2t3c3Nzd3d3j4+Pi5OHk5OTl5eXr6+vq7Ons6u3t7e3z8/P19fX09vP29vb7+/v6/Pn7/fr8/Pz9/f36//n7//r8/vv9//z+/P/+/v76//n7/fr7//r8/Pz8/vv9/f39//z+/P/+/v4BUWsqAAAAYHRSTlMABQUHCQ4OEBAUFxohISMjKiosLCwxMzMzNjY2PT8/REZJSUtLS1BQUllbW2JlZWVsbG5udXV3d3d6foGBiIqKkZOTmJqampqaoaSkpKutra20trm5vcDAwMDCwsLCwsKegJjAAAABjElEQVQYGe3B6VbTUBgF0CNIxJTZIUoRAWW0IIOKAhUZChShFGurn34pRc5F3v8JLGth4w+arpvIL7I3wo2/fn4fMeyKob+DyPqUddUBRDXKc/L890vYWPtWeIErfcq66gAsHCqp07iSU1J3YGFYWFfBXwtfS/MIbH3pQripM5KniiZEMgjXLaS5+IwmhpfQyrJSvruI4WFmGrdTKt2OONbFyAyim1CS6sJC96cpBD7y0iQsHBhpQ8MbkqeahoW3UkSgo0JqAVZc/Kszu7eIRCIOZ1P2exBDgWQFUawczwF4oCR1DPaeyJmkgP4TkjoCe0+r9F0ABz5ZQhSzG6O4tHqUdZBI/A9jcx7iyCklAxszhTUEepU0ZVjoF+osGh5rrfbrJywMCfkBgVKt9mMbNvJ+5R4CnVvF97DjIHFz3mnRQzOvllNoIaM0ZTSRPTHluwi3SxrxcD0lOYJwiz6NOLheTqkuWsipTKLh0V7eQ2BlPY2W7iDgiDHiILoh1j1DdI6S2oEYBvfzHm7WH90WVaa3GYffAAAAAElFTkSuQmCC) no-repeat;
    background-size: 100%;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    -webkit-animation: ani-rotate 1.2s infinite ease;
    animation: ani-rotate 1.2s infinite ease
}

.ui-loading>p {
    font-size: 2.8rem
}

.ui-loading-on {
    top: 50%;
    z-index: 999;
    background-color: rgba(40,40,40,0.75)
}

.ui-preloading {
    text-align: center;
    background: #c7f2fc;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    -webkit-transition: all ease 0.5s;
    transition: all ease 0.5s
}

.ui-preloading .ui-preloading-inner {
    width: 0.8rem;
    height: 0.16rem;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -0.08rem 0 0 -0.4rem
}

.ui-preloading i {
    display: inline-block;
    width: 0.16rem;
    height: 0.16rem;
    background: #12C287;
    border-radius: 100%;
    -webkit-animation: ani-preloading 1.4s infinite ease-in-out;
    animation: ani-preloading 1.4s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    margin: 0 0.03rem
}

.ui-preloading i.i1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s
}

.ui-preloading i.i2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s
}

.ui-preloading-fade {
    opacity: 0
}

@-webkit-keyframes ani-preloading {
    0% {
        -webkit-transform: scale(0);
        transform: scale(0)
    }

    100% {
        -webkit-transform: scale(1);
        transform: scale(1)
    }
}

@keyframes ani-preloading {
    0% {
        -webkit-transform: scale(0);
        transform: scale(0)
    }

    100% {
        -webkit-transform: scale(1);
        transform: scale(1)
    }
}

@-webkit-keyframes ani-rotate {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg)
    }

    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg)
    }
}

@keyframes ani-rotate {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg)
    }

    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg)
    }
}

html {
    background: #fff;
    color: #000;
    font-size: 62.5%;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    min-height: 100%
}

body {
    font-size: 2.4rem;
    line-height: 1.5;
    font-family: microsoft yahei;
    min-height: 100%
}

</style>
