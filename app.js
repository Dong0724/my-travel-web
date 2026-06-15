import { recommendOutfit } from "./assets/outfit-library/outfit-library.js";

const regions = [
  {
    id: "kanto",
    name: "關東",
    places: [
      { id: "tokyo", name: "東京都", feature: "東京鐵塔與晴空塔", latitude: 35.6762, longitude: 139.6503, art: "artwork-tokyo", context: "city" },
      { id: "yokohama", name: "橫濱", feature: "港未來與摩天輪", latitude: 35.4437, longitude: 139.638, art: "artwork-yokohama", context: "beach" },
      { id: "nikko", name: "日光", feature: "東照宮與山林", latitude: 36.7199, longitude: 139.6982, art: "artwork-nikko", context: "mountain" }
    ]
  },
  {
    id: "chubu",
    name: "中部",
    places: [
      { id: "fuji", name: "山梨・富士五湖", feature: "富士山與河口湖", latitude: 35.5013, longitude: 138.7657, art: "artwork-fuji", context: "mountain" },
      { id: "kanazawa", name: "金澤", feature: "兼六園與茶屋街", latitude: 36.5613, longitude: 136.6562, art: "artwork-kanazawa", context: "city" },
      { id: "takayama", name: "高山", feature: "飛驒古街", latitude: 36.1461, longitude: 137.2522, art: "artwork-takayama", context: "mountain" }
    ]
  },
  {
    id: "kansai",
    name: "關西",
    places: [
      { id: "kyoto", name: "京都", feature: "清水寺與鳥居", latitude: 35.0116, longitude: 135.7681, art: "artwork-kyoto", context: "city" },
      { id: "osaka", name: "大阪", feature: "大阪城與街頭熱鬧感", latitude: 34.6937, longitude: 135.5023, art: "artwork-osaka", context: "city" },
      { id: "nara", name: "奈良", feature: "奈良公園與古都綠意", latitude: 34.6851, longitude: 135.8048, art: "artwork-nara", context: "city" }
    ]
  },
  {
    id: "hokkaido",
    name: "北海道",
    defaultPlaceId: "hakodate",
    places: [
      { id: "sapporo", name: "札幌", feature: "大通公園與北國街景", latitude: 43.0618, longitude: 141.3545, art: "artwork-sapporo", context: "city" },
      { id: "furano", name: "富良野", feature: "花田與丘陵", latitude: 43.343, longitude: 142.3832, art: "artwork-furano", context: "mountain" },
      { id: "hakodate", name: "函館", feature: "港灣與夜景山", latitude: 41.7687, longitude: 140.7291, art: "artwork-hakodate", context: "mountain" }
    ]
  },
  {
    id: "tohoku",
    name: "東北",
    places: [
      { id: "sendai", name: "仙台", feature: "青葉城與杜之都", latitude: 38.2682, longitude: 140.8694, art: "artwork-sendai", context: "city" },
      { id: "aomori", name: "青森", feature: "睡魔祭色彩與海港", latitude: 40.8222, longitude: 140.7474, art: "artwork-aomori", context: "beach" },
      { id: "akita", name: "秋田", feature: "田澤湖與山色", latitude: 39.7186, longitude: 140.1024, art: "artwork-akita", context: "mountain" }
    ]
  },
  {
    id: "chugoku-shikoku",
    name: "中國・四國",
    places: [
      { id: "hiroshima", name: "廣島", feature: "和平公園與嚴島神社", latitude: 34.3853, longitude: 132.4553, art: "artwork-hiroshima", context: "city" },
      { id: "kurashiki", name: "倉敷", feature: "美觀地區白壁街", latitude: 34.585, longitude: 133.7721, art: "artwork-kurashiki", context: "city" },
      { id: "matsuyama", name: "松山", feature: "松山城與道後溫泉", latitude: 33.8392, longitude: 132.7657, art: "artwork-matsuyama", context: "city" }
    ]
  },
  {
    id: "kyushu",
    name: "九州",
    places: [
      { id: "fukuoka", name: "福岡", feature: "博多灣與街邊屋台", latitude: 33.5902, longitude: 130.4017, art: "artwork-fukuoka", context: "city" },
      { id: "aso", name: "阿蘇", feature: "阿蘇火山與草千里", latitude: 32.8844, longitude: 131.1042, art: "artwork-aso", context: "mountain" },
      { id: "kagoshima", name: "鹿兒島", feature: "櫻島火山", latitude: 31.5966, longitude: 130.5571, art: "artwork-kagoshima", context: "mountain" },
      { id: "nagasaki", name: "長崎", feature: "港灣坡道與異國街景", latitude: 32.7503, longitude: 129.8779, art: "artwork-nagasaki", context: "beach" }
    ]
  },
  {
    id: "okinawa",
    name: "沖繩",
    places: [
      { id: "okinawa", name: "那霸", feature: "首里城色彩與南島海風", latitude: 26.2124, longitude: 127.6792, art: "artwork-okinawa", context: "beach" },
      { id: "ishigaki", name: "石垣島", feature: "珊瑚海與島嶼山線", latitude: 24.3407, longitude: 124.1556, art: "artwork-ishigaki", context: "beach" }
    ]
  }
];

const liveCameraSpots = {
  tokyo: ["東京駅", "渋谷スクランブル交差点", "浅草雷門", "東京タワー", "新宿駅"],
  yokohama: ["横浜みなとみらい", "横浜港", "赤レンガ倉庫", "山下公園", "江の島"],
  nikko: ["日光東照宮", "中禅寺湖", "華厳の滝", "いろは坂", "男体山"],
  fuji: ["河口湖", "忍野八海", "山中湖", "精進湖", "本栖湖"],
  kanazawa: ["兼六園", "金沢駅", "ひがし茶屋街", "近江町市場", "金沢城"],
  takayama: ["高山古い町並", "飛騨高山", "宮川朝市", "白川郷", "新穂高"],
  kyoto: ["清水寺", "京都駅", "嵐山渡月橋", "伏見稲荷", "鴨川"],
  osaka: ["道頓堀", "大阪城", "梅田", "通天閣", "ユニバーサルシティ"],
  nara: ["奈良公園", "東大寺", "春日大社", "若草山", "興福寺"],
  sapporo: ["札幌駅", "大通公園", "すすきの", "羊ヶ丘展望台", "藻岩山"],
  furano: ["富良野", "美瑛", "ファーム富田", "青い池", "十勝岳"],
  hakodate: ["函館山", "函館駅", "函館港", "五稜郭", "函館朝市"],
  sendai: ["仙台駅", "青葉城", "松島", "仙台空港", "定禅寺通"],
  aomori: ["青森駅", "青森港", "八甲田山", "奥入瀬渓流", "弘前公園"],
  akita: ["秋田駅", "田沢湖", "角館", "男鹿半島", "鳥海山"],
  hiroshima: ["広島平和記念公園", "宮島", "厳島神社", "広島駅", "尾道"],
  kurashiki: ["倉敷美観地区", "倉敷駅", "瀬戸大橋", "岡山後楽園", "児島"],
  matsuyama: ["松山城", "道後温泉", "松山駅", "しまなみ海道", "石鎚山"],
  fukuoka: ["博多駅", "天神", "福岡空港", "中洲", "糸島"],
  aso: ["阿蘇山", "草千里", "阿蘇中岳", "大観峰", "黒川温泉"],
  kagoshima: ["桜島", "鹿児島中央駅", "鹿児島港", "仙巌園", "指宿"],
  nagasaki: ["長崎港", "稲佐山", "グラバー園", "長崎駅", "軍艦島"],
  okinawa: ["那覇空港", "国際通り", "波の上ビーチ", "首里城", "美ら海水族館"],
  ishigaki: ["石垣島", "川平湾", "石垣港", "竹富島", "西表島"]
};

