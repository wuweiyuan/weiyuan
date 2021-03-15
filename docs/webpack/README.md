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

## webpack.config.js配置相关解释(开发环境)
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
css文件不能分类，因为解析在js中 //outputPath:'imgs'
loader 和 plugin 的不同：（plugin 一定要先引入才能使用）
​loader：1. 下载 2. 使用（配置 loader）
​plugins：1.下载 2. 引入 3. 使用
```
## webpack.config.js配置相关解释(生产环境)
```sh
而生产环境的配置需要考虑以下几个方面：

1.提取 css 成单独文件
2.css 兼容性处理
3.压缩 css
4.js 语法检查
5.js 兼容性处理
6.js 压缩
7.html 压缩
```
```js
//下面是一个基本的生产环境下的webpack.config.js配置
const { resolve } = require('path')
const MiniCssExtractorPlugin = require('mini-css-extract-plugin')
const OptimiziCssAssetsWebpackPlugin = require('optimizi-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 定义node.js的环境变量，决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production'

// 复用loader的写法
const commonCssLoader = [
  // 这个loader取代style-loader。作用：提取js中的css成单独文件然后通过link加载
  MiniCssExtractPlugin.loader,
  // css-loader：将css文件整合到js文件中
  // 经过css-loader处理后，样式文件是在js文件中的
  // 问题：1.js文件体积会很大2.需要先加载js再动态创建style标签，样式渲染速度就慢，会出现闪屏现象
  // 解决：用MiniCssExtractPlugin.loader替代style-loader
  'css-loader',
  /*
    postcss-loader：css兼容性处理：postcss --> 需要安装：postcss-loader postcss-preset-env
    postcss需要通过package.json中browserslist里面的配置加载指定的css兼容性样式
    在package.json中定义browserslist：
    "browserslist": {
      // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
      "development": [ // 只需要可以运行即可
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
      ],
      // 生产环境。默认是生产环境
      "production": [ // 需要满足绝大多数浏览器的兼容
        ">0.2%",
        "not dead",
        "not op_mini all"
      ]
    },
  */
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions:{
        ident: 'postcss', // 基本写法
        //这样打包就有兼容性代码了
        plugins:[
            require('postcss-preset-env')
        ],
        //这样写就没有兼容性代码
          // plugins: () => [
          //     // postcss的插件
          //     require('postcss-preset-env')()
          //   ]
      }
      
      plugins: () => [
        // postcss的插件
        require('postcss-preset-env')(),
      ],
    },
  },
]

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...commonCssLoader],
      },
      {
        test: /\.less$/,
        use: [...commonCssLoader, 'less-loader'],
      },
      /*
        正常来讲，一个文件只能被一个loader处理
        当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序
        先执行eslint再执行babel（用enforce）
      */
      {
        /*
          js的语法检查： 需要下载 eslint-loader eslint
          注意：只检查自己写的源代码，第三方的库是不用检查的
          airbnb(一个流行的js风格) --> 需要下载 eslint-config-airbnb-base eslint-plugin-import
          设置检查规则：
            package.json中eslintConfig中设置
              "eslintConfig": {
                "extends": "airbnb-base"， // 继承airbnb的风格规范
                "env": {
                  "browser": true // 可以使用浏览器中的全局变量(使用window不会报错)
                }
              }
        */
        test: /\.js$/,
        exclude: /node_modules/, // 忽略node_modules
        enforce: 'pre', // 优先执行
        loader: 'eslint-loader',
        options: {
          // 自动修复
          fix: true,
        },
      },
      /*
        js兼容性处理：需要下载 babel-loader @babel/core
          1. 基本js兼容性处理 --> @babel/preset-env
            问题：只能转换基本语法，如promise高级语法不能转换
          2. 全部js兼容性处理 --> @babel/polyfill
            问题：只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了
          3. 需要做兼容性处理的就做：按需加载  --> core-js
      */
      {
        // 第三种方式：按需加载
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设：指示babel做怎样的兼容性处理
          presets: [
            '@babel/preset-env', // 基本预设
            {
              useBuiltIns: 'usage', //按需加载
              corejs: { version: 3 }, // 指定core-js版本
              targets: { // 指定兼容到什么版本的浏览器
                chrome: '60',
                firefox: '50',
                ie: '9',
                safari: '10',
                edge: '17'
              },
            },
          ],
        },
      },
      {
        // 图片处理
        test: /\.(jpg|png|gif)/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'imgs',
          esModule: false, // 关闭url-loader默认使用的es6模块化解析
        },
      },
      // html中的图片处理
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      // 处理其他文件
      {
        exclude: /\.(js|css|less|html|jpg|png|gif)/,
        loader: 'file-loader',
        options: {
          outputPath: 'media',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: 'css/built.css',
    }),
    // 压缩css
    new OptimiziCssAssetsWebpackPlugin(),
    // HtmlWebpackPlugin：html文件的打包和压缩处理
    // 通过这个插件会自动将单独打包的样式文件通过link标签引入
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 压缩html代码
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),
  ],
  // 生产环境下会自动压缩js代码
  mode: 'production',
}
```

## 开发环境性能优化
```sh
1.HMR（模块热替换）
  HMR: hot module replacement 热模块替换 / 模块热替换

  作用：一个模块发生变化，只会重新打包构建这一个模块（而不是打包所有模块） ，极大提升构建速度

  代码：只需要在 devServer 中设置 hot 为 true，就会自动开启HMR功能（只能在开发模式下使用）但是我的电脑不生效，还需加多一项配置    
    target:"web"

    devServer: {
      contentBase: resolve(__dirname, 'build'),
      compress: true,
      port: 3000,
      open: true,
      // 开启HMR功能
      // 当修改了webpack配置，新配置要想生效，必须重启webpack服务
      hot: true
    }
  每种文件实现热模块替换的情况：

    样式文件：可以使用HMR功能，因为开发环境下使用的 style-loader 内部默认实现了热模块替换功能

    js 文件：默认不能使用HMR功能（修改一个 js 模块所有 js 模块都会刷新）

      --> 实现 HMR 需要修改 js 代码（添加支持 HMR 功能的代码）
      // 绑定
      if (module.hot) {
        // 一旦 module.hot 为true，说明开启了HMR功能。 --> 让HMR功能代码生效
        module.hot.accept('./print.js', function() {
          // 方法会监听 print.js 文件的变化，一旦发生变化，只有这个模块会重新打包构建，其他模块不会。
          // 会执行后面的回调函数
          print();
        });
      }
      注意：HMR 功能对 js 的处理，只能处理非入口 js 文件的其他文件。
    html 文件: 默认不能使用 HMR 功能（html 不用做 HMR 功能，因为只有一个 html 文件，不需要再优化）

      使用 HMR 会导致问题：html 文件不能热更新了（不会自动打包构建）

      解决：修改 entry 入口，将 html 文件引入（这样 html 修改整体刷新）

      entry: ['./src/js/index.js', './src/index.html']

