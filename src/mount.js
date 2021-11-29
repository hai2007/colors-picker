
// https://hai2007.github.io/browser.js/#/api/xhtml?fixed=top
import xhtml from '@hai2007/browser/xhtml';

export default function (target, color, callback) {

    let dialog = document.getElementById('colors-picker-dialog'), doit;
    target._color_ = color;

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
                    <div style='outline:1px solid gray;position: relative;' id='colors-picker-dialog_canvas1_frame'>
                        <canvas
                            id='colors-picker-dialog_canvas1'
                            style='
                                width:200px;
                                height:16px;
                            'width='200px'height='16px'>
                                非常抱歉，您的浏览器不支持canvas!
                        </canvas>
                        <span
                            style='
                                position: absolute;
                                width: 22px;
                                height: 22px;
                                outline: 1px solid gray;
                                display: inline-block;
                                border-radius: 50%;
                                right: -11px;
                                top: -3.5px;
                                cursor:pointer;
                                background: #faf8f8;'
                            id='colors-picker-dialog_canvas1_btn'></span>
                    </div>
                    <div style='outline:1px solid gray;margin-top:10px;position: relative;' id='colors-picker-dialog_canvas2_frame'>
                        <canvas
                            id='colors-picker-dialog_canvas2'
                            style='
                                width:200px;
                                height:16px;
                            'width='200px'height='16px'>
                                非常抱歉，您的浏览器不支持canvas!
                        </canvas>
                        <span
                            style='
                                position: absolute;
                                width: 22px;
                                height: 22px;
                                outline: 1px solid gray;
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

                } else {
                    if (position.x < 0 || position.x > 200) return;

                    // 更新位置
                    btn.style.left = (position.x - 11) + 'px';

                    // 更新值

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
            dialog._colors_picker_.callback('开发中');
        });

    }

    doit = () => {

        // 更新目标
        dialog._colors_picker_ = {
            callback,
            target
        };

        // 修改定位
        let elPosition = xhtml.offsetPosition(target);
        let elSize = xhtml.size(target);
        dialog.style.left = elPosition.left + "px";
        dialog.style.top = (elPosition.top + elSize.height) + "px";

        // 显示出来
        dialog.style.display = 'block';
    };
    xhtml.bind(target, 'click', doit);

};
