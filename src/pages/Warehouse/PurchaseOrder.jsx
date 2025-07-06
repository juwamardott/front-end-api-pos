import React, { useState } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  Calendar,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  Hash,
  DollarSign,
} from "lucide-react";
import POItemsSection from "../../components/Warehouse/POItemsSection";
import Summary from "../../components/Warehouse/Summary";
import Header from "../../components/Warehouse/Header";

export default function PurchaseOrder() {
  const [poData, setPOData] = useState({
    poNumber: "PO-2025-001",
    date: new Date().toISOString().split("T")[0],
    dueDate: "",
    supplier: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    items: [{ id: 1, description: "", quantity: 1, unitPrice: 0, total: 0 }],
    notes: "",
    status: "Draft",
  });

  const [editingItem, setEditingItem] = useState(null);

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      description: "",
      quantity: 1,
      unitPrice: 0,
      total: 0,
    };
    setPOData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const removeItem = (id) => {
    setPOData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  const parseRupiah = (rupiahString) => {
    return Number(rupiahString.replace(/[^0-9]/g, "")) || 0;
  };

  const updateItem = (id, field, value) => {
    setPOData((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          if (field === "quantity" || field === "unitPrice") {
            updated.total = updated.quantity * updated.unitPrice;
          }
          return updated;
        }
        return item;
      }),
    }));
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto mt-5">
        {/* Header */}

        <Header poData={poData} setPOData={setPOData} />

        {/* Items Section */}
        <POItemsSection
          items={poData.items}
          addItem={addItem}
          removeItem={removeItem}
          updateItem={updateItem}
          formatRupiah={formatRupiah}
          parseRupiah={parseRupiah}
        />

        {/* Summary and Actions */}

        <Summary
          poData={poData}
          setPOData={setPOData}
          formatRupiah={formatRupiah}
        />
      </div>
    </div>
  );
}
