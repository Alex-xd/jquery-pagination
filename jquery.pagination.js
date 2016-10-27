/**
 * jquery.pagination.js 
 *
 * @author Alexxd
 * @version v1.0.0
 * @license MIT - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * https://github.com/Alex-xd/jquery-pagination
 *
 * Copyright (c) 2016, Alexxd
 */
;(function($) {

    'use strict'

    var defaults = {
        pageIndex: 0, //当前页数
        totlePageCount: 16, //总页数
        maxBtnCount: 8 //按钮最多有
    }

    function Pager($elem, options) {
        //this是pager实例对象
        this.$elem = $elem;
        this.options = $.extend({}, defaults, options);
        this.init();
    }
    Pager.prototype = {
            constructor: Pager,
            init: function() {
                //this是pager实例对象
                this._render();
                this._bind();
            },
            _render: function() {
                var options = this.options,
                    html = [];

                // 如果按钮数比总页数还多，就按总页数渲染按钮
                options.maxBtnCount = options.maxBtnCount < options.totlePageCount ? options.maxBtnCount : options.totlePageCount;

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

                //添加按钮
                for (var i = frame.left; i <= frame.right; i++) {
                    if (i === options.pageIndex) {
                        html.push('<a href=javascript:; data-page="' + i + '" style="background-color:#20caab;">' + (i + 1) + '</a> ');
                    } else {
                        html.push('<a href=javascript:; data-page="' + i + '">' + (i + 1) + '</a> ');
                    }
                }
                //添加省略号
                if (frame.left > 0) {
                    html.unshift('<span data-page="' + frame.left + '">...</span>');
                }
                if (frame.right < options.totlePageCount - 1) {
                    html.push('<span data-page="' + frame.right + '">...</span>');
                }
                //添加翻页
                html.unshift('<a href=javascript:; data-page="' + (Math.max(0, options.pageIndex - 1)) + '">上一页</a> ');
                html.push(' <a href=javascript:; data-page="' + (Math.min(options.totlePageCount, options.pageIndex + 1)) + '">下一页</a><br><br>');

                this.$elem.html(html);
            },
            _bind: function() {
                var self = this;

                self.$elem.on('click', function(e) {
                    self.options.pageIndex = parseInt(e.target.getAttribute('data-page'), 10);
                    self._render();
                });
            }
        }
        //TODO:1、再添加一些API（获取当前页，获取总页数，回调函数等） 2、添加几个样式供用户选择
    $.fn.paginate = function(options) {
        return new Pager($(this), options);
    }
}(jQuery))
