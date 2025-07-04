import { useState } from "react";
import ProductList from "../../components/POS/ProductList";
import AddProductModal from "../../components/POS/AddProductModal";

export default function Product() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const handleSuccess = () => {
    setReload((prev) => !prev); // toggle, agar useEffect ke-trigger
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center py-10 poppins-medium">
        <h2 className="text-xl font-semibold mb-2 poppins-bold">All Product</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indogo-700 cursor-pointer"
        >
          + Add Product
        </button>
      </div>

      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}
      <ProductList reload={reload} />

      {/* {showModal && <AddProductModal onClose={() => setShowModal(false)} />} */}
    </div>
  );
}
