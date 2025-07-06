import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../store/auth";
import toast from "react-hot-toast";

export default function Login() {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Format email tidak valid")
        .required("Email wajib diisi"),
      password: Yup.string().required("Password wajib diisi"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const res = await axios.post(`${API_URL}/auth/login`, {
          email: values.email,
          password: values.password,
          device_name: "browser",
        });

        const user = res.data.data.user;
        const accessToken = res.data.data.access_token;
        const userRole = user.role.role; // e.g. 'Cashier'
        const level = user.role.level; // e.g. 'regular' / 'superadmin'
        const branch = user.branch.id;

        login(user, accessToken, branch);

        // Normalize for comparison
        const normalizedRole = userRole?.trim().toLowerCase();
        const normalizedLevel = level?.trim().toLowerCase();

        // Routing logic
        if (normalizedRole === "cashier") {
          toast.success("Login sebagai Cashier");
          navigate("/pos/home");
        } else if (normalizedRole === "warehouse") {
          toast.success("Login sebagai Warehouse");
          navigate("/warehouse/home");
        } else if (normalizedRole === "accounting") {
          toast.success("Login sebagai Accounting");
          navigate("/acc/home");
        } else if (normalizedRole === "admin" && normalizedLevel === "global") {
          toast.success("Login sebagai Admin");
          navigate("/admin/dashboard");
        } else {
          toast.error("Role tidak memiliki akses masuk!");
        }
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error("Email atau password salah");
          formik.setErrors({
            email: " ",
            password: "Email atau password salah",
          });
        } else {
          toast.error(error?.response?.data?.message || "Terjadi kesalahan");
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl"></div>
        <form
          onSubmit={formik.handleSubmit}
          className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Selamat Datang
            </h1>
            <p className="text-gray-600">
              Masuk ke akun Anda untuk melanjutkan
            </p>
          </div>

          <div className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-indigo-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  autoComplete="email"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-gray-50/50 hover:bg-white/80 focus:bg-white"
                  placeholder="nama@email.com"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500">{formik.errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-indigo-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  autoComplete="password"
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-gray-50/50 hover:bg-white/80 focus:bg-white"
                  placeholder="Masukkan password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-indigo-400 hover:text-indigo-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500">{formik.errors.password}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  name="rememberMe"
                  type="checkbox"
                  checked={formik.values.rememberMe}
                  onChange={formik.handleChange}
                  className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
              </label>
              <a
                href="#"
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                Lupa password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:from-indigo-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Memproses...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <LogIn className="w-5 h-5 mr-2" />
                  Masuk
                </div>
              )}
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Belum punya akun?{" "}
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                Daftar sekarang
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
