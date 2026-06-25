import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Award,
  HardDrive,
  Layers,
  Activity,
} from "lucide-react";
import { useLoaderData, useNavigate } from "react-router";
import MainPriceChart from "../components/MainPriceChart";
import { useDocumentTitle } from "../hooks/useDocumentHtml";

export default function CoinDetail() {
  const navigate = useNavigate();
  const { coin: coinData, chartHistory } = useLoaderData() as any;
  useDocumentTitle(
    `${coinData?.name || "Bitcoin"} - Pantau Pergerakan Harga & Statistik`,
  );

  const coin = {
    symbol: coinData?.symbol.slice(0, 2) || "BTC",
    name: coinData?.name || "Bitcoin",
    nameid: coinData?.nameid || "bitcoin",
    rank: coinData?.rank || 1,
    price_usd: coinData?.price_usd || "6465.26",
    percent_change_24h: coinData?.percent_change_24h || "-1.27",
    percent_change_1h: coinData?.percent_change_1h || "0.19",
    percent_change_7d: coinData?.percent_change_7d || "-0.93",
    market_cap_usd: coinData?.market_cap_usd || "111737012373.28",
    volume24: coinData?.volume24 || "3982512765.23",
    volume24_native: coinData?.volume24_native || "615986.77",
    csupply: coinData?.csupply || "17282687.00",
    price_btc: coinData?.price_btc || "1.00",
    tsupply: coinData?.tsupply || "17282687",
    msupply: coinData?.msupply || "21000000",
  };

  const renderPercentageBadge = (valueStr: string) => {
    const value = parseFloat(valueStr);
    const isPositive = value >= 0;
    return (
      <span
        className={`inline-flex items-center gap-1 font-semibold text-sm px-2.5 py-1 rounded-xl ${
          isPositive
            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
        }`}
      >
        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        {isPositive ? "+" : ""}
        {value}%
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* TOMBOL KEMBALI */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors group cursor-pointer"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Kembali ke Market
      </button>

      {/* AREA HEADER UTAMA */}
      <div className="bg-white dark:bg-[#111827]/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Info Nama Koin */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-600/10 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center font-black text-xl text-indigo-600 dark:text-indigo-400">
            {coin.symbol}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {coin.name}
              </h1>
              <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-md">
                Rank #{coin.rank}
              </span>
            </div>
            <p className="text-sm text-slate-400 dark:text-slate-500 uppercase mt-0.5">
              {coin.nameid}
            </p>
          </div>
        </div>

        {/* Harga USD & BTC */}
        <div className="text-left md:text-right">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            $
            {parseFloat(coin.price_usd).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1 flex items-center md:justify-end gap-1.5">
            <Activity
              size={14}
              className="text-indigo-600 dark:text-indigo-400"
            />
            {coin.price_btc} {coin.symbol} / BTC
          </p>
        </div>
      </div>

      {/* STATISTIK & PERFORMA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* STATISTIK PASAR */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card 1: Market Cap */}
          <div className="bg-white dark:bg-[#111827]/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Market Cap
              </span>
              <Award size={18} className="text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              $
              {parseFloat(coin.market_cap_usd).toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })}
            </h3>
          </div>

          {/* Card 2: Volume 24 Jam */}
          <div className="bg-white dark:bg-[#111827]/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Volume (24h)
              </span>
              <Activity
                size={18}
                className="text-slate-400 dark:text-slate-500"
              />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              $
              {parseFloat(coin.volume24).toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })}
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              {parseFloat(coin.volume24_native).toLocaleString("en-US")}{" "}
              {coin.symbol}
            </p>
          </div>

          {/* Card 3: Circulating Supply */}
          <div className="bg-white dark:bg-[#111827]/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Circulating Supply
              </span>
              <Layers
                size={18}
                className="text-slate-400 dark:text-slate-500"
              />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              {parseFloat(coin.csupply).toLocaleString("en-US")} {coin.symbol}
            </h3>
          </div>

          {/* Card 4: Supply Lainnya */}
          <div className="bg-white dark:bg-[#111827]/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Total / Max Supply
                </span>
                <HardDrive
                  size={18}
                  className="text-slate-400 dark:text-slate-500"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 dark:text-slate-500">
                    Total Supply:
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {parseInt(coin.tsupply).toLocaleString("en-US")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 dark:text-slate-500">
                    Max Supply:
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {parseInt(coin.msupply).toLocaleString("en-US")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RENTANG WAKTU / PRICE CHANGES */}
        <div className="bg-white dark:bg-[#111827]/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-4">
              Performa Harga
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-3">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  1 Jam Terakhir
                </span>
                {renderPercentageBadge(coin.percent_change_1h)}
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-3">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  24 Jam Terakhir
                </span>
                {renderPercentageBadge(coin.percent_change_24h)}
              </div>

              <div className="flex items-center justify-between pb-1">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  7 Hari Terakhir
                </span>
                {renderPercentageBadge(coin.percent_change_7d)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BLOK GRAFIK UTAMA */}
      <div className="bg-white dark:bg-[#111827]/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-xl">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">
          Grafik Harga {coin.name} ({coin.symbol.slice(0, 2)})
        </h3>
        <MainPriceChart rawData={chartHistory} />
      </div>

      {/* BLOK AKTIVITAS TERBARU */}
      <div className="bg-white dark:bg-[#111827]/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-xl">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">
          Aktivitas Terbaru
        </h3>
        <div className="text-sm text-slate-400 dark:text-slate-500">
          Belum ada aktivitas terbaru untuk koin ini. Data aktivitas akan muncul
          di sini ketika tersedia.
        </div>
      </div>

      {/* BLOK BERITA TERBARU */}
      <div className="bg-white dark:bg-[#111827]/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-xl">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">
          Berita Terbaru
        </h3>
        <div className="text-sm text-slate-400 dark:text-slate-500">
          Belum ada berita terbaru untuk koin ini. Berita terkait koin akan
          muncul di sini ketika tersedia.
        </div>
      </div>
    </div>
  );
}
