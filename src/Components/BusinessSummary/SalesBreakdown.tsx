import { Percent, ShoppingCart } from "lucide-react";
import { Card } from "../Card";

// Define the type for sales breakdown data
interface SalesBreakdownData {
  orderTypes?: {
    dineIn?: {
      count?: number;
      revenue?: number;
      percentage?: number;
    };
    delivery?: {
      count?: number;
      revenue?: number;
      percentage?: number;
    };
  };
  totalOrders?: number;
}

// Sales Breakdown Component
const SalesBreakdown = ({ data }: { data: SalesBreakdownData }) => {
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
              <div className="text-lg font-bold text-blue-800">
                ${dineIn.revenue?.toLocaleString() || 0}
              </div>
              <div className="text-sm text-blue-600">
                {dineIn.percentage?.toFixed(1) || 0}%
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
              <div className="text-lg font-bold text-gray-800">
                ${delivery.revenue?.toLocaleString() || 0}
              </div>
              <div className="text-sm text-gray-600">
                {delivery.percentage?.toFixed(1) || 0}%
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Revenue by Type */}
      <Card className="p-6 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-green-100 rounded-lg">
            <Percent className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Revenue by Type</h3>
            <p className="text-gray-500">Financial breakdown</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Dine-in</span>
              <span className="text-sm font-medium text-gray-800">
                {dineIn.percentage?.toFixed(1) || 0}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${dineIn.percentage || 0}%`,
                }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Delivery</span>
              <span className="text-sm font-medium text-gray-800">
                {delivery.percentage?.toFixed(1) || 0}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gray-600 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${delivery.percentage || 0}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800 mb-2">
              ${((dineIn.revenue || 0) + (delivery.revenue || 0)).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SalesBreakdown;
