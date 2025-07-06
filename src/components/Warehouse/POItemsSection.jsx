// components/POItemsSection.jsx
import { Plus, Trash2 } from "lucide-react";

export default function POItemsSection({
  items,
  addItem,
  removeItem,
  updateItem,
  formatRupiah,
  parseRupiah,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 mb-8 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Order Items</h2>
          <button
            onClick={addItem}
            className="flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 backdrop-blur-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </button>
        </div>
      </div>

      <div className="p-8 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 font-semibold text-slate-700">
                Description
              </th>
              <th className="text-center py-3 px-4 font-semibold text-slate-700">
                Quantity
              </th>
              <th className="text-center py-3 px-4 font-semibold text-slate-700">
                Unit Price
              </th>
              <th className="text-center py-3 px-4 font-semibold text-slate-700">
                Total
              </th>
              <th className="text-center py-3 px-4 font-semibold text-slate-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <td className="py-3 px-4">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) =>
                      updateItem(item.id, "description", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Item description"
                  />
                </td>
                <td className="py-3 px-4 text-center">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(item.id, "quantity", Number(e.target.value))
                    }
                    className="w-20 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-center"
                    min="1"
                  />
                </td>
                <td className="py-3 px-4 text-center">
                  <input
                    type="text"
                    value={
                      item.unitPrice === 0 ? "" : formatRupiah(item.unitPrice)
                    }
                    onChange={(e) => {
                      const numericValue = parseRupiah(e.target.value);
                      updateItem(item.id, "unitPrice", numericValue);
                    }}
                    className="w-32 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-center"
                    placeholder="Rp 0"
                  />
                </td>
                <td className="py-3 px-4 text-center font-semibold text-slate-700">
                  {formatRupiah(item.total)}
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
