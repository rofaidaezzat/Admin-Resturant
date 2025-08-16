import { useState } from "react";
import { useUpdateDashboardQuantityMutation } from "../app/services/crudStock";
import { ChevronDown, Package, Plus, X } from "lucide-react";
import type { IReplenishEntry, IStock } from "../Types/stock";

type ReplenishStockModalProps = {
  isOpen: boolean;
  onClose: () => void;
  availableItems: IStock[];
  onReplenish: (list: IReplenishEntry[]) => void;
};

const ReplenishStockModal = ({
  isOpen,
  onClose,
  availableItems,
  onReplenish,
}: ReplenishStockModalProps) => {
  const [updateStock, { isLoading }] = useUpdateDashboardQuantityMutation();
  const [selectedItem, setSelectedItem] = useState<IStock | null>(null);
  const [quantityToAdd, setQuantityToAdd] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [replenishList, setReplenishList] = useState<IReplenishEntry[]>([]);

  const handleItemSelect = (item: IStock) => {
    setSelectedItem(item);
    setIsDropdownOpen(false);
    setQuantityToAdd("");
  };

  const handleAddToList = () => {
    if (!selectedItem || !quantityToAdd || Number(quantityToAdd) <= 0) return;

    const existingIndex = replenishList.findIndex(
      (entry) => entry.item.id === selectedItem.id
    );

    if (existingIndex !== -1) {
      const updated = [...replenishList];
      updated[existingIndex].quantity = Number(quantityToAdd);
      setReplenishList(updated);
    } else {
      setReplenishList((prev) => [
        ...prev,
        { item: selectedItem, quantity: Number(quantityToAdd) },
      ]);
    }

    setSelectedItem(null);
    setQuantityToAdd("");
  };

  const handleRemoveFromList = (itemId: IStock["id"]) => {
    setReplenishList((prev) =>
      prev.filter((entry) => entry.item.id !== itemId)
    );
  };

  const handleUpdateStock = async () => {
    if (replenishList.length === 0) return;

    try {
      for (const entry of replenishList) {
        const newQuantity = entry.item.quantity + entry.quantity;
        await updateStock({
          id: entry.item.id,
          body: { quantity: newQuantity },
        });
      }

      onReplenish(replenishList);
      setReplenishList([]);
      setSelectedItem(null);
      setQuantityToAdd("");
      onClose();
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const handleClose = () => {
    setReplenishList([]);
    setSelectedItem(null);
    setQuantityToAdd("");
    setIsDropdownOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-white p-6 border-b border-gray-100 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
          >
            <X size={20} className="text-gray-500" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-full">
              <Package size={24} className="text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Replenish Stock
              </h2>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
          {/* Select Item */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Select Item
            </label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg text-left flex items-center justify-between hover:border-orange-400 focus:border-orange-500 focus:outline-none transition-all duration-200"
              >
                <span
                  className={selectedItem ? "text-gray-900" : "text-gray-500"}
                >
                  {selectedItem
                    ? selectedItem.itemName
                    : "Choose item to replenish..."}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-orange-500 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-orange-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                  {availableItems?.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleItemSelect(item)}
                      className="w-full px-4 py-3 text-left hover:bg-orange-50 border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-900">{item.itemName}</span>
                        <span className="text-sm text-gray-500">
                          Current: {item.quantity} {item.unit}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quantity Input */}
          <div className="grid grid-cols-3 gap-4 items-end">
            <div className="col-span-2 space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Quantity to Add
              </label>
              <input
                type="number"
                value={quantityToAdd}
                onChange={(e) => setQuantityToAdd(e.target.value)}
                min="1"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:bg-orange-50 focus:outline-none transition-all duration-200"
                placeholder="0"
                disabled={!selectedItem}
              />
            </div>
            <button
              onClick={handleAddToList}
              disabled={
                !selectedItem || !quantityToAdd || Number(quantityToAdd) <= 0
              }
              className="px-4 py-3 bg-orange-100 text-orange-700 rounded-lg font-medium hover:bg-orange-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              Add
            </button>
          </div>

          {/* Items to Replenish */}
          {replenishList.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700">
                Items to Replenish:
              </h3>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {replenishList.map((entry) => (
                  <div
                    key={entry.item.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <span className="font-medium text-gray-900">
                        {entry.item.itemName}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        +{entry.quantity} {entry.item.unit}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveFromList(entry.item.id)}
                      className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors duration-150"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100">
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateStock}
              disabled={isLoading || replenishList.length === 0}
              className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              ) : (
                <>Update Stock ({replenishList.length} items)</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplenishStockModal;
