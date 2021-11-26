import REGEXP from './REGEXP';
import xhtml from '@hai2007/tool/xhtml';

// 把颜色统一转变成rgba(x,x,x,x)格式
// 返回数字数组[r,g,b,a]
export default function (color) {
    let colorNode = document.getElementsByTagName('head')[0];
    colorNode.style['color'] = color;
    let rgba = xhtml.getStyle(colorNode, 'color');
    let rgbaArray = rgba.replace(/^rgba?\(([^)]+)\)$/, '$1').split(new RegExp('\\,' + REGEXP.whitespace));
    return [+rgbaArray[0], +rgbaArray[1], +rgbaArray[2], rgbaArray[3] == undefined ? 1 : +rgbaArray[3]];
};
