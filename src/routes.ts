import { createBrowserRouter } from "react-router";
import App from "./pages/App";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Market from "./pages/Market";
import Watchlist from "./pages/Watchlist";
import {
  requireAuthMiddleware,
  requireGuestMiddleware,
} from "./utils/middleware";
import { dashboardLoader } from "./loaders/dashboardLoader";
import { marketLoader } from "./loaders/marketLoader";
import CoinDetail from "./pages/CoinDetail";
import { coinDetailLoader } from "./loaders/coinDetailLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    middleware: [requireAuthMiddleware],
    children: [
      { index: true, loader: dashboardLoader, Component: App },
      {
        path: "coins",
        loader: marketLoader,
        Component: Market,
      },
      {
        path: "watchlist",
        Component: Watchlist,
      },
      {
        path: "coins/:id",
        Component: CoinDetail,
        loader: async ({ params }) => {
          const coinId = params.id;
          if (!coinId) {
            throw new Error("Coin ID is required");
          }
          return coinDetailLoader(coinId);
        },
      },
    ],
  },
  {
    path: "auth",
    Component: AuthLayout,
    middleware: [requireGuestMiddleware],
    children: [
      { path: "login", Component: Login },
    ],
  },
]);
