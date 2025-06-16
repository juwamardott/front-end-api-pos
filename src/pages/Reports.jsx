import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Calendar,
  ArrowUp,
  ArrowDown,
  Filter,
  Download,
  Eye,
} from "lucide-react";

const Reports = () => {
  // Sample data untuk berbagai report
  const [salesData] = useState([
    {
      id: 1,
      date: "2024-01-15",
      category: "Electronics",
      product: "Smartphone",
      quantity: 25,
      price: 8000000,
      customer: "PT ABC",
      region: "Jakarta",
    },
    {
      id: 2,
      date: "2024-01-20",
      category: "Fashion",
      product: "Jacket",
      quantity: 15,
      price: 500000,
      customer: "CV XYZ",
      region: "Bandung",
    },
    {
      id: 3,
      date: "2024-02-01",
      category: "Electronics",
      product: "Laptop",
      quantity: 10,
      price: 15000000,
      customer: "PT DEF",
      region: "Surabaya",
    },
    {
      id: 4,
      date: "2024-02-10",
      category: "Home & Garden",
      product: "Furniture",
      quantity: 8,
      price: 3000000,
      customer: "PT GHI",
      region: "Jakarta",
    },
    {
      id: 5,
      date: "2024-02-15",
      category: "Fashion",
      product: "Shoes",
      quantity: 30,
      price: 800000,
      customer: "CV JKL",
      region: "Bandung",
    },
    {
      id: 6,
      date: "2024-03-01",
      category: "Electronics",
      product: "Tablet",
      quantity: 20,
      price: 6000000,
      customer: "PT MNO",
      region: "Jakarta",
    },
    {
      id: 7,
      date: "2024-03-05",
      category: "Books",
      product: "Programming Book",
      quantity: 50,
      price: 150000,
      customer: "Toko PQR",
      region: "Yogyakarta",
    },
    {
      id: 8,
      date: "2024-03-12",
      category: "Fashion",
      product: "Dress",
      quantity: 12,
      price: 750000,
      customer: "Boutique STU",
      region: "Bali",
    },
  ]);

  const [activeReport, setActiveReport] = useState("overview");
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  // Kalkulasi data untuk berbagai report
  const reportData = useMemo(() => {
    // Sales by Category
    const salesByCategory = salesData.reduce((acc, item) => {
      const total = item.quantity * item.price;
      if (!acc[item.category]) {
        acc[item.category] = {
          category: item.category,
          total: 0,
          quantity: 0,
          count: 0,
        };
      }
      acc[item.category].total += total;
      acc[item.category].quantity += item.quantity;
      acc[item.category].count += 1;
      return acc;
    }, {});

    // Sales by Region
    const salesByRegion = salesData.reduce((acc, item) => {
      const total = item.quantity * item.price;
      if (!acc[item.region]) {
        acc[item.region] = {
          region: item.region,
          total: 0,
          quantity: 0,
          count: 0,
        };
      }
      acc[item.region].total += total;
      acc[item.region].quantity += item.quantity;
      acc[item.region].count += 1;
      return acc;
    }, {});

    // Monthly Sales Trend
    const monthlySales = salesData.reduce((acc, item) => {
      const month = new Date(item.date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
      });
      const total = item.quantity * item.price;
      if (!acc[month]) {
        acc[month] = { month, total: 0, quantity: 0, orders: 0 };
      }
      acc[month].total += total;
      acc[month].quantity += item.quantity;
      acc[month].orders += 1;
      return acc;
    }, {});

    // Top Products
    const topProducts = salesData.reduce((acc, item) => {
      const total = item.quantity * item.price;
      if (!acc[item.product]) {
        acc[item.product] = {
          product: item.product,
          category: item.category,
          total: 0,
          quantity: 0,
        };
      }
      acc[item.product].total += total;
      acc[item.product].quantity += item.quantity;
      return acc;
    }, {});

    return {
      categoryData: Object.values(salesByCategory).sort(
        (a, b) => b.total - a.total
      ),
      regionData: Object.values(salesByRegion).sort(
        (a, b) => b.total - a.total
      ),
      monthlyData: Object.values(monthlySales).sort(
        (a, b) => new Date(a.month) - new Date(b.month)
      ),
      topProductsData: Object.values(topProducts)
        .sort((a, b) => b.total - a.total)
        .slice(0, 5),
    };
  }, [salesData]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("id-ID").format(num);
  };

  // Overview Summary
  const overviewStats = useMemo(() => {
    const totalRevenue = salesData.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    const totalOrders = salesData.length;
    const totalQuantity = salesData.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const avgOrderValue = totalRevenue / totalOrders;

    return { totalRevenue, totalOrders, totalQuantity, avgOrderValue };
  }, [salesData]);

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
  ];

  // Report Components
  const OverviewReport = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(overviewStats.totalRevenue)}
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">
              +12.5% dari bulan lalu
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(overviewStats.totalOrders)}
              </p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">
              +8.2% dari bulan lalu
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Quantity
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(overviewStats.totalQuantity)}
              </p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
            <span className="text-sm text-red-600">-2.1% dari bulan lalu</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Avg Order Value
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(overviewStats.avgOrderValue)}
              </p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">
              +5.3% dari bulan lalu
            </span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border-indigo-500 border-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Monthly Sales Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={reportData.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip
                formatter={(value) => [formatCurrency(value), "Revenue"]}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border-indigo-500 border-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Sales by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={reportData.categoryData}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ category, percent }) =>
                  `${category} ${(percent * 100).toFixed(0)}%`
                }
              >
                {reportData.categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [formatCurrency(value), "Revenue"]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const CategoryReport = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border-indigo-500 border-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Penjualan per Kategori
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={reportData.categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis tickFormatter={(value) => formatCurrency(value)} />
            <Tooltip
              formatter={(value) => [formatCurrency(value), "Revenue"]}
            />
            <Bar dataKey="total" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Detail Kategori
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Avg per Order
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reportData.categoryData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {formatCurrency(item.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {formatNumber(item.quantity)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {item.count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {formatCurrency(item.total / item.count)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const RegionReport = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Penjualan per Region
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={reportData.regionData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              tickFormatter={(value) => formatCurrency(value)}
            />
            <YAxis dataKey="region" type="category" />
            <Tooltip
              formatter={(value) => [formatCurrency(value), "Revenue"]}
            />
            <Bar dataKey="total" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportData.regionData.map((region, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm border">
            <h4 className="font-semibold text-gray-900 mb-2">
              {region.region}
            </h4>
            <p className="text-2xl font-bold text-green-600 mb-1">
              {formatCurrency(region.total)}
            </p>
            <p className="text-sm text-gray-500">
              {region.count} orders • {formatNumber(region.quantity)} items
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const ProductReport = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Top 5 Produk Terlaris
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={reportData.topProductsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="product" />
            <YAxis tickFormatter={(value) => formatCurrency(value)} />
            <Tooltip
              formatter={(value) => [formatCurrency(value), "Revenue"]}
            />
            <Bar dataKey="total" fill="#F59E0B" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Detail Produk</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Produk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Quantity Sold
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reportData.topProductsData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                          index === 0
                            ? "bg-yellow-100 text-yellow-800"
                            : index === 1
                            ? "bg-gray-100 text-gray-800"
                            : index === 2
                            ? "bg-orange-100 text-orange-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        #{index + 1}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {item.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {formatCurrency(item.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {formatNumber(item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const TrendReport = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Trend Penjualan Bulanan
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={reportData.monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => formatCurrency(value)} />
            <Tooltip
              formatter={(value) => [formatCurrency(value), "Revenue"]}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#3B82F6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Orders per Month
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reportData.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quantity per Month
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={reportData.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="quantity"
                stroke="#F59E0B"
                fill="#F59E0B"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const reportComponents = {
    overview: <OverviewReport />,
    category: <CategoryReport />,
    region: <RegionReport />,
    products: <ProductReport />,
    trends: <TrendReport />,
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Sales Analytics Dashboard
        </h1>
        <p className="text-gray-600">
          Comprehensive sales performance analysis and insights
        </p>
      </div>

      {/* Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: "overview", label: "Overview", icon: TrendingUp },
              { key: "category", label: "Category Analysis", icon: Filter },
              { key: "region", label: "Regional Analysis", icon: Users },
              {
                key: "products",
                label: "Product Performance",
                icon: ShoppingCart,
              },
              { key: "trends", label: "Trends & Forecasting", icon: Calendar },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveReport(key)}
                className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeReport === key
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Eye className="h-4 w-4" />
            View Details
          </button>
        </div>
      </div>

      {/* Report Content */}
      <div className="report-content">{reportComponents[activeReport]}</div>
    </div>
  );
};

export default Reports;
