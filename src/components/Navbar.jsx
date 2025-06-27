import {
  User,
  Menu,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  Key,
  X,
} from "lucide-react";
import { useState } from "react";
import useAuth from "../store/auth";
import toast from "react-hot-toast";

export default function Navbar({ toggleSidebar }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useAuth((state) => state.user);
  const { logout } = useAuth();
  console.log(user);
  const handleUserClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    toast.success("Berhasil Logout");
    setIsModalOpen(false);
  };

  const handleChangePassword = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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
          <div
            onClick={handleUserClick}
            className="flex items-center gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl px-4 py-2 border border-indigo-100 hover:from-indigo-100 hover:to-purple-100 transition-all duration-200 cursor-pointer group"
          >
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
                {user?.name || "John Doe"}
              </p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>

            {/* Dropdown Arrow */}
            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" />
          </div>
        </div>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {user?.name}
                  </h3>
                  <p className="text-sm text-gray-500">{user?.role}</p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-3">
              {/* Change Password Button */}
              <button
                onClick={handleChangePassword}
                className="w-full flex items-center gap-3 p-4 hover:bg-indigo-50 rounded-xl transition-all duration-200 text-left group border border-transparent hover:border-indigo-100"
              >
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:bg-indigo-200 transition-colors duration-200">
                  <Key className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 group-hover:text-indigo-600 transition-colors duration-200">
                    Ganti Password
                  </p>
                  <p className="text-sm text-gray-500">
                    Ubah password akun Anda
                  </p>
                </div>
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-4 hover:bg-red-50 rounded-xl transition-all duration-200 text-left group border border-transparent hover:border-red-100"
              >
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-200 transition-colors duration-200">
                  <LogOut className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 group-hover:text-red-600 transition-colors duration-200">
                    Logout
                  </p>
                  <p className="text-sm text-gray-500">Keluar dari akun Anda</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
