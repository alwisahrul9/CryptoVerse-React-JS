import { TrendingUp, TrendingDown, Coins, Activity } from "lucide-react";
import { formatCryptoMarketCap } from "../utils/formatCurrency";

interface CardProps {
  title: string;
  value: string;
  subValue: string;
  change: number;
  icon: React.ReactNode;
}

export default function MarketOverviewCards({ rawData }: any) {
  const mockGlobalData: CardProps[] = [
    {
      title: "Total Market Cap",
      value: formatCryptoMarketCap(rawData[0].total_mcap),
      subValue: "Vol 24h: $85.3B",
      change: parseFloat(rawData[0].mcap_change),
      icon: (
        <Coins className="text-indigo-600 dark:text-indigo-400" size={22} />
      ),
    },
    {
      title: "Bitcoin Dominance",
      value: `${rawData[0].btc_d}%`,
      subValue: "Market Leader",
      change: -0.52,
      icon: (
        <Activity className="text-violet-600 dark:text-violet-400" size={22} />
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {mockGlobalData.map((card, index) => {
        const isPositive = card.change >= 0;

        return (
          <div
            key={index}
            className="bg-white dark:bg-[#111827]/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-lg hover:border-slate-300 dark:hover:border-slate-700/60 transition-all duration-300 group"
          >
            {/* Judul dan Ikon */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {card.title}
              </span>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl group-hover:scale-105 transition-transform">
                {card.icon}
              </div>
            </div>

            {/* Angka Utama & Persentase Naik/Turun */}
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {card.value}
              </h3>

              {/* Badge Persentase Dinamis (Hijau jika naik, Merah jika turun) */}
              <span
                className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg ${
                  isPositive
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                }`}
              >
                {isPositive ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
                {isPositive ? "+" : ""}
                {card.change}%
              </span>
            </div>

            {/* Info Tambahan Ringkas */}
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              {card.subValue}
            </p>
          </div>
        );
      })}
    </div>
  );
}
