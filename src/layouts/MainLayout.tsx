import { Outlet, NavLink, useLocation } from "react-router";
import {
  LayoutDashboard,
  Coins,
  Star,
  LogOut,
  Bell,
  User,
  Menu,
  X,
  Mail,
  Sun,
  Moon,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function MainLayout() {
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

  // STATE & LOGIKA DARK MODE
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true; // Default ke dark mode sesuai tema awalmu
  });

  // Sinkronisasi class HTML global saat tema berubah
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const isActive = (path: string): boolean => location.pathname === path;

  const handleConfirmLogout = (): void => {
    localStorage.removeItem("is_logged_in");
    window.location.href = "/auth/login";
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-800 dark:text-slate-200 font-sans flex overflow-x-hidden transition-colors duration-300">
      {/* BACKDROP SIDEBAR MOBILE */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
        fixed inset-y-0 left-0 w-64 bg-white/95 dark:bg-[#111827]/95 lg:bg-white/60 lg:dark:bg-[#111827]/60 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 
        flex flex-col justify-between p-6 h-full z-40 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
      `}
      >
        <div>
          <div className="flex items-center justify-between px-2 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
                C
              </div>
              <span className="text-xl font-bold tracking-wider text-slate-900 dark:text-white">
                Crypto<span className="text-indigo-500">Verse</span>
              </span>
            </div>
            <button
              type="button"
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={22} />
            </button>
          </div>

          <nav className="space-y-2">
            <NavLink
              to="/"
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${isActive("/") ? "bg-indigo-600 text-white font-medium shadow-lg shadow-indigo-600/20" : "text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/50 hover:text-slate-700 dark:hover:text-slate-200"}`}
            >
              {({ isPending }) => (
                <>
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                  {isPending && (
                    <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                  )}
                </>
              )}
            </NavLink>
            <NavLink
              to="/coins"
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${isActive("/coins") ? "bg-indigo-600 text-white font-medium shadow-lg shadow-indigo-600/20" : "text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/50 hover:text-slate-700 dark:hover:text-slate-200"}`}
            >
              {({ isPending }) => (
                <>
                  <Coins size={20} />
                  <span>Market</span>
                  {isPending && (
                    <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                  )}
                </>
              )}
            </NavLink>
            <NavLink
              to="/watchlist"
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${isActive("/watchlist") ? "bg-indigo-600 text-white font-medium shadow-lg shadow-indigo-600/20" : "text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/50 hover:text-slate-700 dark:hover:text-slate-200"}`}
            >
              {({ isPending }) => (
                <>
                  <Star size={20} />
                  <span>Watchlist</span>
                  {isPending && (
                    <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                  )}
                </>
              )}
            </NavLink>
          </nav>
        </div>

        {/* Modal Logout */}
        <button
          onClick={() => setIsLogoutModalOpen(true)}
          type="button"
          className="flex items-center gap-4 px-4 py-3 w-full text-left text-slate-400 hover:bg-rose-500/10 hover:text-rose-500 rounded-xl transition-all duration-200 group"
        >
          <LogOut
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
          <span>Logout</span>
        </button>
      </aside>

      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen w-full">
        {/* Navbar */}
        <header className="h-20 border-b border-slate-200 dark:border-slate-800/60 bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-md px-4 md:px-8 flex items-center justify-between sticky top-0 z-10 w-full transition-colors duration-300">
          <div className="flex items-center gap-4 flex-1 max-w-xs md:max-w-sm">
            <button
              type="button"
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-xl lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Toggle Button Dark Mode */}
            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-xl transition-all duration-200 group"
              title={isDarkMode ? "Mode Terang" : "Mode Gelap"}
            >
              {isDarkMode ? (
                <Sun
                  size={20}
                  fill="currentColor"
                  className="group-hover:rotate-45 transition-transform duration-300"
                />
              ) : (
                <Moon
                  size={20}
                  fill="currentColor"
                  className="group-hover:-rotate-12 transition-transform duration-300"
                />
              )}
            </button>

            <button
              type="button"
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-xl relative"
            >
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800"></div>

            {/* Button Modal Profile */}
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-2 md:gap-3 pl-1 text-left group focus:outline-none"
            >
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-slate-800 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                  Alwi Sahrul Al Falah
                </p>
                <p className="text-xs text-slate-500">Front-End Developer</p>
              </div>
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-indigo-500 dark:text-indigo-400 font-semibold shadow-inner group-hover:border-indigo-500 transition-all">
                <User size={18} />
              </div>
            </button>
          </div>
        </header>

        {/* MAIN BODY AREA */}
        <main className="flex-1 p-4 md:p-8 bg-slate-50 dark:bg-[#0B0F19] w-full transition-colors duration-300">
          <Outlet />
        </main>
      </div>

      {/* MODAL LOGOUT */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsLogoutModalOpen(false)}
          />
          {/* Box Konten */}
          <div className="relative bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-4">
              <LogOut size={24} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Konfirmasi Logout
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Apakah Anda yakin ingin keluar dari CryptoVerse? Sesi simulasi
              Anda akan berakhir.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium py-2.5 rounded-xl transition-all"
                onClick={() => setIsLogoutModalOpen(false)}
              >
                Batal
              </button>
              <button
                type="button"
                className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-medium py-2.5 rounded-xl shadow-lg shadow-rose-600/20 transition-all"
                onClick={handleConfirmLogout}
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PROFILE */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsProfileModalOpen(false)}
          />

          {/* Box Konten */}
          <div className="relative bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-slate-800 dark:text-slate-200">
            {/* Tombol Close */}
            <button
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
              onClick={() => setIsProfileModalOpen(false)}
            >
              <X size={20} />
            </button>

            {/* Header Profil */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-indigo-600/20">
                YA
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Alwi Sahrul Al Falah
                </h3>
                <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                  Front-End Developer / React Specialist
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Jakarta, Indonesia
                </p>
              </div>
            </div>

            {/* Tentang Proyek */}
            <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/60 rounded-xl p-4 mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Tentang Aplikasi Ini
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Aplikasi ini dibangun menggunakan{" "}
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                  React TS,{" "}
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                  Tailwind CSS,{" "}
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                  Lucide Icons,{" "}
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                  ReChart,{" "}
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                  Redux Toolkit,{" "}
                </span>
                dan{" "}
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                  React Router v7 Data Layer
                </span>
                . Mengintegrasikan real-time data fetching dari CoinLore API,
                manajemen rute terproteksi, client-side caching, dan kustomisasi
                state global.
              </p>
            </div>

            {/* Sosial Media / Kontak */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Hubungi Saya
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {/* GitHub Button */}
                <a
                  href={import.meta.env.VITE_GITHUB}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 transition-all text-slate-700 dark:text-slate-200"
                >
                  <svg
                    className="w-5 h-5 text-slate-700 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>

                {/* LinkedIn Button */}
                <a
                  href={import.meta.env.VITE_LINKEDIN}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 transition-all text-slate-700 dark:text-slate-200"
                >
                  <svg
                    className="w-5 h-5 text-slate-700 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                      clipRule="evenodd"
                    />
                    <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                  </svg>
                </a>

                {/* Email Button */}
                <a
                  href={`mailto:${import.meta.env.VITE_EMAIL}`}
                  className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 transition-all text-slate-700 dark:text-slate-200 font-medium"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
