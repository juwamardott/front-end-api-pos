import { useState } from "react";
import toast from "react-hot-toast"; // ✅ import

export default function AddProductModal({ onClose }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSKU] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const priceInt = parseInt(price);
    const stockInt = parseInt(stock);

    if (!name.trim()) return toast.error("Name is required");
    if (isNaN(priceInt) || priceInt <= 0)
      return toast.error("Price is invalid");

    const data = {
      name: name.trim(),
      sku: sku.trim(),
      description: description.trim(),
      price: priceInt,
      stock: isNaN(stockInt) ? 0 : stockInt,
      category_id: 1,
      is_active: 1,
    };

    console.info(data);

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

      const result = await res.json();
      toast.success("Product successfully added!", {
        style: { fontFamily: "Poppins, sans-serif" },
      });
      onClose();
      //  onSuccess();
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 poppins-medium">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Tambah Produk</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 ">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 ">Kode Product</label>
            <input
              type="text"
              value={sku}
              onChange={(e) => setSKU(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 ">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 ">Harga</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 ">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="flex justify-end gap-2 poppins-semibold">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-indigo-500"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
