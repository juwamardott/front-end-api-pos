import { create } from "zustand";

const useAuth = create((set) => ({
  user: JSON.parse(sessionStorage.getItem("user")) || null, // ← load user dari session
  token: sessionStorage.getItem("token") || null,

  // Login handler
  login: (user, token) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(user));
    set({ user, token });
  },

  // Logout handler
  logout: () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    set({ user: null, token: null });
  },
}));

export default useAuth;
