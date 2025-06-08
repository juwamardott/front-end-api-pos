import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products/")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data produk:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 poppins-medium">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-indigo-600 text-lg font-medium">
          Loading data...
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2  md:grid-cols-3 gap-4 sm:gap-6 poppins-medium">
      {products.data.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
          className="bg-white p-3 sm:p-4 rounded-xl shadow hover:shadow-lg transition"
        >
          <img
            src={`https://placehold.co/300x200?text=${encodeURIComponent(
              product.name
            )}`}
            alt={product.name}
            className="w-full h-48 md:h-32 object-contain mb-3"
          />
          <h4 className="text-sm font-semibold text-indigo-600 line-clamp-1">
            {product.name}
          </h4>
          <p className="text-sm text-gray-500 capitalize mb-1">
            {product.category?.category_name ?? "Tanpa Kategori"}
          </p>
          <p className="text-sm text-gray-700 line-clamp-2 mb-2">
            {product.description}
          </p>
          <p className="font-bold text-green-600 text-sm sm:text-base">
            Rp {product.price.toLocaleString("id-ID")}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