const localSpecialties = {
  tokyo: [
    { name: "江戶前壽司", type: "必吃", note: "東京代表性海鮮料理，適合安排一餐正式品嚐。" },
    { name: "月島文字燒", type: "在地美食", note: "鐵板小吃，適合多人一起體驗。" },
    { name: "東京香蕉", type: "伴手禮", note: "機場與車站容易購買，適合分送。" }
  ],
  yokohama: [
    { name: "橫濱家系拉麵", type: "必吃", note: "濃厚豚骨醬油湯底，是橫濱代表口味。" },
    { name: "中華街肉包", type: "在地美食", note: "適合邊逛邊吃，份量足。" },
    { name: "崎陽軒燒賣", type: "伴手禮", note: "橫濱經典鐵路便當與伴手禮。" }
  ],
  nikko: [
    { name: "湯波料理", type: "必吃", note: "日光名物，口味清爽，適合午餐。" },
    { name: "羊羹", type: "甜點", note: "老舖眾多，適合配茶。" },
    { name: "日光甚五郎煎餅", type: "伴手禮", note: "包裝輕便，適合帶回分享。" }
  ],
  fuji: [
    { name: "餺飥鍋", type: "必吃", note: "山梨鄉土料理，天冷時特別適合。" },
    { name: "信玄餅", type: "伴手禮", note: "山梨代表甜點，知名度高。" },
    { name: "富士山造型點心", type: "伴手禮", note: "河口湖周邊常見，外型有記憶點。" }
  ],
  kanazawa: [
    { name: "金澤關東煮", type: "必吃", note: "湯頭細緻，冬季尤其推薦。" },
    { name: "海鮮丼", type: "在地美食", note: "近江町市場周邊選擇多。" },
    { name: "金箔點心", type: "伴手禮", note: "金澤代表性強，適合送禮。" }
  ],
  takayama: [
    { name: "飛驒牛", type: "必吃", note: "燒肉、握壽司或串燒都很受歡迎。" },
    { name: "高山拉麵", type: "在地美食", note: "醬油清湯系，適合輕食。" },
    { name: "朴葉味噌", type: "伴手禮", note: "帶有飛驒地方特色，可搭配白飯。" }
  ],
  kyoto: [
    { name: "湯豆腐", type: "必吃", note: "京都代表料理，清淡細緻。" },
    { name: "抹茶甜點", type: "甜點", note: "宇治抹茶相關甜點選擇多。" },
    { name: "八橋", type: "伴手禮", note: "京都經典伴手禮，口味多。" }
  ],
  osaka: [
    { name: "章魚燒", type: "必吃", note: "大阪街頭代表小吃。" },
    { name: "大阪燒", type: "必吃", note: "適合晚餐或多人分享。" },
    { name: "551 蓬萊豚包", type: "伴手禮", note: "關西知名度高，適合短程攜帶。" }
  ],
  nara: [
    { name: "柿葉壽司", type: "必吃", note: "奈良代表鄉土料理，方便外帶。" },
    { name: "三輪素麵", type: "在地美食", note: "口感細緻，夏季適合。" },
    { name: "奈良漬", type: "伴手禮", note: "酒粕醃漬風味強，地方特色明顯。" }
  ],
  sapporo: [
    { name: "味噌拉麵", type: "必吃", note: "札幌代表口味，冬天尤其適合。" },
    { name: "湯咖哩", type: "在地美食", note: "蔬菜與香料感強，是札幌人氣料理。" },
    { name: "白色戀人", type: "伴手禮", note: "北海道經典伴手禮。" }
  ],
  furano: [
    { name: "富良野蛋包咖哩", type: "必吃", note: "使用當地蔬菜與乳製品。" },
    { name: "哈密瓜", type: "甜點", note: "夏季特別推薦。" },
    { name: "薰衣草商品", type: "伴手禮", note: "富良野代表性高。" }
  ],
  hakodate: [
    { name: "函館鹽味拉麵", type: "必吃", note: "清爽湯頭，是函館代表口味。" },
    { name: "海鮮丼", type: "必吃", note: "朝市周邊選擇多。" },
    { name: "魷魚加工品", type: "伴手禮", note: "函館港町特色明顯。" }
  ],
  sendai: [
    { name: "牛舌", type: "必吃", note: "仙台代表料理，建議安排正餐。" },
    { name: "毛豆麻糬", type: "甜點", note: "在地甜點，口味清爽。" },
    { name: "萩之月", type: "伴手禮", note: "仙台人氣甜點伴手禮。" }
  ],
  aomori: [
    { name: "蘋果派", type: "甜點", note: "青森蘋果知名度高，甜點選擇多。" },
    { name: "海鮮丼", type: "必吃", note: "港口城市海鮮新鮮。" },
    { name: "蘋果汁", type: "伴手禮", note: "好攜帶且接受度高。" }
  ],
  akita: [
    { name: "米棒鍋", type: "必吃", note: "秋田代表鄉土料理。" },
    { name: "稻庭烏龍麵", type: "必吃", note: "口感滑順，冷熱皆可。" },
    { name: "秋田清酒", type: "伴手禮", note: "米鄉特色，適合送禮。" }
  ],
  hiroshima: [
    { name: "廣島燒", type: "必吃", note: "麵體與大量高麗菜是特色。" },
    { name: "牡蠣料理", type: "必吃", note: "廣島牡蠣知名度高。" },
    { name: "楓葉饅頭", type: "伴手禮", note: "宮島與廣島代表甜點。" }
  ],
  kurashiki: [
    { name: "倉敷布丁", type: "甜點", note: "美觀地區周邊常見。" },
    { name: "岡山白桃甜點", type: "甜點", note: "季節性強，適合現吃。" },
    { name: "吉備糰子", type: "伴手禮", note: "岡山經典伴手禮。" }
  ],
  matsuyama: [
    { name: "鯛魚飯", type: "必吃", note: "愛媛代表料理，版本多。" },
    { name: "蜜柑甜點", type: "甜點", note: "愛媛柑橘知名度高。" },
    { name: "一六塔", type: "伴手禮", note: "松山經典甜點伴手禮。" }
  ],
  fukuoka: [
    { name: "博多豚骨拉麵", type: "必吃", note: "福岡代表料理，宵夜也適合。" },
    { name: "明太子", type: "必買", note: "福岡代表名產，可自用或送禮。" },
    { name: "通りもん", type: "伴手禮", note: "博多人氣甜點。" }
  ],
  aso: [
    { name: "赤牛丼", type: "必吃", note: "阿蘇代表肉料理，適合登山後補充體力。" },
    { name: "高菜飯", type: "在地美食", note: "熊本阿蘇周邊常見鄉土料理。" },
    { name: "阿蘇牛乳甜點", type: "伴手禮", note: "乳製品風味明顯，適合甜點控。" }
  ],
  kagoshima: [
    { name: "黑豚涮涮鍋", type: "必吃", note: "鹿兒島代表料理。" },
    { name: "白熊冰", type: "甜點", note: "鹿兒島經典冰品。" },
    { name: "薩摩芋點心", type: "伴手禮", note: "地方特色強，接受度高。" }
  ],
  nagasaki: [
    { name: "長崎強棒麵", type: "必吃", note: "長崎代表料理，份量足。" },
    { name: "土耳其飯", type: "在地美食", note: "混合洋食風格，具地方特色。" },
    { name: "長崎蛋糕", type: "伴手禮", note: "最具代表性的長崎甜點。" }
  ],
  okinawa: [
    { name: "沖繩麵", type: "必吃", note: "沖繩代表主食，湯頭清爽。" },
    { name: "海葡萄", type: "在地美食", note: "口感特殊，適合現吃。" },
    { name: "紅芋塔", type: "伴手禮", note: "沖繩經典伴手禮。" }
  ],
  ishigaki: [
    { name: "石垣牛", type: "必吃", note: "燒肉或漢堡都很受歡迎。" },
    { name: "八重山蕎麥麵", type: "在地美食", note: "石垣島代表麵食。" },
    { name: "黑糖", type: "伴手禮", note: "沖繩離島代表名產。" }
  ]
};

