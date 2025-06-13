import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Share2,
  Shield,
} from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const decodedId = atob(decodeURIComponent(id));
  const [product, setProduct] = useState(null); // default null agar bisa dicek sebelum render
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!decodedId) return;
    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000/api/products/${decodedId}`)
      .then((res) => {
        setProduct(res.data.data); // ambil dari res.data.data
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data produk:", err);
        setError(true);
        setLoading(false);
      });
  }, [decodedId]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);

  const handleQuantityChange = (action) => {
    if (action === "increase" && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-base sm:text-lg font-medium">
            Loading...
          </p>
        </div>
      </div>
    );

  if (error || !product)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center max-w-md mx-auto w-full">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 poppins-medium">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Main Product Card */}
        <div className="bg-white shadow-lg sm:shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden">
          {/* Product Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="inline-block px-2 sm:px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-3 ">
                  {product.category?.category_name}
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight text-white break-words">
                  {product.name}
                </h1>
              </div>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex-shrink-0 p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm self-start ${
                  isFavorite
                    ? "bg-red-500 bg-opacity-90 text-white shadow-lg transform scale-110"
                    : "bg-white bg-opacity-20 text-blue-600 hover:bg-opacity-30 hover:scale-105"
                }`}
              >
                <Heart
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    isFavorite ? "fill-current" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Product Content */}
          <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
            {/* Price and Description Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                {/* Price */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-200">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-700 break-all">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-green-600 text-sm sm:text-base lg:text-lg">
                      / pcs
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                    Deskripsi Produk
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Stock Info */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-200">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-700 font-semibold text-sm sm:text-base lg:text-lg">
                      Stok Tersedia
                    </span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-green-700">
                    {product.stock}
                  </p>
                  <p className="text-green-600 text-xs sm:text-sm mt-1">
                    pcs ready to ship
                  </p>
                </div>
              </div>
            </div>

            {/* Quantity and Actions Section */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {/* Quantity Selector */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Pilih Jumlah
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    <div className="flex items-center bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200 w-fit mx-auto sm:mx-0">
                      <button
                        onClick={() => handleQuantityChange("decrease")}
                        className="p-3 sm:p-4 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={quantity <= 1}
                      >
                        <Minus
                          size={16}
                          className="sm:w-5 sm:h-5 text-gray-600"
                        />
                      </button>
                      <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-blue-50 min-w-[80px] sm:min-w-[100px] text-center">
                        <span className="text-xl sm:text-2xl font-bold text-blue-700">
                          {quantity}
                        </span>
                      </div>
                      <button
                        onClick={() => handleQuantityChange("increase")}
                        className="p-3 sm:p-4 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={quantity >= product.stock}
                      >
                        <Plus
                          size={16}
                          className="sm:w-5 sm:h-5 text-gray-600"
                        />
                      </button>
                    </div>
                    <div className="text-gray-500 text-center sm:text-left">
                      <p className="text-xs sm:text-sm">Maksimal</p>
                      <p className="font-semibold text-sm sm:text-base">
                        {product.stock} pcs
                      </p>
                    </div>
                  </div>
                </div>

                {/* Total Price */}
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200">
                  <p className="text-gray-600 text-xs sm:text-sm mb-1">
                    Total Harga
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600 break-all">
                    {formatPrice(product.price * quantity)}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 sm:gap-3 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold text-sm sm:text-base lg:text-lg">
                <ShoppingCart
                  size={18}
                  className="sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                />
                Beli Sekarang
              </button>
              <button className="border-2 border-gray-300 py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 font-semibold text-sm sm:text-base lg:text-lg hover:scale-105">
                <Share2 size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                Bagikan
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-6 sm:mt-8">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 text-center sm:text-left">
              <div className="p-2 sm:p-3 bg-white bg-opacity-20 rounded-full flex-shrink-0">
                <Shield size={24} className="sm:w-7 sm:h-7 text-black" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold">
                  Jaminan Kualitas
                </h3>
                <p className="text-emerald-100 text-sm sm:text-base lg:text-lg">
                  Produk dijamin berkualitas oleh seller
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
