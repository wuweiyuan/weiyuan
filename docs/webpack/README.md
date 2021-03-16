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

## 生产环境性能优化
```sh
1.oneOf
  oneOf：匹配到 loader 后就不再向后进行匹配，优化生产环境的打包构建速度
  代码：
    module: {
      rules: [
        {
          // js 语法检查
          test: /\.js$/,
          exclude: /node_modules/,
          // 优先执行
          enforce: 'pre',
          loader: 'eslint-loader',
          options: {
            fix: true
          }
        },
        {
          // oneOf 优化生产环境的打包构建速度
          // 以下loader只会匹配一个（匹配到了后就不会再往下匹配了）
          // 注意：不能有两个配置处理同一种类型文件（所以把eslint-loader提取出去放外面）
          oneOf: [
            {
              test: /\.css$/,
              use: [...commonCssLoader]
            },
            {
              test: /\.less$/,
              use: [...commonCssLoader, 'less-loader']
            },
            {
              // js 兼容性处理
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      useBuiltIns: 'usage',
                      corejs: {version: 3},
                      targets: {
                        chrome: '60',
                        firefox: '50'
                      }
                    }
                  ]
                ]
              }
            },
            {
              test: /\.(jpg|png|gif)/,
              loader: 'url-loader',
              options: {
                limit: 8 * 1024,
                name: '[hash:10].[ext]',
                outputPath: 'imgs',
                esModule: false
              }
            },
            {
              test: /\.html$/,
              loader: 'html-loader'
            },
            {
              exclude: /\.(js|css|less|html|jpg|png|gif)/,
              loader: 'file-loader',
              options: {
                outputPath: 'media'
              }
            }
          ]
        }
      ]
    },


2.缓存
  babel 缓存：类似 HMR，将 babel 处理后的资源缓存起来（哪里的 js 改变就更新哪里，其他 js 还是用之前缓存的资源），让第二次打包构建速度更快

  代码：
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: { version: 3 },
                targets: {
                  chrome: '60',
                  firefox: '50'
                }
              }
            ]
          ],
          // 开启babel缓存
          // 第二次构建时，会读取之前的缓存
          cacheDirectory: true
        }
      },

  文件资源缓存
    文件名不变，就不会重新请求，而是再次用之前缓存的资源
      hash: 每次 wepack 打包时会生成一个唯一的 hash 值。

​         问题：重新打包，所有文件的 hsah 值都改变，会导致所有缓存失效。（可能只改动了一个文件）

      chunkhash：根据 chunk 生成的 hash 值。来源于同一个 chunk的 hash 值一样

​         问题：js 和 css 来自同一个chunk，hash 值是一样的（因为 css-loader 会将 css 文件加载到 js 中，所以同属于一个chunk）

      contenthash: 根据文件的内容生成 hash 值。不同文件 hash 值一定不一样(文件内容修改，文件名里的 hash 才会改变)

         修改 css 文件内容，打包后的 css 文件名 hash 值就改变，而 js 文件没有改变 hash 值就不变，这样 css 和 js 缓存就会分开判断要不要重新请求资源 --> 让代码上线运行缓存更好使用
    
    代码：
      output: {
        filename: 'js/built.[contenthash:10].js',
        path: resolve(__dirname, 'build')
      },
       plugins: [
        new MiniCssExtractPlugin({
          filename: 'css/built.[contenthash:10].css'
        })
       ]

3.多进程打包
  多进程打包：某个任务消耗时间较长会卡顿，多进程可以同一时间干多件事，效率更高。
  优点是提升打包速度，缺点是每个进程的开启和交流都会有开销（babel-loader消耗时间最久，所以使用thread-loader针对其进行优化）

  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
      /* 
        thread-loader会对其后面的loader（这里是babel-loader）开启多进程打包。 
        进程启动大概为600ms，进程通信也有开销。(启动的开销比较昂贵，不要滥用)
        只有工作消耗时间比较长，才需要多进程打包
      */
      {
        loader: 'thread-loader',
        options: {
          workers: 2 // 进程2个
        }
      },
      {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: { version: 3 },
                targets: {
                  chrome: '60',
                  firefox: '50'
                }
              }
            ]
          ],
          // 开启babel缓存
          // 第二次构建时，会读取之前的缓存
          cacheDirectory: true
        }
      }
    ]
  },
4.externals
  externals：让某些库不打包，通过 cdn 引入
  webpack.config.js 中配置：
    externals: {
      // 拒绝jQuery被打包进来(通过cdn引入，速度会快一些)
      // 忽略的库名 -- npm包名
      jquery: 'jQuery'
    }
  需要在 index.html 中通过 cdn 引入：
    <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>

5.dll
  dll：让某些库单独打包，后直接引入到 build 中。可以在 code split 分割出 node_modules 后再用 dll 更细的分割，优化代码运行的性能。

  webpack.dll.js 配置：(将 jquery 单独打包)
    /*
      node_modules的库会打包到一起，但是很多库的时候打包输出的js文件就太大了
      使用dll技术，对某些库（第三方库：jquery、react、vue...）进行单独打包
      当运行webpack时，默认查找webpack.config.js配置文件
      需求：需要运行webpack.dll.js文件
        --> webpack --config webpack.dll.js（运行这个指令表示以这个配置文件打包）
    */
    const { resolve } = require('path');
    const webpack = require('webpack');

    module.exports = {
      entry: {
        // 最终打包生成的[name] --> jquery
        // ['jquery] --> 要打包的库是jquery
        jquery: ['jquery']
      },
      output: {
        // 输出出口指定
        filename: '[name].js', // name就是jquery
        path: resolve(__dirname, 'dll'), // 打包到dll目录下
        library: '[name]_[hash]', // 打包的库里面向外暴露出去的内容叫什么名字
      },
      plugins: [
        // 打包生成一个manifest.json --> 提供jquery的映射关系（告诉webpack：jquery之后不需要再打包和暴露内容的名称）
        new webpack.DllPlugin({
          name: '[name]_[hash]', // 映射库的暴露的内容名称
          path: resolve(__dirname, 'dll/manifest.json') // 输出文件路径
        })
      ],
      mode: 'production'
    };

  webpack.config.js 配置：(告诉 webpack 不需要再打包 jquery，并将之前打包好的 jquery 跟其他打包好的资源一同输出到 build 目录下)
    // 引入插件
    const webpack = require('webpack');
    const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

    // plugins中配置：
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      // 告诉webpack哪些库不参与打包，同时使用时的名称也得变
      new webpack.DllReferencePlugin({
        manifest: resolve(__dirname, 'dll/manifest.json')
      }),
      // 将某个文件打包输出到build目录下，并在html中自动引入该资源
      new AddAssetHtmlWebpackPlugin({
        filepath: resolve(__dirname, 'dll/jquery.js')
      })
    ],
```