const weatherMap = new Map([
  [0, ["☀", "晴朗"]],
  [1, ["🌤", "大致晴朗"]],
  [2, ["⛅", "局部多雲"]],
  [3, ["☁", "陰天"]],
  [45, ["🌫", "霧"]],
  [48, ["🌫", "霧凇"]],
  [51, ["🌦", "毛毛雨"]],
  [53, ["🌦", "毛毛雨"]],
  [55, ["🌧", "毛毛雨偏強"]],
  [56, ["🌧", "凍雨"]],
  [57, ["🌧", "凍雨偏強"]],
  [61, ["🌧", "小雨"]],
  [63, ["🌧", "雨"]],
  [65, ["🌧", "大雨"]],
  [66, ["🌧", "凍雨"]],
  [67, ["🌧", "強凍雨"]],
  [71, ["🌨", "小雪"]],
  [73, ["🌨", "雪"]],
  [75, ["🌨", "大雪"]],
  [77, ["🌨", "雪粒"]],
  [80, ["🌦", "陣雨"]],
  [81, ["🌧", "陣雨"]],
  [82, ["⛈", "強陣雨"]],
  [85, ["🌨", "陣雪"]],
  [86, ["🌨", "強陣雪"]],
  [95, ["⛈", "雷雨"]],
  [96, ["⛈", "雷雨夾冰雹"]],
  [99, ["⛈", "強雷雨夾冰雹"]]
]);

const languageLocales = {
  zh: { html: "zh-Hant", locale: "zh-TW" },
  ja: { html: "ja", locale: "ja-JP" },
  en: { html: "en", locale: "en-US" }
};

const uiText = {
  zh: {
    pageTitle: "日本一週旅遊天氣",
    heroCopy: "選好即將出發的地點，帶著剛剛好的衣著與好心情上路。",
    languageLabel: "語言",
    destination: "目的地",
    regionLabel: "地區",
    placeLabel: "城市／景點",
    weekTitle: "未來一週",
    outfitEyebrow: "一週穿搭總結",
    specialtyEyebrow: "當地名產建議",
    specialtyTitle: "必吃美食與伴手禮",
    threadsEyebrow: "Threads 熱門討論",
    threadsTitle: "目的地最新熱帖",
    threadsLoading: "Threads 資料同步中",
    threadsMissingConfig: "Threads API 尚未設定。請先在 Cloudflare Pages 加入 THREADS_ACCESS_TOKEN。",
    threadsEmpty: "目前沒有找到符合條件的 Threads 貼文。",
    threadsError: "目前無法取得 Threads 討論串。",
    threadCategoryAll: "所有",
    threadCategoryFood: "美食",
    threadCategoryWeather: "天氣（景色）",
    threadCategoryTraffic: "交通",
    threadBucket24h: "24hr",
    threadBucket3d: "3 days",
    threadBucket1w: "1 week",
    threadHeatLabel: "熱度 {value}",
    liveEyebrow: "當地即時影像",
    liveTitle: "附近熱門直播",
    regionSuffix: "地區",
    thumbnailSuffix: "縮圖",
    loading: "載入中",
    weatherLoading: "天氣資料同步中",
    refreshWeather: "重新整理天氣",
    weatherFailed: "資料同步失敗",
    weatherError: "目前無法取得 {place} 的天氣資料。請稍後重新整理。",
    currentWeather: "目前天氣",
    feelsLike: "體感",
    today: "今天",
    weatherChange: "天氣變化",
    apparentHigh: "體感最高 {value}°C",
    rainMetric: "降雨機率 {rain}%｜雨量 {rainSum} mm",
    windMetric: "最大風速 {wind} km/h",
    updated: "{place}｜Open-Meteo，{time} 更新",
    liveCameraLabel: "{spot}即時影像",
    liveSearchSuffix: "直播攝影機 YouTube",
    cameraStation: "{place}車站周邊",
    cameraSightseeing: "{place}觀光景點",
    cameraTransit: "{place}機場或港口",
    outfitLoadingTitle: "天氣分析中",
    outfitLoadingDescription: "正在整理這週最適合的旅行衣著。",
    outfitSnow: "保暖防寒旅行裝",
    outfitCold: "厚外套層次穿搭",
    outfitCool: "輕暖外套穿搭",
    outfitMild: "舒服輕層次穿搭",
    outfitHotFeels: "透氣防曬旅行裝",
    outfitHot: "輕便夏日旅行裝",
    contextMountain: "登山行程",
    contextBeach: "海邊行程",
    contextCity: "城市散策",
    maxFeelsTag: "最高體感 {value}°C",
    rainTag: "雨具必帶",
    windTag: "留意風勢",
    rangeTag: "早晚溫差",
    stormTag: "雷雨備案",
    outfitBaseNote: "這週氣溫約 {min}°C 到 {max}°C。",
    outfitRangeNote: "早晚溫差明顯，建議用薄外套或可拆層次調整。",
    outfitRainNote: "約 {days} 天可能遇到雨，摺疊傘或防潑水外套會很實用。",
    outfitWindNote: "風勢偏強，外套與帽子建議選不易被風吹亂的款式。",
    outfitEasyNote: "天氣變化不大，準備一套舒適主穿搭再加一件備用外層就足夠。",
    specialtyFood: "必吃",
    specialtySweet: "甜點",
    specialtySouvenir: "伴手禮",
    specialtyFoodNote: "適合安排在抵達後第一餐，先感受當地代表味道。",
    specialtySweetNote: "適合下午茶或短暫休息時順路品嚐。",
    specialtySouvenirNote: "可在車站、百貨或機場補買，適合帶回分享。"
  },
  ja: {
    pageTitle: "日本週間旅行天気",
    heroCopy: "行き先を選んで、ちょうどいい服装で楽しい旅へ。",
    languageLabel: "言語",
    destination: "目的地",
    regionLabel: "エリア",
    placeLabel: "都市／観光地",
    weekTitle: "週間予報",
    outfitEyebrow: "週間コーデまとめ",
    specialtyEyebrow: "ご当地おすすめ",
    specialtyTitle: "名物グルメとお土産",
    threadsEyebrow: "Threads 人気の話題",
    threadsTitle: "目的地の最新注目投稿",
    threadsLoading: "Threads の投稿を同期中",
    threadsMissingConfig: "Threads API が未設定です。Cloudflare Pages に THREADS_ACCESS_TOKEN を追加してください。",
    threadsEmpty: "条件に合う Threads 投稿が見つかりません。",
    threadsError: "Threads の話題を取得できません。",
    threadCategoryAll: "すべて",
    threadCategoryFood: "グルメ",
    threadCategoryWeather: "天気・景色",
    threadCategoryTraffic: "交通",
    threadBucket24h: "24hr",
    threadBucket3d: "3 days",
    threadBucket1w: "1 week",
    threadHeatLabel: "注目度 {value}",
    liveEyebrow: "現地ライブ映像",
    liveTitle: "近くの人気ライブ",
    regionSuffix: "エリア",
    thumbnailSuffix: "サムネイル",
    loading: "読み込み中",
    weatherLoading: "天気データを同期中",
    refreshWeather: "天気を更新",
    weatherFailed: "データ取得失敗",
    weatherError: "{place} の天気データを取得できません。後でもう一度お試しください。",
    currentWeather: "現在の天気",
    feelsLike: "体感",
    today: "今日",
    weatherChange: "天気変化",
    apparentHigh: "最高体感 {value}°C",
    rainMetric: "降水確率 {rain}%｜雨量 {rainSum} mm",
    windMetric: "最大風速 {wind} km/h",
    updated: "{place}｜Open-Meteo、{time} 更新",
    liveCameraLabel: "{spot} ライブ映像",
    liveSearchSuffix: "ライブカメラ YouTube",
    cameraStation: "{place}駅周辺",
    cameraSightseeing: "{place}観光名所",
    cameraTransit: "{place}空港・港",
    outfitLoadingTitle: "天気を分析中",
    outfitLoadingDescription: "今週の旅に合う服装を整理しています。",
    outfitSnow: "防寒しっかり旅コーデ",
    outfitCold: "厚手アウター重ね着",
    outfitCool: "軽めアウターコーデ",
    outfitMild: "快適な軽い重ね着",
    outfitHotFeels: "通気性と日焼け対策コーデ",
    outfitHot: "軽快な夏旅コーデ",
    contextMountain: "山・自然行程",
    contextBeach: "海辺行程",
    contextCity: "街歩き",
    maxFeelsTag: "最高体感 {value}°C",
    rainTag: "雨具必携",
    windTag: "風に注意",
    rangeTag: "朝晩の寒暖差",
    stormTag: "雷雨対策",
    outfitBaseNote: "今週の気温は約 {min}°C から {max}°C です。",
    outfitRangeNote: "朝晩の差が出やすいので、薄手アウターや調整しやすい重ね着がおすすめです。",
    outfitRainNote: "雨の日が約 {days} 日ありそうです。折りたたみ傘や撥水アウターが役立ちます。",
    outfitWindNote: "風が強めなので、帽子や羽織りものは飛ばされにくいものが安心です。",
    outfitEasyNote: "天気の変化は大きくないため、快適なメインコーデに予備の羽織りを一枚足せば十分です。",
    specialtyFood: "名物",
    specialtySweet: "甘味",
    specialtySouvenir: "お土産",
    specialtyFoodNote: "到着後の一食目に入れると、その土地らしさを感じやすい一品です。",
    specialtySweetNote: "午後の休憩や街歩きの途中に楽しみやすい甘味です。",
    specialtySouvenirNote: "駅、百貨店、空港で探しやすく、持ち帰りにも向いています。"
  },
  en: {
    pageTitle: "Japan Weekly Travel Weather",
    heroCopy: "Pick your destination and travel with the right outfit and a lighter mood.",
    languageLabel: "Language",
    destination: "Destination",
    regionLabel: "Region",
    placeLabel: "City / spot",
    weekTitle: "Next 7 days",
    outfitEyebrow: "Weekly outfit summary",
    specialtyEyebrow: "Local recommendations",
    specialtyTitle: "Must-try food and souvenirs",
    threadsEyebrow: "Popular on Threads",
    threadsTitle: "Latest destination buzz",
    threadsLoading: "Syncing Threads posts",
    threadsMissingConfig: "Threads API is not configured. Add THREADS_ACCESS_TOKEN to Cloudflare Pages first.",
    threadsEmpty: "No matching Threads posts were found.",
    threadsError: "Unable to load Threads discussions right now.",
    threadCategoryAll: "All",
    threadCategoryFood: "Food",
    threadCategoryWeather: "Weather / views",
    threadCategoryTraffic: "Traffic",
    threadBucket24h: "24hr",
    threadBucket3d: "3 days",
    threadBucket1w: "1 week",
    threadHeatLabel: "Heat {value}",
    liveEyebrow: "Local live views",
    liveTitle: "Nearby popular livestreams",
    regionSuffix: "region",
    thumbnailSuffix: "thumbnail",
    loading: "Loading",
    weatherLoading: "Syncing weather data",
    refreshWeather: "Refresh weather",
    weatherFailed: "Sync failed",
    weatherError: "Weather data for {place} is unavailable right now. Please refresh later.",
    currentWeather: "Current weather",
    feelsLike: "Feels like",
    today: "Today",
    weatherChange: "Changing weather",
    apparentHigh: "Feels-like high {value}°C",
    rainMetric: "Rain chance {rain}% | rain {rainSum} mm",
    windMetric: "Max wind {wind} km/h",
    updated: "{place} | Open-Meteo, updated {time}",
    liveCameraLabel: "{spot} live view",
    liveSearchSuffix: "live camera YouTube",
    cameraStation: "{place} station area",
    cameraSightseeing: "{place} sightseeing spots",
    cameraTransit: "{place} airport or port",
    outfitLoadingTitle: "Analyzing weather",
    outfitLoadingDescription: "Preparing the best travel outfit for this week.",
    outfitSnow: "Warm winter travel outfit",
    outfitCold: "Layered heavy outerwear",
    outfitCool: "Light jacket outfit",
    outfitMild: "Comfortable light layers",
    outfitHotFeels: "Breathable sun-safe outfit",
    outfitHot: "Light summer travel outfit",
    contextMountain: "Mountain itinerary",
    contextBeach: "Seaside itinerary",
    contextCity: "City walking",
    maxFeelsTag: "Feels-like high {value}°C",
    rainTag: "Bring rain gear",
    windTag: "Mind the wind",
    rangeTag: "Day-night range",
    stormTag: "Storm backup",
    outfitBaseNote: "This week ranges from about {min}°C to {max}°C.",
    outfitRangeNote: "Temperatures may swing between morning and evening, so pack a light outer layer.",
    outfitRainNote: "About {days} days may be rainy. A compact umbrella or water-repellent jacket will help.",
    outfitWindNote: "Winds may be strong, so choose outerwear and hats that stay secure.",
    outfitEasyNote: "The weather looks fairly steady. One comfortable main outfit plus a spare layer should work well.",
    specialtyFood: "Food",
    specialtySweet: "Sweet",
    specialtySouvenir: "Souvenir",
    specialtyFoodNote: "A good first meal after arrival and an easy way to taste the local character.",
    specialtySweetNote: "Great for an afternoon pause while sightseeing.",
    specialtySouvenirNote: "Easy to find at stations, department stores, or airports before heading home."
  }
};

