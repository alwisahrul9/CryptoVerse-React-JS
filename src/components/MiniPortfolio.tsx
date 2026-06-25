import { Wallet, ArrowUpRight } from "lucide-react";

export default function MiniPortfolio() {
  const myAssets = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      amount: "0.15",
      value: "$10,237.50",
      allocation: "65%",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      amount: "1.20",
      value: "$4,120.00",
      allocation: "28%",
    },
    {
      name: "Solana",
      symbol: "SOL",
      amount: "5.50",
      value: "$942.50",
      allocation: "7%",
    },
  ];

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Estimasi Saldo
          </span>
          <Wallet size={18} className="text-slate-500" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          $15,300.00
        </h2>
        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 mt-1">
          <ArrowUpRight size={14} /> +4.21% dari kemarin
        </p>
      </div>

      {/* Garis batas */}
      <div className="h-[1px] bg-slate-200 dark:bg-slate-800 my-5"></div>

      <div className="space-y-4 flex-1">
        <h4 className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider">
          Aset Kamu
        </h4>
        {myAssets.map((asset, i) => (
          <div key={i} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {asset.name}
              </p>
              <p className="text-xs text-slate-500">
                {asset.amount} {asset.symbol}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {asset.value}
              </p>
              <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden ml-auto">
                <div
                  className="bg-indigo-500 h-full rounded-full"
                  style={{ width: asset.allocation }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
