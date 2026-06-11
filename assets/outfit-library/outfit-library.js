export const OUTFIT_ASSET_BASE = "assets/outfit-library/outfit-sprite.svg";

export const outfitAssets = [
  { id: "men-jacket", label: "男士外套", group: "clothing", gender: "men", slots: ["outer"], warmth: 3, contexts: ["city", "mountain", "cold"] },
  { id: "men-shirt", label: "男士襯衫", group: "clothing", gender: "men", slots: ["top"], warmth: 1, contexts: ["city", "beach"] },
  { id: "men-sportswear", label: "男士運動衣", group: "clothing", gender: "men", slots: ["top"], warmth: 2, contexts: ["mountain", "active"] },
  { id: "men-sneakers", label: "男士運動鞋", group: "clothing", gender: "men", slots: ["shoes"], warmth: 1, contexts: ["mountain", "active", "city"] },
  { id: "men-casual-shoes", label: "男士休閒鞋", group: "clothing", gender: "men", slots: ["shoes"], warmth: 1, contexts: ["city"] },
  { id: "women-coat", label: "女士大衣", group: "clothing", gender: "women", slots: ["outer"], warmth: 4, contexts: ["city", "cold"] },
  { id: "women-dress", label: "女士洋裝", group: "clothing", gender: "women", slots: ["bottom", "top"], warmth: 1, contexts: ["city", "beach"] },
  { id: "women-crop-top", label: "女士短上衣", group: "clothing", gender: "women", slots: ["top"], warmth: 0, contexts: ["beach", "hot"] },
  { id: "women-vest", label: "女士背心", group: "clothing", gender: "women", slots: ["top"], warmth: 0, contexts: ["beach", "hot"] },
  { id: "women-casual-shoes", label: "女士休閒鞋", group: "clothing", gender: "women", slots: ["shoes"], warmth: 1, contexts: ["city"] },
  { id: "women-sneakers", label: "女士運動鞋", group: "clothing", gender: "women", slots: ["shoes"], warmth: 1, contexts: ["mountain", "active", "city"] },
  { id: "swimwear", label: "男女泳衣", group: "clothing", gender: "unisex", slots: ["swim"], warmth: 0, contexts: ["beach", "hot"] },
  { id: "men-beach-shorts", label: "男沙灘褲", group: "clothing", gender: "men", slots: ["bottom"], warmth: 0, contexts: ["beach", "hot"] },
  { id: "umbrella", label: "雨傘", group: "accessory", gender: "unisex", slots: ["rain"], warmth: 0, contexts: ["rain", "city", "beach"] },
  { id: "sun-protection", label: "防曬物品", group: "accessory", gender: "unisex", slots: ["sun"], warmth: 0, contexts: ["beach", "hot", "mountain"] },
  { id: "gloves", label: "手套", group: "accessory", gender: "unisex", slots: ["cold"], warmth: 3, contexts: ["cold", "mountain"] }
];

export const outfitContexts = {
  city: { label: "城市散策", priority: ["men-shirt", "men-casual-shoes", "women-dress", "women-casual-shoes"] },
  mountain: { label: "登山行程", priority: ["men-sportswear", "men-sneakers", "women-sneakers", "sun-protection"] },
  beach: { label: "海邊行程", priority: ["men-shirt", "men-beach-shorts", "women-crop-top", "women-vest", "swimwear", "sun-protection"] },
  rain: { label: "雨天備案", priority: ["umbrella"] },
  cold: { label: "低溫保暖", priority: ["men-jacket", "women-coat", "gloves"] }
};

export function getOutfitAsset(assetId) {
  return outfitAssets.find((asset) => asset.id === assetId);
}

export function getOutfitSymbolHref(assetId, base = OUTFIT_ASSET_BASE) {
  return `${base}#${assetId}`;
}

export function recommendOutfit({
  context = "city",
  minTemp = 18,
  maxTemp = 24,
  rainProbability = 0,
  windSpeed = 0
} = {}) {
  const isCold = minTemp <= 8 || maxTemp <= 12;
  const isWarmLayerNeeded = minTemp <= 15 || windSpeed >= 28;
  const isHot = maxTemp >= 28;
  const isRainy = rainProbability >= 55;
  const isBeach = context === "beach";
  const isMountain = context === "mountain";

  const men = [];
  const women = [];
  const accessories = [];

  if (isMountain) {
    men.push("men-sportswear", "men-sneakers");
    women.push("women-crop-top", "women-sneakers");
    accessories.push("sun-protection");
  } else if (isBeach) {
    men.push("men-shirt", "men-beach-shorts");
    women.push(isHot ? "women-vest" : "women-crop-top");
    accessories.push("sun-protection");
    if (isHot) {
      men.push("swimwear");
      women.push("swimwear");
    }
  } else {
    men.push("men-shirt", "men-casual-shoes");
    women.push("women-dress", "women-casual-shoes");
  }

  if (isCold) {
    men.unshift("men-jacket");
    women.unshift("women-coat");
    accessories.push("gloves");
  } else if (isWarmLayerNeeded) {
    men.unshift("men-jacket");
    women.unshift("women-coat");
  }

  if (isRainy) {
    accessories.unshift("umbrella");
  }

  return {
    context,
    summary: buildOutfitSummary({ context, minTemp, maxTemp, isCold, isWarmLayerNeeded, isHot, isRainy, isMountain, isBeach }),
    men: uniqueAssets(men),
    women: uniqueAssets(women),
    accessories: uniqueAssets(accessories),
    all: uniqueAssets([...men, ...women, ...accessories]).map(getOutfitAsset)
  };
}

function buildOutfitSummary({ context, minTemp, maxTemp, isCold, isWarmLayerNeeded, isHot, isRainy, isMountain, isBeach }) {
  const contextLabel = outfitContexts[context]?.label ?? "一般行程";
  const notes = [`${contextLabel}，氣溫約 ${minTemp}°C ～ ${maxTemp}°C。`];

  if (isMountain) notes.push("以運動衣與運動鞋為主，優先考慮活動性。");
  if (isBeach) notes.push("以輕薄上衣、沙灘褲或泳衣為主，防曬必帶。");
  if (isCold) notes.push("低溫需要保暖外套與手套。");
  else if (isWarmLayerNeeded) notes.push("早晚或風大時加一件外套。");
  if (isRainy) notes.push("降雨機率偏高，雨傘列為必要配件。");
  if (isHot && !isBeach) notes.push("高溫時可改用背心或短上衣並加強防曬。");

  return notes.join("");
}

function uniqueAssets(assetIds) {
  return [...new Set(assetIds)];
}
