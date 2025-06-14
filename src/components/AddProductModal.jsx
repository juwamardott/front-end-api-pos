import { useEffect, useState } from "react";
import {
  X,
  Package,
  DollarSign,
  Hash,
  FileText,
  Layers,
  Sparkles,
  Tag,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

export default function AddProductModal({ onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [displayPrice, setDisplayPrice] = useState(""); // untuk display format rupiah
  const [sku, setSKU] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(""); // State untuk category yang dipilih
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/category-product")
      .then((res) => {
        setCategory(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.error("Gagal mengambil data produk:", err);
      });
  }, []);

  // Fungsi untuk format ke rupiah
  const formatRupiah = (number) => {
    if (!number) return "";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  // Fungsi untuk mengubah string rupiah kembali ke angka
  const parseRupiah = (rupiahString) => {
    if (!rupiahString) return "";
    return rupiahString.replace(/[^\d]/g, "");
  };

  // Handler untuk perubahan price
  const handlePriceChange = (e) => {
    const inputValue = e.target.value;
    // Hapus semua karakter non-digit
    const numericValue = inputValue.replace(/[^\d]/g, "");

    // Set nilai numerik untuk state price
    setPrice(numericValue);

    // Set display dengan format rupiah
    if (numericValue) {
      setDisplayPrice(formatRupiah(parseInt(numericValue)));
    } else {
      setDisplayPrice("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const priceInt = parseInt(price);
    const stockInt = parseInt(stock);
    const categoryId = parseInt(selectedCategoryId);

    if (!name.trim()) {
      toast.error("Name is required");
      setIsSubmitting(false);
      return;
    }
    if (isNaN(priceInt) || priceInt <= 0) {
      toast.error("Price is invalid");
      setIsSubmitting(false);
      return;
    }
    if (!selectedCategoryId || isNaN(categoryId)) {
      toast.error("Please select a category");
      setIsSubmitting(false);
      return;
    }

    const data = {
      name: name.trim(),
      sku: sku.trim(),
      description: description.trim(),
      price: priceInt,
      stock: isNaN(stockInt) ? 0 : stockInt,
      category_id: categoryId, // Menggunakan kategori yang dipilih
      is_active: 1,
    };

    try {
      const res = await fetch("http://localhost:8000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${your_token}` (jika pakai auth)
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create product");
      }

      // ✅ Tampilkan toast sukses
      toast.success("Product successfully added!", {
        style: { fontFamily: "Poppins, sans-serif" },
      });

      // ✅ Panggil onSuccess untuk trigger re-render ProductList
      onSuccess();
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-t-2xl p-4 sm:p-6 text-white">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Package className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-2xl font-bold truncate">
                Create New Product
              </h2>
              <p className="text-white/80 text-xs sm:text-sm truncate">
                Add a new product to your inventory
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
            disabled={isSubmitting}
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <div className="absolute -bottom-1 left-0 right-0 h-4 bg-gradient-to-b from-transparent to-white/10"></div>
        </div>

        {/* Form */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          {/* Product Name */}
          <div className="group">
            <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
              <Package className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500" />
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 outline-none text-sm sm:text-base"
              placeholder="Enter product name"
              disabled={isSubmitting}
            />
          </div>

          {/* Category Selection */}
          <div className="group">
            <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
              <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500" />
              Category
            </label>
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 outline-none bg-white text-sm sm:text-base"
              disabled={isSubmitting}
            >
              <option value="">Select a category</option>
              {category.map((cat) => (
                <option key={cat.id} value={cat.id.toString()}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>

          {/* SKU and Price Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="group">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                <Hash className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500" />
                SKU
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSKU(e.target.value)}
                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 outline-none text-sm sm:text-base"
                placeholder="SKU123"
                disabled={isSubmitting}
              />
            </div>
            <div className="group">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500" />
                Price
              </label>
              <input
                type="text"
                value={displayPrice}
                onChange={handlePriceChange}
                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 outline-none text-sm sm:text-base"
                placeholder="Rp 0"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Description */}
          <div className="group">
            <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500" />
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 outline-none resize-none text-sm sm:text-base"
              placeholder="Enter product description"
              rows="3"
              disabled={isSubmitting}
            />
          </div>

          {/* Stock */}
          <div className="group">
            <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
              <Layers className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500" />
              Stock Quantity
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 outline-none text-sm sm:text-base"
              placeholder="0"
              disabled={isSubmitting}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:flex-1 px-4 py-2.5 sm:px-6 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm sm:text-base"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full sm:flex-1 px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer text-sm sm:text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="text-xs sm:text-base">Creating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-base">Create Product</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
