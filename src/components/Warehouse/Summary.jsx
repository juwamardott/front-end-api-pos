export default function Summary({ poData = {}, formatRupiah, setPOData }) {
  const items = poData.items || [];
  const notes = poData.notes || "";

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSubmit = () => {
    alert("OK");
    console.log(poData);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Notes */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">
          Notes & Comments
        </h3>
        <textarea
          value={notes}
          onChange={(e) =>
            setPOData((prev) => ({ ...prev, notes: e.target.value }))
          }
          className="w-full h-32 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          placeholder="Add any additional notes or special instructions..."
        />
      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <h3 className="text-xl font-semibold text-slate-800 mb-6">
          Order Summary
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-600">Subtotal</span>
            <span className="font-semibold text-slate-800">
              {formatRupiah(calculateSubtotal())}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-600">PPN (10%)</span>
            <span className="font-semibold text-slate-800">
              {formatRupiah(calculateTax())}
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-t-2 border-slate-200">
            <span className="text-lg font-bold text-slate-800">
              Total Amount
            </span>
            <span className="text-2xl font-bold text-emerald-600">
              {formatRupiah(calculateTotal())}
            </span>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Submit Purchase Order
          </button>
          <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200">
            Save as Draft
          </button>
        </div>
      </div>
    </div>
  );
}
