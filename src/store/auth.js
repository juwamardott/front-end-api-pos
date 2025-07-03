import { create } from "zustand";

const useAuth = create((set) => ({
  user: JSON.parse(sessionStorage.getItem("user")) || null, // ← load user dari session
  token: sessionStorage.getItem("token") || null,
  branch: sessionStorage.getItem("branch") || null,

  // Login handler
  login: (user, token, branch) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("branch", branch);
    set({ user, token, branch });
  },

  // Logout handler
  logout: () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("branch");
    set({ user: null, token: null });
  },
}));

export default useAuth;
