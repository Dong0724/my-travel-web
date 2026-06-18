# Windows 10 / Windows 11 Migration

這份專案包可用於其他 Windows 10／11 電腦重新開發與部署。

## 包含內容

- 完整網站原始碼與圖片資產
- Git repository 與 commit 歷史
- GitHub remote 設定
- 本機啟動腳本
- GitHub Pages／Cloudflare Pages 同步部署腳本
- Cloudflare Pages Worker 原始碼

不包含：

- GitHub 登入憑證
- Cloudflare OAuth 憑證
- Threads API access token
- `.env`、log 或本機 `.wrangler` 資料

## 新電腦操作

1. 將 zip 完整解壓縮，不要只挑選部分檔案。
2. 確認檔案總管已顯示隱藏項目，解壓後應存在 `.git` 資料夾。
3. 在專案資料夾開啟 PowerShell。
4. 執行：

```powershell
powershell -ExecutionPolicy Bypass -File .\setup-new-windows.ps1
```

5. 依瀏覽器畫面登入 GitHub 與 Cloudflare。
6. 執行同步部署：

```powershell
.\deploy-all.ps1 -Message "Redeploy from new Windows computer"
```

## 本機預覽

雙擊 `start-server.bat`，然後開啟：

```text
http://127.0.0.1:4173/
```

## 正式網站

- GitHub Pages: https://dong0724.github.io/my-travel-web/
- Cloudflare Pages: https://my-travel-web.pages.dev/

## 重新建立搬機包

在原電腦執行：

```powershell
.\build-migration-package.ps1
```

腳本會把 Git 已追蹤檔案與 `.git` 歷史打包，但不會包含 `.wrangler`、log、部署暫存資料或環境變數。

## Threads API

`THREADS_ACCESS_TOKEN` 儲存在 Cloudflare Pages 專案環境，不會放進 zip。

如果未來重新建立新的 Cloudflare Pages 專案，需要重新設定：

```powershell
npx wrangler pages secret put THREADS_ACCESS_TOKEN --project-name my-travel-web
```