const regionCopy = {
  zh: { kanto: "關東", chubu: "中部", kansai: "關西", hokkaido: "北海道", tohoku: "東北", "chugoku-shikoku": "中國・四國", kyushu: "九州", okinawa: "沖繩" },
  ja: { kanto: "関東", chubu: "中部", kansai: "関西", hokkaido: "北海道", tohoku: "東北", "chugoku-shikoku": "中国・四国", kyushu: "九州", okinawa: "沖縄" },
  en: { kanto: "Kanto", chubu: "Chubu", kansai: "Kansai", hokkaido: "Hokkaido", tohoku: "Tohoku", "chugoku-shikoku": "Chugoku / Shikoku", kyushu: "Kyushu", okinawa: "Okinawa" }
};

const placeCopy = {
  zh: {
    tokyo: ["東京都", "東京鐵塔與晴空塔"], yokohama: ["橫濱", "港未來與紅磚倉庫"], nikko: ["日光", "東照宮與山林瀑布"],
    fuji: ["富士五湖", "富士山與湖畔景色"], kanazawa: ["金澤", "兼六園與茶屋街"], takayama: ["高山", "飛驒老街"],
    kyoto: ["京都", "伏見稻荷與古寺街景"], osaka: ["大阪", "大阪城與道頓堀美食"], nara: ["奈良", "梅花鹿與東大寺"],
    sapporo: ["札幌", "時計台與雪景街道"], furano: ["富良野", "花田與丘陵風景"], hakodate: ["函館", "函館山夜景"],
    sendai: ["仙台", "七夕祭與青葉城"], aomori: ["青森", "睡魔祭與蘋果"], akita: ["秋田", "竿燈祭與雪景"],
    hiroshima: ["廣島", "巖島神社與和平記念公園"], kurashiki: ["倉敷", "美觀地區白壁街道"], matsuyama: ["松山", "松山城與道後溫泉"],
    fukuoka: ["福岡", "屋台與博多美食"], aso: ["阿蘇", "阿蘇火山與草千里"], kagoshima: ["鹿兒島", "櫻島火山"],
    nagasaki: ["長崎", "港景與異國街道"], okinawa: ["沖繩本島", "首里城與碧海沙灘"], ishigaki: ["石垣島", "川平灣與珊瑚海"]
  },
  ja: {
    tokyo: ["東京都", "東京タワーと東京スカイツリー"], yokohama: ["横浜", "みなとみらいと赤レンガ倉庫"], nikko: ["日光", "東照宮と山林の滝"],
    fuji: ["富士五湖", "富士山と湖畔の景色"], kanazawa: ["金沢", "兼六園と茶屋街"], takayama: ["高山", "飛騨の古い町並み"],
    kyoto: ["京都", "伏見稲荷と古寺の町並み"], osaka: ["大阪", "大阪城と道頓堀グルメ"], nara: ["奈良", "鹿と東大寺"],
    sapporo: ["札幌", "時計台と雪景色の街"], furano: ["富良野", "花畑と丘陵風景"], hakodate: ["函館", "函館山の夜景"],
    sendai: ["仙台", "七夕まつりと青葉城"], aomori: ["青森", "ねぶた祭とりんご"], akita: ["秋田", "竿燈まつりと雪景色"],
    hiroshima: ["広島", "嚴島神社と平和記念公園"], kurashiki: ["倉敷", "美観地区の白壁の町並み"], matsuyama: ["松山", "松山城と道後温泉"],
    fukuoka: ["福岡", "屋台と博多グルメ"], aso: ["阿蘇", "阿蘇山と草千里"], kagoshima: ["鹿児島", "桜島"],
    nagasaki: ["長崎", "港町と異国情緒の街並み"], okinawa: ["沖縄本島", "首里城と青い海"], ishigaki: ["石垣島", "川平湾とサンゴの海"]
  },
  en: {
    tokyo: ["Tokyo", "Tokyo Tower and Tokyo Skytree"], yokohama: ["Yokohama", "Minato Mirai and Red Brick Warehouse"], nikko: ["Nikko", "Toshogu Shrine and forest waterfalls"],
    fuji: ["Fuji Five Lakes", "Mount Fuji and lakeside scenery"], kanazawa: ["Kanazawa", "Kenrokuen Garden and teahouse streets"], takayama: ["Takayama", "Hida old town"],
    kyoto: ["Kyoto", "Fushimi Inari and historic temples"], osaka: ["Osaka", "Osaka Castle and Dotonbori food"], nara: ["Nara", "Deer and Todaiji Temple"],
    sapporo: ["Sapporo", "Clock Tower and snowy streets"], furano: ["Furano", "Flower fields and rolling hills"], hakodate: ["Hakodate", "Mount Hakodate night view"],
    sendai: ["Sendai", "Tanabata Festival and Aoba Castle"], aomori: ["Aomori", "Nebuta Festival and apples"], akita: ["Akita", "Kanto Festival and snowy scenery"],
    hiroshima: ["Hiroshima", "Itsukushima Shrine and Peace Memorial Park"], kurashiki: ["Kurashiki", "Bikan Quarter white-wall streets"], matsuyama: ["Matsuyama", "Matsuyama Castle and Dogo Onsen"],
    fukuoka: ["Fukuoka", "Yatai stalls and Hakata food"], aso: ["Aso", "Mount Aso and Kusasenri"], kagoshima: ["Kagoshima", "Sakurajima volcano"],
    nagasaki: ["Nagasaki", "Harbor views and international streets"], okinawa: ["Okinawa Main Island", "Shuri Castle and blue beaches"], ishigaki: ["Ishigaki Island", "Kabira Bay and coral sea"]
  }
};

