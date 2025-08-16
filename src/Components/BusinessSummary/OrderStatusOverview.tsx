import {
  BarChart3,
  CheckCircle,
  ChefHat,
  Eye,
  Package,
  Truck,
  XCircle,
} from "lucide-react";
import { Card } from "../Card";

// Order Status Component
const OrderStatusOverview = ({ data }) => {
  if (!data || !data.orderStatuses) return null;

  const statuses = data.orderStatuses;
  const statusIcons = {
    completed: {
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    "out for delivery": {
      icon: Truck,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    preparing: { icon: ChefHat, color: "text-orange-600", bg: "bg-orange-100" },
    cancelled: { icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
    Received: { icon: Eye, color: "text-purple-600", bg: "bg-purple-100" },
  };

  return (
    <Card className="p-6 mb-8 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 rounded-lg">
          <BarChart3 className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            Order Status Overview
          </h3>
          <p className="text-gray-500">Current order distribution</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {Object.entries(statuses).map(([status, count]) => {
          const config = statusIcons[status] || {
            icon: Package,
            color: "text-gray-600",
            bg: "bg-gray-100",
          };
          const IconComponent = config.icon;

          return (
            <div
              key={status}
              className={`p-4 ${config.bg} rounded-lg text-center`}
            >
              <IconComponent
                className={`h-8 w-8 mx-auto mb-2 ${config.color}`}
              />
              <div className="text-2xl font-bold text-gray-800">{count}</div>
              <div className={`text-sm font-medium capitalize ${config.color}`}>
                {status}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
export default OrderStatusOverview;
