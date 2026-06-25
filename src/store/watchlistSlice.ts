import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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

const initialState: CoinTicker[] = JSON.parse(
  localStorage.getItem("watchlist") || "[]",
);

export const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addToWatchlist: (state, action: PayloadAction<CoinTicker>) => {
      const existingCoin = state.find((coin) => coin.id === action.payload.id);
      if (!existingCoin) {
        state.push(action.payload);
      }

      localStorage.setItem("watchlist", JSON.stringify(state));
    },
    removeFromWatchlist: (state, action: PayloadAction<string>) => {
      const newState = state.filter((coin) => coin.id !== action.payload);
      localStorage.setItem("watchlist", JSON.stringify(newState));
      return newState;
    },
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
