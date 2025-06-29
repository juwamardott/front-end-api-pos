import { create } from "zustand";
import axios from "axios";

const useProductStore = create((set, get) => ({
  products: [],
  isFetched: false,
  loading: false, // ✅ tambahkan loading

  fetchProducts: async (token, force = false) => {
    if (get().isFetched && !force) return;

    set({ loading: true });
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/transaction/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      set({
        products: response.data.data,
        isFetched: true,
        loading: false,
      });
    } catch (err) {
      console.error("Gagal fetch produk:", err);
      set({ loading: false });
    }
  },
}));

export default useProductStore;
