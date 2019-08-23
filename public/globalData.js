/*! 共用util
 * xuzhiwen
 * v: 1.1
 * d: 2019-08-22
 */

var _ua = navigator.userAgent.toLowerCase();

var _util = window._util || {}; //简单通用方法
var _global = window._global || {}; //外部暴露

_util = {
    type: null,
    url: {},
    array: {},
    localStorage: {},
    unicode: {},
    string: {},
    file: {}
};

//get/check object type
_util.type = function (o, wish) {
    var tp = Object.prototype.toString.call(o).toLowerCase();
    if (arguments.length == 2) {
        return tp === '[object ' + wish.toLowerCase() + ']';
    } else {
        return tp.replace('[object ', '').replace(']', '');
    }
};

//url:http://m.xxx.com?source=weixin&man=xulessreigns
_util.url = {
    parse: function (url) {
        try {
            var a = document.createElement('a');
            a.href = url;
            return {
                hash: a.hash,
                host: a.host || location.host,
                hostname: a.hostname || location.hostname,
                href: a.href,
                origin: a.origin,
                pathname: a.pathname.charAt(0) != '/' ? '/' + a.pathname : a.pathname,
                port: ('0' === a.port || '' === a.port) ? this._port(a.protocol) : a.port,
                protocol: !a.protocol || ':' == a.protocol ? location.protocol : a.protocol,
                search: a.search || ''
            };
        } catch (e) {
            //mini program
            var hash = url.slice(url.lastIndexOf('#') > -1 ? url.lastIndexOf('#') : url.length) || '';
            var tmp = url.replace(hash, '');
            var search = tmp.slice(tmp.lastIndexOf('?') > -1 ? tmp.lastIndexOf('?') : tmp.length) || '';
            return {
                href: url,
                hash: hash,
                search: search
            }
        }
    },
    get: function (url, key) {
        if (arguments.length == 1) {
            key = url;
            url = location.href;
        } else if (arguments.length == 0) {
            console.log('arguments can not be null')
            return ''
        }
        var searchObj = this.search(url);
        return searchObj[key] || ''
    },
    set: function (url, key, value) {
        if (!key) {
            console.log('key can not be null');
            return url;
        }
        var searchObj = this.search(url) || '';
        if (value === '' || value === null) {
            delete searchObj[key];
        } else {
            var obj = {}
            obj[key] = value;
            searchObj = $.extend({}, searchObj, obj);
        }

        var res = Object.keys(searchObj).reduce(function (arr, item, idx) {
            arr.push(item + '=' + searchObj[item]);
            return arr;
        }, []).join('&');

        var hash = this.parse(url).hash;
        var tmp = url.replace(hash, '');
        var askIdx = tmp.indexOf('?');

        askIdx = askIdx > -1 ? askIdx : tmp.length

        var left = url.slice(0, askIdx);
        var mid = res ? '?' + res : '';
        var right = hash;

        return left + mid + right;
    },
    del: function (url, key) {
        return this.set(url, key, null)
    },
    search: function (url) {
        var search = this.parse(url).search.replace('?', '');
        if (!search) {
            return {};
        } else {
            var searchArr = search.split('&') || [];
            return searchArr.reduce(function (obj, item, idx) {
                var k = item.split('=')[0];
                var v = item.split('=')[1];
                k && (obj[k] = v || '');
                return obj;
            }, {})
        }
    },
    _port: function (protocol) {
        switch (protocol) {
            case 'http:':
                return 80;
            case 'https:':
                return 443;
            default:
                return location.port;
        }
    }
};

//文件载入
_util.file = {
    load: function (url, cb) {
        // url = url.toLowerCase();
        if (url.indexOf('.css') > -1) {
            $("head").append("<link rel='stylesheet' type='text/css' href='" + url + "'>");
            cb && cb();
        } else if (url.indexOf('.js') > -1) {
            //zepto $.ajax dataType:script occur script cross domain bug, zepto is shit
            var dfr = $.ajax({
                cache: true, //must be true
                //crossDomain: true, jquery has a auto check
                type: 'GET',
                async: false,
                url: url,
                dataType: 'script'
            });
            if (cb) {
                dfr.done(function (res) {
                    cb(res);
                });
            } else {
                return dfr;
            }
        }
    }
};

