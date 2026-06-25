import { requireAuthMiddleware } from "../utils/middleware";

const base_url = import.meta.env.VITE_COINLORE_BASE_URL;

export async function marketLoader() {
  requireAuthMiddleware();

  try {
    const res = await fetch(`${base_url}tickers/`);

    const results = await res.json();

    if (!res.ok) {
      throw new Error("Gagal mengambil data dari server API");
    }

    return results;
  } catch (e) {
    console.log("Something wrong", e);

    return [];
  }
}
