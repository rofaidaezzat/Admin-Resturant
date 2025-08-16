import { XCircle } from "lucide-react";
import { Card } from "../Card";

// Define the type for cancelled orders data
interface CancelledOrdersData {
  cancelledAnalysis?: {
    totalCancelledOrders: number;
    cancelledRevenue: number;
    cancelledPercentage: number;
    averageCancelledOrderValue: number;
    cancelledOrderDetails?: Array<{
      orderId: string;
      customerName: string;
      items: string;
      createdAt: string;
      updatedAt: string;
      totalPrice: number;
      orderType: string;
    }>;
  };
}

// Cancelled Orders Analysis Component
const CancelledOrdersAnalysis = ({ data }: { data: CancelledOrdersData }) => {
  if (!data || !data.cancelledAnalysis) return null;

  const cancelled = data.cancelledAnalysis;

  return (
    <Card className="p-6 mb-8 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-red-100 rounded-lg">
          <XCircle className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            Cancelled Orders Analysis
          </h3>
          <p className="text-gray-500">Understanding order cancellations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <div className="text-3xl font-bold text-red-600">
            {cancelled.totalCancelledOrders}
          </div>
          <div className="text-sm text-red-700 font-medium">
            Total Cancelled
          </div>
        </div>

        <div className="text-center p-4 bg-red-50 rounded-lg">
          <div className="text-3xl font-bold text-red-600">
            ${cancelled.cancelledRevenue?.toLocaleString() || 0}
          </div>
          <div className="text-sm text-red-700 font-medium">Lost Revenue</div>
        </div>

        <div className="text-center p-4 bg-red-50 rounded-lg">
          <div className="text-3xl font-bold text-red-600">
            {cancelled.cancelledPercentage?.toFixed(1) || 0}%
          </div>
          <div className="text-sm text-red-700 font-medium">
            Cancellation Rate
          </div>
        </div>

        <div className="text-center p-4 bg-red-50 rounded-lg">
          <div className="text-3xl font-bold text-red-600">
            ${cancelled.averageCancelledOrderValue?.toFixed(2) || 0}
          </div>
          <div className="text-sm text-red-700 font-medium">
            Avg Cancelled Value
          </div>
        </div>
      </div>

      {cancelled.cancelledOrderDetails &&
        cancelled.cancelledOrderDetails.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Cancelled Orders
            </h4>
            <div className="space-y-3">
              {cancelled.cancelledOrderDetails.map((order, index: number) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg border-l-4 border-red-400"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-gray-800">
                        Order #{order.orderId}
                      </div>
                      <div className="text-sm text-gray-600">
                        {order.customerName}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {order.items}
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        Created: {order.createdAt} • Updated: {order.updatedAt}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-red-600">
                        ${order.totalPrice}
                      </div>
                      <div className="text-sm text-gray-600 capitalize">
                        {order.orderType}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
    </Card>
  );
};

export default CancelledOrdersAnalysis;
