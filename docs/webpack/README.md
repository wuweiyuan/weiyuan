## 入口(entry)

```js
//webpack应该使用哪个模块，来作为构建其内部依赖的开始。
module.exports = {
  entry: " ./path/ to/my/entry/file.js",
};
```

## 出口（output）

```js
//output属性告诉webpak在哪里输出它所创建的bundle，以及如何命名这些文件
const path = require(" path");
module.exports = {};
```

## loader

```js
//loader让webpack能够去处理其他类型的文件，并将它们转换为有效模块
module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, //排除哪些不需要转化的文件
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "entry",
                },
              ],
            ],
          },
        },
      },
    ],
  },
```

## 插件(plugin)

```js
//loder用于转换某些类型的模块，而插件则可以用于执行范围更广的任务
```

## 模式(mode)

```js
//通过选择development，production或none之中的一个，来设置mode参数
```

## 运行项目内部的依赖而不是全局的

```js
npx webpack
```

## 安装 html-webpack-plugin 插件

```js
npm i html-webpack-plugin --save-dev

npm i html-webpack-plugin --D
//效果是一样的
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "index.js", //打包完生成的文件名
  },
  plugins: [new HtmlWebpackPlugin({
      template: "./src/index.html", //根据该模版，而不是用默认的模版
    }),],
};
```

## 安装 copy-webpack-pulgin

```js
//不被打包。直接复制到dist里面，那些静态文件有用
npm install copy-webpack-plugin --save-dev
const CopyPlugin = require("copy-webpack-plugin");
plugins: [


    new CopyPlugin({
      patterns: [{ from: "static", to: "static" }],
    }),
  ],
```

## 安装 clean-webpack-plugin

```js
//作用是自定清除dist目录
npm install --save-dev clean-webpack-plugin
```

## 优化

可以创建一个 build 的文件夹
<img  src='/image/webpackBuild.jpg'/>
<img src='/image/webpackMerge.jpg'/>
<img src='/image/webpackPackjson.jpg'/>

## babel 配置

```js
//babel就是javascript的编辑器，转化为浏览器能认识的代码
//安装
npm install -D babel-loader @babel/core @babel/preset-env

module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, //排除哪些不需要转化的文件
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "entry",
                },
              ],
            ],
          },
        },
      },
    ],
  },
```
