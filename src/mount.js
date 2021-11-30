
// https://hai2007.github.io/browser.js/#/api/xhtml?fixed=top
import xhtml from '@hai2007/browser/xhtml';

import getColorByDeep from './tool/getColorByDeep';
import drawColorCanvas from './tool/drawColorCanvas';
import calcDeepWidthColor from './tool/calcDeepWidthColor';
import updateColor from './tool/updateColor';

export default function (target, color, callback) {

    let dialog = document.getElementById('colors-picker-dialog'), doit;
    target._color_ = color;

    let updateColorCanvas = true;

    // 如果弹框没有准备好
    if (!dialog) {

        // 准备好模板后追加到页面中
        xhtml.append(document.body, `<div id='colors-picker-dialog'
                style='
                    position: fixed;
                    outline: gray solid 1px;
                    background-color: white;
                    font-size:0;
                '>
            <div style='outline:1px solid gray;position: relative; overflow: hidden;' id='colors-picker-dialog_canvas0_frame'>
                <canvas
                    id='colors-picker-dialog_canvas0'
                    style='width:300px;height:160px;'
                    width='300px'
                    height='160px'>
                        非常抱歉，您的浏览器不支持canvas!
                </canvas>
                <span
                    style='
                        position: absolute;
                        position: absolute;
                        width: 12px;
                        height: 12px;
                        outline: 1px solid gray;
                        border-radius: 50%;
                        right: -6px;
                        top: -6px;
                        cursor:pointer;
                    ' id='colors-picker-dialog_canvas0_btn'></span>
            </div>
            <div style='text-align:center;margin:20px 0;'>
                <div
                    id='colors-picker-dialog_color'
                    style='
                        display:inline-block;
                        width:40px;
                        height:40px;
                        outline:1px solid gray;
                        border-radius:50%;
                        margin-right:10px;
                '></div>
                <div style='display:inline-block;'>
                    <div style='position: relative;' id='colors-picker-dialog_canvas1_frame'>
                        <div id='colors-picker-dialog_canvas1'
                            style='
                                width:200px;
                                height:16px;
                                background-image: linear-gradient(to right, #f00, #f0f,#00f,#0ff,#0f0,#ff0,#f00); '>
                        </div>
                        <span
                            style='
                                position: absolute;
                                width: 22px;
                                height: 22px;
                                display: inline-block;
                                border-radius: 50%;
                                right: -11px;
                                top: -3.5px;
                                cursor:pointer;
                                box-shadow: 0 0 2px 0px grey;
                                background: #faf8f8;'
                            id='colors-picker-dialog_canvas1_btn'></span>
                    </div>
                    <div style='margin-top:10px;position: relative;' id='colors-picker-dialog_canvas2_frame'>
                        <div id='colors-picker-dialog_canvas2'
                            style='
                                width:200px;
                                height:16px;
                                background-image: linear-gradient(to right, #f000, red); '>
                        </div>
                        <span
                            style='
                                position: absolute;
                                width: 22px;
                                height: 22px;
                                box-shadow: 0 0 2px 0px grey;
                                display: inline-block;
                                border-radius: 50%;
                                right: -11px;
                                top: -3.5px;
                                cursor:pointer;
                                background: #faf8f8;'
                            id='colors-picker-dialog_canvas2_btn'></span>
                    </div>
                </div>
            </div>
            <div style='text-align:center;padding:10px;'>
                <button
                    id='colors-picker-dialog_btn_cancel'
                    style='
                        margin-right:30px;
                        background-color:white;
                        width:90px;
                        border-radius:5px;
                        cursor:pointer;
                    '>取消</button>
                <button
                    id='colors-picker-dialog_btn_checked'
                    style='
                        background-color:#449cf6;
                        color:white;width:90px;
                        border-radius:5px;
                        cursor:pointer;
                    '>确定</button>
            </div>
        </div>`);

        // 更新弹框结点
        dialog = document.getElementById('colors-picker-dialog');
        dialog.style.display = 'none';

        let btn_flag = -1;

        // 标记当前谁被按下
        xhtml.bind(document.getElementById('colors-picker-dialog_canvas0_btn'), 'mousedown', () => {
            btn_flag = 0;
        });
        xhtml.bind(document.getElementById('colors-picker-dialog_canvas1_btn'), 'mousedown', () => {
            btn_flag = 1;
        });
        xhtml.bind(document.getElementById('colors-picker-dialog_canvas2_btn'), 'mousedown', () => {
            btn_flag = 2;
        });

        // 移动
        xhtml.bind(document.body, 'mousemove', event => {
            if ([0, 1, 2].indexOf(btn_flag) > -1) {

                let position = xhtml.mousePosition(document.getElementById('colors-picker-dialog_canvas' + btn_flag + '_frame'), event);
                let btn = document.getElementById('colors-picker-dialog_canvas' + btn_flag + '_btn');

                if (btn_flag === 0) {
                    if (position.y > 160 || position.y < 0 || position.x < 0 || position.x > 300) return;

                    // 更新位置
                    btn.style.left = (position.x - 6) + 'px';
                    btn.style.top = (position.y - 6) + 'px';

                    // 更新值
                    dialog._colors_picker_.pointer_position = [position.x, position.y];

                    // 更新颜色
                    updateColor(dialog);

                } else {
                    if (position.x < 0 || position.x > 200) return;

                    // 更新位置
                    btn.style.left = (position.x - 11) + 'px';

                    // 更新值
                    if (btn_flag === 1) {

                        let color_rgb = getColorByDeep(position.x / 200);

                        // 透明度
                        document.getElementById('colors-picker-dialog_canvas2').style.backgroundImage = 'linear-gradient(to right, #f000, rgb(' + color_rgb[0] + ',' + color_rgb[1] + ',' + color_rgb[2] + '))';

                        if (updateColorCanvas) {

                            updateColorCanvas = false;

                            // 颜色选择大块
                            setTimeout(() => {
                                drawColorCanvas(...color_rgb);
                                updateColorCanvas = true;
                                dialog._colors_picker_.color_rgb = color_rgb;

                                // 更新颜色
                                updateColor(dialog);

                            }, 10);
                        }

                    } else {

                        // 透明度
                        dialog._colors_picker_.color_alpha = position.x / 200;

                        // 更新颜色
                        updateColor(dialog);

                    }

                }

            }
        });

        // 标记被清空
        xhtml.bind(document.body, 'mouseup', () => {
            btn_flag = -1;
        });

        // 取消按钮
        xhtml.bind(document.getElementById('colors-picker-dialog_btn_cancel'), 'click', () => {
            dialog.style.display = 'none';
        });

        // 确定按钮
        xhtml.bind(document.getElementById('colors-picker-dialog_btn_checked'), 'click', () => {
            dialog.style.display = 'none';
            let colorArray = dialog._colors_picker_.target._color_;
            dialog._colors_picker_.callback('rgba(' + colorArray[0] + ',' + colorArray[1] + ',' + colorArray[2] + ',' + colorArray[3] + ')');
        });

    }

    doit = () => {

        /**
         * 更新目标
         */
        dialog._colors_picker_ = {
            callback,
            target,
            color_rgb: [target._color_[0], target._color_[1], target._color_[2]],
            color_alpha: target._color_[3],
            pointer_position: [300, 160]
        };

        /**
         * 修改定位
         */
        let elPosition = target.getBoundingClientRect(); // 元素相对浏览器窗口的位置
        let elSize = xhtml.size(target);
        dialog.style.left = elPosition.x + "px";
        dialog.style.top = (elPosition.y + elSize.height) + "px";

        /**
         * 初始化
         */
        let rgba = dialog._colors_picker_.target._color_;

        // 颜色盘和透明度颜色
        drawColorCanvas(...rgba);
        document.getElementById('colors-picker-dialog_canvas2').style.backgroundImage = 'linear-gradient(to right, #f000, rgb(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + '))';

        // 修改颜色位置
        document.getElementById('colors-picker-dialog_canvas1_btn').style.left = (calcDeepWidthColor(...rgba) * 200 - 11) + 'px';

        // 修改透明度位置
        document.getElementById('colors-picker-dialog_canvas2_btn').style.left = (rgba[3] * 200 - 11) + 'px';

        // 修改颜色
        document.getElementById('colors-picker-dialog_color').style.backgroundColor = 'rgba(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + ',' + rgba[3] + ')';

        /**
         * 显示出来
         */
        dialog.style.display = 'block';
    };
    xhtml.bind(target, 'click', doit);

};
