import { useLoaderData } from "react-router";
import MarketOverviewCards from "../components/MarketOverviewCards";
import MainPriceChart from "../components/MainPriceChart";
import MiniPortfolio from "../components/MiniPortfolio";
import MoversList from "../components/MoversList";
import { useDocumentTitle } from "../hooks/useDocumentHtml";

export default function App() {
  const { global, movers, chartHistory } = useLoaderData();
  useDocumentTitle("Dashboard Ringkasan - Pantau Pergerakan Pasar Crypto Global");

  return (
    <>
      <div className="space-y-8 p-1 animate-in fade-in duration-300">
        {/* Bagian Judul Welcome */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Dashboard Ringkasan
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Pantau pergerakan pasar crypto global secara real-time.
          </p>
        </div>

        {/* Komponen Ringkasan Global */}
        <MarketOverviewCards rawData={global} />

        {/* Grafik Utama & Mini Portofolio */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Grafik Kiri (Lebar 2/3 di Desktop) */}
          <div className="lg:col-span-2 bg-white dark:bg-[#111827]/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-xl">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">
              Tren Harga Bitcoin (BTC)
            </h3>
            <MainPriceChart rawData={chartHistory} />
          </div>

          {/* Portofolio Kanan */}
          <div className="bg-white dark:bg-[#111827]/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-xl">
            <MiniPortfolio />
          </div>
        </div>

        {/* Top Winners & Losers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MoversList
            data={movers.data?.winners}
            title="🚀 Top 5 Winners Hari Ini"
            type="winner"
          />
          <MoversList
            data={movers.data?.losers}
            title="📉 Top 5 Losers Hari Ini"
            type="loser"
          />
        </div>
      </div>
    </>
  );
}
