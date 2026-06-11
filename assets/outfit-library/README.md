# Outfit Asset Library

此資料夾是獨立素材庫，尚未導入目前 UI。

## 檔案

- `outfit-sprite.svg`：所有衣物與配件的 SVG symbol。
- `outfit-library.js`：素材 metadata 與天氣／情境搭配規則。

## 素材清單

衣物：
男士外套、男士襯衫、男士運動衣、男士運動鞋、男士休閒鞋、女士大衣、女士洋裝、女士短上衣、女士背心、女士休閒鞋、女士運動鞋、男女泳衣、男沙灘褲。

配件：
雨傘、防曬物品、手套。

## 使用範例

```js
import { recommendOutfit, getOutfitSymbolHref } from "./assets/outfit-library/outfit-library.js";

const outfit = recommendOutfit({
  context: "mountain",
  minTemp: 9,
  maxTemp: 18,
  rainProbability: 30,
  windSpeed: 18
});

const href = getOutfitSymbolHref(outfit.men[0]);
```

```html
<svg viewBox="0 0 120 120" aria-hidden="true">
  <use href="assets/outfit-library/outfit-sprite.svg#men-sportswear"></use>
</svg>
```

## 情境規則

- `mountain`：登山行程，優先運動衣、運動鞋、防曬物品；低溫或風大時加外套。
- `beach`：海邊行程，優先短上衣、背心、沙灘褲、泳衣與防曬物品；低溫時加外套。
- `city`：城市散策，優先襯衫、洋裝、休閒鞋；低溫時加外套。
- 降雨機率 `>= 55%`：加入雨傘。
- 最低溫 `<= 8°C` 或最高溫 `<= 12°C`：加入保暖外套與手套。
- 最低溫 `<= 15°C` 或最大風速 `>= 28 km/h`：加入外套。
