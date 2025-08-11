import React from "react";
import {
  AlertTriangle,
  ShoppingCart,
  TrendingUp,
  Package,
  Users,
  Clock,
} from "lucide-react";

// Card Component
const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg ${className}`}>
      {children}
    </div>
  );
};

// Revenue Stats Component
const RevenueStats = () => {
  return (
    <div className="space-y-6 mb-8">
      {/* First Row - 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-8 bg-gradient-to-br from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-center">
            <TrendingUp className="h-10 w-10 mx-auto mb-3 text-orange-100" />
            <div className="text-2xl font-bold mb-2 break-words">$587.00</div>
            <div className="text-orange-100 text-sm font-medium">
              Gross Sales
            </div>
          </div>
        </Card>
        <Card className="p-8 bg-gradient-to-br from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-center">
            <Package className="h-10 w-10 mx-auto mb-3 text-gray-100" />
            <div className="text-2xl font-bold mb-2 break-words">$0.00</div>
            <div className="text-gray-100 text-sm font-medium">Discounts</div>
          </div>
        </Card>
        <Card className="p-8 bg-gradient-to-br from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600 transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-center">
            <Users className="h-10 w-10 mx-auto mb-3 text-orange-100" />
            <div className="text-2xl font-bold mb-2 break-words">$587.00</div>
            <div className="text-orange-100 text-sm font-medium">Net Sales</div>
          </div>
        </Card>
        <Card className="p-8 bg-gradient-to-br from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-center">
            <Clock className="h-10 w-10 mx-auto mb-3 text-gray-100" />
            <div className="text-xl font-bold mb-2 break-words">$15,236</div>
            <div className="text-gray-100 text-sm font-medium">
              Cost of Goods
            </div>
          </div>
        </Card>
      </div>

      {/* Second Row - 2 Cards Centered */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Card className="p-8 bg-gradient-to-br from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-center">
            <AlertTriangle className="h-10 w-10 mx-auto mb-3 text-red-100" />
            <div className="text-xl font-bold mb-2 break-words">-$14,649</div>
            <div className="text-red-100 text-sm font-medium">Net Profit</div>
          </div>
        </Card>
        <Card className="p-8 bg-gradient-to-br from-orange-600 to-red-500 text-white hover:from-orange-700 hover:to-red-600 transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-center">
            <TrendingUp className="h-10 w-10 mx-auto mb-3 text-orange-100" />
            <div className="text-xl font-bold mb-2 break-words">-2495.57%</div>
            <div className="text-orange-100 text-sm font-medium">
              Profit Margin
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Enhanced Sales Breakdown Component
const SalesBreakdown = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Enhanced Orders by Type */}
      <Card className="p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
            <ShoppingCart className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Orders by Type</h3>
            <p className="text-gray-500">Distribution breakdown</p>
          </div>
        </div>

        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            {/* Outer Ring */}
            <div className="w-56 h-56 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-inner">
              {/* Middle Ring */}
              <div className="w-44 h-44 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                {/* Inner Circle */}
                <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-800">10</div>
                    <div className="text-sm text-gray-600 font-medium">
                      Total Orders
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Labels with improved positioning */}
            <div className="absolute -top-2 -right-2 bg-white px-4 py-2 rounded-full shadow-lg border-2 border-orange-200">
              <div className="text-sm font-bold text-orange-600">Dine-in</div>
              <div className="text-xs text-gray-500">6 orders</div>
            </div>
            <div className="absolute -bottom-2 -left-2 bg-white px-4 py-2 rounded-full shadow-lg border-2 border-gray-300">
              <div className="text-sm font-bold text-gray-600">Delivery</div>
              <div className="text-xs text-gray-500">4 orders</div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
            <div className="text-2xl font-bold text-orange-600">60%</div>
            <div className="text-sm text-gray-600">Dine-in Rate</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
            <div className="text-2xl font-bold text-gray-600">40%</div>
            <div className="text-sm text-gray-600">Delivery Rate</div>
          </div>
        </div>
      </Card>

      {/* Enhanced Sales Value by Type */}
      <Card className="p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              Sales Value by Type
            </h3>
            <p className="text-gray-500">Revenue distribution</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Dine-in</span>
              <span className="text-2xl font-bold text-orange-600">$380</span>
            </div>
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                <div
                  className="bg-gradient-to-r from-orange-500 to-orange-600 h-4 rounded-full relative overflow-hidden shadow-sm"
                  style={{ width: "65%" }}
                >
                  <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                </div>
              </div>
              <div className="text-right mt-1">
                <span className="text-sm text-gray-500">64.8% of total</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Delivery</span>
              <span className="text-2xl font-bold text-gray-600">$207</span>
            </div>
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                <div
                  className="bg-gradient-to-r from-gray-500 to-gray-600 h-4 rounded-full relative overflow-hidden shadow-sm"
                  style={{ width: "35%" }}
                >
                  <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                </div>
              </div>
              <div className="text-right mt-1">
                <span className="text-sm text-gray-500">35.2% of total</span>
              </div>
            </div>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
            <div className="text-3xl font-bold text-gray-800">$587.00</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Enhanced Top Selling Items Component
const TopSellingItems = () => {
  const items = [
    {
      name: "Classic Burger",
      sold: 3,
      progress: 100,
      color: "from-orange-500 to-orange-600",
    },
    {
      name: "Chicken Burger",
      sold: 3,
      progress: 100,
      color: "from-gray-500 to-gray-600",
    },
    {
      name: "Fresh Orange Juice",
      sold: 3,
      progress: 100,
      color: "from-orange-400 to-orange-500",
    },
    {
      name: "Chicken Caesar Salad",
      sold: 2,
      progress: 67,
      color: "from-gray-600 to-gray-700",
    },
    {
      name: "Water Bottle",
      sold: 2,
      progress: 67,
      color: "from-orange-600 to-red-500",
    },
  ];

  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200">
      <div className="px-8 py-6 bg-gradient-to-r from-orange-50 to-gray-50 border-b border-orange-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg">
            <ShoppingCart className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              Top Selling Items
            </h3>
            <p className="text-gray-600">Best performing menu items</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="space-y-5">
          {items.map((item, index) => (
            <div
              key={index}
              className="group flex items-center justify-between p-5 bg-gradient-to-r from-white to-gray-50 rounded-2xl border-2 border-gray-100 hover:border-orange-200 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className="flex items-center gap-5">
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <span className="text-gray-800 font-bold text-lg block mb-2">
                    {item.name}
                  </span>
                  <div className="w-48 bg-gray-200 rounded-full h-3 shadow-inner">
                    <div
                      className={`bg-gradient-to-r ${item.color} h-3 rounded-full transition-all duration-700 shadow-sm`}
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-3xl text-gray-800">
                  {item.sold}
                </span>
                <span className="text-sm text-gray-500 block mt-1">
                  units sold
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

// Enhanced Low Stock Alerts Component
const LowStockAlerts = () => {
  const lowStockItems = [
    { name: "Burger Bun", remaining: 100, min: 100, urgency: "critical" },
    { name: "Orange", remaining: 80, min: 100, urgency: "warning" },
    { name: "Pita Bread", remaining: 100, min: 100, urgency: "critical" },
  ];

  const getUrgencyColor = (urgency) => {
    return urgency === "critical"
      ? "from-red-500 to-red-600"
      : "from-orange-500 to-yellow-500";
  };

  const getUrgencyBg = (urgency) => {
    return urgency === "critical"
      ? "from-red-50 to-red-100"
      : "from-orange-50 to-yellow-50";
  };

  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-red-100 hover:border-red-200">
      <div className="px-8 py-6 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 border-b-2 border-red-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl shadow-lg animate-pulse">
            <AlertTriangle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              Low Stock Alerts
            </h3>
            <p className="text-gray-600">Items requiring immediate attention</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="space-y-5">
          {lowStockItems.map((item, index) => (
            <div
              key={index}
              className={`group flex items-center justify-between p-5 bg-gradient-to-r ${getUrgencyBg(
                item.urgency
              )} rounded-2xl border-2 border-red-100 hover:border-red-200 transition-all duration-300 hover:shadow-md hover:-translate-y-1`}
            >
              <div className="flex items-center gap-5">
                <div className="p-3 bg-red-100 rounded-full group-hover:bg-red-200 transition-colors duration-300">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <span className="text-gray-800 font-bold text-lg block mb-1">
                    {item.name}
                  </span>
                  <div className="text-sm text-gray-600">
                    Minimum: {item.min} pieces
                  </div>
                  {/* Stock Level Bar */}
                  <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className={`bg-gradient-to-r ${getUrgencyColor(
                        item.urgency
                      )} h-2 rounded-full`}
                      style={{ width: `${(item.remaining / item.min) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`px-4 py-2 bg-gradient-to-r ${getUrgencyColor(
                    item.urgency
                  )} text-white text-sm font-bold rounded-full shadow-md`}
                >
                  {item.urgency === "critical" ? "Critical" : "Low Stock"}
                </span>
                <div className="text-sm text-gray-600 mt-2">
                  <span className="font-semibold">{item.remaining}</span> pieces
                  left
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

// Main Enhanced BusinessSummary Component
const BusinessSummary = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Business Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Real-time insights and analytics
          </p>
        </div>

        <div className="space-y-8">
          <RevenueStats />
          <SalesBreakdown />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <TopSellingItems />
            <LowStockAlerts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSummary;
