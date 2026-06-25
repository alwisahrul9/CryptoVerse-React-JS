import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MainPriceChartProps {
  rawData: number[][];
}

export default function MainPriceChart({ rawData }: MainPriceChartProps) {
  // Format data untuk chart, hanya mengambil 7 data terakhir
  const formattedData =
    rawData?.slice(-7).map((item) => {
      const timestamp = item[0];
      const closePrice = item[4];

      const dateObject = new Date(timestamp * 1000);

      return {
        date: dateObject.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
        }),
        price: closePrice,
      };
    }) || [];

  // Ambil harga penutupan terakhir dari data yang diformat, jika ada
  const currentPrice = formattedData[formattedData.length - 1]?.price || 0;

  return (
    <div className="w-full">
      <div className="mb-4">
        <span className="text-xs font-medium text-slate-500">
          Harga Penutupan Terakhir
        </span>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
          {/* Format Harga */}
          ${currentPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </h2>
      </div>

      <div className="h-64 w-full">
        {/* Chart Container */}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData}>
          {/* Definisi Gradien */}
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#64748b"
              opacity={0.15}
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              domain={["auto", "auto"]}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#4f46e5"
              strokeWidth={2}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
