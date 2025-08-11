import { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import ItemEditModal from "../Components/ItemEditModal";
import DeleteConfirmationModal from "../Components/DeleteConfirmationModal";
import { Button } from "../Components/UI/Button";
import { Card } from "../Components/Card";
import { Badge } from "../Components/Badge";
import {
  useGetDashboardItemQuery,
  useDeleteDashboardItemMutation,
} from "../app/services/crudItem";
import BusinessSummary from "./BusinessSummary";
import StockManagement from "./StockManagement";

// Admin Panel Component - GET and DELETE
const AdminPanel = () => {
  const { data: apiMenuItems, isLoading, error } = useGetDashboardItemQuery();
  const [deleteItem, { isLoading: isDeleting }] =
    useDeleteDashboardItemMutation();

  const [activeTab, setActiveTab] = useState("menu");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Delete confirmation modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null);

  // Use API data if available, otherwise empty array
  const menuItems = apiMenuItems || [];

  const handleSaveItem = () => {
    // Modal will handle the save operation
    // This just closes the modal
    setEditingItem(null);
    setShowAddForm(false);
  };

  const handleDeleteClick = (item: any) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      await deleteItem(itemToDelete.id).unwrap();
      console.log("Item deleted successfully");
      // Success - the cache will be automatically updated
      setShowDeleteModal(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Failed to delete item:", error);
      alert("Failed to delete item. Please try again.");
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu items...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load menu items</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-10 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-1">Bella Vista Restaurant</p>
          </div>
          <Badge
            variant="secondary"
            className="px-4 py-2 bg-orange-100 text-orange-700 font-semibold rounded-full shadow-sm border border-orange-200"
          >
            Administrator
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
        {/* Tabs */}
        <div className="flex flex-col sm:flex-row gap-2 mb-8">
          <Button
            variant={activeTab === "menu" ? "default" : "outline"}
            onClick={() => setActiveTab("menu")}
            className={`flex-1 sm:flex-none px-8 py-3 rounded-xl font-semibold transition-all shadow-sm ${
              activeTab === "menu"
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-orange-200"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600"
            }`}
          >
            Menu Management
          </Button>
          <Button
            variant={activeTab === "analytics" ? "default" : "outline"}
            onClick={() => setActiveTab("analytics")}
            className={`flex-1 sm:flex-none px-8 py-3 rounded-xl font-semibold transition-all shadow-sm ${
              activeTab === "analytics"
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-orange-200"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600"
            }`}
          >
            Business Summary
          </Button>
          <Button
            variant={activeTab === "StockManagement" ? "default" : "outline"}
            onClick={() => setActiveTab("StockManagement")}
            className={`flex-1 sm:flex-none px-8 py-3 rounded-xl font-semibold transition-all shadow-sm ${
              activeTab === "StockManagement"
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-orange-200"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600"
            }`}
          >
            Stock Management
          </Button>
        </div>

        {/* Menu Management Tab */}
        {activeTab === "menu" && (
          <Card className="p-0 overflow-hidden shadow-lg rounded-2xl border-2 border-gray-100 bg-white">
            <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-white border-b-2 border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Menu Items ({menuItems.length})
              </h2>
              <Button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-orange-200 transition-all transform hover:scale-105"
              >
                <FiPlus size={22} />
                Add New Item
              </Button>
            </div>

            <div className="p-6">
              {menuItems.length === 0 && (
                <div className="p-12 text-center text-gray-400 text-xl">
                  <div className="mb-4">
                    <FiPlus size={48} className="mx-auto text-gray-300" />
                  </div>
                  No menu items yet. Add your first item!
                </div>
              )}

              <div className="space-y-6">
                {menuItems.map((item, index) => (
                  <div key={item.id}>
                    <div className="bg-white border-2 border-gray-100 p-8 flex flex-col md:flex-row items-center gap-6 rounded-2xl shadow-md hover:shadow-lg transition-all hover:border-orange-200">
                      {/* صورة العنصر */}
                      {item.image && (
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-xl border-2 border-gray-200 shadow-sm"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                      )}

                      {/* معلومات العنصر */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="font-bold text-xl text-gray-800">
                            {item.name}
                          </h3>
                          {item.nameAr && (
                            <span
                              className="text-sm text-gray-500 font-medium"
                              dir="rtl"
                            >
                              ({item.nameAr})
                            </span>
                          )}
                          <Badge
                            variant="secondary"
                            className="bg-orange-100 text-orange-700 font-semibold px-3 py-1 rounded-full border border-orange-200 text-sm"
                          >
                            {item.category}
                          </Badge>
                          <Badge
                            variant="default"
                            className="bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full border border-green-200 text-sm"
                          >
                            Visible
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1 leading-relaxed">
                          {item.description}
                        </p>
                        {item.descriptionAr && (
                          <p
                            className="text-sm text-gray-500 mb-2 leading-relaxed"
                            dir="rtl"
                          >
                            {item.descriptionAr}
                          </p>
                        )}
                        <p className="text-xl font-bold text-orange-600">
                          ${item.price}
                        </p>
                      </div>

                      {/* أزرار التحكم */}
                      <div className="flex gap-2 flex-shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingItem(item)}
                          className="flex items-center gap-2 border-2 border-gray-300 hover:border-orange-400 hover:bg-orange-50 text-gray-700 hover:text-orange-600 px-4 py-2 rounded-xl font-semibold transition-all"
                        >
                          <FiEdit2 size={16} />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteClick(item)}
                          className="flex items-center gap-2 border-2 border-gray-300 hover:border-red-400 hover:bg-red-50 text-gray-700 hover:text-red-600 px-4 py-2 rounded-xl font-semibold transition-all"
                        >
                          <FiTrash2 size={16} />
                          Delete
                        </Button>
                      </div>
                    </div>
                    {/* Separator line between items */}
                    {index !== menuItems.length - 1 && (
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent my-6" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* BusinessSummary Tab */}
        {activeTab === "analytics" && <BusinessSummary />}
        {/* StockManagement Tab */}
        {activeTab === "StockManagement" && <StockManagement />}
      </main>

      {/* Edit/Add Item Modal */}
      {(editingItem || showAddForm) && (
        <ItemEditModal
          item={editingItem}
          onSave={handleSaveItem}
          onCancel={() => {
            setEditingItem(null);
            setShowAddForm(false);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        itemName={itemToDelete?.name || ""}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default AdminPanel;
