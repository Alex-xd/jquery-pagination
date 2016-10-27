## jquery.pagination.js

[![npm](https://img.shields.io/badge/npm-1.0.0-blue.svg)](https://www.npmjs.com/package/upload-preview)
[![lisence](https://img.shields.io/badge/LISENCE-MIT-green.svg)](https://github.com/Alex-xd/preview-upload)

> A light and very easy use jq-plugin for pagination. 

使用超简单的jQuery分页插件，只提供原始功能，根据自己的需求随意添加样式！代码简洁高效。

## Usage

**方法一：直接引入**

```html
<script src="jquery.min.js"></script>
<script src="jquery.pagination.js"></script>

<div id="pager"></div>

<script>
$('#pager').paginate({
    pageIndex: 0, 		//初始页（0为第一页）
    totlePageCount: 16, //总页数
    maxBtnCount: 5 		//按钮显示个数
});
</script>
```

<br>
**方法二：npm安装**

`npm install jquery-pagination` 

then use `npm test` if u want.

## More

正在开发中，欢迎prissuestarforkwatchwhatever

## LISENCE
MIT