/*
 * weixin share
 * @Date: 2019-08-23 16:11:00
 * @Last Modified by: xuzhiwen
 */

export default {
    init(shareConfig = {}) {
        shareConfig = Object.assign({}, shareConfig);

        let {
            link,
            url,
            title,
            desc,
            description,
            imgUrl,
            imageUrl,
            logoUrl,
            imgTitle,
            miniProgramId,
            miniProgramPath,
            isSharePicture,

            trigger,
            success,
            cancel,
            fail,

        } = shareConfig;

        return new Promise((resolve, reject) => {
            if (_global.device.weixin) {
                let _evt = () => {
                    //填充分享数据
                    let _unitReady = function () {
                        let shareData = $.extend({}, {
                            title: title || document.title,
                            desc: desc || description || '默认描述',
                            link: link || url,
                            imgUrl: imgUrl || imageUrl || logoUrl || imgTitle,
                            trigger,
                            success,
                            cancel,
                            fail,
                        });
                        wx.onMenuShareAppMessage(shareData);
                        wx.onMenuShareTimeline(shareData);
                        wx.onMenuShareQQ(shareData);
                        wx.onMenuShareWeibo(shareData);
                    }

                    //获取签名，仅获取一次
                    let _unitGetSign = function () {
                        return new Promise((resolve, reject) => {
                            $.ajax({
                                type: 'POST',
                                url: 'xxx.com/open/common/WeiXinScreen/getWeiXinSign.json',
                                dataType: 'json',
                                data: {
                                    url: location.href
                                }
                            }).done(ret => {
                                let res = {}
                                if (ret.appid) {
                                    res = ret
                                } else {
                                    res = ret.value
                                }
                                wx.signatureDone = true
                                wx.config({
                                    debug: false, // 留一个开关来启用调试模式
                                    appId: res.appid,
                                    timestamp: res.timestamp,
                                    nonceStr: res.noncestr,
                                    signature: res.signature,
                                    jsApiList: 'checkJsApi;onMenuShareTimeline;onMenuShareAppMessage;onMenuShareQQ;onMenuShareWeibo;hideMenuItems;showMenuItems;hideAllNonBaseMenuItem;showAllNonBaseMenuItem;previewImage;chooseImage;uploadImage;downloadImage;startRecord;stopRecord;onVoiceRecordEnd;playVoice;stopVoice;onVoicePlayEnd;uploadVoice;downloadVoice;addCard;chooseCard;openCard;openLocation;getLocation;chooseWXPay'.split(';')
                                });
                                wx.ready(function () {
                                    resolve(res);
                                })
                            }).fail(info => {
                                reject(info)
                            })
                        });
                    }

                    if (wx.signatureDone) {
                        _unitReady();
                    } else {
                        _unitGetSign().then(res => {
                            _unitReady();
                        })
                    }
                }
                if (!window.wx) {
                    _global.use('jssdk', function () {
                        _evt()
                    });
                } else {
                    _evt();
                }
            } else if (_global.device.app) {
                resolve(true);
            }
        });
    },
}
