module.exports = {
  title: "吴伟元", // 设置网站标题
  description: "伟元的博客",

  head: [
    [
      "link",
      {
        rel: "shortcut icon",
        type: "image/x-icon",
        href: "/image/touxiang.png",
      },
    ],
  ],

  //   base: "/v1/adroi-h5/adroiapi/",
  //   themeConfig: {
  //     nav: [
  //       { text: "接口定义", link: "/apiword" },
  //       { text: "接口字段定义", link: "/api" },
  //       { text: "附录：错误码", link: "/error" },
  //     ],
  //     sidebar: {
  //       "/": [
  //         "/", //指的是根目录的md文件 也就是 README.md 里面的内容
  //         "apiword", //根目录创建 apiword.md文件
  //         "api", //根目录创建 api.md文件
  //         "error", //根目录创建 error.md文件
  //       ],
  //     },
  //     sidebarDepth: 2,
  //   },
  themeConfig: {
    lastUpdated: "Last Updated",
    smoothScroll: true,
    logo: "/image/touxiang.png",
    searchMaxSuggestions: 10,
    nav: [
      { text: "开发中遇到的问题", link: "/" },
      //   {
      //     text: "博文",
      //     items: [
      //       { text: "Android", link: "/android/" },
      //       { text: "ios", link: "/ios/" },
      //       { text: "Web", link: "/web/" },
      //     ],
      //   },
      { text: "微信", link: "/wechat/" },
      { text: "Github", link: "https://github.com/wuweiyuan" },
    ],

    sidebar: [
      {
        title: "微信",
        path: "/wechat/",
        sidebarDepth: 1,
        children: [],
      },
      {
        title: "开发中遇到的问题",
        sidebarDepth: 2,
        path: "/",
        children: [
          {
            title: "HTML",
            path: "/html/",
          },
          {
            title: "javascript",
            path: "/javascript/",
          },
          {
            title: "typescript",
            path: "/typescript/",
          },
          {
            title: "Vue",
            path: "/vue/",
          },
          {
            title: "CSS",
            path: "/css/",
          },
        ],
      },
    ],
    sidebarDepth: 2,
    lastUpdated: "Last Updated",
  },
};