_util.array = {
    unique: function (arr) {
        if (arr.length) {
            //数组去重
            var res = [];
            var json = {};
            for (var i = 0; i < arr.length; i++) {
                if (!json[arr[i]]) {
                    res.push(arr[i]);
                    json[arr[i]] = 1;
                }
            }
            return res;
        }
        return arr;
    },
    uniqueObject: function (array) {
        if (array.length) {
            //对象数组去重
            var re = [],
                i, l;
            for (i = 0, l = array.length; i < l; i++) {
                if (typeof array[i]._uniqObjects === "undefined") {
                    //添加标签
                    array[i]._uniqObjects = 1;
                    re.push(array[i]);
                }
            }
            //取出标签
            for (i = 0, l = re.length; i < l; i++) {
                delete re[i]._uniqObjects;
            }
            return re;
        }

        //适合简单对象去重
        //var x = { z: 1 };
        //var y = { q: 2 };
        //uniqObjects([x, y, x]);
    },
    //获取两个数据的交集
    //must already be sorted
    cros: function (a, b) {
        var ai = 0,
            bi = 0;
        var result = [];
        while (ai < a.length && bi < b.length) {
            if (a[ai] < b[bi]) {
                ai++;
            } else if (a[ai] > b[bi]) {
                bi++;
            } else {
                result.push(a[ai]);
                ai++;
                bi++;
            }
        }
        return result;
    },
    diff: function (a1, a2) {
        var a = [];
        var dif = [];

        for (var m = 0; m < a1.length; m++) {
            a[a1[m]] = true;
        }

        for (var i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]];
            } else {
                a[a2[i]] = true;
            }
        }

        for (var k in a) {
            dif.push(k);
        }

        return dif;
    }
};

_util.localStorage = {
    ok: window.localStorage,
    set: function (k, v) {
        this.ok && window.localStorage.setItem(k, v);
    },
    get: function (k) {
        return (this.ok && window.localStorage.getItem(k)) || null;
    },
    remove: function (k) {
        this.ok && window.localStorage.removeItem(k);
    },
    clear: function () {
        this.ok && window.localStorage.clear();
    },
    cache: function (lsName, expday, dfr, cb) {
        var ckn = lsName + "_deadline"; //localStorage expire flag cookie

        if (typeof dfr !== 'function') {
            return;
        }

        if (!_global.cookie.get(ckn)) {
            _util.localStorage.remove(lsName);
            _global.cookie.set(ckn, '1', expday || 1);
        }

        var _don = function (mydfr) {
            mydfr.done(function (data) {
                cb(data);
                if (data) {
                    try {
                        if (typeof data === 'object') {
                            _util.localStorage.set(lsName, JSON.stringify(data));
                        }
                    } catch (e) {
                        console.log('cache data must be type of object!');
                    }
                }
            });
        };

        var _get = function () {
            var mydfr = dfr();

            var doneExt = mydfr.doneExt;
            if (typeof doneExt !== 'undefined') {
                mydfr.doneExt(function () {
                    _don(mydfr);
                });
            } else {
                _don(mydfr);
            }

        };

        if (this.ok && _util.localStorage.get(lsName)) {
            var data = _util.localStorage.get(lsName);
            try {
                cb(JSON.parse(data));
            } catch (e) {
                _get();
            }
        } else {
            _get();
        }

    }
};

_util.unicode = {
    to: function (v) {
        return escape(v).replace(/%/g, "\\").toLowerCase();
    },
    un: function (v) {
        return unescape(v.replace(/\\/g, "%"));
    }
};