const specialtyNames = {
  tokyo: { zh: ["江戶前壽司", "東京香蕉", "人形燒"], ja: ["江戸前寿司", "東京ばな奈", "人形焼"], en: ["Edomae sushi", "Tokyo Banana", "Ningyo-yaki"] },
  yokohama: { zh: ["崎陽軒燒賣", "橫濱拿坡里義大利麵", "紅磚倉庫甜點"], ja: ["崎陽軒シウマイ", "横浜ナポリタン", "赤レンガ倉庫スイーツ"], en: ["Kiyoken shumai", "Yokohama napolitan", "Red Brick Warehouse sweets"] },
  nikko: { zh: ["湯波料理", "日光羊羹", "金谷飯店麵包"], ja: ["湯波料理", "日光羊羹", "金谷ホテルベーカリー"], en: ["Yuba dishes", "Nikko yokan", "Kanaya Hotel Bakery"] },
  fuji: { zh: ["餺飥", "吉田烏龍麵", "富士山造型餅乾"], ja: ["ほうとう", "吉田のうどん", "富士山クッキー"], en: ["Hoto noodles", "Yoshida udon", "Mount Fuji cookies"] },
  kanazawa: { zh: ["金澤關東煮", "金箔甜點", "加賀棒茶"], ja: ["金沢おでん", "金箔スイーツ", "加賀棒茶"], en: ["Kanazawa oden", "Gold leaf sweets", "Kaga bocha tea"] },
  takayama: { zh: ["飛驒牛", "御手洗糰子", "猿寶寶伴手禮"], ja: ["飛騨牛", "みたらし団子", "さるぼぼ"], en: ["Hida beef", "Mitarashi dango", "Sarubobo charms"] },
  kyoto: { zh: ["湯豆腐", "抹茶甜點", "八橋"], ja: ["湯豆腐", "抹茶スイーツ", "八ツ橋"], en: ["Yudofu", "Matcha sweets", "Yatsuhashi"] },
  osaka: { zh: ["章魚燒", "大阪燒", "551 蓬萊豬肉包"], ja: ["たこ焼き", "お好み焼き", "551 蓬莱の豚まん"], en: ["Takoyaki", "Okonomiyaki", "551 Horai pork buns"] },
  nara: { zh: ["柿葉壽司", "奈良漬", "小鹿餅乾伴手禮"], ja: ["柿の葉寿司", "奈良漬", "鹿サブレ"], en: ["Kakinoha sushi", "Narazuke pickles", "Deer-shaped cookies"] },
  sapporo: { zh: ["味噌拉麵", "湯咖哩", "白色戀人"], ja: ["味噌ラーメン", "スープカレー", "白い恋人"], en: ["Miso ramen", "Soup curry", "Shiroi Koibito"] },
  furano: { zh: ["富良野蛋包咖哩", "哈密瓜甜點", "薰衣草商品"], ja: ["富良野オムカレー", "メロンスイーツ", "ラベンダーグッズ"], en: ["Furano omelet curry", "Melon sweets", "Lavender goods"] },
  hakodate: { zh: ["海鮮丼", "鹽味拉麵", "起司甜點"], ja: ["海鮮丼", "塩ラーメン", "チーズスイーツ"], en: ["Seafood bowl", "Salt ramen", "Cheese sweets"] },
  sendai: { zh: ["牛舌", "毛豆麻糬", "笹魚板"], ja: ["牛タン", "ずんだ餅", "笹かまぼこ"], en: ["Gyutan beef tongue", "Zunda mochi", "Sasa kamaboko"] },
  aomori: { zh: ["蘋果派", "海鮮丼", "蘋果汁"], ja: ["アップルパイ", "のっけ丼", "りんごジュース"], en: ["Apple pie", "Nokkedon seafood bowl", "Apple juice"] },
  akita: { zh: ["烤米棒鍋", "稻庭烏龍麵", "燻蘿蔔漬"], ja: ["きりたんぽ鍋", "稲庭うどん", "いぶりがっこ"], en: ["Kiritanpo hotpot", "Inaniwa udon", "Iburigakko pickles"] },
  hiroshima: { zh: ["廣島燒", "牡蠣料理", "紅葉饅頭"], ja: ["広島お好み焼き", "牡蠣料理", "もみじ饅頭"], en: ["Hiroshima okonomiyaki", "Oyster dishes", "Momiji manju"] },
  kurashiki: { zh: ["白桃聖代", "麝香葡萄甜點", "丹寧小物"], ja: ["白桃パフェ", "マスカットスイーツ", "デニム雑貨"], en: ["White peach parfait", "Muscat sweets", "Denim goods"] },
  matsuyama: { zh: ["鯛魚飯", "少爺糰子", "蜜柑果汁"], ja: ["鯛めし", "坊っちゃん団子", "みかんジュース"], en: ["Taimeshi sea bream rice", "Botchan dango", "Mikan juice"] },
  fukuoka: { zh: ["豚骨拉麵", "明太子", "博多通饅頭"], ja: ["豚骨ラーメン", "明太子", "博多通りもん"], en: ["Tonkotsu ramen", "Mentaiko", "Hakata Torimon"] },
  aso: { zh: ["赤牛丼", "阿蘇牛奶甜點", "阿蘇優格"], ja: ["あか牛丼", "阿蘇ミルクスイーツ", "阿蘇ヨーグルト"], en: ["Akaushi beef bowl", "Aso milk sweets", "Aso yogurt"] },
  kagoshima: { zh: ["黑豬料理", "白熊冰", "薩摩揚"], ja: ["黒豚料理", "白熊", "さつま揚げ"], en: ["Kurobuta pork", "Shirokuma shaved ice", "Satsuma-age"] },
  nagasaki: { zh: ["長崎強棒麵", "長崎蛋糕", "角煮包"], ja: ["長崎ちゃんぽん", "カステラ", "角煮まんじゅう"], en: ["Nagasaki champon", "Castella", "Kakuni manju"] },
  okinawa: { zh: ["沖繩麵", "沙翁甜甜圈", "金楚糕"], ja: ["沖縄そば", "サーターアンダギー", "ちんすこう"], en: ["Okinawa soba", "Sata andagi", "Chinsuko"] },
  ishigaki: { zh: ["石垣牛", "八重山蕎麥麵", "鹽味餅乾"], ja: ["石垣牛", "八重山そば", "塩ちんすこう"], en: ["Ishigaki beef", "Yaeyama soba", "Salt cookies"] }
};

