# Deployment Workflow

每次完成網站改動後，執行：

```powershell
.\deploy-all.ps1 -Message "Describe the update"
```

這個腳本會：

1. 重新建立 Cloudflare Pages 用的乾淨部署資料夾。
2. 將網站必要檔案加入 Git。
3. 有變更時建立 commit 並 push 到 GitHub。
4. 重新部署 Cloudflare Pages。

## Threads API

熱門討論串透過 Cloudflare Pages `_worker.js` 代理呼叫 Threads Keyword Search API。

需要在 Cloudflare Pages 專案設定 secret：

```powershell
npx wrangler pages secret put THREADS_ACCESS_TOKEN --project-name my-travel-web
```

Token 需要 Meta Threads API 的 keyword search 權限。不要把 token 寫進 `app.js`、`_worker.js`、`.env` 或 GitHub。

網站：

- GitHub Pages: https://dong0724.github.io/my-travel-web/
- Cloudflare Pages: https://my-travel-web.pages.dev/