_util.string = {
    //半角转换为全角函数
    toDBC: function (v) {
        var tmp = "";
        for (var i = 0; i < v.length; i++) {
            if (v.charCodeAt(i) == 32) {
                tmp = tmp + String.fromCharCode(12288);
            }
            if (v.charCodeAt(i) < 127) {
                tmp = tmp + String.fromCharCode(v.charCodeAt(i) + 65248);
            }
        }
        return tmp;
    },
    //全角转换为半角函数
    toCDB: function (v) {
        var tmp = "";
        for (var i = 0; i < v.length; i++) {
            if (v.charCodeAt(i) > 65248 && v.charCodeAt(i) < 65375) {
                tmp += String.fromCharCode(v.charCodeAt(i) - 65248);
            } else {
                tmp += String.fromCharCode(v.charCodeAt(i));
            }
        }
        return tmp;
    },
    //字符串全过滤
    //v: 字符
    //tag: 要过滤的文本/标签
    //ntag: 替换成
    replaceAll: function (v, tag, ntag) {
        if (v) {
            var str = v;
            try {
                str = v.replace(new RegExp(tag, 'g'), ntag);
            } catch (e) {

            }
            return str;
        }
        return '';
    },
    //v: 字符
    //tag: 要过滤的文本/标签
    //ntag: 替换成
    //abs：强制最后一个字符 暂搁置
    //替换最后一个字符，从右往左依次查找
    replaceLast: function (v, tag, ntag) {
        tag = tag || ' ';
        ntag = ntag || '';
        return v.replace(new RegExp((tag || ' ') + '$', 'gi'), ntag);
    },
    GUID: function () {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
};

_global = {
    config: {
        version: '1.0.0',
        lang: 'zh-cn',
        charset: 'utf-8'
    },
    domain: {
        m: 'https://m.zhongan.com',
        u: '//u.zhongan.com', //user center
        cdn: '//static.zhongan.com',
        buy: '//buy.zhongan.com',
        pay: '//pay.zhongan.com',
        manager: '//manager.zhongan.com',
        api: '//api.zhongan.com',
        wapi: '//wapi.zhongan.com',
        weixinapi: '//weixinapi.zhongan.com'
    },
    site: {},
    page: {},
    cdn: {},
    cookie: {},
    user: {},
    regex: {},
    regexForm: {},
    date: {},
    device: {},
    ui: {},
    alias: {},
    use: null
};

_global.site = {
    hotline: '400-999-9595',
    libsPath: _global.domain.cdn + '/website/assets/libs', //默认 80 端口
    pkg: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.zhongan.insurance&ckey=CK1335902438472'
};

_global.page = {
    modern: function (i) {
        //modern way
        (function (e, d, a) {
            a = a || 750;
            var f = d.screen.width / a / d.devicePixelRatio;
            e.querySelector("meta[name=viewport]").setAttribute("content", "width=" + a + ",user-scalable=no,initial-scale=" + f);
            var g = e.documentElement;
            var c = "orientationchange" in window ? "orientationchange" : "resize";
            //ie8 not addEventListener
            var b = d.setRootRem; //check your page embed script setRootRem
            b();
            d.addEventListener(c, b, false);
            e.addEventListener("DOMContentLoaded", b, false)
            e.querySelector("body").dataset.mode = "modern";
        })(document, window, i);
    },
    original: function (g) {
        // original way
        (function (e, d, f) {
            var c = "orientationchange" in window ? "orientationchange" : "resize";
            e.querySelector("meta[name=viewport]").setAttribute("content", "width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0");
            e.documentElement.style.fontSize = f || '62.5%';
            var b = d.setRootRem; //check your page embed script setRootRem
            d.removeEventListener(c, b, false);
            e.removeEventListener("DOMContentLoaded", b, false)
            e.querySelector("body").dataset.mode = "original";
        })(document, window, g);
    },
    download: function () {},
    init: function () {

    }
}

_global.regex = {
    idcard: "(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)",
    qq: "^[1-9]*[1-9][0-9]*$",
    email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$",
    mobile: "^(11|12|13|14|15|16|17|18|19)[0-9]{9}$",
    tel: "^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{3,}))?$"
};

_global.regexForm = {
    empty: function (v) {
        var nv = _util.string.replaceAll(v, ' ', '');
        if (nv)
            return false;
        return true;
    },
    idcard: function (v) {
        var nv = _util.string.replaceAll(v, ' ', '');
        if (nv && nv.match(_global.regex.idcard)) {
            return true;
        }
        return false;
    },
    qq: function (v) {
        var nv = _util.string.replaceAll(v, ' ', '');
        if (nv && nv.match(_global.regex.qq)) {
            return true;
        }
        return false;
    },
    email: function (v) {
        var nv = _util.string.replaceAll(v, ' ', '');
        if (nv && nv.match(_global.regex.email)) {
            return true;
        }
        return false;
    },
    mobile: function (v) {
        var nv = _util.string.replaceAll(v, ' ', '');
        if (nv && nv.match(_global.regex.mobile)) {
            return true;
        }
        return false;
    },
    tel: function (v) {
        var nv = _util.string.replaceAll(v, ' ', '');
        if (nv && nv.match(_global.regex.tel)) {
            return true;
        }
        return false;
    }
};

_global.date = {
    now: function (d) {
        //格式化or返回新日期
        if (d) {
            d = d.replace(/\//g, '-');
            return d.split('-').reduce(function (prev, cur, idx, arr) {
                if (idx !== 0) {
                    cur = parseInt(cur) > 9 ? cur : '0' + cur;
                }
                return prev + '-' + cur;
            });
        } else {
            var nw = new Date();
            var nwy = nw.getFullYear();
            var nwm = nw.getMonth() + 1 > 9 ? nw.getMonth() + 1 : '0' + (nw.getMonth() + 1);
            var nwd = nw.getDate() > 9 ? nw.getDate() : '0' + nw.getDate();
            return nwy + '-' + nwm + '-' + nwd;
        }
    },
    nextYear: function (d, num) {
        //年数加减
        var myd = d,
            myn = num;
        if (arguments.length === 0) {
            myd = this.now();
            myn = 1;
        } else if (arguments.length === 1) {
            if (typeof d === 'number') {
                myd = this.now();
                myn = d;
            } else {
                myd = d;
                myn = 1;
            }
        }

        var temp = new Date(new Date(myd).setFullYear(new Date(myd).getFullYear() + myn));
        var yt = temp.getFullYear();
        var mt = temp.getMonth() + 1;
        var dt = temp.getDate();
        return this.now(yt + "-" + mt + "-" + dt);
    },
    nextMonth: function (d, num) {
        //月份加减
        var myd = d,
            myn = num;
        if (arguments.length === 0) {
            myd = this.now();
            myn = 1;
        } else if (arguments.length === 1) {
            if (typeof d === 'number') {
                myd = this.now();
                myn = d;
            } else {
                myd = d;
                myn = 1;
            }
        }

        var temp = new Date(new Date(myd).setMonth(new Date(myd).getMonth() + myn));
        var yt = temp.getFullYear();
        var mt = temp.getMonth() + 1;
        var dt = temp.getDate();
        return this.now(yt + "-" + mt + "-" + dt);
    },
    nextDate: function (d, num) {
        //天数加减
        var myd = d,
            myn = num;
        if (arguments.length === 0) {
            myd = this.now();
            myn = 1;
        } else if (arguments.length === 1) {
            if (typeof d === 'number') {
                myd = this.now();
                myn = d;
            } else {
                myd = d;
                myn = 1;
            }
        }

        var temp = new Date(new Date(myd).setDate(new Date(myd).getDate() + myn));
        var yt = temp.getFullYear();
        var mt = temp.getMonth() + 1;
        var dt = temp.getDate();
        return this.now(yt + "-" + mt + "-" + dt);
    },
    nextHour: function (d, num) {
        //时间加减
        var myd = d,
            myn = num;
        if (arguments.length === 0) {
            myd = this.now();
            myn = 1;
        } else if (arguments.length === 1) {
            if (typeof d === 'number') {
                myd = this.now();
                myn = d;
            } else {
                myd = d;
                myn = 1;
            }
        }

        var temp = new Date(new Date(myd).setHours(new Date(myd).getHours() + myn));
        var yt = temp.getFullYear();
        var mt = temp.getMonth() + 1;
        var dt = temp.getDate();
        return this.now(yt + "-" + mt + "-" + dt);
    },
    birthday: function (idcard) {
        var birthdayno;
        if (idcard.length == 18) {
            birthdayno = idcard.substring(6, 14);
        } else if (idcard.length == 15) {
            birthdayno = "19" + idcard.substring(6, 12);
        } else {
            return '';
        }
        return birthdayno.substring(0, 4) + "-" + birthdayno.substring(4, 6) + "-" + birthdayno.substring(6, 8);
    },
    age: function (idcard) {
        var birday = new Date(this.birthday(idcard).replace(/-/g, "/"));
        var d = new Date();
        var edge = (birday.getMonth() < d.getMonth() || (birday.getMonth() === d.getMonth() && birday.getDate() < d.getDate())) ? 1 : 0;
        var age = d.getFullYear() - birday.getFullYear() - edge;
        return parseInt(age);
    },
    sex: function (idcard) {
        var sexno;
        if (idcard.length == 18) {
            sexno = idcard.substring(16, 17);
        } else if (idcard.length == 15) {
            sexno = idcard.substring(14, 15);
        } else {
            return 'F';
        }
        return parseInt(sexno) % 2 === 0 ? 'F' : 'M';
    }
};

_global.device = {
    weixin: _ua.match(/micromessenger/i) == 'micromessenger',
    app: _ua.match(/zhonganwebview/i) == 'zhonganwebview',
    ipad: _ua.match(/ipad/i) == 'ipad',
    iphone: _ua.match(/iphone os/i) == "iphone os",
    android: _ua.match(/android/i) == "android",
    wc: _ua.match(/windows ce/i) == "windows ce",
    wm: _ua.match(/windows mobile/i) == "windows mobile",
    wp: _ua.match(/windows phone/i) == "windows phone",
    webos: _ua.match(/webos/i) == "webos",
    blackberry: _ua.match(/blackberry/i) == "blackberry",
    uc: _ua.match(/ucweb/i) == 'ucweb' || _ua.match(/ucbrowser/i) == 'ucbrowser',
    pc: function () {
        return !(this.ipad || this.iphone || this.android || this.wc || this.wm || this.wp || this.webos || this.blackberry || this.uc || this.weixin); //检测PC
    }
};

_global.alias = {
    'jssdk': 'https://res.wx.qq.com/open/js/jweixin-1.3.2.js',
    //plugins
    'vconsole': _global.site.libsPath + '/plugins/vConsole/vconsole.min.js',
    'requirejs': _global.site.libsPath + '/plugins/requirejs/require.min.js',
    'lodash': _global.site.libsPath + '/plugins/lodash/lodash.core.min.js',
    'underscore': _global.site.libsPath + '/plugins/underscore/underscore-min.js',
    'iscroll': _global.site.libsPath + '/plugins/iscroll/iscroll.js',
    'iscroll-lite': _global.site.libsPath + '/plugins/iscroll/iscroll-lite.js',
    'swiper': _global.site.libsPath + '/plugins/swiper/swiper.min.js',
    'touchswipe': _global.site.libsPath + '/plugins/jquery.touchswipe/jquery.touchswipe.min.js',
    'unveil': _global.site.libsPath + '/plugins/unveil/jquery.unveil.js',
    'barrager': _global.site.libsPath + '/plugins/barrager/jquery.barrager.min.js',
    'danmu': _global.site.libsPath + '/plugins/danmu/danmu.min.js',
    'clipboard': _global.site.libsPath + '/plugins/clipboard/clipboard.min.js',
    'odometer': _global.site.libsPath + '/plugins/odometer/odometer.min.js',
    'datepicker': _global.site.libsPath + '/plugins/datepicker/datepicker.min.js',
    'lottery': _global.site.libsPath + '/plugins/lottery/lottery.min.js',
    'eraser': _global.site.libsPath + '/plugins/eraser/jquery.eraser.min.js',
    'fullpage': _global.site.libsPath + '/plugins/fullpage/jquery.fullpage.min.js',
    'chinesetopinyin': _global.site.libsPath + '/plugins/chinesetopinyin/chinesetopinyin.min.js',
    'qrcode': _global.site.libsPath + '/plugins/qrcode/jquery.qrcode.min.js',
    'lazyload': _global.site.libsPath + '/plugins/lazyload/jquery.lazyload.min.js',
    'html2canvas': _global.site.libsPath + '/plugins/html2canvas/html2canvas.min.js',
    //biz
    'ilog': _global.domain.cdn + '/website/public/js/ilog/dist/ilog.min.js',
    'tongji': _global.site.libsPath + '/biz/tongji/tongji.min.js', //百度 google 统计
    'bridge': _global.site.libsPath + '/biz/bridge/bridge.min.js',
    'share': _global.site.libsPath + '/biz/share/share.min.js'
};

_global.ui = {
    mask: {
        show: function (cb) {
            var pui = $('.ui-mask');
            if (!pui.get(0)) {
                $('body').append("<div class='ui-mask'></div>");
                pui = $('.ui-mask');
            }
            pui.addClass('ui-mask-on');
            cb && cb(pui);
        },
        hide: function (cb) {
            var pui = $('.ui-mask');
            pui.removeClass('ui-mask-on');
            cb && cb(pui);
        }
    },
    toast: function (s, time, cb) {
        var pui = $('.ui-toast');
        if (!pui.get(0)) {
            $('body').append("<div class='ui-toast'></div>");
            pui = $('.ui-toast');
        }
        pui.addClass('ui-toast-on').html(s);
        time = time || 2000;
        //点击关闭
        pui.off("click").on('click', function () {
            pui.removeClass('ui-toast-on');
            cb && cb(pui);
        });
        setTimeout(function () {
            pui.trigger('click');
        }, time);
    },
    snackbar: function (s, actxt, time) {
        if (typeof actxt !== 'undefined') {
            if (!isNaN(actxt)) {
                //是数字
                time = actxt;
                actxt = '';
            }
        }

        (typeof time === 'undefined') && (time = 1500);

        var pui = $('.ui-snackbar');
        if (!pui.get(0)) {
            $('body').append("<div class='ui-snackbar'>" + (actxt ? "<span class='action-btn fr'>" + actxt + "</span>" : "") + "<div class=' " + (actxt ? "action" : "") + " txt'></div></div>");
            pui = $('.ui-snackbar');
        }
        pui.find('.txt').html(s);
        setTimeout(function () {
            pui.addClass('ui-snackbar-on');
        }, 100);

        //点击关闭
        if (actxt) {
            pui.find('.action-btn').on('click', function () {
                pui.removeClass('ui-snackbar-on');
            });
            if (time && typeof time === 'function') {
                time && time();
            }
        } else {
            pui.off("click").on('click', function () {
                pui.removeClass('ui-snackbar-on');
            });
            setTimeout(function () {
                pui.trigger('click');
            }, time);
        }
    },
    cup: function (s, time, cb) {
        var pui = $('.ui-cup');
        if (!pui.get(0)) {
            $('body').append("<div class='ui-cup'></div>");
            pui = $('.ui-cup');
        }
        pui.addClass('ui-cup-on').html(s);
        cb && cb(pui);
        time = time || 60000;
        //点击关闭
        pui.off("click").on('click', function () {
            pui.removeClass('ui-cup-on');
        });
        setTimeout(function () {
            pui.trigger('click');
        }, time);
    },
    confirm: function (s, cfg, cb) {
        var pui = $('.ui-confirm');
        if (arguments.length == 2) {
            cb = cfg;
        } else if (arguments.length == 1) {
            cfg = {};
            cb = {};
        }
        _global.ui.mask.show(function () {
            $('.ui-confirm').remove();
            $('body').append("<div class='ui-confirm'><div class='txt'></div><div class='ok'>" + (cfg.okText || cb.okText || '我知道了') + "</div></div>");
            pui = $('.ui-confirm');
            pui.addClass('ui-confirm-on');
            pui.find('.txt').html(s);

            //点击关闭
            pui.find('.ok').off("click").on('click', function () {
                pui.removeClass('ui-confirm-on');
                _global.ui.mask.hide(); //隐藏mask
                cb && (typeof cb === 'function') && cb(pui);
            });
        });
    },
    prompt: function (s, cfg, cb) {
        var pui = $('.ui-prompt');
        if (arguments.length == 2) {
            cb = cfg;
        }
        // cfg.titleText = '提示信息'
        // cfg.cancelText = '取消'
        // cfg.okText = '确定'
        _global.ui.mask.show(function () {
            $('.ui-confirm').remove();
            $('body').append("<div class='ui-prompt'><div class='tit'>" + (cfg.titleText || '提示信息') + "</div><div class='txt'></div><div class='control'><div class='cancel'>" + (cfg.cancelText || '取消') + "</div><div class='ok'>" + (cfg.okText || '确定') + "</div></div></div>");
            pui = $('.ui-prompt');
            pui.addClass('ui-prompt-on');
            pui.find('.txt').html(s);

            //点击ok，cancel
            pui.find('.ok,.cancel').off("click").on('click', function () {
                pui.removeClass('ui-prompt-on');
                _global.ui.mask.hide(); //隐藏mask
                cb && (typeof cb === 'function') && cb($(this).hasClass('ok'));
            });
        });
    },
    loading: {
        show: function (s, time, cb) {
            var pui = $('.ui-loading');
            if (!pui.get(0)) {
                $('body').append("<div class='ui-loading'><i></i><p>" + (s || '载入中...') + "</p></div>");
                pui = $('.ui-loading');
            } else {
                pui.find('p').html(s);
            }
            pui.addClass('ui-loading-on');
            time = time || 2000;
            //点击关闭
            setTimeout(function () {
                pui.removeClass('ui-loading-on');
                cb && cb(pui);
            }, time);
        },
        hide: function (cb) {
            $('.ui-loading').removeClass('ui-loading-on');
            cb && cb();
        }
    },
    preloading: function (timer, cb) {
        if (typeof arguments[0] === 'function') {
            cb = timer;
            timer = null;
        }
        var uip = $('.ui-preloading');
        if (!uip.get(0)) {
            $('body').append("<div class='ui-preloading'><div class='ui-preloading-inner'><i class='i1'></i><i class='i2'></i><i class='i3'></i></div></div>");
            uip = $('.ui-preloading');
            setTimeout(function () {
                uip.addClass('ui-preloading-fade'); //ui隐藏
                cb && cb();
                setTimeout(function () {
                    uip.remove(); //ui移除
                }, 500);
            }, timer || 3000);
        }
    },
    tab: function (node, cb) {
        var nd = $('#' + node);
        if (!nd.get(0)) {
            nd = $('.' + node);
        }
        var tabEvent = nd.attr('data-event') === 'hover' ? 'mouseenter' : 'click';
        if (nd.get(0)) {
            nd.children('.hd').on(tabEvent, 'li', function () {
                var o = $(this);
                var op = o.parents('.hd');
                var os = o.siblings('li');
                var index = o.index();

                os.removeClass('on');
                o.addClass('on');

                var items = op.siblings('.bd').children('.item');
                items.hide();
                items.eq(index).show();

                var otab = op.parent();

                cb && cb(index, otab);

            });
        }
    },
    cdn: {
        /*css添加版本号，用于CDN css调试*/
        clear: function (ver) {
            var o = $('head').find('link[rel=stylesheet]');
            var v = (ver === undefined) ? Math.random() : ver;
            for (var i = 0; i < o.length; i++) {
                var oo = o[i];
                var oos = oo.getAttribute('href').split('?')[0];
                oo.setAttribute('href', oos + '?v=' + v);
            }
        }
    }
};

//cookie api
_global.cookie = {
    getDomain: function () {
        var hostname = location.hostname
        //zuifuli.com
        if (hostname.split('.').length == 1) {
            //一级域名，直接访问
            return hostname
        }

        // 192.168.32.251
        var lastDot = hostname.lastIndexOf('.')
        var block = hostname.slice(lastDot + 1)
        if (!isNaN(block)) {
            //数字，则为IP地址
            return hostname
        }

        //a.b.c.zuifuli.com
        var lastDomainDot = hostname.lastIndexOf('.', lastDot - 1)
        return hostname.slice(lastDomainDot + 1)

    },
    set: function (k, v, day) {
        day = (arguments.length === 3) ? day : 7;
        try {
            v = encodeURIComponent(v);
        } catch (ex) {
            v = escape(v); //fix unknown bug
        }
        $.cookie(k, v, {
            expires: day,
            path: '/',
            domain: this.getDomain()
        });
    },
    get: function (k) {
        var ck = $.cookie(k),
            v;
        if (ck) {
            try {
                v = decodeURIComponent(ck);
            } catch (ex) {
                v = unescape(ck);
            }
            return v;
        }
        return null;
    },
    del: function (k) {
        var ck = _global.cookie.get(k);
        if (ck) {
            $.cookie(k, '', {
                expires: -1,
                path: '/',
                domain: this.getDomain()
            });
        }
    },
    //清除所有cooke
    clear: function () {
        var self = this;
        var cks = $.cookie();
        Object.keys(cks).forEach(function (item) {
            self.del(item)
        });
    }
};

//统一线上
_global.user = {
    _key: 'zaLoginCookieKey',
    name: '', //username
    init: function (cb) {

    },
    logout: function (cb) {

    }
};

//load modules
_global.use = function (arr, cb) {
    arr = _util.type(arr, 'string') ? [arr] : arr;
    var _arr = arr.map(function (src) {
        return _util.file.load(src.indexOf('.js') > -1 ? src : _global.alias[src.toLowerCase()], null);
    });
    _arr.push($.Deferred(function (def) {
        $(def.resolve);
    }));
    $.when.apply($, _arr).done(function () {
        cb && cb(arr);
    });
};

$(function () {
    var hostname = location.hostname
    if (hostname.indexOf('localhost:') > -1 || hostname.indexOf('127.0.') > -1 || hostname.indexOf('192.168.') > -1 || hostname.indexOf('0.0.0.0') > -1) {

    } else {
        _global.use('tongji');
    }
    _global.user.init();
    _global.page.init()
});