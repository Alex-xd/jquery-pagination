/**
 * jquery.pagination.js 
 *
 * @author Alexxd
 * @version v1.1.0
 * @license MIT - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * https://github.com/Alex-xd/jquery-pagination
 *
 * Copyright (c) 2016, Alexxd
 */
;
(function($) {

    'use strict'

    var defaults = {
        pageIndex: 0, //当前页数
        totlePageCount: 16, //总页数
        maxBtnCount: 7, //按钮数量最多有
        hasDots: true, //是否显示省略号
        hasFirstLast: true, //是否开启首尾页跳转功能
        btnClass: 'pager-numbtn', //数字按钮类名
        pageTurnClass: 'pager-turnbtn', //翻页按钮类名
        firstLastClass: 'pager-flbtn', //首页尾页按钮类名
        prevPageName: 'prev', //“上一页”标签文字
        nextPageName: 'next', //“下一页”标签文字
        firstPageName: 'First Page',
        lastPageName: 'Last Page',
        styleURL: '' //自定义样式路径 默认无样式
    };

    function Pager($elem, options, callback) {
        this.$elem = $elem;
        this.options = $.extend({}, defaults, options);
        this.init();
        if (callback) {
            callback();
        }
    }
    Pager.prototype = {
        constructor: Pager,
        init: function() {
            var self = this;

            //1.加载样式
            if (self.options.btnClass !== 'pager-numbtn') {
                console.error('(jquery.pagination) Error:样式加载失败！  Reason:按钮类名不正确,请将 btnClass 属性设为 \'pager-numbtn\' 或不设置');
            } else if (self.options.pageTurnClass !== 'pager-turnbtn') {
                console.error('(jquery.pagination) Error:样式加载失败！  Reason:按钮类名不正确,请将 pageTurnClass 属性设为 \'pager-turnbtn\' 或不设置');
            } else if (self.options.firstLastClass !== 'pager-flbtn') {
                console.error('(jquery.pagination) Error:样式加载失败！  Reason:按钮类名不正确,请将 firstLastClass 属性设为 \'pager-flturn\' 或不设置');
            } else if ($('link').toArray().some(function(elem, index, array) {
                    //判断页面是否存在同名样式文件
                    return elem.getAttribute('href') === self.options.styleURL;
                })) {
                console.warn('(jquery.pagination) Warn: ' + '"' + self.options.styleURL + '"' + '加载失败! ' + '您的页面已存在一个' + '"' + self.options.styleURL.slice(self.options.styleURL.lastIndexOf('/') + 1) + '"' + '文件!');
            } else if (self.options.styleURL) {
                $('head').append('<link rel="stylesheet" href="' + self.options.styleURL + '">');
            } else {
                console.error('Error: Something Wrong. Maybe you can put an issue at ' + "https://github.com/Alex-xd/jquery-pagination/issues" + '')
            }

            //2.渲染HTML
            self._render();

            //3.绑定事件
            self._bind();
        },
        _render: function() {
            var options = this.options,
                html = [];

            //若总页数比最大数字按钮数还小，则令数字按钮数等于总页数
            this.options.maxBtnCount = this.options.maxBtnCount < this.options.totlePageCount ? this.options.maxBtnCount : this.options.totlePageCount;

            //定义按钮渲染边界
            var frame = {
                left: 0,
                right: 0
            };
            //判断当前页码左侧和右侧是否触边（把frame想象成一个左右移动的框架，只在frame的范围内渲染对应的按钮）
            if ((options.pageIndex - Math.floor(options.maxBtnCount / 2)) <= 0) {
                frame.left = 0;
                frame.right = frame.left + options.maxBtnCount - 1;
            } else if ((options.pageIndex + Math.floor(options.maxBtnCount / 2)) >= options.totlePageCount - 1) {
                frame.right = options.totlePageCount - 1;
                frame.left = frame.right - options.maxBtnCount + 1;
            } else {
                frame.left = options.pageIndex - Math.floor(options.maxBtnCount / 2);
                //奇数不减一  偶数减一
                frame.right = options.pageIndex + Math.ceil(options.maxBtnCount / 2) - 1;
            }

            /**
             * 渲染模板函数
             * @param  {Array} className 类名
             * @param  {Number} data-page 属性页码
             * @param  {String} content 内容
             * @return {String} 
             */
            function __template(className, data_page, content) {
                return '<a href=javascript:; class="' + className.join(' ') + '" data-page="' + data_page + '">' + (content) + '</a> ';
            }
            //渲染数字按钮
            for (var i = frame.left; i <= frame.right; i++) {
                if (i === options.pageIndex) {
                    html.push(__template([options.btnClass, 'on'], i, i + 1));
                } else {
                    html.push(__template([options.btnClass], i, i + 1));
                }
            }

            //渲染省略号
            if (options.hasDots) {
                if (frame.left > 0) {
                    html.unshift(__template([options.btnClass], frame.left, '...'));
                }
                if (frame.right < options.totlePageCount - 1) {
                    html.push(__template([options.btnClass], frame.right, '...'));
                }
            }

            //渲染翻页按钮
            html.unshift(__template([options.pageTurnClass], Math.max(0, options.pageIndex - 1), options.prevPageName));
            html.push(__template([options.pageTurnClass], Math.min(options.totlePageCount, options.pageIndex + 1), options.nextPageName));

            //渲染首尾页跳转按钮
            if (options.hasFirstLast) {
                html.unshift(__template([options.firstLastClass], 0, options.firstPageName));
                html.push(__template([options.firstLastClass], options.totlePageCount - 1, options.lastPageName));
            }

            this.$elem.html(html);
        },
        _bind: function() {
            var self = this;
            self.$elem.on('click', 'a', function(e) {
                self.options.pageIndex = parseInt(e.target.getAttribute('data-page'), 10);
                self._render();
            });
        },
        /**
         * 更改配置属性
         * @param {String} option 要设置的配置属性
         * @param {String}{Number}{Boolean} value 要设置的值
         */
        set: function(option, value) {
            this.options[option] = value;
            this._updateOptions();
            this._render();
        },
        /**
         * 获取当前页
         * @return {Number} 当前页码（值为实际页码减一  如：第1页返回）
         */
        getPageIndex: function() {
            return this.options.pageIndex;
        },
        /**
         * 跳转页码
         * @param  {Number} pageIndex 要跳转到的页码（值为实际页码减一，如：跳到第3页就传入2）
         */
        turnToPage: function(pageIndex) {
            this.options.pageIndex = pageIndex;
            this._render();
        }
    }

    $.fn.paginate = function(options, callback) {
        return new Pager($(this), options, callback);
    }
}(jQuery))
