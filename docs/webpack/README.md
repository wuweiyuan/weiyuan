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
## 五个核心概念
```sh
1.Entry
入口(Entry)：指示 webpack 以哪个文件为入口起点开始打包，分析构建内部依赖图。

2. Output
输出(Output)：指示 webpack 打包后的资源 bundles 输出到哪里去，以及如何命名。

3. Loader
Loader：让 webpack 能够去处理那些非 JS 的文件，比如样式文件、图片文件(webpack 自身只理解
JS)

4. Plugins
插件(Plugins)：可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，
一直到重新定义环境中的变量等。

5. Mode
指示 webpack 使用相应模式的配置。通过选择development，production或none之中的一个，来设置mode参数
```

## webpack笔记
```sh
初始化 package.json：npm init

下载安装webpack：(webpack4以上的版本需要全局/本地都安装webpack-cli)

全局安装：cnpm i webpack webpack-cli -g

本地安装：cnpm i webpack webpack-cli -D
开发环境：webpack ./src/index.js -o ./build/built.js --mode=development


webpack 本身能处理 js/json 资源，不能处理 css/img 等其他资源

生产环境和开发环境将 ES6 模块化编译成浏览器能识别的模块化，但是不能处理 ES6 的基本语法转化为 ES5（需要借助 loader）

生产环境比开发环境多一个压缩 js 代码
```

## webpack.config.js配置相关解释
```js
// resolve用来拼接绝对路径的方法
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 引用plugin

module.exports = {
  // webpack配置
  entry: './src/js/index.js', // 入口起点
  output: {
    // 输出
    // 输出文件名
    filename: 'js/build.js',
    // __dirname是nodejs的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname, 'build'), // 输出路径，所有资源打包都会输出到这个文件夹下
  },
  // loader配置
  module: {
    rules: [
      // 详细的loader配置
      // 不同文件必须配置不同loader处理
      {
        // 匹配哪些文件
        test: /\.less$/,
        // 使用哪些loader进行处理
        use: [
          // use数组中loader执行顺序：从右到左，从下到上，依次执行(先执行css-loader)
          // style-loader：创建style标签，将js中的样式资源插入进去，添加到head中生效
          'style-loader',
          // css-loader：将css文件变成commonjs模块加载到js中，里面内容是样式字符串
          'css-loader',
          // less-loader：将less文件编译成css文件，需要下载less-loader和less
          'less-loader'
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // url-loader：处理图片资源，问题：默认处理不了html中的img图片
        test: /\.(jpg|png|gif)$/,
        // 需要下载 url-loader file-loader
        loader: 'url-loader',
        options: {
          // 图片大小小于8kb，就会被base64处理，优点：减少请求数量（减轻服务器压力），缺点：图片体积会更大（文件请求速度更慢）
          // base64在客户端本地解码所以会减少服务器压力，如果图片过大还采用base64编码会导致cpu调用率上升，网页加载时变卡
          limit: 8 * 1024,
          // 给图片重命名，[hash:10]：取图片的hash的前10位，[ext]：取文件原来扩展名
          name: '[hash:10].[ext]',
          // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是conmonjs，解析时会出问题：[object Module]
          // 解决：关闭url-loader的es6模块化，使用commonjs解析
          esModule: false,
          outputPath: 'imgs',
        },
      },
      {
        test: /\.html$/,
        // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
        loader: 'html-loader',
        options:{
                    esModule:false
                }
      },
      // 打包其他资源(除了html/js/css资源以外的资源)
      {
        // 排除html|js|css|less|jpg|png|gif文件
        exclude: /\.(html|js|css|less|jpg|png|gif)/,
        // file-loader：处理其他文件
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media',
        },
      },
    ],
  },
  // plugin的配置
  plugins: [
    // html-webpack-plugin：默认会创建一个空的html文件，自动引入打包输出的所有资源（JS/CSS）
    // 需要有结构的HTML文件可以加一个template
    new HtmlWebpackPlugin({
      // 复制这个./src/index.html文件，并自动引入打包输出的所有资源（JS/CSS）
      template: './src/index.html',
    }),
  ],
  // 模式
  mode: 'development', // 开发模式
  // 开发服务器 devServer：用来自动化，不用每次修改后都重新输入webpack打包一遍（自动编译，自动打开浏览器，自动刷新浏览器）
  // 特点：只会在内存中编译打包，不会有任何输出（不会像之前那样在外面看到打包输出的build包，而是在内存中，关闭后会自动删除）
  //要下载webpack-dev-server这个包
  // 启动devServer指令为：npx webpack-dev-server
  //本机启动devServer指令为：npx webpack serve
  devServer: {
    // 项目构建后路径
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true,
  },
}
```
```sh
webpack 会将打包结果输出出去（build文件夹）
npx webpack serve 只会在内存中编译打包，没有输出
css文件不能分类，因为解析在js中
```