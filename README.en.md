English | [简体中文](README.md)

<p align="center"><img width="128" src="./public/images/icon.svg" alt="Logo" /></p>
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

# Download Manager

> Lightweight and efficient download management

- 📥 Take over browser download management
- 🎨 Adaptive light and dark themes, with manual switching support
- 🔍 File search and classification for quick file location
- 📄 Display detailed information such as download progress, file size, and creation time
- 🔗 Copy download links and generate sharing QR codes
- 🗑️ Clean up files and download records based on conditions
- ➕ Manually batch add download tasks
- 🧹 Supports scheduled cleanup of download history
- 🔔 Notification sound and popup
- ☁️ Sync plugin settings

# Installation

| Download Link                                                                                                | Information                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Github Release](https://github.com/breadgrocery/download-manager/releases/latest)                           | <img src="https://img.shields.io/github/v/release/breadgrocery/download-manager?label=version"/> <img src="https://img.shields.io/github/downloads/breadgrocery/download-manager/total?label=downloads"/>                                                                                                                                                                                                                                                                                                                                                                                                           |
| [Chrome Web Store](https://chrome.google.com/webstore/detail/hhmgnllgjongoenjfnbcdlangemdiodk)               | <img src="https://img.shields.io/chrome-web-store/v/hhmgnllgjongoenjfnbcdlangemdiodk?label=version"/> <img src="https://img.shields.io/chrome-web-store/d/hhmgnllgjongoenjfnbcdlangemdiodk?label=users"/> <img src="https://img.shields.io/chrome-web-store/rating/hhmgnllgjongoenjfnbcdlangemdiodk?label=rating"/>                                                                                                                                                                                                                                                                                                 |
| [Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/jgecopfgpbndacamabkgjhgbepmallpd) | <img src="https://img.shields.io/badge/dynamic/json?label=version&query=$.version&url=https://microsoftedge.microsoft.com/addons/getproductdetailsbycrxid/jgecopfgpbndacamabkgjhgbepmallpd"/> <img src="https://img.shields.io/badge/dynamic/json?label=users&query=$.activeInstallCount&url=https://microsoftedge.microsoft.com/addons/getproductdetailsbycrxid/jgecopfgpbndacamabkgjhgbepmallpd"/> <img src="https://img.shields.io/badge/dynamic/json?label=rating&query=$.averageRating&suffix=%2F5&url=https://microsoftedge.microsoft.com/addons/getproductdetailsbycrxid/jgecopfgpbndacamabkgjhgbepmallpd"/> |
| [Firefox Browser Add-ons](https://addons.mozilla.org/firefox/addon/download-manager/)                        | <img src="https://img.shields.io/amo/v/download-manager?label=version"/> <img src="https://img.shields.io/amo/users/download-manager?label=users"/> <img src="https://img.shields.io/amo/rating/download-manager?label=rating"/>                                                                                                                                                                                                                                                                                                                                                                                    |

# Contributing

1. Install `pnpm` globally (ignore if already installed).

   ```bash
   npm i pnpm -g
   ```

2. Install dependencies.

   ```bash
   pnpm install
   ```

3. Local development (Requires the corresponding browser to be installed).

   ```bash
   pnpm dev
   ```

4. Build

   ```bash
   pnpm build
   ```

> [!NOTE]
>
> The project uses [lefthook](https://github.com/evilmartians/lefthook) to automatically format documents, so you don’t need to worry about any formatting issues.
>
> The project employs [commitlint](https://github.com/conventional-changelog/commitlint) to enforce commit message conventions. For specific rules, please refer to [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional).
