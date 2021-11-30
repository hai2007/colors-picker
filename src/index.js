import formatColor from '@hai2007/browser/formatColor';
import mount from './mount';

let ColorsPicker = function (el, initColor,title='选择颜色') {

    // 挂载点和颜色
    let target = el;
    let color = initColor ? formatColor(initColor) : [255, 255, 255, 1];

    // 颜色回调方法
    let callbacks = [];

    let ColorsPickerInstance = {

        /**
         * ColorsPicker(el,'red','title').then(color=>{
         *      // todo
         * })
         */
        then(callback) {
            callbacks.push(callback);
            return ColorsPickerInstance;
        }
    }

    // 绑定到页面中去
    mount(target, color, _color => {
        for (let callback of callbacks) {
            callback(_color);
        }
    },title);

    return ColorsPickerInstance;
};

// 判断当前环境，如果不是浏览器环境
if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = ColorsPicker;
}
// 浏览器环境下
else {
    window.ColorsPicker = ColorsPicker;
}
