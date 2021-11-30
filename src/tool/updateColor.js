import getColorByPosition from "./getColorByPosition"

export default function (dialog) {

    let color_rgb = getColorByPosition(...dialog._colors_picker_.color_rgb, ...dialog._colors_picker_.pointer_position);

    let color_rgba = [...color_rgb, dialog._colors_picker_.color_alpha];

    dialog._colors_picker_.target._color_ = color_rgba;

    let color = 'rgba(' + color_rgba[0] + ',' + color_rgba[1] + ',' + color_rgba[2] + ',' + color_rgba[3] + ')';

    document.getElementById('colors-picker-dialog_color').style.backgroundColor = color;
    document.getElementById('colors-picker-dialog_canvas0_btn').style.backgroundColor = color;

};
