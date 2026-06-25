import { LogIn, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { useDocumentTitle } from "../hooks/useDocumentHtml";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  useDocumentTitle("Masuk - CryptoVerse Portofolio Dashboard");

  const handleLoginSuccess = () => {
    localStorage.setItem("is_logged_in", "true");
    window.location.href = "/"; // Alihkan ke dashboard utama
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Validasi form formal (Opsional untuk demo)
    if (!email || !password) {
      setError("Silakan isi semua kolom data.");
      return;
    }
    handleLoginSuccess();
  };

  // Fungsi Instan untuk Perekrut
  const handleDemoLogin = () => {
    setEmail("perekrut@demo.com");
    setPassword("password123");
    handleLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 font-sans flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl -z-10"></div>

      {/* Box Login Card */}
      <div className="w-full max-w-md bg-[#111827]/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-indigo-950/20">
        {/* Header Form */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30 mx-auto mb-4 text-xl">
            C
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Selamat Datang
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Masuk ke CryptoVerse Portofolio Dashboard
          </p>
        </div>

        {/* Alert Error */}
        {error && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-400 text-sm">
            <ShieldAlert size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Alamat Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full bg-slate-900/60 border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Kata Sandi
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-900/60 border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Tombol Sign In Manual */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 text-sm mt-2"
          >
            <LogIn size={18} />
            <span>Masuk</span>
          </button>
        </form>

        {/* Pembatas Garis */}
        <div className="relative flex items-center justify-center my-6">
          <div className="absolute inset-x-0 h-[1px] bg-slate-800"></div>
          <span className="relative bg-[#111827] px-3 text-xs text-slate-500 uppercase tracking-widest">
            Atau
          </span>
        </div>

        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full bg-slate-800 hover:bg-slate-700 text-indigo-400 border border-slate-700/60 font-medium py-3 rounded-xl transition-all text-sm"
        >
          Gunakan Akun Demo Instan
        </button>

        {/* Catatan Kaki Portofolio */}
        <p className="text-center text-xs text-slate-500 mt-6 leading-relaxed">
          *Proyek tanpa backend. Otentikasi disimulasikan menggunakan local
          storage.
        </p>
      </div>
    </div>
  );
}