2.source-map
  source-map：一种提供源代码到构建后代码的映射的技术 （如果构建后代码出错了，通过映射可以追踪源代码错误）

  参数：[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

  代码：

    devtool: 'eval-source-map'
  可选方案：[生成source-map的位置|给出的错误代码信息]

    source-map：外部，错误代码准确信息 和 源代码的错误位置

    inline-source-map：内联，只生成一个内联 source-map，错误代码准确信息 和 源代码的错误位置

    hidden-source-map：外部，错误代码错误原因，但是没有错误位置（为了隐藏源代码），不能追踪源代码错误，只能提示到构建后代码的错误位置

    eval-source-map：内联，每一个文件都生成对应的 source-map，都在 eval 中，错误代码准确信息 和 源代码的错误位

    nosources-source-map：外部，错误代码准确信息，但是没有任何源代码信息（为了隐藏源代码）

    cheap-source-map：外部，错误代码准确信息 和 源代码的错误位置，只能把错误精确到整行，忽略列

    cheap-module-source-map：外部，错误代码准确信息 和 源代码的错误位置，module 会加入 loader 的 source-map
  内联 和 外部的区别：1. 外部生成了文件，内联没有 2. 内联构建速度更快

  开发/生产环境可做的选择：

  开发环境：需要考虑速度快，调试更友好

    速度快( eval > inline > cheap >... )

      eval-cheap-souce-map

      eval-source-map

    调试更友好

      souce-map

      cheap-module-souce-map

      cheap-souce-map
    最终得出最好的两种方案 --> eval-source-map（完整度高，内联速度快） / eval-cheap-module-souce-map（错误提示忽略列但是包含其他信息，内联速度快）
  生产环境：需要考虑源代码要不要隐藏，调试要不要更友好

    内联会让代码体积变大，所以在生产环境不用内联

    隐藏源代码

      nosources-source-map 全部隐藏
      hidden-source-map 只隐藏源代码，会提示构建后代码错误信息
    最终得出最好的两种方案 --> source-map（最完整） / cheap-module-souce-map（错误提示一整行忽略列）
```