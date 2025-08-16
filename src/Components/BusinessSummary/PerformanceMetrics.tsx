import { CheckCircle, DollarSign, TrendingUp, XCircle } from "lucide-react";
import { Card } from "../Card";

// Define the type for performance metrics data
interface PerformanceData {
  performance?: {
    averageOrderValue?: number;
    successRate?: number;
    cancellationRate?: number;
    revenueEfficiency?: number;
  };
}

// Performance Metrics Component
const PerformanceMetrics = ({ data }: { data: PerformanceData }) => {
  if (!data) return null;

  const performance = data.performance || {};

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all duration-300">
        <div className="text-center">
          <DollarSign className="h-8 w-8 mx-auto mb-3 text-blue-600" />
          <div className="text-2xl font-bold mb-2 text-gray-800">
            ${performance.averageOrderValue?.toFixed(2) || "0"}
          </div>
          <div className="text-blue-600 text-sm font-medium">
            Avg Order Value
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-all duration-300">
        <div className="text-center">
          <CheckCircle className="h-8 w-8 mx-auto mb-3 text-green-600" />
          <div className="text-2xl font-bold mb-2 text-gray-800">
            {performance.successRate?.toFixed(1) || "0"}%
          </div>
          <div className="text-green-600 text-sm font-medium">Success Rate</div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 hover:shadow-lg transition-all duration-300">
        <div className="text-center">
          <XCircle className="h-8 w-8 mx-auto mb-3 text-red-600" />
          <div className="text-2xl font-bold mb-2 text-gray-800">
            {performance.cancellationRate?.toFixed(1) || "0"}%
          </div>
          <div className="text-red-600 text-sm font-medium">
            Cancellation Rate
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-all duration-300">
        <div className="text-center">
          <TrendingUp className="h-8 w-8 mx-auto mb-3 text-purple-600" />
          <div className="text-2xl font-bold mb-2 text-gray-800">
            {performance.revenueEfficiency?.toFixed(1) || "0"}%
          </div>
          <div className="text-purple-600 text-sm font-medium">
            Revenue Efficiency
          </div>
        </div>
      </Card>
    </div>
  );
};
export default PerformanceMetrics;
