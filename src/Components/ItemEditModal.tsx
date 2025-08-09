import { useState } from "react";
import { Button } from "./UI/Button";
import {
  useCreateDashboardItemMutation,
  useUpdateDashboardItemMutation,
} from "../app/services/crudItem";

const ItemEditModal = ({ item, onSave, onCancel }: any) => {
  const [createItem, { isLoading: isCreating }] =
    useCreateDashboardItemMutation();
  const [updateItem, { isLoading: isUpdating }] =
    useUpdateDashboardItemMutation();

  const [formData, setFormData] = useState(
    item || {
      name: "",
      nameAr: "",
      description: "",
      descriptionAr: "",
      image: "",
      price: "",
      category: "",
      visible: true,
    }
  );

  const isSubmitting = isCreating || isUpdating;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (item) {
        // Edit mode - use the update API
        const updatedItemData = {
          name: formData.name,
          nameAr: formData.nameAr,
          description: formData.description,
          descriptionAr: formData.descriptionAr,
          image: formData.image,
          price: parseFloat(formData.price),
          category: formData.category,
          visible: formData.visible,
        };

        await updateItem({
          id: item.id,
          body: updatedItemData,
        }).unwrap();

        // Call onSave to close modal and show success
        onSave();
      } else {
        // Create mode - use the create API
        const newItemData = {
          name: formData.name,
          nameAr: formData.nameAr,
          description: formData.description,
          descriptionAr: formData.descriptionAr,
          image: formData.image,
          price: parseFloat(formData.price),
          category: formData.category,
          visible: formData.visible,
        };

        await createItem({ body: newItemData }).unwrap();

        // Call onSave to close modal and show success
        onSave();
      }
    } catch (error) {
      console.error("Failed to save item:", error);
      // You can add toast notification or error handling here
      alert("Failed to save item. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 transition-all duration-300 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white shadow-2xl rounded-2xl border-2 border-gray-100 scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-200">
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-white border-b-2 border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            {item ? "Edit Menu Item" : "Add New Menu Item"}
          </h2>
          <p className="text-gray-500 text-center mt-2">
            {item
              ? "Update item details below"
              : "Fill in the details for your new menu item"}
          </p>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Item Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  placeholder="Enter item name"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  اسم العنصر *
                </label>
                <input
                  type="text"
                  value={formData.nameAr}
                  onChange={(e) =>
                    setFormData({ ...formData, nameAr: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  placeholder="أدخل اسم العنصر"
                  required
                  disabled={isSubmitting}
                  dir="rtl"
                />
              </div>
            </div>

            {/* Price and Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  placeholder="0.00"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white"
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select Category</option>
                  <option value="Sandwiches">Sandwiches</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Salads">Salads</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Appetizers">Appetizers</option>
                </select>
              </div>
            </div>

            {/* Description Fields */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none transition-all"
                rows={3}
                disabled={isSubmitting}
                placeholder="Describe the item..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                الوصف
              </label>
              <textarea
                value={formData.descriptionAr}
                onChange={(e) =>
                  setFormData({ ...formData, descriptionAr: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none transition-all"
                rows={3}
                disabled={isSubmitting}
                dir="rtl"
                placeholder="وصف العنصر..."
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="https://example.com/image.jpg"
                disabled={isSubmitting}
              />
            </div>

            {/* Image Preview */}
            {formData.image && (
              <div className="flex justify-center">
                <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
                  <p className="text-sm font-medium text-gray-600 mb-2 text-center">
                    Preview:
                  </p>
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-xl border-2 border-gray-200 shadow-sm"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}

            {/* Visible Checkbox */}
            <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="visible"
                  checked={formData.visible}
                  onChange={(e) =>
                    setFormData({ ...formData, visible: e.target.checked })
                  }
                  className="w-5 h-5 text-orange-600 bg-gray-100 border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="visible"
                  className="text-base font-medium text-gray-700"
                >
                  Visible in menu
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
                className="flex-1 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-semibold transition-all"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-xl font-semibold shadow-lg shadow-orange-200 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    {item ? "Updating..." : "Creating..."}
                  </div>
                ) : item ? (
                  "Update Item"
                ) : (
                  "Create Item"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ItemEditModal;
