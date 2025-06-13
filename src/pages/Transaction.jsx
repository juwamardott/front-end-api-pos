import { useState, useEffect } from "react";
import axios from "axios";
export default function TransactionForm() {
  const [transactionItems, setTransactionItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(10); // 10% tax

  // State untuk API dan search
  const [products, setProducts] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // Fetch products dari API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Simulate API call
        axios
          .get("http://127.0.0.1:8000/api/products/")
          .then((res) => {
            setProducts(res.data.data);
            setFilteredProducts(res.data.data);
            setLoading(false);
            // console.log(res.data);
          })
          .catch((err) => {
            setError(true);
            setLoading(false);
          });
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Gagal memuat data produk. Menggunakan data sample.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter produk berdasarkan search term
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProducts(products);
      setShowSearchDropdown(false);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
      setShowSearchDropdown(true);
    }
  }, [searchTerm, products]);

  // Calculate totals
  const subtotal = transactionItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = (subtotal * discount) / 100;
  const taxAmount = ((subtotal - discountAmount) * tax) / 100;
  const total = subtotal - discountAmount + taxAmount;

  // Add item to transaction
  const addItem = () => {
    if (!selectedProduct || quantity <= 0) return;

    const product = products.find((p) => p.id.toString() === selectedProduct);
    if (!product) return;

    const existingItemIndex = transactionItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...transactionItems];
      updatedItems[existingItemIndex].quantity += quantity;
      setTransactionItems(updatedItems);
    } else {
      setTransactionItems([
        ...transactionItems,
        {
          ...product,
          quantity: quantity,
        },
      ]);
    }

    setSelectedProduct("");
    setQuantity(1);
    setSearchTerm(""); // Reset search setelah menambah item
    setShowSearchDropdown(false);
  };

  // Remove item from transaction
  const removeItem = (id) => {
    setTransactionItems(transactionItems.filter((item) => item.id !== id));
  };

  // Update item quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    const updatedItems = transactionItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setTransactionItems(updatedItems);
  };

  // Process transaction
  const processTransaction = () => {
    if (transactionItems.length === 0) return;

    try {
    } catch (error) {}

    // Reset form
    setTransactionItems([]);
    setCustomerName("");
    setCustomerPhone("");
    setDiscount(0);
    setPaymentMethod("cash");
  };

  // Handle product selection from search results
  const selectProductFromSearch = (product) => {
    setSelectedProduct(product.id.toString());
    setSearchTerm(product.name);
    setShowSearchDropdown(false);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
    setSelectedProduct("");
    setShowSearchDropdown(false);
  };

  return (
    <div className="space-y-6 poppins-medium">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">New Transaksi</h1>
          <p className="text-gray-600 mt-1">
            Create New Transaction for Customer
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Today</p>
          <p className="text-lg font-semibold text-gray-800">
            {new Date().toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Product Selection & Customer Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Add Product Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg opacity-100 transform translate-y-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Tambah Produk
            </h3>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {/* Search Bar */}
            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cari Produk
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => searchTerm && setShowSearchDropdown(true)}
                  placeholder="Ketik nama produk untuk mencari..."
                  className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <svg
                  className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              {showSearchDropdown && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {loading ? (
                    <div className="p-3 text-center text-gray-500">
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Loading...
                      </div>
                    </div>
                  ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => selectProductFromSearch(product)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                      >
                        <div className="font-medium text-gray-800">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          Rp {product.price.toLocaleString("id-ID")}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-3 text-center text-gray-500">
                      Produk tidak ditemukan
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilih Produk
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => {
                    setSelectedProduct(e.target.value);
                    const product = products.find(
                      (p) => p.id.toString() === e.target.value
                    );
                    if (product) {
                      setSearchTerm(product.name);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  disabled={loading}
                >
                  <option value="">
                    {loading ? "Loading..." : "Pilih produk..."}
                  </option>
                  {Array.isArray(products) &&
                    products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} - Rp{" "}
                        {product.price.toLocaleString("id-ID")}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-full sm:w-32">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={addItem}
                  disabled={loading || !selectedProduct}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Tambah
                </button>
              </div>
            </div>
          </div>

          {/* Transaction Items */}
          <div className="bg-white p-6 rounded-xl shadow-lg opacity-100 transform translate-y-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Item Transaksi
            </h3>
            {transactionItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <svg
                  className="w-12 h-12 mx-auto mb-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Belum ada item yang ditambahkan
              </div>
            ) : (
              <div className="space-y-3">
                {transactionItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg opacity-100 transform translate-x-0"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        Rp {item.price.toLocaleString("id-ID")} ×{" "}
                        {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">
                          Rp{" "}
                          {(item.price * item.quantity).toLocaleString("id-ID")}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Customer Information */}
          <div className="bg-white p-6 rounded-xl shadow-lg opacity-100 transform translate-y-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Informasi Pelanggan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Pelanggan
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Masukkan nama pelanggan (opsional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  No. Telepon
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Masukkan no. telepon (opsional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Summary & Payment */}
        <div className="space-y-6">
          {/* Transaction Summary */}
          <div className="bg-white p-6 rounded-xl shadow-lg opacity-100 transform translate-x-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Ringkasan Transaksi
            </h3>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">
                  Rp {subtotal.toLocaleString("id-ID")}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Diskon:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={discount}
                    onChange={(e) =>
                      setDiscount(parseFloat(e.target.value) || 0)
                    }
                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded"
                  />
                  <span className="text-sm">%</span>
                </div>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>Potongan:</span>
                  <span>-Rp {discountAmount.toLocaleString("id-ID")}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-600">Pajak ({tax}%):</span>
                <span className="font-medium">
                  Rp {taxAmount.toLocaleString("id-ID")}
                </span>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-indigo-600">
                    Rp {total.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Metode Pembayaran
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <span>Tunai</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <span>Kartu Debit/Kredit</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="ewallet"
                    checked={paymentMethod === "ewallet"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <span>E-Wallet</span>
                </label>
              </div>
            </div>

            {/* Process Transaction Button */}
            <button
              onClick={processTransaction}
              disabled={transactionItems.length === 0}
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              Proses Transaksi
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-lg opacity-100 transform translate-x-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Aksi Cepat
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Cetak Struk
                </span>
              </button>

              <button className="w-full flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
                <div className="bg-green-600 p-2 rounded-lg">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Riwayat Transaksi
                </span>
              </button>

              <button className="w-full flex items-center gap-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
                <div className="bg-purple-600 p-2 rounded-lg">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Buka Laci Kas
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
