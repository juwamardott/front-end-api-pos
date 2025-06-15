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
    <div className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 lg:p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl xl:max-w-3xl transform transition-all duration-300 max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-t-2xl p-4 sm:p-6 lg:p-8 text-white">
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="p-2 lg:p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Package className="w-5 h-5 lg:w-7 lg:h-7" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold truncate">
                Create New Product
              </h2>
              <p className="text-white/80 text-sm lg:text-base truncate">
                Add a new product to your inventory
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 lg:top-6 lg:right-6 p-2 lg:p-3 hover:bg-white/20 rounded-full transition-colors duration-200"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
          <div className="absolute -bottom-1 left-0 right-0 h-4 bg-gradient-to-b from-transparent to-white/10"></div>
        </div>

        {/* Form */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
          {/* Row 1: Product Name & Category */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Product Name */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm lg:text-base font-semibold text-gray-700 mb-3">
                <Package className="w-4 h-4 lg:w-5 lg:h-5 text-indigo-500" />
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 lg:px-5 lg:py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 outline-none text-sm lg:text-base"
                placeholder="Enter product name"
                disabled={isSubmitting}
              />
            </div>

            {/* Category Selection */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm lg:text-base font-semibold text-gray-700 mb-3">
                <Tag className="w-4 h-4 lg:w-5 lg:h-5 text-indigo-500" />
                Category
              </label>
              <select
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                className="w-full px-4 py-3 lg:px-5 lg:py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 outline-none bg-white text-sm lg:text-base"
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
          </div>

          {/* Row 2: SKU & Price */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* SKU */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm lg:text-base font-semibold text-gray-700 mb-3">
                <Hash className="w-4 h-4 lg:w-5 lg:h-5 text-indigo-500" />
                SKU
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSKU(e.target.value)}
                className="w-full px-4 py-3 lg:px-5 lg:py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 outline-none text-sm lg:text-base"
                placeholder="SKU123"
                disabled={isSubmitting}
              />
            </div>

            {/* Price */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm lg:text-base font-semibold text-gray-700 mb-3">
                <DollarSign className="w-4 h-4 lg:w-5 lg:h-5 text-indigo-500" />
                Price
              </label>
              <input
                type="text"
                value={displayPrice}
                onChange={handlePriceChange}
                className="w-full px-4 py-3 lg:px-5 lg:py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 outline-none text-sm lg:text-base"
                placeholder="Rp 0"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Row 3: Description & Stock */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Description */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm lg:text-base font-semibold text-gray-700 mb-3">
                <FileText className="w-4 h-4 lg:w-5 lg:h-5 text-indigo-500" />
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 lg:px-5 lg:py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 outline-none resize-none text-sm lg:text-base h-24 lg:h-28"
                placeholder="Enter product description"
                disabled={isSubmitting}
              />
            </div>

            {/* Stock */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm lg:text-base font-semibold text-gray-700 mb-3">
                <Layers className="w-4 h-4 lg:w-5 lg:h-5 text-indigo-500" />
                Stock Quantity
              </label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-4 py-3 lg:px-5 lg:py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 outline-none text-sm lg:text-base"
                placeholder="0"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 pt-4 lg:pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:flex-1 px-6 py-3 lg:px-8 lg:py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm lg:text-base"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full sm:flex-1 px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 lg:gap-3 shadow-lg hover:shadow-xl cursor-pointer text-sm lg:text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span>Create Product</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
