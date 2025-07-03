import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Home,
  ShoppingCart,
  Package,
  Settings,
  ChevronRight,
  Store,
  ChartArea,
  Sparkles,
  Gauge,
  PackageCheck,
} from "lucide-react";
import useAuth from "../store/auth";
export default function Sidebar({ isOpen }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [hoveredItem, setHoveredItem] = useState(null);
  const role = useAuth((state) => state.user?.role.id);
  let menuItems = [];

  switch (role) {
    case 1: // Chasier
      menuItems = [
        { path: "/pos/home", label: "Dashboard", icon: Home },
        { path: "/pos/transaction", label: "Transaction", icon: ShoppingCart },
      ];
      break;

    case 2: // Warehouse
      menuItems = [
        { path: "/pos/home", label: "Overview", icon: Gauge },
        { path: "/pos/transaction", label: "Transaction", icon: ShoppingCart },
        { path: "/pos/reports", label: "Report", icon: ChartArea },
        { path: "/pos/settings", label: "Settings", icon: Settings },
      ];
      break;

    case 3: // Accounting
      menuItems = [
        { path: "/acc/home", label: "Dashboard", icon: Home },
        { path: "/acc/reports", label: "Report", icon: ChartArea },
      ];
      break;

    case 4: // Superadmin Chasier
      menuItems = [
        { path: "/pos/home", label: "Overview", icon: Gauge },
        { path: "/pos/transaction", label: "Transaction", icon: ShoppingCart },
        { path: "/pos/reports", label: "Report", icon: ChartArea },
        { path: "/pos/settings", label: "Settings", icon: Settings },
      ];
      break;

    case 5: // Superadmin Warehouse
      menuItems = [
        { path: "/warehouse/home", label: "Overview", icon: Gauge },
        { path: "/warehouse/po", label: "Purchase Order", icon: Package },
        { path: "/warehouse/Receive", label: "Receive", icon: PackageCheck },
        { path: "/warehouse/settings", label: "Settings", icon: Settings },
      ];
      break;

    case 6: // Superadmin Accounting
      menuItems = [
        { path: "/acc/home", label: "Overview", icon: Gauge },
        { path: "/acc/reports", label: "Report", icon: ChartArea },
        { path: "/acc/settings", label: "Settings", icon: Settings },
      ];
      break;

    default:
      menuItems = [{ path: "/home", label: "Dashboard", icon: Home }];
  }
  const isActive = (path) => currentPath === path;

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl transition-all duration-300 z-50 border-r border-slate-700/50
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      {/* Header */}
      <div className="relative p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-2 h-2 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              TokoKami
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Management System
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 cursor-pointer
                ${
                  active
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                    : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                }`}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Active indicator */}
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
              )}

              {/* Icon */}
              <div
                className={`relative transition-transform duration-300 ${
                  hoveredItem === index ? "scale-110" : ""
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-colors duration-300 ${
                    active
                      ? "text-white"
                      : "text-slate-400 group-hover:text-indigo-400"
                  }`}
                />
              </div>

              {/* Label */}
              <span
                className={`font-semibold transition-colors duration-300 ${
                  active ? "text-white" : "group-hover:text-white"
                }`}
              >
                {item.label}
              </span>

              {/* Arrow indicator */}
              <ChevronRight
                className={`w-4 h-4 ml-auto transition-all duration-300 ${
                  active
                    ? "text-white opacity-100 translate-x-0"
                    : "text-slate-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-indigo-400"
                }`}
              />

              {/* Hover effect */}
              {!active && (
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">System Online</p>
              <p className="text-xs text-slate-400">All services running</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-20 right-4 w-32 h-32 bg-gradient-to-br from-indigo-500/5 to-purple-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-32 left-4 w-24 h-24 bg-gradient-to-br from-pink-500/5 to-rose-600/5 rounded-full blur-2xl"></div>
    </aside>
  );
}
