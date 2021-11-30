import getColorByPosition from "./getColorByPosition"

export default function (dialog) {

    let color_rgb = getColorByPosition(...dialog._colors_picker_.color_rgb, ...dialog._colors_picker_.pointer_position);

    let color_rgba = [...color_rgb, dialog._colors_picker_.color_alpha];
    dialog._colors_picker_.target._color_ = color_rgba;

    document.getElementById('colors-picker-dialog_color').style.backgroundColor = 'rgba(' + color_rgba[0] + ',' + color_rgba[1] + ',' + color_rgba[2] + ',' + color_rgba[3] + ')';

};
