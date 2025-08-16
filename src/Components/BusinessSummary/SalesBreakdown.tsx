import { Percent, ShoppingCart } from "lucide-react";
import { Card } from "../Card";

// Sales Breakdown Component
const SalesBreakdown = ({ data }) => {
  if (!data) return null;

  const orderTypes = data.orderTypes || {};
  const dineIn = orderTypes.dineIn || {};
  const delivery = orderTypes.delivery || {};
  const totalOrders = data.totalOrders || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Orders by Type */}
      <Card className="p-6 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-100 rounded-lg">
            <ShoppingCart className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Orders by Type</h3>
            <p className="text-gray-500">Distribution breakdown</p>
          </div>
        </div>

        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              className="transform -rotate-90"
            >
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="20"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="20"
                strokeDasharray={`${
                  totalOrders > 0
                    ? ((dineIn.count || 0) / totalOrders) * 502.4
                    : 0
                } 502.4`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#6b7280"
                strokeWidth="20"
                strokeDasharray={`${
                  totalOrders > 0
                    ? ((delivery.count || 0) / totalOrders) * 502.4
                    : 0
                } 502.4`}
                strokeDashoffset={`-${
                  totalOrders > 0
                    ? ((dineIn.count || 0) / totalOrders) * 502.4
                    : 0
                }`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">
                  {totalOrders}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Total Orders
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
            <div>
              <div className="font-semibold text-blue-800">Dine-in</div>
              <div className="text-sm text-blue-600">
                {dineIn.count || 0} orders
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-800">
                ${(dineIn.revenue || 0).toLocaleString()}
              </div>
              <div className="text-sm text-blue-600">
                Avg: ${(dineIn.averageOrderValue || 0).toFixed(2)}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-semibold text-gray-800">Delivery</div>
              <div className="text-sm text-gray-600">
                {delivery.count || 0} orders
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-800">
                ${(delivery.revenue || 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">
                Avg: ${(delivery.averageOrderValue || 0).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Discount Analysis */}
      <Card className="p-6 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Percent className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Discount Analysis
            </h3>
            <p className="text-gray-500">
              Discount distribution & order value breakdown
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {data.discounts && (
            <>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-800 mb-2">
                  ${data.discounts.totalAmount || 0}
                </div>
                <div className="text-gray-600">Total Discounts</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-800">
                    {data.discounts.ordersCount || 0}
                  </div>
                  <div className="text-sm text-purple-600">
                    Orders with Discount
                  </div>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-800">
                    {data.discounts.percentage?.toFixed(1) || 0}%
                  </div>
                  <div className="text-sm text-purple-600">Discount Rate</div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <div className="text-lg font-bold text-gray-800">
                  ${data.discounts.averageDiscountPerOrder?.toFixed(2) || 0}
                </div>
                <div className="text-sm text-gray-600">
                  Avg Discount per Order
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Discount Impact Visualization
                </h4>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Total Revenue
                        </span>
                        <span className="text-sm text-gray-600">
                          ${(data.financial?.netSales || 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full relative"
                          style={{ width: "100%" }}
                        >
                          <div
                            className="bg-gradient-to-r from-purple-500 to-purple-600 h-4 rounded-r-full absolute right-0"
                            style={{
                              width: `${
                                ((data.discounts.totalAmount || 0) /
                                  (data.financial?.netSales || 1)) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
                        <div className="text-2xl font-bold text-green-700">
                          {(data.totalOrders || 0) -
                            (data.discounts.ordersCount || 0)}
                        </div>
                        <div className="text-sm text-green-600 font-medium">
                          Regular Orders
                        </div>
                        <div className="text-xs text-green-500 mt-1">
                          No discount applied
                        </div>
                      </div>

                      <div className="text-center p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                        <div className="text-2xl font-bold text-purple-700">
                          {data.discounts.ordersCount || 0}
                        </div>
                        <div className="text-sm text-purple-600 font-medium">
                          Discounted Orders
                        </div>
                        <div className="text-xs text-purple-500 mt-1">
                          With discount applied
                        </div>
                      </div>

                      <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                        <div className="text-2xl font-bold text-blue-700">
                          $
                          {(
                            (data.financial?.netSales || 0) /
                            (data.totalOrders || 1)
                          ).toFixed(0)}
                        </div>
                        <div className="text-sm text-blue-600 font-medium">
                          Avg Order Value
                        </div>
                        <div className="text-xs text-blue-500 mt-1">
                          After discounts
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};
export default SalesBreakdown;
