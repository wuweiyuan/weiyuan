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
## 跑前台静态代码，需要服务
```js
//安装
sudo npm install http-server -g
//启动服务
http-server -p 8001
//本电脑已经全局安装http-server，以后直接http-server -p 8001 这样就可以本地启动本地服务了
```