import { Card } from "../Components/Card";

const BusinessSummary = () => {
  return (
    <div className="grid gap-8">
      <Card className="p-0 shadow-lg rounded-2xl border-2 border-gray-100 bg-white overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-white border-b-2 border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800">Daily Overview</h3>
          <p className="text-gray-500 mt-1">Today's performance metrics</p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border-2 border-orange-200">
              <div className="text-4xl font-extrabold text-orange-600 mb-2">
                45
              </div>
              <div className="text-sm font-semibold text-gray-600">
                Orders Today
              </div>
            </div>
            <div className="text-center bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border-2 border-green-200">
              <div className="text-4xl font-extrabold text-green-600 mb-2">
                $687.50
              </div>
              <div className="text-sm font-semibold text-gray-600">Revenue</div>
            </div>
            <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-200">
              <div className="text-4xl font-extrabold text-blue-600 mb-2">
                28
              </div>
              <div className="text-sm font-semibold text-gray-600">Dine-in</div>
            </div>
            <div className="text-center bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border-2 border-purple-200">
              <div className="text-4xl font-extrabold text-purple-600 mb-2">
                17
              </div>
              <div className="text-sm font-semibold text-gray-600">
                Delivery
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-0 shadow-lg rounded-2xl border-2 border-gray-100 bg-white overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-white border-b-2 border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800">Popular Items</h3>
          <p className="text-gray-500 mt-1">Most ordered items today</p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="space-y-4">
            {[
              { name: "Classic Burger", orders: 12, color: "orange" },
              { name: "Margherita Pizza", orders: 8, color: "red" },
              { name: "Caesar Salad", orders: 6, color: "green" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-all hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      item.color === "orange"
                        ? "bg-orange-500"
                        : item.color === "red"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  ></div>
                  <span className="text-gray-800 font-semibold text-lg">
                    {item.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-2xl text-gray-800">
                    {item.orders}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">orders</span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Footer */}
          <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border-2 border-orange-200">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-semibold">
                Total Popular Items Orders:
              </span>
              <span className="text-2xl font-bold text-orange-600">26</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BusinessSummary;