## 优化代码运行的性能
```sh
1.缓存
2.tree shaking（树摇）
  tree shaking：去除无用代码
  前提：1. 必须使用 ES6 模块化 2. 开启 production 环境 （这样就自动会把无用代码去掉）
  作用：减少代码体积
  在package.json中配置：
  "sideEffects": false 表示所有代码都没有副作用（都可以进行 tree shaking）
  这样会导致的问题：可能会把 css / @babel/polyfill 文件干掉（副作用）
  所以可以配置："sideEffects": ["*.css", "*.less"] 不会对css/less文件tree shaking处理
3.code split（代码分割）
  代码分割。将打包输出的一个大的 bundle.js 文件拆分成多个小文件，这样可以并行加载多个文件，比加载一个文件更快。
  (1)多入口拆分
    entry: {
      // 多入口：有一个入口，最终输出就有一个bundle
      index: './src/js/index.js',
      test: './src/js/test.js'
    },
    output: {
      // [name]：取文件名
      filename: 'js/[name].[contenthash:10].js',
      path: resolve(__dirname, 'build')
    },
  (2)optimization
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
     将 node_modules 中的代码单独打包（大小超过30kb）
     自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk(比如两个模块中都引入了jquery会被打包成单独的文件)（大小超过30kb）
  (3)import 动态导入语法
    /*
      通过js代码，让某个文件被单独打包成一个chunk
      import动态导入语法：能将某个文件单独打包(test文件不会和index打包在同一个文件而是单独打包)
      webpackChunkName:指定test单独打包后文件的名字
    */
    import(/* webpackChunkName: 'test' */'./test')
      .then(({ mul, count }) => {
        // 文件加载成功~
        // eslint-disable-next-line
        console.log(mul(2, 5));
      })
      .catch(() => {
        // eslint-disable-next-line
        console.log('文件加载失败~');
      });
4.lazy loading（懒加载/预加载）
  (1)懒加载：当文件需要使用时才加载（需要代码分割）。但是如果资源较大，加载时间就会较长，有延迟。
  (2)正常加载：可以认为是并行加载（同一时间加载多个文件）没有先后顺序，先加载了不需要的资源就会浪费时间。
  (3)预加载 prefetch（兼容性很差）：会在使用之前，提前加载。等其他资源加载完毕，浏览器空闲了，再偷偷加载这个资源。这样在使用时已经加载好了，速度很快。所以在懒加载的基础上加上预加载会更好。
  代码：
  document.getElementById('btn').onclick = function() {
    // 将import的内容放在异步回调函数中使用，点击按钮，test.js才会被加载(不会重复加载)
    // webpackPrefetch: true表示开启预加载
    import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then(({ mul }) => {
      console.log(mul(4, 5));
    });
    import('./test').then(({ mul }) => {
      console.log(mul(2, 5))
    })
  };
5.pwa（离线可访问技术）
  pwa：离线可访问技术（渐进式网络开发应用程序），使用 serviceworker 和 workbox 技术。优点是离线也能访问，缺点是兼容性差。
  webpack.config.js 中配置：
    const WorkboxWebpackPlugin = require('workbox-webpack-plugin'); // 引入插件

    // plugins中加入：
    new WorkboxWebpackPlugin.GenerateSW({
      /*
        1. 帮助serviceworker快速启动
        2. 删除旧的 serviceworker

        生成一个 serviceworker 配置文件
      */
      clientsClaim: true,
      skipWaiting: true
    })
  index.js 中还需要写一段代码来激活它的使用：
    /*
      1. eslint不认识 window、navigator全局变量
        解决：需要修改package.json中eslintConfig配置
        "env": {
          "browser": true // 支持浏览器端全局变量
        }
      2. sw代码必须运行在服务器上
        --> nodejs
        或-->
          npm i serve -g
          serve -s build 启动服务器，将打包输出的build目录下所有资源作为静态资源暴露出去
          我自己用的是http-server
    */
    if ('serviceWorker' in navigator) { // 处理兼容性问题
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js') // 注册serviceWorker
          .then(() => {
            console.log('sw注册成功了~');
          })
          .catch(() => {
            console.log('sw注册失败了~');
          });
      });
    }  
```

