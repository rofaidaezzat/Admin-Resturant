import { useState } from "react";
import { useCreateDashboardStockMutation } from "../app/services/crudStock";
import { Package, Plus, Hash, DollarSign, Minus, X } from "lucide-react";
import type { IStockFormData, IStockFormErrors } from "../Types/stock";

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  // ✅ Removed onAdd - not needed since RTK Query handles updates
}

const AddStockModal: React.FC<AddStockModalProps> = ({ isOpen, onClose }) => {
  const [createStock, { isLoading }] = useCreateDashboardStockMutation();
  const [formData, setFormData] = useState<IStockFormData>({
    itemName: "",
    quantity: "",
    price: "",
    unit: "",
    MinT: "",
  });
  const [errors, setErrors] = useState<IStockFormErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof IStockFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: IStockFormErrors = {};
    if (!formData.itemName.trim()) newErrors.itemName = "Item name is required";
    if (!formData.quantity || Number(formData.quantity) <= 0)
      newErrors.quantity = "Quantity must be greater than zero";
    if (!formData.price || Number(formData.price) <= 0)
      newErrors.price = "Price must be greater than zero";
    if (!formData.unit.trim()) newErrors.unit = "Unit is required";
    if (!formData.MinT || Number(formData.MinT) < 0)
      newErrors.MinT = "Minimum threshold must be zero or greater";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      console.log("🚀 Creating new item with data:", formData);

      const result = await createStock({
        body: {
          itemName: formData.itemName,
          quantity: parseInt(formData.quantity),
          price: parseFloat(formData.price),
          unit: formData.unit,
          MinT: parseInt(formData.MinT),
        },
      }).unwrap();

      console.log("✅ Create API Response:", result);

      // Reset form and close modal
      setFormData({
        itemName: "",
        quantity: "",
        price: "",
        unit: "",
        MinT: "",
      });
      setErrors({});
      onClose();
    } catch (error) {
      console.error("❌ Error creating stock:", error);
      
    }
  };

  const handleClose = () => {
    setFormData({ itemName: "", quantity: "", price: "", unit: "", MinT: "" });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <Package size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Add New Item</h2>
              <p className="text-orange-100 text-sm">
                Add a new item to inventory
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Package size={16} className="text-orange-500" />
              Item Name
            </label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
                errors.itemName
                  ? "border-red-300 focus:border-red-500 bg-red-50"
                  : "border-gray-200 focus:border-orange-500 focus:bg-orange-50"
              }`}
              placeholder="Enter item name"
            />
            {errors.itemName && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {errors.itemName}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Hash size={16} className="text-blue-500" />
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                min="1"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
                  errors.quantity
                    ? "border-red-300 focus:border-red-500 bg-red-50"
                    : "border-gray-200 focus:border-blue-500 focus:bg-blue-50"
                }`}
                placeholder="0"
              />
              {errors.quantity && (
                <p className="text-red-500 text-xs">⚠️ {errors.quantity}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Unit
              </label>
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
                  errors.unit
                    ? "border-red-300 focus:border-red-500 bg-red-50"
                    : "border-gray-200 focus:border-green-500 focus:bg-green-50"
                }`}
                placeholder="kg, pieces, liters"
              />
              {errors.unit && (
                <p className="text-red-500 text-xs">⚠️ {errors.unit}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <DollarSign size={16} className="text-green-500" />
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
                errors.price
                  ? "border-red-300 focus:border-red-500 bg-red-50"
                  : "border-gray-200 focus:border-green-500 focus:bg-green-50"
              }`}
              placeholder="0.00"
            />
            {errors.price && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {errors.price}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Minus size={16} className="text-purple-500" />
              Minimum Threshold
            </label>
            <input
              type="number"
              name="MinT"
              value={formData.MinT}
              onChange={handleInputChange}
              min="0"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
                errors.MinT
                  ? "border-red-300 focus:border-red-500 bg-red-50"
                  : "border-gray-200 focus:border-purple-500 focus:bg-purple-50"
              }`}
              placeholder="0"
            />
            {errors.MinT && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {errors.MinT}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              ) : (
                <>
                  <Plus size={18} />
                  Add Item
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStockModal;
