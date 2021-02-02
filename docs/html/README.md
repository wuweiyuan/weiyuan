## 上传文件只上传图片 accept="image/\*"

```js
<input
  type="file"
  multiple
  id="upload"
  style="display:none"
  accept="image/*"
  ref="fileDom"
/>
```

## 获取上传图片信息

```js
//获取dom元素下的files字段
this.$refs.fileDom.files;
```

<img src='/image/imgDom.jpg'/>

## 转换单位

```js
const size = file.size / 1024 / 1024; //把单位转换为M
```
