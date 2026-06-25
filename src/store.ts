import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "./store/watchlistSlice";

export default configureStore({
  reducer: {
    watchlist: watchlistReducer,
  },
});