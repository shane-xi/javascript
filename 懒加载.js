/**
 * Created by yujiping on 15/10/26.
 */
(function(win, lib) {
    //节流函数
    function throttle(func, wait) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        var later = function () {
            previous = Date.now();
            timeout = null;
            result = func.apply(context, args);
        };
        return function () {
            var now = Date.now();
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0) {
                clearTimeout(timeout);
                timeout = null;
                previous = now;
                result = func.apply(context, args);
            } else if (!timeout) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    }

    function extend(target, obj) {
        var result = {};
        for (var k in target) {
            if (target.hasOwnProperty(k)) {
                result[k] = target[k];
            }
        }
        for (var k2 in obj) {
            if (obj.hasOwnProperty(k2)) {
                result[k2] = obj[k2];
            }
        }
        return result;
    }

    function getOffset(obj, param) {
        if (!obj) {
            return;
        }
        if (!param) {
            param = {x: 0, y: 0};
        }

        if (obj != window) {
            var el = obj.getBoundingClientRect();
            var l = el.left;
            var t = el.top;
            var r = el.right;
            var b = el.bottom;
        } else {
            l = 0;
            t = 0;
            r = l + obj.innerWidth;
            b = t + obj.innerHeight;
        }
        return {
            'left': l,
            'top': t,
            'right': r + param.x,
            'bottom': b + param.y
        };
    }

    //元素位置比较
    function compareOffset(d1, d2) {
        var left = d2.right > d1.left && d2.left < d1.right;
        var top = d2.bottom > d1.top && d2.top < d1.bottom;
        return left && top;
    }

    //配置参数
    var defaultConfig = {
        // 'container':document,
        'class': 'lazyload-img',//img 样式名称
        'dataSrc': 'data-src',
        'size': '200x200',//cdn尺寸
        'sharpen': '100sh',//锐化参数
        'q': '90q',//图片质量,
        'lazyHeight': 0,
        'lazyWidth': 0,
        'fireEvent': 'scroll'
    };

    function imgHelper (options) {
        this._init(options);
    }

    imgHelper.prototype._init = function (options) {
        this.config = extend(defaultConfig, options || {});
        this.config.class = this.config.class.charAt(0) !== '.' ? this.config.class : this.config.class.slice(1);
        if (this.config.fireEvent === 'scroll') {
            this.bindLazyEvent();
        }
    };

    imgHelper.prototype.fireLazyload =  function () {
        this._loadImg();
    };

    //绑定懒加载所需的事件
    imgHelper.prototype.bindLazyEvent = function () {
        var self = this;
        var scrollHandler = throttle(self._loadImg, 100);
        if(this.config.container){
            this.config.container.addEventListener('scroll', function (){
                scrollHandler.call(self);
            }, false);
        }
        else{
            window.addEventListener('scroll', function (){
                scrollHandler.call(self);
            }, false);
        }
    };

    //加载可视区域内的 懒加载图
    imgHelper.prototype._loadImg = function () {
        var self = this;
        var opts = self.config;
        var container = opts.container || document;
        var lazyImgs = Array.prototype.slice.call(container.querySelectorAll('.' + opts.class));
        var srcAttr = opts.dataSrc;
        var winOffset = getOffset(window, {
            'x': opts.lazyWidth,
            'y': opts.lazyHeight
        });
        if (lazyImgs.length) {
            lazyImgs.forEach(function (el, index) {
                var dataSrc = el.getAttribute(srcAttr);
                if (dataSrc) {
                    var elOffset = getOffset(el);
                    var isInViewport = compareOffset(winOffset, elOffset);
                    if (isInViewport) {
                        dataSrc = self.getBestImgUrl(dataSrc, el);
                        self.preloadImg(dataSrc, function () {
                            el.removeAttribute(srcAttr);
                            if (el.tagName === 'IMG') {
                                el.setAttribute('src', dataSrc);
                            } else {
                                //非图片元素设置其backgroundImage为真实src
                                el.style.backgroundImage = 'url(' + dataSrc + ')';
                            }
                            el.className = el.className.replace(new RegExp('(^|\\s)' + opts.class + '(\\s|$)'), '');
                        }, function () {
                            el.className = el.className.replace(new RegExp('(^|\\s)' + opts.class + '(\\s|$)'), '');
                        });
                    }
                }
            });
        }
    };

    /**
     * 获取优化的cdn图片
     * @param url {String} 图片地址
     * @param el {Element} 图片节点
     * @returns {*}
     */
    imgHelper.prototype.getBestImgUrl = function (url, el) {
        var suffer = url.match(/\.(jpg|png|gif|webp)$/g);
        suffer = suffer ? suffer[0] : '.jpg';
        if (suffer === '.png' || el.getAttribute('data-cdn') === 'no') return url;

        var opts = this.config;
        var dataSize = el ? el.getAttribute('data-size') : '';
        var dataQuality = el ? el.getAttribute('data-quality') : '';
        var imgSize;
        var sharpen = opts.sharpen ? '_' + opts.sharpen : '_100sh';
        var quality = dataQuality || (opts.q ? opts.q : '90q');
        var size = '';

        if (dataSize) {
            if (dataSize !== 'no') {
                imgSize = dataSize.split('x');
            } else {
                imgSize = [];
            }
        } else {
            imgSize = opts.size.split('x');
        }

        if (imgSize[0] && imgSize[1]) {
            size = imgSize[0] + 'w_' + imgSize[1] + 'h_';
        }

        return url + '@' + size + quality + sharpen + suffer;
    };


    /**
     * 加载大图
     * @param url {String} 图片链接
     * @param success {Function} 成功回调函数
     * @param error {Function} 失败回调函数
     */
    imgHelper.prototype.preloadImg = function (url, success, error) {
        var img = new Image();
        img.onload = function () {
            success && success();
            img.onload = img.onerror = null;
        };
        img.onerror = function () {
            error && error();
            img.onload = img.onerror = null;
        };
        img.src = url;
        // 如果图片已经存在于浏览器缓存，直接调用回调函数
        if (img.complete) {
            success && success();
            img.onload = img.onerror = null;
        }
    };

    lib.img = imgHelper;
})(window, window['SGLib'] || (window['SGLib'] = {}));