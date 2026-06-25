import { TrendingUp, TrendingDown } from "lucide-react";

interface MoverCoin {
  id: string;
  name: string;
  symbol: string;
  price_usd: number;
  priceChange24h: number;
}

interface MoversListProps {
  data: MoverCoin[];
  title: string;
  type: "winner" | "loser";
}

export default function MoversList({ data, title, type }: MoversListProps) {
  // Batasi jumlah data yang ditampilkan menjadi maksimal 5
  const limitedData = data?.slice(0, 5) || [];

  return (
    <div className="bg-white dark:bg-[#111827]/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-xl">
      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">
        {title}
      </h3>

      {limitedData.length === 0 ? (
        <p className="text-sm text-slate-400 dark:text-slate-500 py-4 text-center">
          Data tidak tersedia.
        </p>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {limitedData.map((coin, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center font-bold text-xs text-indigo-600 dark:text-indigo-400">
                  {coin.symbol.toUpperCase().slice(0, 2)}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                    {coin.name}
                  </h4>
                  <span className="text-xs text-slate-400 dark:text-slate-500 uppercase">
                    {coin.symbol}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  $
                  {coin.price_usd.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <span
                  className={`inline-flex items-center gap-0.5 text-xs font-semibold mt-0.5 ${
                    type === "winner"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {type === "winner" ? (
                    <TrendingUp size={12} />
                  ) : (
                    <TrendingDown size={12} />
                  )}
                  {type === "winner" ? "+" : ""}
                  {coin.priceChange24h}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
