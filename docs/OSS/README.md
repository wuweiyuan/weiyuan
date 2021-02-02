## 阿里云 OSS 安装

```js
npm i --save ali-oss
//然后在需要的页面引入
import OSS from "ali-oss";
```

## OSS 使用

```js
//在vue里面使用的话，需要创建一个新的对象
data() {
    return {
      client: new OSS({
        region: "oss-cn-beijing",//Endpoint（地域节点）不要带.aliyuncs.com
        bucket: "wayne999",//名称跟OSS创建的名称一样
        accessKeyId: "",//阿里云AccessKey管理
        accessKeySecret: ""//阿里云AccessKey管理
      }),
    };
  },
//上传图片
//接受两个参数，一个是图片名称，还有一个是图片对象（通过input的dom元素可以拿到）
new Promise((resolve, reject) => {
    this.client
        .put(`${Math.random()}-${img.name}`, img)
        .then(res => {
        console.log("成功了", res);
        resolve(res.url);
        })
        .catch(err => {
        console.log("失败了", err);
        reject(err);
        });
    })
//使用手册https://help.aliyun.com/document_detail/64041.html?spm=a2c4g.11186623.6.1491.3a84f2eeQOLPAy
```
