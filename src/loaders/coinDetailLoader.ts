export async function coinDetailLoader(coinId: string) {
  try {
    const base_url = import.meta.env.VITE_COINLORE_BASE_URL;
    const [coinRes, chartRes] = await Promise.all([
      fetch(`${base_url}ticker/?id=${coinId}`),
      fetch(`${base_url}coin/ohlcv/?coin=${coinId}`),
    ]);

    const coinData = await coinRes.json();
    const chartData = await chartRes.json();

    if (!coinRes.ok || !chartRes.ok) {
      throw new Error("Gagal mengambil data dari server API");
    }

    return {
      coin: coinData[0],
      chartHistory: chartData,
    };
  } catch (e) {
    console.error("Coin Detail Loader Error:", e);
    // Return data kosong jika API sedang maintenance agar aplikasi tidak crash
    return {
      coin: null,
      chartHistory: [],
    };
  }
}