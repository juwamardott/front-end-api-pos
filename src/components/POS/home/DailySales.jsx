import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Loader2 } from "lucide-react";
import useAuth from "../../../store/auth";

export default function DailySales() {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = useAuth((state) => state.token);
  const branch = useAuth((state) => state.branch);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.post(
          `${API_URL}/reports/daily-sales`,
          { branch_id: branch },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        setData(response.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data statistik harian.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin w-8 h-8 text-indigo-500" />
        <p className="ml-3 text-indigo-500 text-sm">Memuat data statistik...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg text-center">
        {error}
      </div>
    );
  }

  const stats = data?.data || {};

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Sales */}
      <StatCard
        title="Today Sales"
        value={stats.total_sales.toLocaleString("id-ID")}
        description="+12.5% from yesterday"
        gradient="from-blue-500 to-blue-600"
        iconBg="bg-blue-400/30"
        svgPath="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
      />

      {/* Today Orders */}
      <StatCard
        title="Today Orders"
        value={stats.today_orders}
        description="+8.2% from yesterday"
        gradient="from-green-500 to-green-600"
        iconBg="bg-green-400/30"
        svgPath="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />

      {/* Total Products */}
      <StatCard
        title="Total Products"
        value={stats.total_product}
        description="Across all categories"
        gradient="from-purple-500 to-purple-600"
        iconBg="bg-purple-400/30"
        svgPath="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />

      {/* Low Stock */}
      <StatCard
        title="Low Stock Alert"
        value={stats.low_stock}
        description="Items need restock"
        gradient="from-orange-500 to-orange-600"
        iconBg="bg-orange-400/30"
        svgPath="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
      />
    </div>
  );
}

// 💡 Komponen Reusable untuk Card Statistik
function StatCard({ title, value, description, gradient, iconBg, svgPath }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`bg-gradient-to-br ${gradient} p-6 rounded-xl text-white shadow-lg`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm">{title}</p>
          <p className="text-2xl font-bold">
            {value ?? (
              <Loader2 className="animate-spin w-5 h-5 text-white/60 inline-block" />
            )}
          </p>
          <p className="text-white/70 text-xs mt-1">{description}</p>
        </div>
        <div className={`${iconBg} p-3 rounded-lg`}>
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
              d={svgPath}
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
