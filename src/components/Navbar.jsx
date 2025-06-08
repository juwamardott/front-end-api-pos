import { User, Menu, Bell, Search, ChevronDown } from "lucide-react";

export default function Navbar({ toggleSidebar, user }) {
  return (
    <nav className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50 p-4 flex justify-between items-center md:ml-64 fixed top-0 left-0 right-0 z-40">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Toggle button for mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 text-gray-600 hover:text-indigo-600"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex items-center bg-gray-50 rounded-xl px-4 py-2 min-w-[300px] border border-gray-200 focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-50 transition-all duration-200">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search products, transactions..."
            className="bg-transparent outline-none flex-1 text-gray-600 placeholder-gray-400 text-sm"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 text-gray-600 hover:text-indigo-600">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
          </span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl px-4 py-2 border border-indigo-100 hover:from-indigo-100 hover:to-purple-100 transition-all duration-200 cursor-pointer group">
          {/* Avatar */}
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          {/* User Info */}
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>

          {/* Dropdown Arrow */}
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" />
        </div>
      </div>
    </nav>
  );
}
