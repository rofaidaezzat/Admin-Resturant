import { ShoppingCart } from "lucide-react";
import { Card } from "../Card";

// Define the type for top selling items data
interface TopSellingItemsData {
  topSellingItems?: Array<{
    name: string;
    quantity: number;
    revenue: number;
  }>;
}

// Top Selling Items Component
const TopSellingItems = ({ data }: { data: TopSellingItemsData }) => {
  if (!data || !data.topSellingItems) return null;

  const items = data.topSellingItems;
  const maxQuantity = Math.max(...items.map((item) => item.quantity));
  const maxRevenue = Math.max(...items.map((item) => item.revenue));

  const colors = [
    "from-blue-500 to-blue-600",
    "from-emerald-500 to-emerald-600",
    "from-indigo-500 to-indigo-600",
    "from-purple-500 to-purple-600",
    "from-rose-500 to-rose-600",
  ];

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <ShoppingCart className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              Top Selling Items
            </h3>
            <p className="text-gray-600 text-sm">Best performing menu items</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {items.map((item, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              <div className="flex items-center gap-4 flex-1">
                <div
                  className={`w-10 h-10 bg-gradient-to-br ${
                    colors[index % colors.length]
                  } rounded-full flex items-center justify-center text-white font-bold text-sm`}
                >
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-gray-800 font-semibold text-base mb-2 truncate">
                    {item.name}
                  </h4>

                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Quantity Sold</span>
                      <span>{item.quantity} units</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${
                          colors[index % colors.length]
                        } h-2 rounded-full transition-all duration-500`}
                        style={{
                          width: `${
                            maxQuantity > 0
                              ? (item.quantity / maxQuantity) * 100
                              : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Revenue Generated</span>
                      <span>${item.revenue.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${
                          colors[index % colors.length]
                        } h-2 rounded-full transition-all duration-500 opacity-70`}
                        style={{
                          width: `${
                            maxRevenue > 0
                              ? (item.revenue / maxRevenue) * 100
                              : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right ml-4">
                <div className="text-2xl font-bold text-gray-800">
                  ${item.revenue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  {item.quantity} sold
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TopSellingItems;
