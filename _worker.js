const THREADS_ENDPOINT = "https://graph.threads.net/v1.0/keyword_search";

const PLACE_KEYWORDS = {
  tokyo: ["東京都", "東京", "Tokyo"],
  yokohama: ["横浜", "橫濱", "Yokohama"],
  nikko: ["日光", "Nikko"],
  fuji: ["富士山", "富士五湖", "河口湖", "Mount Fuji"],
  kanazawa: ["金沢", "金澤", "Kanazawa"],
  takayama: ["高山", "飛騨高山", "Takayama"],
  kyoto: ["京都", "Kyoto"],
  osaka: ["大阪", "Osaka"],
  nara: ["奈良", "Nara"],
  sapporo: ["札幌", "Sapporo"],
  furano: ["富良野", "Furano"],
  hakodate: ["函館", "Hakodate"],
  sendai: ["仙台", "Sendai"],
  aomori: ["青森", "Aomori"],
  akita: ["秋田", "Akita"],
  hiroshima: ["広島", "廣島", "Hiroshima"],
  kurashiki: ["倉敷", "Kurashiki"],
  matsuyama: ["松山", "Matsuyama"],
  fukuoka: ["福岡", "Fukuoka"],
  aso: ["阿蘇", "Aso"],
  kagoshima: ["鹿児島", "鹿兒島", "Kagoshima"],
  nagasaki: ["長崎", "Nagasaki"],
  okinawa: ["沖縄", "沖繩", "Okinawa"],
  ishigaki: ["石垣島", "Ishigaki"]
};

const CATEGORY_TERMS = {
  all: [""],
  food: ["美食", "グルメ", "ランチ", "food"],
  weather: ["天気", "景色", "絶景", "weather", "view"],
  traffic: ["交通", "電車", "空港", "traffic", "train"]
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/threads") {
      return handleThreadsSearch(request, env);
    }

    return env.ASSETS.fetch(request);
  }
};

async function handleThreadsSearch(request, env) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "public, max-age=300"
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (!env.THREADS_ACCESS_TOKEN) {
    return json({ code: "THREADS_NOT_CONFIGURED", posts: [] }, 501, headers);
  }

  const url = new URL(request.url);
  const place = sanitizeKey(url.searchParams.get("place") ?? "tokyo");
  const category = sanitizeKey(url.searchParams.get("category") ?? "all");
  const placeTerms = PLACE_KEYWORDS[place] ?? PLACE_KEYWORDS.tokyo;
  const categoryTerms = CATEGORY_TERMS[category] ?? CATEGORY_TERMS.all;
  const queries = buildQueries(placeTerms, categoryTerms).slice(0, 6);

  try {
    const results = await Promise.all(
      queries.flatMap((query) => [
        searchThreads(query, "RECENT", env.THREADS_ACCESS_TOKEN),
        searchThreads(query, "TOP", env.THREADS_ACCESS_TOKEN)
      ])
    );
    const posts = dedupe(results.flatMap((result) => result.data ?? []));
    return json({ code: "OK", posts }, 200, headers);
  } catch (error) {
    return json({ code: "THREADS_SEARCH_FAILED", message: error.message, posts: [] }, 502, headers);
  }
}

function buildQueries(placeTerms, categoryTerms) {
  const queries = [];
  for (const place of placeTerms.slice(0, 3)) {
    for (const term of categoryTerms.slice(0, 3)) {
      queries.push(term ? `${place} ${term}` : place);
    }
  }
  return [...new Set(queries)];
}

async function searchThreads(query, searchType, token) {
  const fields = "id,text,permalink,timestamp,username,like_count,reply_count,repost_count,quote_count,view_count";
  const response = await fetch(buildSearchUrl(query, searchType, token, fields));
  if (response.ok) return response.json();

  const fallback = await fetch(buildSearchUrl(query, searchType, token, "id,text,permalink,timestamp,username"));
  if (fallback.ok) return fallback.json();

  throw new Error(`Threads keyword_search failed with ${fallback.status}`);
}

function buildSearchUrl(query, searchType, token, fields) {
  const url = new URL(THREADS_ENDPOINT);
  url.searchParams.set("q", query);
  url.searchParams.set("search_mode", "KEYWORD");
  url.searchParams.set("search_type", searchType);
  url.searchParams.set("fields", fields);
  url.searchParams.set("access_token", token);
  return url;
}

function dedupe(posts) {
  const seen = new Set();
  return posts.filter((post) => {
    const key = post.id ?? post.permalink ?? post.text;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function sanitizeKey(value) {
  return String(value).replace(/[^a-z0-9-]/gi, "").toLowerCase();
}

function json(payload, status, headers) {
  return new Response(JSON.stringify(payload), { status, headers });
}
