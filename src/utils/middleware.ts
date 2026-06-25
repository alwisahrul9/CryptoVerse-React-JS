import { redirect } from "react-router";

// Mencegah user yang BELUM login masuk ke dashboard
export const requireAuthMiddleware = () => {
  const isAuthenticated = localStorage.getItem("is_logged_in") === "true";
  if (!isAuthenticated) {
    return redirect("/auth/login"); // Arahkan ke halaman login jika status login false
  }
  return null; // Lolos, izinkan masuk
};

// Mencegah user yang SUDAH login mengakses halaman login/register kembali
export const requireGuestMiddleware = () => {
  const isAuthenticated = localStorage.getItem("is_logged_in") === "true";
  if (isAuthenticated) {
    return redirect("/"); // Arahkan balik ke dashboard jika dia sudah login
  }
  return null; // Lolos, izinkan akses rute auth
};
