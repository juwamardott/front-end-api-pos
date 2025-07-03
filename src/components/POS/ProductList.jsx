import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useLocation, Link, useSearchParams } from "react-router-dom";
import useAuth from "../../store/auth";
import debounce from "lodash/debounce";
export default function ProductList({ reload }) {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const token = useAuth((state) => state.token);
  const [inputValue, setInputValue] = useState("");
  const encodeId = (id) => btoa(id.toString());

  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Fetch data saat searchQuery atau currentPage berubah
  useEffect(() => {
    setLoading(true);
    setError(false);

    axios
      .get(`${API_URL}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        params: {
          page: currentPage,
          search: searchQuery || undefined,
        },
      })
      .then((res) => {
        const data = res.data.data;
        setProducts(data.data);
        setPagination({
          current_page: data.current_page,
          last_page: data.last_page,
        });
      })
      .catch((err) => {
        console.error("Gagal mengambil data produk:", err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [searchQuery, currentPage]);

  // ✅ Input typing
  const handleSearchInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // ✅ Tekan Enter untuk cari
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(inputValue);
      setCurrentPage(1); // reset page saat cari
    }
  };

  // ✅ Clear pencarian
  const clearSearch = () => {
    setInputValue("");
    setSearchQuery("");
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-20 poppins-medium">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-200 rounded-full animate-spin"></div>
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-indigo-600 text-lg font-semibold">
            Loading Products
          </p>
          <p className="text-gray-500 text-sm mt-1">Please wait a moment...</p>
        </div>
      </div>
    );
  }

  if (error || !products?.length) {
    return (
      <div className="text-center py-20 poppins-medium">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No Products Found
          </h3>
          <p className="text-gray-500 mb-6">
            There are no products available at the moment.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="poppins-medium">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
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
          </div>
          <input
            type="text"
            placeholder="Search products by name, description, SKU, or category..."
            value={inputValue}
            onChange={handleSearchInputChange} // ⬅ ini harus update inputValue
            onKeyDown={handleSearchKeyDown}
            className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 outline-none"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="h-5 w-5"
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
        {searchQuery && (
          <p className="text-sm text-gray-600 mt-2">
            {filteredProducts.data?.length === 0
              ? "No products found"
              : `Found ${filteredProducts.data?.length || 0} product${
                  filteredProducts.data?.length !== 1 ? "s" : ""
                } matching "${searchQuery}"`}
          </p>
        )}
      </div>

      {/* Header with View Toggle */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <div>
          <p className="text-gray-600 text-sm">
            Showing {filteredProducts.data?.length || 0} product
            {(filteredProducts.data?.length || 0) !== 1 ? "s" : ""}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1 w-fit">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-md transition-colors ${
              viewMode === "grid"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-md transition-colors ${
              viewMode === "list"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* No Results Message */}
      {products?.length === 0 && searchQuery && (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto px-4">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
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
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-4">
              We couldn't find any products matching "{searchQuery}". Try
              searching with different keywords.
            </p>
            <button
              onClick={clearSearch}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
            >
              Clear Search
            </button>
          </div>
        </div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && products?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200"
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src={`https://placehold.co/400x300?text=${encodeURIComponent(
                    product.name
                  )}`}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                    Stock: {product.stock[0]?.quantity || 0}
                  </span>
                </div>
                {product.stock[0]?.quantity <= 10 && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Low Stock
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full font-medium">
                    {product.category?.category_name || "No Category"}
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                  {product.name}
                </h3>

                <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                  {product.description || "No description available"}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-bold text-green-600">
                      Rp {product.price.toLocaleString("id-ID")}
                    </p>
                    {product.sku && (
                      <p className="text-xs text-gray-500 mt-1">
                        SKU: {product.sku}
                      </p>
                    )}
                  </div>
                  <Link to={`/product/${encodeId(product.id)}`}>
                    <button className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-2 rounded-lg transition-colors font-medium">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* List View - Fully Responsive */}
      {viewMode === "list" && products?.length > 0 && (
        <div className="space-y-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03, duration: 0.4 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-indigo-200"
            >
              {/* Desktop & Tablet Layout (md and up) */}
              <div className="hidden md:flex items-center p-4 lg:p-6 gap-4 lg:gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={`https://placehold.co/120x120?text=${encodeURIComponent(
                      product.name
                    )}`}
                    alt={product.name}
                    className="w-20 h-20 lg:w-24 lg:h-24 object-cover rounded-lg bg-gradient-to-br from-gray-50 to-gray-100"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-bold text-gray-900 text-lg lg:text-xl truncate">
                          {product.name}
                        </h3>
                        <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">
                          {product.category?.category_name || "No Category"}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm lg:text-base line-clamp-2 mb-2 leading-relaxed">
                        {product.description || "No description available"}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                        {product.sku && <span>SKU: {product.sku}</span>}
                        <span>Stock: {product.stock[0]?.quantity || 0}</span>
                        {product.stock[0]?.quantity <= 10 && (
                          <span className="text-red-500 font-medium">
                            Low Stock
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="text-xl lg:text-2xl font-bold text-green-600 mb-2">
                        Rp {product.price.toLocaleString("id-ID")}
                      </p>
                      <Link to={`/product/${encodeId(product.id)}`}>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                          Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Layout (below md) */}
              <div className="md:hidden p-4">
                <div className="flex gap-3 mb-3">
                  <div className="flex-shrink-0">
                    <img
                      src={`https://placehold.co/100x100?text=${encodeURIComponent(
                        product.name
                      )}`}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg bg-gradient-to-br from-gray-50 to-gray-100"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 text-base line-clamp-2 leading-tight">
                        {product.name}
                      </h3>
                      <span className="text-lg font-bold text-green-600 whitespace-nowrap">
                        Rp {product.price.toLocaleString("id-ID")}
                      </span>
                    </div>

                    <span className="inline-block bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full font-medium mb-2">
                      {product.category?.category_name || "No Category"}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm line-clamp-2 mb-3 leading-relaxed">
                  {product.description || "No description available"}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    {product.sku && (
                      <span className="truncate max-w-20">
                        SKU: {product.sku}
                      </span>
                    )}
                    <span>Stock: {product.stock[0]?.quantity || 0}</span>
                    {product.stock[0]?.quantity <= 10 && (
                      <span className="text-red-500 font-medium whitespace-nowrap">
                        Low Stock
                      </span>
                    )}
                  </div>

                  <Link to={`/product/${encodeId(product.id)}`}>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-medium">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      {/* Pagination Controls */}
      {pagination.last_page > 1 && (
        <div className="mt-10 flex justify-center items-center gap-1 flex-wrap">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={pagination.current_page === 1}
            className="px-3 py-1 border rounded text-sm bg-white hover:bg-indigo-500 hover:text-white cursor-pointer disabled:opacity-50 shadow-lg border-gray-300"
          >
            Prev
          </button>

          {[...Array(pagination.last_page)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 shadow-lg border border-gray-300 rounded cursor-pointer text-sm ${
                  page === pagination.current_page
                    ? "bg-indigo-600 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, pagination.last_page))
            }
            disabled={pagination.current_page === pagination.last_page}
            className="px-3 py-1 border rounded text-sm bg-white hover:bg-indigo-500 hover:text-white cursor-pointer disabled:opacity-50 shadow-lg border-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
