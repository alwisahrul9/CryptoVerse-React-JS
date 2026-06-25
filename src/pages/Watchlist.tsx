import {
  Search,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  Trash2,
  Eye,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWatchlist } from "../store/watchlistSlice";
import { useNavigate } from "react-router";
import { useDocumentTitle } from "../hooks/useDocumentHtml";

interface CoinTicker {
  id: string;
  rank: number;
  symbol: string;
  name: string;
  price_usd: string;
  percent_change_24h: string;
  market_cap_usd: string;
  volume24: number;
}

export default function Watchlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getWatchlistFromStore = useSelector((state: any) => state.watchlist);
  useDocumentTitle("Watchlist Koin - Pantau Koin yang Anda Ikuti");

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [isAscending, setIsAscending] = useState<boolean>(true);

  const sortingCoins: CoinTicker[] = getWatchlistFromStore.filter(
    (coin: any) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const [filteredCoins, setFilteredCoins] =
    useState<CoinTicker[]>(sortingCoins);

  useEffect(() => {
    setFilteredCoins(sortingCoins);
  }, [searchQuery, getWatchlistFromStore]);

  function handleSort(column: string) {
    setIsAscending(!isAscending);

    const sortedCoins = [...filteredCoins].sort((a, b) => {
      if (column === "market_cap") {
        if (isAscending) {
          return parseFloat(a.market_cap_usd) - parseFloat(b.market_cap_usd);
        } else {
          return parseFloat(b.market_cap_usd) - parseFloat(a.market_cap_usd);
        }
      }
      return 0;
    });

    setSearchQuery("");
    setFilteredCoins(sortedCoins);
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* HEADER & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Watchlist
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Koin yang Anda ikuti.
          </p>
        </div>

        {/* Input Pencarian */}
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400 dark:text-slate-500" />
          </div>
          <input
            type="text"
            placeholder="Cari Bitcoin, ETH..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-[#111827]/60 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* WADAH TABEL UTAMA */}
      <div className="bg-white dark:bg-[#111827]/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            {/* Header Tabel */}
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  #
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Koin
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                  Harga
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                  24j %
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                  Volume (24j)
                </th>
                <th
                  onClick={() => handleSort("market_cap")}
                  className="py-4 px-6 text-xs font-semibold cursor-pointer text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right flex justify-end items-center gap-1"
                >
                  Market Cap
                  <span className="ms-2">
                    <ArrowUpDown size={13} />
                  </span>
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">
                  Aksi
                </th>
              </tr>
            </thead>

            {/* Isi Tabel */}
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {filteredCoins.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-8 text-center text-slate-400 dark:text-slate-500 text-sm"
                  >
                    Koin "{searchQuery}" tidak ditemukan.
                  </td>
                </tr>
              ) : (
                filteredCoins.map((coin: any, index) => {
                  const percentChange = parseFloat(coin.percent_change_24h);
                  const isPositive = percentChange >= 0;

                  return (
                    <tr
                      key={index}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group cursor-pointer"
                    >
                      {/* Kolom 1: Rank, Simbol, Nama */}
                      <td className="py-4 px-6 text-slate-500 dark:text-slate-400">
                        {index + 1}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-xs text-slate-600 dark:text-slate-300 group-hover:border-indigo-500 transition-colors">
                              {coin.symbol.slice(0, 2)}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900 dark:text-white">
                                {coin.name}
                              </p>
                              <span className="text-xs text-slate-400 dark:text-slate-500 uppercase">
                                {coin.symbol}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Kolom 2: Harga */}
                      <td className="py-4 px-6 text-right">
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                          $
                          {parseFloat(coin.price_usd).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 4,
                          })}
                        </p>
                      </td>

                      {/* Kolom 3: Perubahan 24 Jam */}
                      <td className="py-4 px-6 text-right">
                        <span
                          className={`inline-flex items-center justify-end gap-1 text-sm font-semibold ${
                            isPositive
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-rose-600 dark:text-rose-400"
                          }`}
                        >
                          {isPositive ? (
                            <TrendingUp size={14} />
                          ) : (
                            <TrendingDown size={14} />
                          )}
                          {Math.abs(percentChange).toFixed(2)}%
                        </span>
                      </td>

                      {/* Kolom 4: Volume 24 Jam */}
                      <td className="py-4 px-6 text-right">
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          ${(coin.volume24 / 1_000_000_000).toFixed(2)}B
                        </p>
                      </td>

                      {/* Kolom 5: Market Cap */}
                      <td className="py-4 px-6 text-right">
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          $
                          {(
                            parseFloat(coin.market_cap_usd) / 1_000_000_000
                          ).toFixed(2)}
                          B
                        </p>
                      </td>

                      {/* Kolom 6: Aksi */}
                      <td className="py-4 px-6 text-center space-x-2">
                        <button
                          onClick={() => navigate(`/coins/${coin.id}`)}
                          className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-400/10 transition-all focus:outline-none cursor-pointer"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => dispatch(removeFromWatchlist(coin.id))}
                          className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10 transition-all focus:outline-none"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
