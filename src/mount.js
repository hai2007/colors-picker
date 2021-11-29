
// https://hai2007.github.io/browser.js/#/api/xhtml?fixed=top
import xhtml from '@hai2007/browser/xhtml';

export default function (target, color, callback) {

    let dialog = document.getElementById('colors-picker-dialog'), doit;
    target._color_ = color;

    // 如果弹框没有准备好
    if (!dialog) {

        // 准备好模板后追加到页面中
        xhtml.append(document.body, `<div id='colors-picker-dialog'>
            <canvas style='width:300px;height:160px;' width='300px' height='160px'>非常抱歉，您的浏览器不支持canvas!</canvas>

        </div>`);

        // 更新弹框结点
        dialog = document.getElementById('colors-picker-dialog');
        dialog.style.display = 'none';
    }

    doit = () => {

        // 更新目标
        dialog._colors_picker_ = {
            callback,
            target
        };

        // 修改定位
        // todo

        // 显示出来
        dialog.style.display = 'block';
    };
    xhtml.bind(target, 'click', doit);

};
