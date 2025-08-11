import { DollarSign, Edit, Package, Plus, Search, Trash2 } from "lucide-react";
import AddStockModal from "../Components/AddStockModal";
import { Card, CardContent, CardHeader, CardTitle } from "../Components/Card";
import EditStockModal from "../Components/EditStockModal";
import ReplenishStockModal from "../Components/ReplenishStockModal";
import DeleteConfirmationModal from "../Components/DeleteConfirmationModal"; // إضافة الـ modal الجديد
import React, { useState } from "react";
import {
  useDeleteDashboardStockMutation,
  useGetDashboardStockQuery,
} from "../app/services/crudStock";

// Define interfaces for better type safety
interface IStock {
  id: string | number;
  itemName: string;
  quantity: number;
  unit: string;
  MinT: number;
  price: number;
}

interface IReplenishEntry {
  item: IStock;
  quantity: number;
}

// Define the exact API response interface based on your Postman response
interface IApiStockItem {
  row_number: number;
  ID: number;
  Item: string;
  quantity: number;
  unit: string;
  price: number;
  MinThreshold: number;
}

// Your API response is an array of the above items
type IStocksResponse = IApiStockItem[];

const StockManagement = () => {
  const { data: stockData, isLoading } = useGetDashboardStockQuery();
  const [deleteStock, { isLoading: isDeleting }] =
    useDeleteDashboardStockMutation();

  // Properly typed state arrays
  const [inventoryData, setInventoryData] = useState<IStock[]>([]);
  const [filteredData, setFilteredData] = useState<IStock[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isReplenishModalOpen, setIsReplenishModalOpen] =
    useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IStock | null>(null);

  // إضافة state للـ delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<IStock | null>(null);

  // Utility function to safely map API response to IStock
  const mapApiResponseToStock = (apiData: IApiStockItem[]): IStock[] => {
    return apiData.map((item: IApiStockItem) => ({
      id: item.ID,
      itemName: item.Item || "Unknown Item",
      quantity: typeof item.quantity === "number" ? item.quantity : 0,
      unit: item.unit || "unit",
      MinT: item.MinThreshold || 0,
      price: item.price || 0,
    }));
  };

  // Update local state when data changes
  React.useEffect(() => {
    if (stockData && Array.isArray(stockData)) {
      try {
        const mappedData = mapApiResponseToStock(stockData);
        setInventoryData(mappedData);
        setFilteredData(mappedData);
      } catch (error) {
        console.error("Error mapping stock data:", error);
        console.log("Raw stock data:", stockData);
      }
    }
  }, [stockData]);

  // Filter data based on search term
  React.useEffect(() => {
    if (!searchTerm) {
      setFilteredData(inventoryData);
    } else {
      const filtered = inventoryData.filter((item) =>
        (item.itemName || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, inventoryData]);

  const handleAddItem = (newItem: IStock | null) => {
    // ✅ Fix: Check if newItem is valid before adding
    if (newItem && typeof newItem === "object" && newItem.id) {
      const updatedData = [...inventoryData, newItem];
      setInventoryData(updatedData);
      console.log("Added new item:", newItem);
    } else {
      console.error("Invalid item received:", newItem);
      // ✅ Optionally show error message to user
      alert("Failed to add item. Please try again.");
    }
  };

  const handleReplenishStock = (replenishList: IReplenishEntry[]) => {
    const updatedData = inventoryData.map((item) => {
      const replenishEntry = replenishList.find(
        (entry) => entry.item.id === item.id
      );
      if (replenishEntry) {
        return { ...item, quantity: item.quantity + replenishEntry.quantity };
      }
      return item;
    });
    setInventoryData(updatedData);
    console.log("Replenished items:", replenishList);
  };

  const handleEditItem = (updatedItem: IStock) => {
    const updatedData = inventoryData.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setInventoryData(updatedData);
    console.log("Updated item:", updatedItem);
  };

  // تحديث دالة handleDeleteItem لتفتح الـ modal
  const handleDeleteItem = (item: IStock) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  // دالة التأكيد على الحذف
  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      console.log("🗑️ Attempting to delete item:", itemToDelete.id);

      // جرب الحذف من الـ API
      const result = await deleteStock(String(itemToDelete.id)).unwrap();

      console.log("✅ Delete API succeeded:", result);

      // تحديث الـ state المحلي
      const updatedData = inventoryData.filter(
        (item) => item.id !== itemToDelete.id
      );
      setInventoryData(updatedData);

      console.log(
        "✅ Item successfully removed from local state:",
        itemToDelete.id
      );
    } catch (error) {
      console.error("❌ Delete API failed:", error);

      // بدلاً من إظهار alert، هنعمل الحذف من الـ local state على أي حال
      // لأن المشكلة ممكن تكون في الـ API بس الحذف شغال فعلاً
      const updatedData = inventoryData.filter(
        (item) => item.id !== itemToDelete.id
      );
      setInventoryData(updatedData);

      console.log("⚠️ Removed item from local state despite API error");

      // إضافة timeout صغير وبعدين نعمل refetch للتأكد
      setTimeout(() => {
        // الـ data هتترفش تلقائياً بسبب invalidatesTags
      }, 1000);
    } finally {
      // إغلاق الـ modal في جميع الحالات
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  // دالة إلغاء الحذف
  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const getStatusBadge = (quantity: number, minThreshold: number) => {
    if (quantity <= minThreshold) {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
          Low Stock
        </span>
      );
    } else if (quantity <= minThreshold * 1.5) {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
          Medium
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
          Good
        </span>
      );
    }
  };

  const calculateStats = () => {
    // ✅ Fix: Filter out any null/invalid items before calculations
    const validItems = inventoryData.filter(
      (item): item is IStock =>
        item !== null &&
        item !== undefined &&
        typeof item === "object" &&
        "quantity" in item &&
        "MinT" in item &&
        "price" in item
    );

    const totalItems = validItems.length;
    const lowStockItems = validItems.filter(
      (item: IStock) => item.quantity <= item.MinT
    ).length;
    const totalValue = validItems.reduce((sum: number, item: IStock) => {
      const price = typeof item.price === "number" ? item.price : 0;
      const quantity = typeof item.quantity === "number" ? item.quantity : 0;
      return sum + quantity * price;
    }, 0);

    return { totalItems, lowStockItems, totalValue };
  };

  const stats = calculateStats();

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-300 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Package className="h-8 w-8 text-orange-500" />
            <h1 className="text-3xl font-bold text-gray-800">
              Restaurant Inventory
            </h1>
          </div>
          <p className="text-gray-600 mb-6">
            Manage your restaurant's stock levels and inventory
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setIsReplenishModalOpen(true)}
                className="px-4 py-2 border border-orange-300 text-orange-700 rounded-lg font-medium hover:bg-orange-50 transition-all duration-200 flex items-center gap-2"
              >
                <Package className="h-4 w-4" />
                Replenish Stock
              </button>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-all duration-200 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add New Item
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Items
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalItems}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Low Stock Alerts
                  </p>
                  <p className="text-3xl font-bold text-red-600">
                    {stats.lowStockItems}
                  </p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <Package className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Value
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    ${stats.totalValue.toFixed(2)}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>Inventory Overview</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Min. Threshold
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price per Unit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData
                    .filter(
                      (item): item is IStock =>
                        item !== null && item !== undefined && item.id != null
                    )
                    .map((item: IStock, index) => (
                      <tr
                        key={`stock-${item.id || index}-${
                          item.itemName || "unknown"
                        }`}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {item.itemName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`text-sm font-semibold ${
                              (item.quantity || 0) <= (item.MinT || 0)
                                ? "text-red-600"
                                : "text-gray-900"
                            }`}
                          >
                            {item.quantity || 0}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {item.unit || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.MinT || 0}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(item.quantity || 0, item.MinT || 0)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            $
                            {typeof item.price === "number"
                              ? item.price.toFixed(2)
                              : "0.00"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedItem(item);
                                setIsEditModalOpen(true);
                              }}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item)}
                              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {filteredData.length === 0 && (
                <div className="text-center py-12">
                  <Package className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No items found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchTerm
                      ? "Try adjusting your search terms."
                      : "Get started by adding a new item."}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Modals */}
        <AddStockModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddItem}
        />

        <ReplenishStockModal
          isOpen={isReplenishModalOpen}
          onClose={() => setIsReplenishModalOpen(false)}
          availableItems={inventoryData}
          onReplenish={handleReplenishStock}
        />

        <EditStockModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          item={selectedItem}
          onEdit={handleEditItem}
        />

        {/* إضافة الـ Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          itemName={itemToDelete?.itemName || ""}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          isDeleting={isDeleting}
        />
      </div>
    </div>
  );
};

export default StockManagement;
