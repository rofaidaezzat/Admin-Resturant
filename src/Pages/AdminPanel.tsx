import { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import ItemEditModal from "../Components/ItemEditModal";
import { Button } from "../Components/UI/Button";
import { Card } from "../Components/Card";
import { Badge } from "../Components/Badge";

// Admin Panel Component
const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("menu");
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Classic Burger",
      price: 12.99,
      category: "Sandwiches",
      description:
        "Juicy beef patty with lettuce, tomato, and our special sauce",
      visible: true,
    },
    {
      id: 2,
      name: "Margherita Pizza",
      price: 14.99,
      category: "Pizza",
      description: "Fresh mozzarella, tomato, and basil",
      visible: true,
    },
  ]);

  const [editingItem, setEditingItem] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSaveItem = (item: any) => {
    if (item.id) {
      setMenuItems(menuItems.map((mi) => (mi.id === item.id ? item : mi)));
    } else {
      setMenuItems([...menuItems, { ...item, id: Date.now() }]);
    }
    setEditingItem(null);
    setShowAddForm(false);
  };

  const handleDeleteItem = (id: number) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Bella Vista Restaurant
            </p>
          </div>
          <Badge
            variant="secondary"
            className="px-4 py-1 bg-red-100 text-red-700 font-semibold rounded-full shadow-sm"
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
            className={`flex-1 sm:flex-none px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === "menu"
                ? "bg-emerald-600 text-white"
                : "bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50"
            }`}
          >
            Menu Management
          </Button>
          <Button
            variant={activeTab === "analytics" ? "default" : "outline"}
            onClick={() => setActiveTab("analytics")}
            className={`flex-1 sm:flex-none px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === "analytics"
                ? "bg-emerald-600 text-white"
                : "bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50"
            }`}
          >
            Analytics
          </Button>
        </div>

        {/* Menu Management Tab */}
        {activeTab === "menu" && (
          <Card className="p-0 overflow-hidden shadow-md rounded-2xl border border-slate-100">
            <div className="px-6 py-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-slate-800">Menu Items</h2>
              <Button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold shadow-sm"
              >
                <FiPlus size={20} />
                Add New Item
              </Button>
            </div>

            <div className="divide-y divide-slate-100">
              {menuItems.length === 0 && (
                <div className="p-8 text-center text-slate-400 text-lg">
                  No menu items yet.
                </div>
              )}
              {menuItems.map((item, index) => (
                <div key={item.id} className="mb-8">
                  <div
                    className={`p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-xl shadow-sm transition-all ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-100"
                    }`}
                  >
                    <div className="flex-1 w-full">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg text-slate-800">
                          {item.name}
                        </h3>
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-700 font-medium px-3 py-0.5 rounded-full"
                        >
                          {item.category}
                        </Badge>
                        <Badge
                          variant={item.visible ? "default" : "secondary"}
                          className={`font-medium px-3 py-0.5 rounded-full ${
                            item.visible
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-200 text-slate-500"
                          }`}
                        >
                          {item.visible ? "Visible" : "Hidden"}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-2 max-w-xl">
                        {item.description}
                      </p>
                      <p className="text-lg font-bold text-emerald-600">
                        ${item.price}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-2 md:mt-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingItem(item)}
                        className="flex items-center gap-1 border-slate-300 hover:border-emerald-400 hover:bg-emerald-50 px-3 py-1.5 rounded-lg"
                      >
                        <FiEdit2 size={20} color="#059669" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteItem(item.id)}
                        className="flex items-center gap-1 border-slate-300 hover:border-red-400 hover:bg-red-50 text-red-600 px-3 py-1.5 rounded-lg"
                      >
                        <FiTrash2 /> Delete
                      </Button>
                    </div>
                  </div>
                  {/* خط فاصل بين الأوردرات */}
                  {index !== menuItems.length - 1 && (
                    <div className="h-1 w-full bg-slate-200 rounded-full my-4" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="grid gap-8">
            <Card className="p-6 shadow-md rounded-2xl border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-6">
                Daily Overview
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-slate-800 mb-1">
                    45
                  </div>
                  <div className="text-sm text-slate-500">Orders Today</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-emerald-600 mb-1">
                    $687.50
                  </div>
                  <div className="text-sm text-slate-500">Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-blue-600 mb-1">
                    28
                  </div>
                  <div className="text-sm text-slate-500">Dine-in</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-purple-600 mb-1">
                    17
                  </div>
                  <div className="text-sm text-slate-500">Delivery</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-md rounded-2xl border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-6">
                Popular Items
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Classic Burger", orders: 12 },
                  { name: "Margherita Pizza", orders: 8 },
                  { name: "Caesar Salad", orders: 6 },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b last:border-b-0 border-slate-100"
                  >
                    <span className="text-slate-700 font-medium">
                      {item.name}
                    </span>
                    <span className="font-semibold text-slate-800">
                      {item.orders} orders
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
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
    </div>
  );
};
export default AdminPanel;
