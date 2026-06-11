# My Travel Web

日本一週旅遊天氣網站，提供地區與景點選擇、未來七天天氣、體感溫度、穿搭建議、當地名產與 YouTube 即時影像搜尋連結。

## Features

- 日本旅遊目的地天氣查詢
- 中文、日文、英文切換
- 未來七天預報與體感溫度
- 依天氣與旅行情境推薦穿搭
- 當地必吃美食與伴手禮建議
- 當地熱門 YouTube 即時影像搜尋

## Run Locally

Double-click `start-server.bat`, or run:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:4173/
```

## Deployment

This is a static frontend site and can be deployed with GitHub Pages, Cloudflare Pages, Netlify, or Vercel.
