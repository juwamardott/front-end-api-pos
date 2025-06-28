import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Loader2 } from "lucide-react";
import useAuth from "../../store/auth";

export default function OrdersAndTopProducts() {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  // State untuk Recent Orders
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [errorTransactions, setErrorTransactions] = useState(null);

  // State untuk Top Products
  const [topProducts, setTopProducts] = useState([]);
  const [loadingTopProducts, setLoadingTopProducts] = useState(true);
  const [errorTopProducts, setErrorTopProducts] = useState(null);
  const token = useAuth((state) => state.token);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`${API_URL}/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        setTransactions(res.data?.data || []);
        setErrorTransactions(null);
      } catch (err) {
        setErrorTransactions("Gagal memuat data transaksi.");
      } finally {
        setLoadingTransactions(false);
      }
    };

    const fetchTopProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/reports/top-product`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        setTopProducts(res.data?.data || []);
        setErrorTopProducts(null);
      } catch (err) {
        setErrorTopProducts("Gagal memuat data produk teratas.");
      } finally {
        setLoadingTopProducts(false);
      }
    };

    fetchTransactions();
    fetchTopProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">
                  Order ID
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">
                  Customer
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">
                  Amount
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">
                  Status
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {loadingTransactions ? (
                <tr>
                  <td colSpan="5" className="text-center py-10">
                    <Loader2 className="animate-spin w-6 h-6 text-indigo-500 mx-auto mb-2" />
                    <p className="text-sm text-indigo-500">
                      Memuat data transaksi...
                    </p>
                  </td>
                </tr>
              ) : errorTransactions ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-red-500">
                    {errorTransactions}
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-gray-500">
                    Tidak ada transaksi terbaru.
                  </td>
                </tr>
              ) : (
                transactions.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-2 text-sm font-medium text-gray-800">
                      {order.id}
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-600">
                      {order.customer?.customer_name || "Umum"}
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-800 font-medium">
                      Rp {order.total.toLocaleString("id-ID")}
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 1
                            ? "bg-green-100 text-green-800"
                            : order.status === 0
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status === 1
                          ? "Accepted"
                          : order.status === 0
                          ? "Under Review"
                          : "Rejected"}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-500">
                      {order.date_order}
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Top Products */}
      {/* Top Products */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Top Products</h3>
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            View All
          </button>
        </div>

        {loadingTopProducts ? (
          // ✅ Tambahan: Loader dengan animasi dan teks loading
          <div className="flex flex-col items-center justify-center text-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-500 mb-2" />
            <p className="text-sm text-indigo-500">Memuat produk teratas...</p>
          </div>
        ) : errorTopProducts ? (
          <p className="text-center text-red-500 text-sm">{errorTopProducts}</p>
        ) : topProducts.length === 0 ? (
          <p className="text-center text-gray-500 text-sm">
            Tidak ada data produk teratas.
          </p>
        ) : (
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <motion.div
                key={product.product?.name || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">
                    {product.product.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {product.product.stock} stock
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800 text-sm">
                    Rp {product.total.toLocaleString("id-ID")}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
