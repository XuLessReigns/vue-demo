// 支持ie8+
const ATTR_NAME = 'data-ilog';
const ATTR_BINDED = 'ilogbinded';
const location = window.location;

const getInnerText = element => {
    return (typeof element.textContent === 'string') ? element.textContent : element.innerText;
};

let pushAsm = obj => {
    console.log('发送埋点：埋点信息====', obj)
};
let pushData = () => {
    console.log('发送pv：信息====', obj)
};
const bind = function(e) {
    let target = this;
    let asm = target.getAttribute(ATTR_NAME);
    let isBinded = target.getAttribute(ATTR_BINDED);
    if (asm && isBinded === null) {
        let href = encodeURIComponent(location.href);
        let txt = getInnerText(target) + '';
        txt = txt.trim();
        pushAsm({ href, txt, asm });
    }
    e.stopPropagation();
    return false;
};
export default {
    install(Vue) {
        Vue.directive('ilog', {
            bind(el, binding) {
                el.setAttribute('data-ilog', binding.value);
                el.addEventListener('click', bind, false);
            },
            update(el, binding) {
                el.setAttribute('data-ilog', binding.value);
            },
            unbind(el) {
                el.removeEventListener('click', bind, false);
            }
        });
    },
    pushAsm(data) {
        pushAsm(data);
    },
    pushData() {
        pushData();
    }
};
