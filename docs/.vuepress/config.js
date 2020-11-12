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

  themeConfig: {
    lastUpdated: "Last Updated",
    smoothScroll: true,
    logo: "/image/touxiang.png",
    searchMaxSuggestions: 10,
    nav: [
      {
        text: "开发中遇到的问题",
        link: "/",
        items: [
          { text: "HTML", link: "/html/" },
          { text: "javascript", link: "/javascript/" },
          { text: "typescript", link: "/typescript/" },
          { text: "Vue", link: "/vue/" },
          { text: "CSS", link: "/css/" },
          { text: "Git", link: "/git/" },
          // { text: "typescript", link: "/typescript/" },
        ],
      },

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
          {
            title: "Git",
            path: "/git/",
          },
        ],
      },
    ],
    sidebarDepth: 2,
    lastUpdated: "Last Updated",
  },
};