const regionSelect = document.querySelector("#region-select");
const placeSelect = document.querySelector("#place-select");
const quickRegions = document.querySelector("#quick-regions");
const selectedRegionLabel = document.querySelector("#selected-region-label");
const regionKicker = document.querySelector("#region-kicker");
const placeName = document.querySelector("#place-name");
const placeFeature = document.querySelector("#place-feature");
const placeThumbnail = document.querySelector("#place-thumbnail");
const heroScene = document.querySelector("#hero-scene");
const heroDestination = document.querySelector("#hero-destination");
const currentChip = document.querySelector("#current-chip");
const threadCategoryTabs = document.querySelector("#thread-category-tabs");
const threadCategoryButtons = document.querySelectorAll("[data-thread-category]");
const threadsStatus = document.querySelector("#threads-status");
const threadsGrid = document.querySelector("#threads-grid");
const liveCameraGrid = document.querySelector("#live-cameras-grid");
const specialtyGrid = document.querySelector("#specialty-grid");
const outfitTitle = document.querySelector("#outfit-title");
const outfitDescription = document.querySelector("#outfit-description");
const outfitTags = document.querySelector("#outfit-tags");
const outfitVisual = document.querySelector(".outfit-visual");
const outfitLookImage = document.querySelector("#outfit-look-image");
const forecastGrid = document.querySelector("#forecast-grid");
const forecastUpdated = document.querySelector("#forecast-updated");
const refreshButton = document.querySelector("#refresh-button");
const languageButtons = document.querySelectorAll("[data-lang]");
const translatedElements = document.querySelectorAll("[data-i18n]");

let currentLanguage = "zh";
let dateFormatter = new Intl.DateTimeFormat(languageLocales[currentLanguage].locale, {
  month: "numeric",
  day: "numeric",
  weekday: "short"
});

let selectedRegionId = "kanto";
let selectedPlaceId = "tokyo";
let selectedThreadCategory = "all";
let activeRequestId = 0;
let activeThreadsRequestId = 0;

function init() {
  renderStaticText();
  renderRegionOptions();
  renderQuickRegions();
  renderPlaceOptions();
  bindEvents();
  updateView();
}

function t(key, replacements = {}) {
  const template = uiText[currentLanguage]?.[key] ?? uiText.zh[key] ?? key;
  return Object.entries(replacements).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, value), template);
}

function renderStaticText() {
  document.documentElement.lang = languageLocales[currentLanguage].html;
  document.title = t("pageTitle");
  dateFormatter = new Intl.DateTimeFormat(languageLocales[currentLanguage].locale, {
    month: "numeric",
    day: "numeric",
    weekday: "short"
  });

  translatedElements.forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  languageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === currentLanguage);
    button.setAttribute("aria-pressed", String(button.dataset.lang === currentLanguage));
  });

  threadCategoryButtons.forEach((button) => {
    button.textContent = t(`threadCategory${toPascalCase(button.dataset.threadCategory)}`);
    button.classList.toggle("is-active", button.dataset.threadCategory === selectedThreadCategory);
    button.setAttribute("aria-pressed", String(button.dataset.threadCategory === selectedThreadCategory));
  });

  refreshButton.setAttribute("aria-label", t("refreshWeather"));
}

function toPascalCase(value) {
  return value
    .split("-")
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join("");
}

function getRegionName(region) {
  return regionCopy[currentLanguage]?.[region.id] ?? regionCopy.zh[region.id] ?? region.name;
}

function getPlaceName(place) {
  return placeCopy[currentLanguage]?.[place.id]?.[0] ?? placeCopy.zh[place.id]?.[0] ?? place.name;
}

function getPlaceFeature(place) {
  return placeCopy[currentLanguage]?.[place.id]?.[1] ?? placeCopy.zh[place.id]?.[1] ?? place.feature;
}

function getWeatherLabel(code) {
  const [icon, fallback] = weatherMap.get(code) ?? ["🌡", t("weatherChange")];
  if (currentLanguage === "zh") return [icon, fallback];

  const labels = {
    ja: {
      0: "晴れ", 1: "おおむね晴れ", 2: "一部くもり", 3: "くもり", 45: "霧", 48: "霧氷",
      51: "弱い霧雨", 53: "霧雨", 55: "強い霧雨", 61: "小雨", 63: "雨", 65: "強い雨",
      71: "小雪", 73: "雪", 75: "大雪", 80: "にわか雨", 81: "強いにわか雨", 82: "激しいにわか雨",
      85: "にわか雪", 86: "強いにわか雪", 95: "雷雨", 96: "雷雨とひょう", 99: "強い雷雨とひょう"
    },
    en: {
      0: "Clear", 1: "Mostly clear", 2: "Partly cloudy", 3: "Overcast", 45: "Fog", 48: "Rime fog",
      51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle", 61: "Light rain", 63: "Rain", 65: "Heavy rain",
      71: "Light snow", 73: "Snow", 75: "Heavy snow", 80: "Rain showers", 81: "Heavy showers", 82: "Violent showers",
      85: "Snow showers", 86: "Heavy snow showers", 95: "Thunderstorm", 96: "Thunderstorm with hail", 99: "Severe thunderstorm with hail"
    }
  };

  return [icon, labels[currentLanguage]?.[code] ?? t("weatherChange")];
}

function renderRegionOptions() {
  regionSelect.innerHTML = regions
    .map((region) => `<option value="${region.id}">${getRegionName(region)}</option>`)
    .join("");
  regionSelect.value = selectedRegionId;
}

function renderQuickRegions() {
  quickRegions.innerHTML = regions
    .map(
      (region) =>
        `<button class="region-button ${region.id === selectedRegionId ? "is-active" : ""}" type="button" data-region="${region.id}">${getRegionName(region)}</button>`
    )
    .join("");
}

function renderPlaceOptions() {
  const region = getRegion();
  placeSelect.innerHTML = region.places.map((place) => `<option value="${place.id}">${getPlaceName(place)}</option>`).join("");
  placeSelect.value = selectedPlaceId;
}

function bindEvents() {
  regionSelect.addEventListener("change", () => {
    selectedRegionId = regionSelect.value;
    selectedPlaceId = getDefaultPlaceId(getRegion());
    renderPlaceOptions();
    renderQuickRegions();
    updateView();
  });

  placeSelect.addEventListener("change", () => {
    selectedPlaceId = placeSelect.value;
    updateView();
  });

  quickRegions.addEventListener("click", (event) => {
    const button = event.target.closest("[data-region]");
    if (!button) return;
    selectedRegionId = button.dataset.region;
    selectedPlaceId = getDefaultPlaceId(getRegion());
    regionSelect.value = selectedRegionId;
    renderPlaceOptions();
    renderQuickRegions();
    updateView();
  });

  threadCategoryTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-thread-category]");
    if (!button) return;
    selectedThreadCategory = button.dataset.threadCategory;
    renderStaticText();
    renderThreadsDiscussions(getPlace());
  });

  refreshButton.addEventListener("click", updateView);

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.lang === currentLanguage) return;
      currentLanguage = button.dataset.lang;
      renderStaticText();
      renderRegionOptions();
      renderPlaceOptions();
      renderQuickRegions();
      updateView();
    });
  });
}

function getRegion() {
  return regions.find((region) => region.id === selectedRegionId) ?? regions[0];
}

function getPlace() {
  const region = getRegion();
  return region.places.find((place) => place.id === selectedPlaceId) ?? region.places[0];
}

