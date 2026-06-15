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

網站：

- GitHub Pages: https://dong0724.github.io/my-travel-web/
- Cloudflare Pages: https://my-travel-web.pages.dev/
