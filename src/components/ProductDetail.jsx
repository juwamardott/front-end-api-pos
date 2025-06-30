import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Save,
  X,
  Upload,
  Trash2,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../store/auth";

const EditProduct = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const token = useAuth((state) => state.token);
  const { id } = useParams();
  const navigate = useNavigate();
  const decodedId = atob(decodeURIComponent(id));

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
    is_active: "",
  });

  const [errors, setErrors] = useState({});

  // Fetch product data and categories
  useEffect(() => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productRes, categoriesRes] = await Promise.all([
          axios.get(`${API_URL}/products/${decodedId}`, headers),
          axios.get(`${API_URL}/category-product`, headers),
        ]);

        const product = productRes.data.data;
        setFormData({
          name: product.name || "",
          sku: product.sku || "",
          description: product.description || "",
          price: product.price || "",
          stock: product.stock[0]?.quantity || "",
          category_id: product.category?.id || "",
          is_active: product.is_active,
        });

        console.log(product);

        setCategories(categoriesRes.data.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
        setError(true);
        setLoading(false);
      }
    };

    if (decodedId) {
      fetchData();
    }
  }, [decodedId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama produk wajib diisi";
    }
    if (!formData.sku.trim()) {
      newErrors.sku = "SKU product wajib diisi";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Deskripsi produk wajib diisi";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Harga harus lebih dari 0";
    }

    if (!formData.stock || formData.stock < 0) {
      newErrors.stock = "Stok tidak boleh negatif";
    }

    if (!formData.category_id) {
      newErrors.category_id = "Kategori wajib dipilih";
    }

    if (!formData.is_active && formData.is_active !== "0") {
      newErrors.is_active = "Status produk wajib dipilih";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);
      await axios.put(
        `http://127.0.0.1:8000/api/products/${decodedId}`,
        {
          name: formData.name.trim(),
          sku: formData.sku.trim(),
          description: formData.description.trim(),
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          category_id: parseInt(formData.category_id),
          is_active: parseInt(formData.is_active),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      setSuccess(true);
      toast.success("Product successfully updated!", {
        style: { fontFamily: "Poppins, sans-serif" },
      });
      setTimeout(() => {
        navigate(-1); // Go back to previous page
      }, 2000);
    } catch (err) {
      console.error("Gagal menyimpan data:", err);
      setErrors({ submit: "Gagal menyimpan data. Silakan coba lagi." });
      toast.error("Product failed updated!", {
        style: { fontFamily: "Poppins, sans-serif" },
      });
    } finally {
      setSaving(false);
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center px-4">
        <div className="flex flex-col justify-center items-center py-20 poppins-medium">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-200 rounded-full animate-spin"></div>
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-indigo-600 text-lg font-semibold">
              Loading Products
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Please wait a moment...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center max-w-md mx-auto w-full">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            Oops!
          </h3>
          <p className="text-red-600 font-medium text-sm sm:text-base">
            Gagal mengambil data produk.
          </p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center max-w-md mx-auto w-full">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            Berhasil!
          </h3>
          <p className="text-green-600 font-medium text-sm sm:text-base">
            Data produk berhasil diperbarui.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 poppins-medium">
      <div className="max-w-6xl mx-auto px-4 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 mt-5">
        {/* Header */}
        <div className="bg-white shadow-lg  sm:shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="cursor-pointer p-2 sm:p-3 rounded-full bg-white bg-opacity-20 backdrop-blur-sm  hover:bg-opacity-30 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                  Edit Produk
                </h1>
                <p className="text-blue-100 text-sm sm:text-base mt-1">
                  Perbarui informasi produk Anda
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-6">
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-600 font-medium">{errors.submit}</p>
                </div>
              </div>
            )}

            {/* Product Name */}
            <div className="space-y-2">
              <label className="block text-sm sm:text-base font-semibold text-gray-700">
                Nama Produk *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 sm:py-4 rounded-xl border-2 transition-all duration-300 text-sm sm:text-base ${
                  errors.name
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-200`}
                placeholder="Masukkan nama produk"
              />
              {errors.name && (
                <p className="text-red-600 text-xs sm:text-sm font-medium">
                  {errors.name}
                </p>
              )}
            </div>
            {/* Product Name */}
            <div className="space-y-2">
              <label className="block text-sm sm:text-base font-semibold text-gray-700">
                SKU Produk *
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 sm:py-4 rounded-xl border-2 transition-all duration-300 text-sm sm:text-base ${
                  errors.sku
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-200`}
                placeholder="Masukkan sku produk"
              />
              {errors.sku && (
                <p className="text-red-600 text-xs sm:text-sm font-medium">
                  {errors.sku}
                </p>
              )}
            </div>

            {/* Category and Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-semibold text-gray-700">
                  Kategori *
                </label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 sm:py-4 rounded-xl border-2 transition-all duration-300 text-sm sm:text-base ${
                    errors.category_id
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-200`}
                >
                  <option value="">Pilih kategori</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category_name}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <p className="text-red-600 text-xs sm:text-sm font-medium">
                    {errors.category_id}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-semibold text-gray-700">
                  Status Produk *
                </label>
                <div className="relative">
                  <select
                    name="is_active"
                    value={formData.is_active}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 sm:py-4 rounded-xl border-2 transition-all duration-300 text-sm sm:text-base ${
                      errors.is_active
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-200`}
                  >
                    <option value="">Pilih status</option>
                    <option value="1">Aktif</option>
                    <option value="0">Tidak Aktif</option>
                  </select>
                  {formData.status && (
                    <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          formData.status === "1"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                    </div>
                  )}
                </div>
                {errors.is_active && (
                  <p className="text-red-600 text-xs sm:text-sm font-medium">
                    {errors.is_active}
                  </p>
                )}
                {formData.is_active && !errors.is_active && (
                  <p
                    className={`text-xs sm:text-sm font-medium ${
                      formData.is_active === 1
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    Produk{" "}
                    {formData.is_active === 0
                      ? "aktif dan dapat dijual"
                      : "tidak aktif dan tidak dapat dijual"}
                  </p>
                )}
              </div>
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-semibold text-gray-700">
                  Harga (IDR) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className={`w-full px-4 py-3 sm:py-4 rounded-xl border-2 transition-all duration-300 text-sm sm:text-base ${
                    errors.price
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-200`}
                  placeholder="0"
                />
                {errors.price && (
                  <p className="text-red-600 text-xs sm:text-sm font-medium">
                    {errors.price}
                  </p>
                )}
                {formData.price && !errors.price && (
                  <p className="text-green-600 text-xs sm:text-sm font-medium">
                    {formatPrice(formData.price)}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-semibold text-gray-700">
                  Stok *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  min="0"
                  className={`w-full px-4 py-3 sm:py-4 rounded-xl border-2 transition-all duration-300 text-sm sm:text-base ${
                    errors.stock
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-200`}
                  placeholder="0"
                />
                {errors.stock && (
                  <p className="text-red-600 text-xs sm:text-sm font-medium">
                    {errors.stock}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm sm:text-base font-semibold text-gray-700">
                Deskripsi Produk *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className={`w-full px-4 py-3 sm:py-4 rounded-xl border-2 transition-all duration-300 text-sm sm:text-base resize-none ${
                  errors.description
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-200`}
                placeholder="Masukkan deskripsi produk"
              />
              {errors.description && (
                <p className="text-red-600 text-xs sm:text-sm font-medium">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="cursor-pointer flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 sm:gap-3 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm sm:text-base lg:text-lg"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                    Simpan Perubahan
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="cursor-pointer flex-1 sm:flex-none border-2 border-gray-300 py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 font-semibold text-sm sm:text-base lg:text-lg"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
