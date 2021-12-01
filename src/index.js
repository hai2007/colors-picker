import formatColor from '@hai2007/browser/formatColor';
import mount from './mount';

let ColorsPicker = function (el, initColor, title = '选择颜色') {

    // 挂载点和颜色
    let target = el;
    let color = formatColor(initColor);

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
    }, title);

    return ColorsPickerInstance;
};

let helpEl = null, doback;
ColorsPicker.openPicker = function (initColor, _doback, title = '选择颜色') {
    doback = _doback;

    if (helpEl === null) {
        helpEl = document.createElement('button');
        ColorsPicker(helpEl, initColor, title).then(function (color) {
            doback(color);
        });
    } else {

        let color = formatColor(initColor);

        let dialog = document.getElementById('colors-picker-dialog');

        // 修改标题
        document.getElementById('colors-picker-dialog_move').innerText = title;

        // 修改颜色
        dialog._colors_picker_.color_rgb = [color[0], color[1], color[2]];
        dialog._colors_picker_.color_alpha = color[3];
        dialog._colors_picker_.target._color_ = color;

    }


    helpEl.click();
};

// 判断当前环境，如果不是浏览器环境
if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = ColorsPicker;
}
// 浏览器环境下
else {
    window.ColorsPicker = ColorsPicker;
}
