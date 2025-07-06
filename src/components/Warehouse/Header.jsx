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
export default function Header({ poData = {}, setPOData }) {
  const updateSupplier = (field, value) => {
    setPOData((prev) => ({
      ...prev,
      supplier: { ...prev.supplier, [field]: value },
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 mb-8 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Purchase Order
            </h1>
            <p className="text-blue-100">
              Create and manage purchase orders efficiently
            </p>
          </div>
          <div className="text-right">
            <div className="text-white/80 text-sm">PO Number</div>
            <div className="text-2xl font-bold text-white">
              {poData.poNumber}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Basic Info */}
          <div className="space-y-6">
            <div>
              <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                Order Date
              </label>
              <input
                type="date"
                value={poData.date}
                onChange={(e) =>
                  setPOData((prev) => ({ ...prev, date: e.target.value }))
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                Due Date
              </label>
              <input
                type="date"
                value={poData.dueDate}
                onChange={(e) =>
                  setPOData((prev) => ({
                    ...prev,
                    dueDate: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Status
              </label>
              <span
                className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                  poData.status === "Draft"
                    ? "bg-yellow-100 text-yellow-800"
                    : poData.status === "Pending Approval"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {poData.status}
              </span>
            </div>
          </div>

          {/* Supplier Info */}
          <div className="lg:col-span-2">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="flex items-center text-lg font-semibold text-slate-800 mb-4">
                <Building className="w-5 h-5 mr-2" />
                Supplier Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center text-sm font-medium text-slate-700 mb-1">
                    <User className="w-4 h-4 mr-1" />
                    Supplier Name
                  </label>
                  <input
                    type="text"
                    value={poData.supplier.name}
                    onChange={(e) => updateSupplier("name", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter supplier name"
                  />
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-slate-700 mb-1">
                    <Mail className="w-4 h-4 mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={poData.supplier.email}
                    onChange={(e) => updateSupplier("email", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="supplier@email.com"
                  />
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-slate-700 mb-1">
                    <Phone className="w-4 h-4 mr-1" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={poData.supplier.phone}
                    onChange={(e) => updateSupplier("phone", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="+62 xxx xxxx xxxx"
                  />
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-slate-700 mb-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    Address
                  </label>
                  <input
                    type="text"
                    value={poData.supplier.address}
                    onChange={(e) => updateSupplier("address", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Supplier address"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
