/*!
 * Colors Picker - 一个类似浏览器调试工具中颜色选择器的H5版本的小组件。
 * git+https://github.com/hai2007/colors-picker.git
 *
 * author 你好2007 < https://hai2007.gitee.io/sweethome >
 *
 * version 0.3.3
 *
 * Copyright (c) 2021-2022 hai2007 走一步，再走一步。
 * Released under the MIT license
 *
 * Date:Thu Jun 02 2022 19:27:45 GMT+0800 (GMT+08:00)
 */
(function () {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var REGEXP = {
    // 空白字符:http://www.w3.org/TR/css3-selectors/#whitespace
    "whitespace": "[\\x20\\t\\r\\n\\f]"
  };

  // 获取样式
  function getStyle (dom, name) {
    // 获取结点的全部样式
    var allStyle = document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(dom, null) : dom.currentStyle; // 如果没有指定属性名称，返回全部样式

    return typeof name === 'string' ? allStyle.getPropertyValue(name) : allStyle;
  }

  /*!
   * 🌐 - 颜色格式化
   * https://github.com/hai2007/browser.js/blob/master/formatColor.js
   *
   * author hai2007 < https://hai2007.gitee.io/sweethome >
   *
   * Copyright (c) 2021-present hai2007 走一步，再走一步。
   * Released under the MIT license
   */
  // 返回数字数组[r,g,b,a]

  function formatColor (color) {
    var colorNode = document.getElementsByTagName('head')[0];
    colorNode.style['color'] = color;
    var rgba = getStyle(colorNode, 'color');
    var rgbaArray = rgba.replace(/^rgba?\(([^)]+)\)$/, '$1').split(new RegExp('\\,' + REGEXP.whitespace));
    return [+rgbaArray[0], +rgbaArray[1], +rgbaArray[2], rgbaArray[3] == undefined ? 1 : +rgbaArray[3]];
  }

  /*!
   * 🌐 - 提供常用的DOM操作方法
   * https://github.com/hai2007/browser.js/blob/master/xhtml.js
   *
   * author hai2007 < https://hai2007.gitee.io/sweethome >
   *
   * Copyright (c) 2021-present hai2007 走一步，再走一步。
   * Released under the MIT license
   */
  // 命名空间路径
  var namespace = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };
  /**
   * 结点操作补充
   */

  var xhtml = {
    // 阻止冒泡
    "stopPropagation": function stopPropagation(event) {
      event = event || window.event;

      if (event.stopPropagation) {
        //这是其他非IE浏览器
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
    },
    // 阻止默认事件
    "preventDefault": function preventDefault(event) {
      event = event || window.event;

      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    },
    // 判断是否是结点
    "isNode": function isNode(param) {
      return param && (param.nodeType === 1 || param.nodeType === 9 || param.nodeType === 11);
    },
    // 绑定事件
    "bind": function bind(dom, eventType, callback) {
      if (dom.constructor === Array || dom.constructor === NodeList || dom.constructor === HTMLCollection) {
        for (var i = 0; i < dom.length; i++) {
          this.bind(dom[i], eventType, callback);
        }

        return;
      }

      if (window.attachEvent) dom.attachEvent("on" + eventType, callback);else dom.addEventListener(eventType, callback, false);
    },
    // 去掉绑定事件
    "unbind": function unbind(dom, eventType, handler) {
      if (dom.constructor === Array || dom.constructor === NodeList || dom.constructor === HTMLCollection) {
        for (var i = 0; i < dom.length; i++) {
          this.unbind(dom[i], eventType, handler);
        }

        return;
      }

      if (window.detachEvent) dom.detachEvent('on' + eventType, handler);else dom.removeEventListener(eventType, handler, false);
    },
    // 在当前上下文context上查找结点
    // selectFun可选，返回boolean用以判断当前面对的结点是否保留
    "find": function find(context, selectFun, tagName) {
      if (!this.isNode(context)) return [];
      var nodes = context.getElementsByTagName(tagName || '*');
      var result = [];

      for (var i = 0; i < nodes.length; i++) {
        if (this.isNode(nodes[i]) && (typeof selectFun != "function" || selectFun(nodes[i]))) result.push(nodes[i]);
      }

      return result;
    },
    // 寻找当前结点的孩子结点
    // selectFun可选，返回boolean用以判断当前面对的结点是否保留
    "children": function children(dom, selectFun) {
      var nodes = dom.childNodes;
      var result = [];

      for (var i = 0; i < nodes.length; i++) {
        if (this.isNode(nodes[i]) && (typeof selectFun != "function" || selectFun(nodes[i]))) result.push(nodes[i]);
      }

      return result;
    },
    // 判断结点是否有指定class
    // clazzs可以是字符串或数组字符串
    // notStrict可选，boolean值，默认false表示结点必须包含全部class,true表示至少包含一个即可
    "hasClass": function hasClass(dom, clazzs, notStrict) {
      if (clazzs.constructor !== Array) clazzs = [clazzs];
      var class_str = " " + (dom.getAttribute('class') || "") + " ";

      for (var i = 0; i < clazzs.length; i++) {
        if (class_str.indexOf(" " + clazzs[i] + " ") >= 0) {
          if (notStrict) return true;
        } else {
          if (!notStrict) return false;
        }
      }

      return true;
    },
    // 删除指定class
    "removeClass": function removeClass(dom, clazz) {
      var oldClazz = " " + (dom.getAttribute('class') || "") + " ";
      var newClazz = oldClazz.replace(" " + clazz.trim() + " ", " ");
      dom.setAttribute('class', newClazz.trim());
    },
    // 添加指定class
    "addClass": function addClass(dom, clazz) {
      if (this.hasClass(dom, clazz)) return;
      var oldClazz = dom.getAttribute('class') || "";
      dom.setAttribute('class', oldClazz + " " + clazz);
    },
    // 字符串变成结点
    // isSvg可选，boolean值，默认false表示结点是html，为true表示svg类型
    "toNode": function toNode(template, isSvg) {
      var frame; // html和svg上下文不一样

      if (isSvg) frame = document.createElementNS(namespace.svg, 'svg');else {
        var frameTagName = 'div'; // 大部分的标签可以直接使用div作为容器
        // 部分特殊的需要特殊的容器标签

        if (/^<tr[> ]/.test(template)) {
          frameTagName = "tbody";
        } else if (/^<th[> ]/.test(template) || /^<td[> ]/.test(template)) {
          frameTagName = "tr";
        } else if (/^<thead[> ]/.test(template) || /^<tbody[> ]/.test(template)) {
          frameTagName = "table";
        }

        frame = document.createElement(frameTagName);
      } // 低版本浏览器svg没有innerHTML，考虑是vue框架中，没有补充

      frame.innerHTML = template;
      var childNodes = frame.childNodes;

      for (var i = 0; i < childNodes.length; i++) {
        if (this.isNode(childNodes[i])) return childNodes[i];
      }
    },
    // 主动触发事件
    "trigger": function trigger(dom, eventType) {
      //创建event的对象实例。
      if (document.createEventObject) {
        // IE浏览器支持fireEvent方法
        dom.fireEvent('on' + eventType, document.createEventObject());
      } // 其他标准浏览器使用dispatchEvent方法
      else {
        var _event = document.createEvent('HTMLEvents'); // 3个参数：事件类型，是否冒泡，是否阻止浏览器的默认行为


        _event.initEvent(eventType, true, false);

        dom.dispatchEvent(_event);
      }
    },
    // 获取样式
    "getStyle": function getStyle(dom, name) {
      // 获取结点的全部样式
      var allStyle = document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(dom, null) : dom.currentStyle; // 如果没有指定属性名称，返回全部样式

      return typeof name === 'string' ? allStyle.getPropertyValue(name) : allStyle;
    },
    // 获取元素位置
    "offsetPosition": function offsetPosition(dom) {
      var left = 0;
      var top = 0;
      top = dom.offsetTop;
      left = dom.offsetLeft;
      dom = dom.offsetParent;

      while (dom) {
        top += dom.offsetTop;
        left += dom.offsetLeft;
        dom = dom.offsetParent;
      }

      return {
        "left": left,
        "top": top
      };
    },
    // 获取鼠标相对元素位置
    "mousePosition": function mousePosition(dom, event) {
      var bounding = dom.getBoundingClientRect();
      if (!event || !event.clientX) throw new Error('Event is necessary!');
      return {
        "x": event.clientX - bounding.left,
        "y": event.clientY - bounding.top
      };
    },
    // 删除结点
    "remove": function remove(dom) {
      dom.parentNode.removeChild(dom);
    },
    // 设置多个样式
    "setStyles": function setStyles(dom, styles) {
      for (var key in styles) {
        dom.style[key] = styles[key];
      }
    },
    // 获取元素大小
    "size": function size(dom, type) {
      var elemHeight, elemWidth;

      if (type == 'content') {
        //内容
        elemWidth = dom.clientWidth - (this.getStyle(dom, 'padding-left') + "").replace('px', '') - (this.getStyle(dom, 'padding-right') + "").replace('px', '');
        elemHeight = dom.clientHeight - (this.getStyle(dom, 'padding-top') + "").replace('px', '') - (this.getStyle(dom, 'padding-bottom') + "").replace('px', '');
      } else if (type == 'padding') {
        //内容+内边距
        elemWidth = dom.clientWidth;
        elemHeight = dom.clientHeight;
      } else if (type == 'border') {
        //内容+内边距+边框
        elemWidth = dom.offsetWidth;
        elemHeight = dom.offsetHeight;
      } else if (type == 'scroll') {
        //滚动的宽（不包括border）
        elemWidth = dom.scrollWidth;
        elemHeight = dom.scrollHeight;
      } else {
        elemWidth = dom.offsetWidth;
        elemHeight = dom.offsetHeight;
      }

      return {
        width: elemWidth,
        height: elemHeight
      };
    },
    // 在被选元素内部的结尾插入内容
    "append": function append(el, template) {
      var node = this.isNode(template) ? template : this.toNode(template);
      el.appendChild(node);
      return node;
    },
    // 在被选元素内部的开头插入内容
    "prepend": function prepend(el, template) {
      var node = this.isNode(template) ? template : this.toNode(template);
      el.insertBefore(node, el.childNodes[0]);
      return node;
    },
    // 在被选元素之后插入内容
    "after": function after(el, template) {
      var node = this.isNode(template) ? template : this.toNode(template);
      el.parentNode.insertBefore(node, el.nextSibling);
      return node;
    },
    // 在被选元素之前插入内容
    "before": function before(el, template) {
      var node = this.isNode(template) ? template : this.toNode(template);
      el.parentNode.insertBefore(node, el);
      return node;
    }
  };

  function getColorByDeep (deep) {
    var distDeep = 1 / 6;
    var r, g, b;

    if (deep <= distDeep) {
      r = 255;
      g = 0;
      b = deep / distDeep * 255;
    } else if (deep <= 2 * distDeep) {
      r = (distDeep * 2 - deep) / distDeep * 255;
      g = 0;
      b = 255;
    } else if (deep <= 3 * distDeep) {
      r = 0;
      g = (deep - 2 * distDeep) / distDeep * 255;
      b = 255;
    } else if (deep <= 4 * distDeep) {
      r = 0;
      g = 255;
      b = (distDeep * 4 - deep) / distDeep * 255;
    } else if (deep <= 5 * distDeep) {
      r = (deep - distDeep * 4) / distDeep * 255;
      g = 255;
      b = 0;
    } else {
      r = 255;
      g = (distDeep * 6 - deep) / distDeep * 255;
      b = 0;
    }

    return [+r.toFixed(0), +g.toFixed(0), +b.toFixed(0)];
  }

  function getColorByPosition (r, g, b, x, y) {
    var width = 300,
        height = 160; // X方向

    var _r = x / width * (r - 255) + 255;

    var _g = x / width * (g - 255) + 255;

    var _b = x / width * (b - 255) + 255; // Y方向


    _r = (160 - y) / height * _r;
    _g = (160 - y) / height * _g;
    _b = (160 - y) / height * _b;
    return [_r.toFixed(0), _g.toFixed(0), _b.toFixed(0)];
  }

  function drawColorCanvas (r, g, b) {
    var canvas = document.getElementById('colors-picker-dialog_canvas0');
    var width = 300,
        height = 160;
    var painter = canvas.getContext('2d');

    for (var i = 0; i < width; i++) {
      for (var j = 0; j < height; j++) {
        var rgb = getColorByPosition(r, g, b, i, j);
        painter.fillStyle = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
        painter.fillRect(i, j, 1, 1);
      }
    }
  }

  function calcDeepWidthColor (r, g, b) {
    var distDeep = 1 / 6;

    if (r == 255 && g == 0) {
      return b / 255 * distDeep;
    } else if (g == 0 && b == 255) {
      return 2 * distDeep - r / 255 * distDeep;
    } else if (r == 0 && b == 255) {
      return 2 * distDeep + g / 255 * distDeep;
    } else if (r == 0 && g == 255) {
      return 4 * distDeep - b / 255 * distDeep;
    } else if (g == 255 && b == 0) {
      return 4 * distDeep + r / 255 * distDeep;
    } else {
      return 6 * distDeep - g / 255 * distDeep;
    }
  }

  function updateColor (dialog) {
    var color_rgb = getColorByPosition.apply(void 0, _toConsumableArray(dialog._colors_picker_.color_rgb).concat(_toConsumableArray(dialog._colors_picker_.pointer_position)));
    var color_rgba = [].concat(_toConsumableArray(color_rgb), [dialog._colors_picker_.color_alpha]);
    dialog._colors_picker_.target._color_ = color_rgba;
    var color = 'rgba(' + color_rgba[0] + ',' + color_rgba[1] + ',' + color_rgba[2] + ',' + color_rgba[3] + ')';
    document.getElementById('colors-picker-dialog_color').style.backgroundColor = color;
    document.getElementById('colors-picker-dialog_canvas0_btn').style.backgroundColor = color;
  }

  function dragdrop () {
    var el = document.getElementById('colors-picker-dialog_move'); //绑定鼠标左键按下事件

    xhtml.bind(el, 'mousedown', function mousedown(event) {
      //解决浏览器全选无法拖拽弹框
      el.setCapture && el.setCapture(); // 寻找窗口轮廓

      var _el = el.parentNode;
      var lf = event.clientX;
      var tp = event.clientY;
      var left = xhtml.getStyle(_el, 'left').replace('px', '');
      var top = xhtml.getStyle(_el, 'top').replace('px', ''); //绑定鼠标移动事件

      function mousemove(event) {
        _el.style.left = left - -event.clientX - lf + 'px';
        _el.style.top = top - -event.clientY - tp + 'px';
      }

      xhtml.bind(document, 'mousemove', mousemove); //绑定鼠标松开事件,清除鼠标移动绑定

      xhtml.bind(document, 'mouseup', function (event) {
        xhtml.unbind(document, 'mousemove', mousemove);
        _el.releaseCapture && _el.releaseCapture();
        return false;
      });
    });
  }

  function mount (target, color, callback, title) {
    var dialog = document.getElementById('colors-picker-dialog'),
        doit;
    target._color_ = color;
    var updateColorCanvas = true; // 如果弹框没有准备好

    if (!dialog) {
      (function () {
        // 准备好模板后追加到页面中
        xhtml.append(document.body, "<div id='colors-picker-dialog'\n                style='\n                    position: fixed;\n                    box-shadow: 0 0 7px 1px #9393a0;\n                    border-radius: 5px;\n                    background-color: white;\n                    font-size:0;\n                    user-select: none;\n                '>\n            <div id='colors-picker-dialog_move' style='\n                font-size: 16px;\n                text-align: center;\n                cursor: move;\n                border-radius: 5px 5px 0 0;\n                line-height: 30px;\n                background-color: #ffffff;\n                color: #252020;\n            '></div>\n            <div style='position: relative; overflow: hidden;' id='colors-picker-dialog_canvas0_frame'>\n                <canvas\n                    id='colors-picker-dialog_canvas0'\n                    style='width:300px;height:160px;'\n                    width='300px'\n                    height='160px'>\n                        \u975E\u5E38\u62B1\u6B49\uFF0C\u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301canvas!\n                </canvas>\n                <span\n                    style='\n                        position: absolute;\n                        position: absolute;\n                        width: 12px;\n                        height: 12px;\n                        border-radius: 50%;\n                        right: -6px;\n                        top: -6px;\n                        box-shadow: 0 0 5px 3px #75757e;\n                        cursor:pointer;\n                    ' id='colors-picker-dialog_canvas0_btn'></span>\n            </div>\n            <div style='text-align:center;margin:20px 0;'>\n                <div\n                    id='colors-picker-dialog_color'\n                    style='\n                        display:inline-block;\n                        width:40px;\n                        height:40px;\n                        box-shadow: rgb(117, 117, 126) 0px 0px 9px 0px;\n                        border-radius:50%;\n                        margin-right:25px;\n                '></div>\n                <div style='display:inline-block;'>\n                    <div style='position: relative;' id='colors-picker-dialog_canvas1_frame'>\n                        <div id='colors-picker-dialog_canvas1'\n                            style='\n                                width:200px;\n                                height:16px;\n                                background-image: linear-gradient(to right, #f00, #f0f,#00f,#0ff,#0f0,#ff0,#f00); '>\n                        </div>\n                        <span\n                            style='\n                                position: absolute;\n                                width: 22px;\n                                height: 22px;\n                                display: inline-block;\n                                border-radius: 50%;\n                                right: -11px;\n                                top: -3.5px;\n                                cursor:pointer;\n                                box-shadow: 0 0 2px 0px grey;\n                                background: #faf8f8;'\n                            id='colors-picker-dialog_canvas1_btn'></span>\n                    </div>\n                    <div style='margin-top:10px;position: relative;' id='colors-picker-dialog_canvas2_frame'>\n                        <div id='colors-picker-dialog_canvas2'\n                            style='\n                                width:200px;\n                                height:16px;\n                                background-image: linear-gradient(to right, #f000, red); '>\n                        </div>\n                        <span\n                            style='\n                                position: absolute;\n                                width: 22px;\n                                height: 22px;\n                                box-shadow: 0 0 2px 0px grey;\n                                display: inline-block;\n                                border-radius: 50%;\n                                right: -11px;\n                                top: -3.5px;\n                                cursor:pointer;\n                                background: #faf8f8;'\n                            id='colors-picker-dialog_canvas2_btn'></span>\n                    </div>\n                </div>\n            </div>\n            <div style='text-align:center;padding:10px;'>\n                <button\n                    id='colors-picker-dialog_btn_cancel'\n                    style='\n                        margin-right:30px;\n                        background-color:#e0e0e0;\n                        width:90px;\n                        border-radius:5px;\n                        cursor:pointer;\n                        border:none;\n                        line-height:26px;\n                    '>\u53D6\u6D88</button>\n                <button\n                    id='colors-picker-dialog_btn_checked'\n                    style='\n                        background-color:#449cf6;\n                        color:white;width:90px;\n                        border-radius:5px;\n                        cursor:pointer;\n                        border:none;\n                        line-height:26px;\n                    '>\u786E\u5B9A</button>\n            </div>\n        </div>");
        dragdrop(); // 更新弹框结点

        dialog = document.getElementById('colors-picker-dialog');
        dialog.style.display = 'none';
        var btn_flag = -1; // 标记当前谁被按下

        xhtml.bind(document.getElementById('colors-picker-dialog_canvas0_btn'), 'mousedown', function () {
          btn_flag = 0;
        });
        xhtml.bind(document.getElementById('colors-picker-dialog_canvas1_btn'), 'mousedown', function () {
          btn_flag = 1;
        });
        xhtml.bind(document.getElementById('colors-picker-dialog_canvas2_btn'), 'mousedown', function () {
          btn_flag = 2;
        });

        var doMousemove = function doMousemove(event) {
          if ([0, 1, 2].indexOf(btn_flag) > -1) {
            var position = xhtml.mousePosition(document.getElementById('colors-picker-dialog_canvas' + btn_flag + '_frame'), event);
            var btn = document.getElementById('colors-picker-dialog_canvas' + btn_flag + '_btn');

            if (btn_flag === 0) {
              if (position.y > 160 || position.y < 0 || position.x < 0 || position.x > 300) return; // 更新位置

              btn.style.left = position.x - 6 + 'px';
              btn.style.top = position.y - 6 + 'px'; // 更新值

              dialog._colors_picker_.pointer_position = [position.x, position.y]; // 更新颜色

              updateColor(dialog);
            } else {
              if (position.x < 0 || position.x > 200) return; // 更新位置

              btn.style.left = position.x - 11 + 'px'; // 更新值

              if (btn_flag === 1) {
                var color_rgb = getColorByDeep(position.x / 200); // 透明度

                document.getElementById('colors-picker-dialog_canvas2').style.backgroundImage = 'linear-gradient(to right, #f000, rgb(' + color_rgb[0] + ',' + color_rgb[1] + ',' + color_rgb[2] + '))';

                if (updateColorCanvas) {
                  updateColorCanvas = false; // 颜色选择大块

                  setTimeout(function () {
                    drawColorCanvas.apply(void 0, _toConsumableArray(color_rgb));
                    updateColorCanvas = true;
                    dialog._colors_picker_.color_rgb = color_rgb; // 更新颜色

                    updateColor(dialog);
                  }, 10);
                }
              } else {
                // 透明度
                dialog._colors_picker_.color_alpha = position.x / 200; // 更新颜色

                updateColor(dialog);
              }
            }
          }
        }; // 点击选择


        var _loop = function _loop(canvasIndex) {
          xhtml.bind(document.getElementById('colors-picker-dialog_canvas' + canvasIndex), 'click', function (event) {
            btn_flag = canvasIndex;
            doMousemove(event);
            btn_flag = -1;
          });
        };

        for (var canvasIndex = 0; canvasIndex < 3; canvasIndex++) {
          _loop(canvasIndex);
        } // 移动


        xhtml.bind(document.body, 'mousemove', doMousemove); // 标记被清空

        xhtml.bind(document.body, 'mouseup', function () {
          btn_flag = -1;
        }); // 取消按钮

        xhtml.bind(document.getElementById('colors-picker-dialog_btn_cancel'), 'click', function () {
          dialog.style.display = 'none';
        }); // 确定按钮

        xhtml.bind(document.getElementById('colors-picker-dialog_btn_checked'), 'click', function () {
          dialog.style.display = 'none';
          var colorArray = dialog._colors_picker_.target._color_;

          dialog._colors_picker_.callback('rgba(' + colorArray[0] + ',' + colorArray[1] + ',' + colorArray[2] + ',' + colorArray[3] + ')');
        });
      })();
    }

    doit = function doit() {
      /**
       * 更新目标
       */
      dialog._colors_picker_ = {
        callback: callback,
        target: target,
        color_rgb: [target._color_[0], target._color_[1], target._color_[2]],
        color_alpha: target._color_[3],
        pointer_position: [300, 0]
      };
      /**
       * 修改定位
       */
      // let elPosition = target.getBoundingClientRect(); // 元素相对浏览器窗口的位置
      // let elSize = xhtml.size(target);

      var winSize = {
        width: window.innerWidth,
        height: window.innerHeight
      };
      /**
       * 由相对色块定位改成居中定位
       * by 你好2007 于南京 2021年11月30日
       */

      dialog.style.left = winSize.width * 0.5 - 150 + "px";
      dialog.style.top = winSize.height * 0.5 - 142.5 + "px"; // if (elPosition.x + 300 > winSize.width) {
      //     dialog.style.left = (elPosition.x - 300 + elSize.width) + "px";
      // } else {
      //     dialog.style.left = elPosition.x + "px";
      // }
      // if (elPosition.y + elSize.height + 285 > winSize.height) {
      //     dialog.style.top = (elPosition.y - 285) + "px";
      // } else {
      //     dialog.style.top = (elPosition.y + elSize.height) + "px";
      // }

      /**
       * 初始化
       */

      var rgba = dialog._colors_picker_.target._color_; // 颜色盘和透明度颜色

      drawColorCanvas.apply(void 0, _toConsumableArray(rgba));
      document.getElementById('colors-picker-dialog_canvas2').style.backgroundImage = 'linear-gradient(to right, #f000, rgb(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + '))'; // 修改颜色位置

      document.getElementById('colors-picker-dialog_canvas1_btn').style.left = calcDeepWidthColor.apply(void 0, _toConsumableArray(rgba)) * 200 - 11 + 'px'; // 修改透明度位置

      document.getElementById('colors-picker-dialog_canvas2_btn').style.left = rgba[3] * 200 - 11 + 'px'; // 修改颜色

      document.getElementById('colors-picker-dialog_color').style.backgroundColor = 'rgba(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + ',' + rgba[3] + ')'; // 标题

      document.getElementById('colors-picker-dialog_move').innerText = title;
      /**
       * 显示出来
       */

      dialog.style.display = 'block';
    };

    xhtml.bind(target, 'click', doit);
  }

  var ColorsPicker = function ColorsPicker(el, initColor) {
    var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '选择颜色';
    // 挂载点和颜色
    var target = el;
    var color = formatColor(initColor); // 颜色回调方法

    var callbacks = [];
    var ColorsPickerInstance = {
      /**
       * ColorsPicker(el,'red','title').then(color=>{
       *      // todo
       * })
       */
      then: function then(callback) {
        callbacks.push(callback);
        return ColorsPickerInstance;
      }
    }; // 绑定到页面中去

    mount(target, color, function (_color) {
      var _iterator = _createForOfIteratorHelper(callbacks),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var callback = _step.value;
          callback(_color);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }, title);
    return ColorsPickerInstance;
  };

  var helpEl = null,
      doback;

  ColorsPicker.openPicker = function (initColor, _doback) {
    var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '选择颜色';
    doback = _doback;

    if (helpEl === null) {
      helpEl = document.createElement('button');
      ColorsPicker(helpEl, initColor, title).then(function (color) {
        doback(color);
      });
    } else {
      var color = formatColor(initColor);
      var dialog = document.getElementById('colors-picker-dialog'); // 修改标题

      document.getElementById('colors-picker-dialog_move').innerText = title; // 修改颜色

      dialog._colors_picker_.color_rgb = [color[0], color[1], color[2]];
      dialog._colors_picker_.color_alpha = color[3];
      dialog._colors_picker_.target._color_ = color;
    }

    helpEl.click();
  }; // 判断当前环境，如果不是浏览器环境


  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    module.exports = ColorsPicker;
  } // 浏览器环境下
  else {
    window.ColorsPicker = ColorsPicker;
  }

}());