## webpack配置详情
```sh
1.entry
  entry:入口起点
    (1)string --> './src/index.js'，单入口
      打包形成一个 chunk。 输出一个 bundle 文件。此时 chunk 的名称默认是 main
    (2)array --> ['./src/index.js', './src/add.js']，多入口
      所有入口文件最终只会形成一个 chunk，输出出去只有一个 bundle 文件。（一般只用在 HMR 功能中让 html 热更新生效）
    (3)object，多入口
      有几个入口文件就形成几个 chunk，输出几个 bundle 文件，此时 chunk 的名称是 key 值
    --> 特殊用法：
      entry: {
        // 最终只会形成一个chunk, 输出出去只有一个bundle文件。
        index: ['./src/index.js', './src/count.js'], 
        // 形成一个chunk，输出一个bundle文件。
        add: './src/add.js'
      }

2.output
    output: {
      // 文件名称（指定名称+目录）
      filename: 'js/[name].js',
      // 输出文件目录（将来所有资源输出的公共目录）
      path: resolve(__dirname, 'build'),
      // 所有资源引入公共路径前缀 --> 'imgs/a.jpg' --> '/imgs/a.jpg'
      publicPath: '/',
      chunkFilename: 'js/[name]_chunk.js', // 指定非入口chunk的名称
      library: '[name]', // 打包整个库后向外暴露的变量名
      libraryTarget: 'window' // 变量名添加到哪个上 browser：window
      // libraryTarget: 'global' // node：global
      // libraryTarget: 'commonjs' // conmmonjs模块 exports
    },
```