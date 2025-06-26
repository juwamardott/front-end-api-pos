import { create } from "zustand";

const useAuth = create((set) => ({
  user: null,
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
