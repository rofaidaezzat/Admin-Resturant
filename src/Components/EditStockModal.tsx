import React, { useState } from "react";
import { useUpdateDashboardStockMutation } from "../app/services/crudStock";
import { Edit, X } from "lucide-react";

// ✅ Use the same interfaces as in StockManagement to avoid conflicts
interface IStock {
  id: string; // ✅ Changed to string only to match your API
  itemName: string;
  quantity: number;
  price: number;
  unit: string;
  MinT: number;
}

interface FormData {
  itemName: string;
  quantity: string;
  price: string;
  unit: string;
  MinT: string;
}

interface FormErrors {
  itemName?: string;
  quantity?: string;
  price?: string;
  unit?: string;
  MinT?: string;
}

interface EditStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: IStock | null;
  onEdit: (updatedItem: IStock) => void;
}

const EditStockModal: React.FC<EditStockModalProps> = ({
  isOpen,
  onClose,
  item,
  onEdit,
}) => {
  const [updateStock, { isLoading }] = useUpdateDashboardStockMutation();

  const [formData, setFormData] = useState<FormData>({
    itemName: "",
    quantity: "",
    price: "",
    unit: "",
    MinT: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  React.useEffect(() => {
    if (item) {
      setFormData({
        itemName: item.itemName || "",
        quantity: item.quantity?.toString() || "0",
        price: item.price?.toString() || "0",
        unit: item.unit || "",
        MinT: item.MinT?.toString() || "0",
      });
    }
  }, [item]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.itemName.trim()) {
      newErrors.itemName = "Item name is required";
    }
    if (!formData.quantity || Number(formData.quantity) <= 0) {
      newErrors.quantity = "Quantity must be greater than zero";
    }
    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "Price must be greater than zero";
    }
    if (!formData.unit.trim()) {
      newErrors.unit = "Unit is required";
    }
    if (!formData.MinT || Number(formData.MinT) < 0) {
      newErrors.MinT = "Minimum threshold must be zero or greater";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateForm() || !item) return;

    try {
      // ✅ Ensure id is string
      const itemId = typeof item.id === "string" ? item.id : String(item.id);

      const result = await updateStock({
        id: itemId,
        body: {
          itemName: formData.itemName,
          quantity: parseInt(formData.quantity),
          price: parseFloat(formData.price),
          unit: formData.unit,
          MinT: parseInt(formData.MinT),
        },
      });

      // ✅ Construct the updated item with proper typing
      const updatedItem: IStock = {
        id: itemId, // ✅ Ensure it's a string
        itemName: formData.itemName,
        quantity: parseInt(formData.quantity),
        price: parseFloat(formData.price),
        unit: formData.unit,
        MinT: parseInt(formData.MinT),
      };

      // ✅ Use result data if available and valid, otherwise use constructed item
      if (result.data && typeof result.data === "object" && result.data.id) {
        const responseItem: IStock = {
          id: String(result.data.id), // ✅ Ensure string
          itemName: result.data.Item || formData.itemName, // ✅ Map API response
          quantity: result.data.quantity || parseInt(formData.quantity),
          price: result.data.price || parseFloat(formData.price),
          unit: result.data.Unit || formData.unit, // ✅ Map API response
          MinT: result.data.MinThreshold || parseInt(formData.MinT), // ✅ Map API response
        };
        onEdit(responseItem);
      } else {
        onEdit(updatedItem);
      }

      onClose();
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("Failed to update item. Please try again.");
    }
  };

  const handleClose = () => {
    setFormData({
      itemName: "",
      quantity: "",
      price: "",
      unit: "",
      MinT: "",
    });
    setErrors({});
    onClose();
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 transition-all duration-300 backdrop-blur-sm">
      <div className="w-full max-w-md max-h-[90vh] overflow-hidden bg-white shadow-2xl rounded-2xl border-2 border-gray-100">
        {/* Header with orange theme */}
        <div className="px-8 py-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <Edit size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Edit Stock Item</h2>
              <p className="text-orange-100 text-sm">Update item details</p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-200">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Item Name *
            </label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                errors.itemName
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50"
                  : "border-gray-200 focus:border-orange-500 focus:ring-orange-200 focus:bg-orange-50"
              }`}
              placeholder="Enter item name"
              disabled={isLoading}
            />
            {errors.itemName && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {errors.itemName}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Quantity *
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                min="1"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                  errors.quantity
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50"
                    : "border-gray-200 focus:border-orange-500 focus:ring-orange-200 focus:bg-orange-50"
                }`}
                placeholder="0"
                disabled={isLoading}
              />
              {errors.quantity && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <span>⚠️</span> {errors.quantity}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Unit *
              </label>
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                  errors.unit
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50"
                    : "border-gray-200 focus:border-orange-500 focus:ring-orange-200 focus:bg-orange-50"
                }`}
                placeholder="kg, pcs, liter"
                disabled={isLoading}
              />
              {errors.unit && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <span>⚠️</span> {errors.unit}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Price ($) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                errors.price
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50"
                  : "border-gray-200 focus:border-orange-500 focus:ring-orange-200 focus:bg-orange-50"
              }`}
              placeholder="0.00"
              disabled={isLoading}
            />
            {errors.price && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {errors.price}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Minimum Threshold
            </label>
            <input
              type="number"
              name="MinT"
              value={formData.MinT}
              onChange={handleInputChange}
              min="0"
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                errors.MinT
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50"
                  : "border-gray-200 focus:border-orange-500 focus:ring-orange-200 focus:bg-orange-50"
              }`}
              placeholder="0"
              disabled={isLoading}
            />
            {errors.MinT && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {errors.MinT}
              </p>
            )}
            <p className="text-gray-500 text-xs">
              Alert when stock falls below this number
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:transform-none shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Updating...
                </div>
              ) : (
                <>
                  <Edit size={18} />
                  Update Item
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStockModal;
