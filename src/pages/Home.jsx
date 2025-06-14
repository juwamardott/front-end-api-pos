import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function Home() {
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/reports/daily-sales"
        );
        if (response.data) {
          setStats(response.data);
        } else {
        }
      } catch (err) {
        console.error(err);
      } finally {
      }
    };

    fetchStats();
  }, []);

  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/transactions"
        );
        if (response.data && response.data.data) {
          setTransactions(response.data.data);
          // console.log(response.data.data);
          setError(null); // Reset error jika berhasil
        } else {
          setError("Data format tidak sesuai");
        }
      } catch (err) {
        setError("Gagal mengambil data transaksi");
        // Hapus console.error(err); untuk tidak tampil di console

        // Optional: Jika ingin tetap log untuk development saja
        // if (process.env.NODE_ENV === 'development') {
        //   console.error(err);
        // }
      } finally {
        // setLoading(false);
      }
    };

    getTransactions();
  }, []);

  const [topProducts, setTopProducts] = useState([]);
  const [topProductsLoading, setTopProductsLoading] = useState(true);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/reports/top-product"
        );
        setTopProducts(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil data produk:", error);
      } finally {
        setTopProductsLoading(false);
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <div className="space-y-6 poppins-medium">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-10">
        <div className="">
          <h1 className="text-3xl font-bold text-gray-800 poppins-bold">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Today</p>
          <p className="text-lg font-semibold text-gray-800">
            {new Date().toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Sales</p>
              <p className="text-2xl font-bold">
                {stats?.data?.total_sales
                  ? `Rp ${stats.data.total_sales.toLocaleString("id-ID")}`
                  : "Loading..."}
              </p>
              <p className="text-blue-100 text-xs mt-1">
                +12.5% from yesterday
              </p>
            </div>
            <div className="bg-blue-400/30 p-3 rounded-lg">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Today Orders</p>
              <p className="text-2xl font-bold">
                {stats?.data?.today_orders
                  ? `${stats.data.today_orders}`
                  : "Loading..."}
              </p>
              <p className="text-green-100 text-xs mt-1">
                +8.2% from yesterday
              </p>
            </div>
            <div className="bg-green-400/30 p-3 rounded-lg">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Products</p>
              <p className="text-2xl font-bold">
                {stats?.data?.total_product
                  ? `${stats.data.total_product}`
                  : "Loading..."}
              </p>
              <p className="text-purple-100 text-xs mt-1">
                Across all categories
              </p>
            </div>
            <div className="bg-purple-400/30 p-3 rounded-lg">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Low Stock Alert</p>
              <p className="text-2xl font-bold">
                {stats?.data?.low_stock
                  ? `${stats.data.low_stock}`
                  : "Loading..."}
              </p>
              <p className="text-orange-100 text-xs mt-1">Items need restock</p>
            </div>
            <div className="bg-orange-400/30 p-3 rounded-lg">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Orders
            </h3>
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
                    Date Order
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions && transactions.length > 0 ? (
                  transactions.map((order, index) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
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
                          {order.status === 0
                            ? "Under Review"
                            : order.status === 1
                            ? "Accepted"
                            : order.status === -1
                            ? "Rejected"
                            : "Unknown"}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-500">
                        {order.date_order}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <td
                      colSpan="5"
                      className="py-8 px-4 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <svg
                          className="w-12 h-12 text-gray-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <p className="text-sm font-medium">
                          Tidak ada data transaksi
                        </p>
                        <p className="text-xs text-gray-400">
                          Data transaksi belum tersedia atau gagal dimuat
                        </p>
                      </div>
                    </td>
                  </motion.tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Top Products
            </h3>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topProductsLoading
              ? // Skeleton loading atau teks biasa
                Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-100 rounded-lg animate-pulse flex justify-between items-center"
                  >
                    <div className="flex-1">
                      <div className="w-2/3 h-3 bg-gray-300 rounded mb-1" />
                      <div className="w-1/3 h-2 bg-gray-200 rounded" />
                    </div>
                    <div className="w-1/4 h-4 bg-gray-300 rounded" />
                  </div>
                ))
              : topProducts.map((product, index) => (
                  <motion.div
                    key={product.product.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
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
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors group">
            <div className="bg-indigo-600 p-3 rounded-lg mb-2 group-hover:bg-indigo-700 transition-colors">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">New Sale</span>
          </button>

          <button className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group">
            <div className="bg-green-600 p-3 rounded-lg mb-2 group-hover:bg-green-700 transition-colors">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">
              Add Product
            </span>
          </button>

          <button className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group">
            <div className="bg-purple-600 p-3 rounded-lg mb-2 group-hover:bg-purple-700 transition-colors">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Reports</span>
          </button>

          <button className="flex flex-col items-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors group">
            <div className="bg-orange-600 p-3 rounded-lg mb-2 group-hover:bg-orange-700 transition-colors">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Settings</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
