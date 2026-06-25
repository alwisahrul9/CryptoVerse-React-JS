import { requireAuthMiddleware } from "../utils/middleware";

const base_url = import.meta.env.VITE_COINLORE_BASE_URL;

export async function dashboardLoader() {
  requireAuthMiddleware();

  try {
    const [globalRes, moversRes, chartRes] = await Promise.all([
      fetch(`${base_url}global/`),
      fetch(`${base_url}movers/`),
      fetch(`${base_url}coin/ohlcv/?coin=90`), // coin=90 adalah untuk Bitcoin
    ]);

    const globalData = await globalRes.json();
    const moversData = await moversRes.json();
    const chartData = await chartRes.json();

    if (!globalRes.ok || !moversRes.ok || !chartRes.ok) {
      throw new Error("Gagal mengambil data dari server API");
    }

    return {
      global: globalData,
      movers: moversData,
      chartHistory: chartData,
    };
  } catch (e) {
    console.error("Dashboard Loader Error:", e);
    // Return data kosong jika API sedang maintenance agar aplikasi tidak crash
    return {
      global: null,
      movers: { winners: [], losers: [] },
      chartHistory: [],
    };
  }
}
