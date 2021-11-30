import getColorByPosition from "./getColorByPosition";

export default function (r, g, b) {

    let canvas = document.getElementById('colors-picker-dialog_canvas0');
    let width = 300, height = 160;

    let painter = canvas.getContext('2d');

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {

            let rgb = getColorByPosition(r, g, b, i, j);

            painter.fillStyle = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
            painter.fillRect(i, j, 1, 1);

        }
    }

};