function getDefaultPlaceId(region) {
  return region.defaultPlaceId ?? region.places[0].id;
}

async function renderThreadsDiscussions(place) {
  const requestId = ++activeThreadsRequestId;
  const placeLabel = getPlaceName(place);
  threadsStatus.textContent = t("threadsLoading");
  threadsGrid.innerHTML = "";

  try {
    const apiBase = getThreadsApiBase();
    const params = new URLSearchParams({
      place: place.id,
      category: selectedThreadCategory,
      lang: currentLanguage
    });
    const response = await fetch(`${apiBase}/api/threads?${params}`);
    const payload = await response.json().catch(() => ({}));
    if (requestId !== activeThreadsRequestId) return;

    if (!response.ok) {
      threadsStatus.textContent = payload.code === "THREADS_NOT_CONFIGURED" ? t("threadsMissingConfig") : t("threadsError");
      return;
    }

    const posts = rankThreadPosts(payload.posts ?? []).slice(0, 5);
    if (!posts.length) {
      threadsStatus.textContent = t("threadsEmpty");
      return;
    }

    threadsStatus.textContent = `${placeLabel}｜${t(`threadCategory${toPascalCase(selectedThreadCategory)}`)}｜${posts.length} Threads`;
    threadsGrid.innerHTML = posts.map(renderThreadCard).join("");
  } catch (error) {
    if (requestId !== activeThreadsRequestId) return;
    threadsStatus.textContent = t("threadsError");
  }
}

function getThreadsApiBase() {
  return location.hostname === "my-travel-web.pages.dev" ? "" : "https://my-travel-web.pages.dev";
}

function rankThreadPosts(posts) {
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  const threeDays = 3 * oneDay;
  const oneWeek = 7 * oneDay;
  const normalized = posts
    .map((post, index) => normalizeThreadPost(post, index, now, oneDay, threeDays, oneWeek))
    .filter((post) => post.bucket !== "older");
  const max24hHeat = Math.max(1, ...normalized.filter((post) => post.bucket === "24h").map((post) => post.heat));

  return normalized.sort((a, b) => {
    const aPriority = getThreadPriority(a, max24hHeat);
    const bPriority = getThreadPriority(b, max24hHeat);
    if (aPriority !== bPriority) return bPriority - aPriority;
    if (a.timestamp !== b.timestamp) return b.timestamp - a.timestamp;
    return b.heat - a.heat;
  });
}

function normalizeThreadPost(post, index, now, oneDay, threeDays, oneWeek) {
  const timestamp = Date.parse(post.timestamp ?? post.created_time ?? "");
  const age = Number.isFinite(timestamp) ? now - timestamp : Number.POSITIVE_INFINITY;
  let bucket = "older";
  if (age <= oneDay) bucket = "24h";
  else if (age <= threeDays) bucket = "3d";
  else if (age <= oneWeek) bucket = "1w";

  const heat =
    Number(post.like_count ?? post.likes ?? 0) +
    Number(post.reply_count ?? post.replies ?? post.comments_count ?? 0) * 2 +
    Number(post.repost_count ?? post.reposts ?? 0) * 2 +
    Number(post.quote_count ?? post.quotes ?? 0) * 2 +
    Number(post.view_count ?? post.views ?? 0) * 0.01 +
    Math.max(0, 60 - index);

  return {
    id: post.id ?? `${timestamp}-${index}`,
    text: post.text ?? post.caption ?? "",
    username: post.username ?? post.owner?.username ?? "Threads",
    permalink: post.permalink ?? post.url ?? "https://www.threads.net/",
    timestamp: Number.isFinite(timestamp) ? timestamp : 0,
    heat: Math.round(heat),
    bucket
  };
}

function getThreadPriority(post, max24hHeat) {
  if (post.bucket === "24h") return 3;
  if (post.bucket === "3d") return post.heat > max24hHeat * 1.2 ? 3.5 : 2;
  if (post.bucket === "1w") return post.heat > max24hHeat * 1.5 ? 3.25 : 1;
  return 0;
}

function renderThreadCard(post) {
  const bucketLabel = post.bucket === "24h" ? t("threadBucket24h") : post.bucket === "3d" ? t("threadBucket3d") : t("threadBucket1w");
  const date = post.timestamp
    ? new Date(post.timestamp).toLocaleString(languageLocales[currentLanguage].locale, { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })
    : "";
  const text = post.text || post.permalink;

  return `
    <a class="thread-card" href="${escapeAttribute(post.permalink)}" target="_blank" rel="noopener noreferrer">
      <div class="thread-card__meta">
        <span>${escapeHtml(bucketLabel)}</span>
        <span>${escapeHtml(t("threadHeatLabel", { value: post.heat }))}</span>
      </div>
      <strong>${escapeHtml(truncateText(text, 92))}</strong>
      <p>@${escapeHtml(post.username)}</p>
      <small>${escapeHtml(date)}</small>
    </a>
  `;
}

function truncateText(text, maxLength) {
  return text.length > maxLength ? `${text.slice(0, maxLength - 1)}…` : text;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  const text = String(value);
  if (!/^https:\/\/(www\.)?threads\.(net|com)\//.test(text)) return "https://www.threads.net/";
  return escapeHtml(text);
}

function renderLiveCameras(place) {
  const spots = getLiveCameraSpots(place);
  liveCameraGrid.innerHTML = spots
    .slice(0, 5)
    .map((spot) => {
      const displayName = toDisplaySpotName(spot);
      const label = t("liveCameraLabel", { spot: displayName });
      const query = `${displayName} ${t("liveSearchSuffix")}`;
      const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
      return `
        <a class="live-camera-link" href="${url}" target="_blank" rel="noopener noreferrer">
          <span>${label}</span>
          <strong>YouTube</strong>
        </a>
      `;
    })
    .join("");
}

function getLiveCameraSpots(place) {
  const placeLabel = getPlaceName(place);
  const featureLabel = getPlaceFeature(place);
  if (currentLanguage === "zh") {
    return liveCameraSpots[place.id] ?? [placeLabel, featureLabel, `${placeLabel}車站`, `${placeLabel}觀光`, `${placeLabel}機場`];
  }
  return [
    placeLabel,
    featureLabel,
    t("cameraStation", { place: placeLabel }),
    t("cameraSightseeing", { place: placeLabel }),
    t("cameraTransit", { place: placeLabel })
  ];
}

function toDisplaySpotName(spot) {
  return spot
    .replace("スクランブル交差点", "十字路")
    .replace("ライブカメラ", "")
    .trim();
}

function renderLocalSpecialties(place) {
  const names = specialtyNames[place.id]?.[currentLanguage] ?? specialtyNames[place.id]?.zh;
  const specialties = names
    ? [
        { name: names[0], type: t("specialtyFood"), note: t("specialtyFoodNote") },
        { name: names[1], type: t("specialtySweet"), note: t("specialtySweetNote") },
        { name: names[2], type: t("specialtySouvenir"), note: t("specialtySouvenirNote") }
      ]
    : localSpecialties[place.id] ?? [
        { name: `${getPlaceName(place)} ramen`, type: t("specialtyFood"), note: t("specialtyFoodNote") },
        { name: `${getPlaceName(place)} sweets`, type: t("specialtySweet"), note: t("specialtySweetNote") },
        { name: `${getPlaceName(place)} limited souvenir`, type: t("specialtySouvenir"), note: t("specialtySouvenirNote") }
      ];

  specialtyGrid.innerHTML = specialties
    .slice(0, 3)
    .map(
      (item) => `
        <article class="specialty-card">
          <span>${item.type}</span>
          <strong>${item.name}</strong>
          <p>${item.note}</p>
        </article>
      `
    )
    .join("");
}

async function updateView() {
  const requestId = ++activeRequestId;
  const region = getRegion();
  const place = getPlace();
  const regionName = getRegionName(region);
  const placeLabel = getPlaceName(place);
  const featureLabel = getPlaceFeature(place);

  selectedRegionLabel.textContent = regionName;
  regionKicker.textContent = `${regionName}${currentLanguage === "en" ? " " : ""}${t("regionSuffix")}`;
  placeName.textContent = placeLabel;
  placeFeature.textContent = featureLabel;
  placeThumbnail.src = `assets/place-thumbnails/${place.id}.jpg`;
  placeThumbnail.alt = `${placeLabel}${t("thumbnailSuffix")}`;
  heroScene.className = `hero-scene ${place.art}`;
  heroDestination.textContent = `${regionName}${currentLanguage === "en" ? " " : ""}${t("regionSuffix")}｜${featureLabel}`;
  renderThreadsDiscussions(place);
  renderLiveCameras(place);
  renderLocalSpecialties(place);
  currentChip.innerHTML = `<span>${t("loading")}</span><strong>--°C</strong><small>${t("feelsLike")} --°C</small>`;
  renderOutfitLoading();
  forecastGrid.innerHTML = `<div class="loading">${t("weatherLoading")}</div>`;
  forecastUpdated.textContent = t("weatherLoading");

  try {
    const forecast = await fetchForecast(place);
    if (requestId !== activeRequestId) return;
    renderForecast(forecast, place);
  } catch (error) {
    if (requestId !== activeRequestId) return;
    forecastGrid.innerHTML = `<div class="error">${t("weatherError", { place: placeLabel })}</div>`;
    forecastUpdated.textContent = t("weatherFailed");
    currentChip.innerHTML = `<span>${t("currentWeather")}</span><strong>--°C</strong><small>${t("feelsLike")} --°C</small>`;
  }
}

async function fetchForecast(place) {
  const params = new URLSearchParams({
    latitude: place.latitude,
    longitude: place.longitude,
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "apparent_temperature_max",
      "precipitation_probability_max",
      "precipitation_sum",
      "wind_speed_10m_max"
    ].join(","),
    current: "temperature_2m,apparent_temperature,weather_code",
    timezone: "Asia/Tokyo",
    forecast_days: "7"
  });

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!response.ok) {
    throw new Error(`Weather API returned ${response.status}`);
  }
  return response.json();
}

