简体中文 | [English](README.en.md)

<p align="center"><img width="128" src="./public/images/icon-256.png" alt="Logo" /></p>
<br />
<p align="center">
  <a href="https://vuejs.org"><img src="https://img.shields.io/badge/Vue.js-35495e.svg?logo=vuedotjs&logoColor=%234FC08D" alt="Vue.js" /></a>
  <a href="https://www.naiveui.com"><img src="https://img.shields.io/badge/Naive UI-5fbc2b.svg?logo=css3&logoColor=white" alt="Naive UI" /></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/Typescript-007acc.svg?logo=typescript&logoColor=white" alt="Typescript" /></a>
  <a href="https://vite.dev"><img src="https://img.shields.io/badge/Vite-%23646CFF.svg?logo=vite&logoColor=white" alt="Vite" /></a>
  <a href="https://pnpm.io"><img src="https://img.shields.io/badge/pnpm-4a4a4a.svg?logo=pnpm&logoColor=f69220" alt="License" /></a>
  <a href="https://github.com/breadgrocery/download-manager/blob/main/LICENSE"><img src="https://img.shields.io/github/license/breadgrocery/download-manager" alt="pnpm" /></a>
</p>
<br />

# 下载管理器

> 轻量、高效的下载管理

- 📥 接管浏览器下载管理
- 🎨 自适应浅色和深色主题，并支持手动切换
- 🔍 文件搜索与分类查找，快速定位文件所在位置
- 📄 展示文件下载进度、大小、创建时间等详细信息
- 🔗 复制下载链接、生成分享二维码
- 🗑️ 按条件清理文件和下载记录
- ➕ 手动批量添加下载任务
- 🔔 下载过程提示音
- ☁️ 插件设置同步

# 下载安装

| 下载地址                                                                                                     | 信息                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Github Release](https://github.com/breadgrocery/download-manager/releases/latest)                           | <img src="https://img.shields.io/github/v/release/breadgrocery/download-manager?label=版本"/><img src="https://img.shields.io/github/downloads/breadgrocery/download-manager/total?label=下载数"/>                                                                                                                                                                                                                                                                                                                                                                                                            |
| [Chrome Web Store](https://chrome.google.com/webstore/detail/hhmgnllgjongoenjfnbcdlangemdiodk)               | <img src="https://img.shields.io/chrome-web-store/v/hhmgnllgjongoenjfnbcdlangemdiodk?label=版本"/><img src="https://img.shields.io/chrome-web-store/users/hhmgnllgjongoenjfnbcdlangemdiodk?label=安装数"/><img src="https://img.shields.io/chrome-web-store/rating/hhmgnllgjongoenjfnbcdlangemdiodk?label=评分"/>                                                                                                                                                                                                                                                                                             |
| [Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/jgecopfgpbndacamabkgjhgbepmallpd) | <img src="https://img.shields.io/badge/dynamic/json?label=版本&query=$.version&url=https://microsoftedge.microsoft.com/addons/getproductdetailsbycrxid/jgecopfgpbndacamabkgjhgbepmallpd"/><img src="https://img.shields.io/badge/dynamic/json?label=安装数&query=$.activeInstallCount&url=https://microsoftedge.microsoft.com/addons/getproductdetailsbycrxid/jgecopfgpbndacamabkgjhgbepmallpd"/><img src="https://img.shields.io/badge/dynamic/json?label=评分&query=$.averageRating&suffix=%2F5&url=https://microsoftedge.microsoft.com/addons/getproductdetailsbycrxid/jgecopfgpbndacamabkgjhgbepmallpd"/> |

# 贡献代码

1. 全局安装`pnpm`（如果已安装请忽略）。

   ```bash
   npm i pnpm -g
   ```

2. 安装项目依赖。

   ```bash
   pnpm install
   ```

3. 项目本地调试（本地已安装Google Chrome）。

   ```bash
   pnpm dev
   ```

4. 项目构建打包。

   ```bash
   pnpm build
   ```

> [!NOTE]
>
> 项目使用了[lint-staged](https://github.com/lint-staged/lint-staged)来自动格式化文档，你无需担心任何格式问题。
>
> 项目使用了[commitlint](https://github.com/conventional-changelog/commitlint)进行提交规范约束，具体规则请参考[@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional)。
