import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Mock data untuk warehouse
const warehouseData = {
  totalProducts: 12847,
  lowStock: 23,
  incomingShipments: 8,
  outgoingShipments: 15,
  todayReceived: 156,
  todayShipped: 89,
  recentActivity: [
    {
      id: 1,
      type: "received",
      product: "Laptop Dell XPS 13",
      quantity: 50,
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "shipped",
      product: "iPhone 15 Pro",
      quantity: 25,
      time: "3 hours ago",
    },
    {
      id: 3,
      type: "received",
      product: "Samsung Galaxy S24",
      quantity: 75,
      time: "4 hours ago",
    },
    {
      id: 4,
      type: "shipped",
      product: "MacBook Air M2",
      quantity: 12,
      time: "5 hours ago",
    },
    {
      id: 5,
      type: "received",
      product: "iPad Pro 11",
      quantity: 30,
      time: "6 hours ago",
    },
  ],
  topProducts: [
    { name: "iPhone 15 Pro", quantity: 145, category: "Electronics" },
    { name: "Samsung Galaxy S24", quantity: 132, category: "Electronics" },
    { name: "MacBook Air M2", quantity: 89, category: "Computers" },
    { name: "iPad Pro 11", quantity: 76, category: "Tablets" },
    { name: "AirPods Pro", quantity: 234, category: "Accessories" },
  ],
  lowStockItems: [
    { name: "Wireless Charger", current: 5, minimum: 20, status: "critical" },
    { name: "USB-C Cable", current: 12, minimum: 50, status: "low" },
    { name: "Phone Case", current: 8, minimum: 30, status: "critical" },
    { name: "Screen Protector", current: 15, minimum: 40, status: "low" },
  ],
};

// Stats Card Component
const StatsCard = ({ title, value, change, icon, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        {change && (
          <p
            className={`text-sm ${
              change > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {change > 0 ? "+" : ""}
            {change}% from yesterday
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
    </div>
  </motion.div>
);

// Recent Activity Component
const RecentActivity = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
    className="bg-white p-6 rounded-xl shadow-lg"
  >
    <h3 className="text-lg font-semibold text-gray-800 mb-4">
      Recent Activity
    </h3>
    <div className="space-y-4">
      {warehouseData.recentActivity.map((activity) => (
        <div
          key={activity.id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-full ${
                activity.type === "received" ? "bg-green-100" : "bg-blue-100"
              }`}
            >
              {activity.type === "received" ? (
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                {activity.type === "received" ? "Received" : "Shipped"}{" "}
                {activity.quantity}x {activity.product}
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

// Top Products Component
const TopProducts = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.7 }}
    className="bg-white p-6 rounded-xl shadow-lg"
  >
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Products</h3>
    <div className="space-y-4">
      {warehouseData.topProducts.map((product, index) => (
        <div key={index} className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-800">{product.name}</p>
            <p className="text-xs text-gray-500">{product.category}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">
              {product.quantity}
            </p>
            <p className="text-xs text-gray-500">units</p>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

// Low Stock Alert Component
const LowStockAlert = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
    className="bg-white p-6 rounded-xl shadow-lg"
  >
    <h3 className="text-lg font-semibold text-gray-800 mb-4">
      Low Stock Alert
    </h3>
    <div className="space-y-4">
      {warehouseData.lowStockItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200"
        >
          <div>
            <p className="text-sm font-medium text-gray-800">{item.name}</p>
            <p className="text-xs text-gray-500">
              Current: {item.current} / Min: {item.minimum}
            </p>
          </div>
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              item.status === "critical"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {item.status}
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

export default function WarehouseDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-2 poppins-medium">
      <div className="max-w-7xl mx-auto space-y-6 pt-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Warehouse Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Monitor your inventory and warehouse operations
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Live Updates</p>
            <p className="text-lg font-semibold text-gray-800">
              {currentTime.toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-sm text-gray-600">
              {currentTime.toLocaleTimeString("id-ID")}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Products"
            value={warehouseData.totalProducts.toLocaleString()}
            change={2.5}
            delay={0.1}
            color="bg-blue-100"
            icon={
              <svg
                className="w-6 h-6 text-blue-600"
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
            }
          />
          <StatsCard
            title="Low Stock Items"
            value={warehouseData.lowStock}
            change={-12.3}
            delay={0.2}
            color="bg-red-100"
            icon={
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            }
          />
          <StatsCard
            title="Today Received"
            value={warehouseData.todayReceived}
            change={18.7}
            delay={0.3}
            color="bg-green-100"
            icon={
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
            }
          />
          <StatsCard
            title="Today Shipped"
            value={warehouseData.todayShipped}
            change={5.2}
            delay={0.4}
            color="bg-purple-100"
            icon={
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            }
          />
        </div>

        {/* Shipments Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Shipments Overview
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {warehouseData.incomingShipments}
                </div>
                <div className="text-sm text-gray-600">Incoming</div>
              </div>
              <div className="text-center p-4 bg-indigo-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">
                  {warehouseData.outgoingShipments}
                </div>
                <div className="text-sm text-gray-600">Outgoing</div>
              </div>
            </div>
          </motion.div>

          <LowStockAlert />
        </div>

        {/* Recent Activity and Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />
          <TopProducts />
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <button className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group">
              <div className="bg-blue-600 p-3 rounded-lg mb-2 group-hover:bg-blue-700 transition-colors">
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
              <span className="text-sm font-medium text-gray-700">
                Add Stock
              </span>
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">
                Inventory
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
                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-4a2 2 0 00-2-2H8z"
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
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Scan QR</span>
            </button>

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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">
                Ship Order
              </span>
            </button>

            <button className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group">
              <div className="bg-gray-600 p-3 rounded-lg mb-2 group-hover:bg-gray-700 transition-colors">
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
              <span className="text-sm font-medium text-gray-700">
                Settings
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
