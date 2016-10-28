## jquery.pagination.js

[![npm](https://img.shields.io/badge/npm-1.1.0-blue.svg)](https://www.npmjs.com/package/upload-preview)
[![lisence](https://img.shields.io/badge/LISENCE-MIT-green.svg)](https://github.com/Alex-xd/preview-upload)

> A light 、highly customizability and very easy use jquery plugin for pagination ^ ^

![preview](http://o6x2vif88.bkt.clouddn.com/Screen%20Shot%202016-10-29%20at%2001.04.52.png)

史上易用性最强的分页插件，压缩后仅为4kb

- 多条件动态分页实例
- 提供多种API接口以供扩展功能
- 自定义回调函数支持
- 可自定义页码显示数量
- 可自定义按钮名称
- 可选的省略号、首页尾页按钮
- 样式完全可自定义化（默认不加载任何样式，干净利落，根据需求添加样式）
- 所有元素类名可自定义


## Usage

**方法一：直接引入**

```html
<script src="jquery.min.js"></script>
<script src="jquery.pagination.min.js"></script>

<div id="pager"></div>

<script>
//这里列出了4个常用的设置，不设置就采用默认配置
var pager = $('#pager').paginate({
        pageIndex: 0, //当前页数
        totlePageCount: 16, //总页数
        maxBtnCount: 7, //按钮数量最多有
        styleURL: './defaultStyles/style1.css' //样式路径 默认无样式
});
</script>
```

<br>
**方法二：npm安装**

`npm install jquery-pagination` 

then use `npm test` if u want.

## You want More

#### 可选配置和API

|名称|类型|作用|默认值|
|--- |---|---|---|
|pageIndex|Number|当前页码|0|
|totlePageCount|Number|总页码|16|
|maxBtnCount|Number|最大显示按钮数量|7|
|hasDots|Boolean|是否显示省略号|true|
|hasFirstLast|Boolean|是否开启首尾页跳转功能|true|
|styleURL|String|自定义样式路径（默认不加载样式）|空字符串|
|btnClass|String|数字按钮类名|'pager-numbtn'|
|pageTurnClass|String|翻页按钮类名|'pager-turnbtn'|
|firstLastClass|String|首页尾页按钮类名|'pager-flbtn'|
|prevPageName|String|"上一页"标签文字|'prev'|
|nextPageName|String|"下一页"标签文字|'next'|
|firstPageName|String|"首页"标签文字|'First Page'|
|lastPageName|String|"尾页"标签文字|'Last Page'|

<br>
## API
先创建实例

```javascript
var pager = $('#pager').paginate();
```


### pager.set(option, value)
更改配置属性

@param {String} option 要设置的配置属性

@param {String}{Number}{Boolean} value 要设置的值


### pager.getPageIndex()

获取当前页

@param  {Number} pageIndex 要跳转到的页码（值为实际页码减一，如：跳到第3页就传入2）

### pager.turnToPage(pageIndex)

跳转页码

@param  {Number} pageIndex 要跳转到的页码（值为实际页码减一，如：跳到第3页就传入2）

<br>

## LISENCE
MIT