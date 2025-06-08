import { useState } from "react";
import {
  X,
  Package,
  DollarSign,
  Hash,
  FileText,
  Layers,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

export default function AddProductModal({ onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [displayPrice, setDisplayPrice] = useState(""); // untuk display format rupiah
  const [sku, setSKU] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    const data = {
      name: name.trim(),
      sku: sku.trim(),
      description: description.trim(),
      price: priceInt,
      stock: isNaN(stockInt) ? 0 : stockInt,
      category_id: 1,
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
    <div className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-t-2xl p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Create New Product</h2>
              <p className="text-white/80 text-sm">
                Add a new product to your inventory
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute -bottom-1 left-0 right-0 h-4 bg-gradient-to-b from-transparent to-white/10"></div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {/* Product Name */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Package className="w-4 h-4 text-indigo-500" />
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 outline-none"
              placeholder="Enter product name"
              disabled={isSubmitting}
            />
          </div>

          {/* SKU and Price Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Hash className="w-4 h-4 text-indigo-500" />
                SKU
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSKU(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 outline-none"
                placeholder="SKU123"
                disabled={isSubmitting}
              />
            </div>
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 text-indigo-500" />
                Price
              </label>
              <input
                type="text"
                value={displayPrice}
                onChange={handlePriceChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 outline-none"
                placeholder="Rp 0"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Description */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-4 h-4 text-indigo-500" />
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 outline-none resize-none"
              placeholder="Enter product description"
              rows="3"
              disabled={isSubmitting}
            />
          </div>

          {/* Stock */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Layers className="w-4 h-4 text-indigo-500" />
              Stock Quantity
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 outline-none"
              placeholder="0"
              disabled={isSubmitting}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Create Product
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