function renderForecast(forecast, place) {
  const daily = forecast.daily;
  renderOutfitSummary(daily, place);

  const cards = daily.time.map((date, index) => {
    const code = daily.weather_code[index];
    const [icon, condition] = getWeatherLabel(code);
    const max = Math.round(daily.temperature_2m_max[index]);
    const min = Math.round(daily.temperature_2m_min[index]);
    const apparent = Math.round(daily.apparent_temperature_max[index]);
    const rain = daily.precipitation_probability_max[index] ?? 0;
    const rainSum = daily.precipitation_sum[index] ?? 0;
    const wind = Math.round(daily.wind_speed_10m_max[index] ?? 0);
    const formattedDate = dateFormatter.format(new Date(`${date}T00:00:00+09:00`));

    return `
      <article class="day-card ${index === 0 ? "is-today" : ""}">
        <div class="day-head">
          <span>${index === 0 ? t("today") : formattedDate}</span>
          <span>${date}</span>
        </div>
        <div class="weather-icon" aria-hidden="true">${icon}</div>
        <div>
          <div class="temp"><strong>${max}°</strong><span>/ ${min}°C</span></div>
          <div class="condition">${condition}</div>
        </div>
        <div class="metrics">
          <span>${t("apparentHigh", { value: apparent })}</span>
          <span>${t("rainMetric", { rain, rainSum: rainSum.toFixed(1) })}</span>
          <span>${t("windMetric", { wind })}</span>
        </div>
      </article>
    `;
  });

  const [currentIcon, currentText] = getWeatherLabel(forecast.current.weather_code);
  const currentTemp = Math.round(forecast.current.temperature_2m);
  const currentFeelsLike = forecast.current.apparent_temperature ?? daily.apparent_temperature_max[0];
  currentChip.innerHTML = `<span>${currentIcon} ${currentText}</span><strong>${currentTemp}°C</strong><small>${t("feelsLike")} ${Math.round(currentFeelsLike)}°C</small>`;
  forecastGrid.innerHTML = cards.join("");
  const updateTime = new Date().toLocaleString(languageLocales[currentLanguage].locale, { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit" });
  forecastUpdated.textContent = t("updated", { place: getPlaceName(place), time: updateTime });
}

function renderOutfitLoading() {
  outfitTitle.textContent = t("outfitLoadingTitle");
  outfitDescription.textContent = t("outfitLoadingDescription");
  outfitTags.innerHTML = "";
  outfitLookImage.src = "assets/outfit-looks/city.png";
  outfitVisual.className = "outfit-visual";
}

function renderOutfitSummary(daily, place) {
  const summary = getWeeklyOutfitSummary(daily, place);

  outfitTitle.textContent = summary.title;
  outfitDescription.textContent = summary.description;
  outfitTags.innerHTML = summary.tags.map((tag) => `<span>${tag}</span>`).join("");
  outfitVisual.className = `outfit-visual ${summary.tone}`;
  outfitLookImage.src = getOutfitLookSrc(summary.context);
}

function getWeeklyOutfitSummary(daily, place) {
  const maxTemps = daily.temperature_2m_max.map(Math.round);
  const minTemps = daily.temperature_2m_min.map(Math.round);
  const apparentTemps = daily.apparent_temperature_max.map(Math.round);
  const rainProbabilities = daily.precipitation_probability_max.map((value) => value ?? 0);
  const rainSums = daily.precipitation_sum.map((value) => value ?? 0);
  const winds = daily.wind_speed_10m_max.map((value) => Math.round(value ?? 0));
  const codes = daily.weather_code;

  const max = Math.max(...maxTemps);
  const min = Math.min(...minTemps);
  const apparentMax = Math.max(...apparentTemps);
  const rainMax = Math.max(...rainProbabilities);
  const rainyDays = rainProbabilities.filter((value, index) => value >= 55 || rainSums[index] >= 2).length;
  const windMax = Math.max(...winds);
  const snowDays = codes.filter((code) => [71, 73, 75, 77, 85, 86].includes(code)).length;
  const hasStorm = codes.some((code) => [82, 95, 96, 99].includes(code));
  const hasRain = rainyDays >= 2 || rainMax >= 65;
  const isWindy = windMax >= 28;
  const hasLargeRange = max - min >= 9;
  const context = place.context ?? "city";
  const outfit = recommendOutfit({
    context,
    minTemp: min,
    maxTemp: max,
    rainProbability: rainMax,
    windSpeed: windMax
  });

  let title;
  let tone;

  if (snowDays > 0 || min <= 2) {
    title = t("outfitSnow");
    tone = "is-cold";
  } else if (max <= 10) {
    title = t("outfitCold");
    tone = "is-cold";
  } else if (max <= 17) {
    title = t("outfitCool");
    tone = "is-mild";
  } else if (max <= 24) {
    title = t("outfitMild");
    tone = "is-mild";
  } else if (apparentMax >= 30) {
    title = t("outfitHotFeels");
    tone = "is-hot";
  } else {
    title = t("outfitHot");
    tone = "is-hot";
  }

  const tags = [`${min}°C ～ ${max}°C`, t("maxFeelsTag", { value: apparentMax })];
  tags.push(getContextLabel(context));
  if (hasRain) tags.push(t("rainTag"));
  if (isWindy) tags.push(t("windTag"));
  if (hasLargeRange) tags.push(t("rangeTag"));
  if (hasStorm) tags.push(t("stormTag"));

  const notes = [];
  notes.push(t("outfitBaseNote", { min, max }));
  if (hasLargeRange) notes.push(t("outfitRangeNote"));
  if (hasRain) notes.push(t("outfitRainNote", { days: rainyDays }));
  if (isWindy) notes.push(t("outfitWindNote"));
  if (!hasRain && !hasLargeRange && !isWindy) notes.push(t("outfitEasyNote"));

  return {
    title,
    tone,
    context,
    outfit,
    tags,
    description: notes.join("")
  };
}

function getContextLabel(context) {
  if (context === "mountain") return t("contextMountain");
  if (context === "beach") return t("contextBeach");
  return t("contextCity");
}

function getOutfitLookSrc(context) {
  if (context === "mountain") return "assets/outfit-looks/mountain.png";
  if (context === "beach") return "assets/outfit-looks/beach.png";
  return "assets/outfit-looks/city.png";
}

init();
