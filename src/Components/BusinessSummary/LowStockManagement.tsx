import {
  Activity,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Loader,
  Package,
  Package2,
  RefreshCw,
  Warehouse,
} from "lucide-react";
import { Card } from "../Card";
import { axiosInstance } from "../../config/axios.config";
import { useQuery } from "@tanstack/react-query";
const fetchLowStockData = async () => {
  try {
    const response = await axiosInstance.get("/webhook/low-stock");
    return response.data;
  } catch (error) {
    console.error("Error fetching low-stock data:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch low-stock data"
    );
  }
};
// Enhanced Low-Stock Management Component with React Query
const LowStockManagement = () => {
  const {
    data: lowStockData,
    isLoading: loading,
    error,
    refetch: onRefresh,
  } = useQuery({
    queryKey: ["lowStock"],
    queryFn: fetchLowStockData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    retryDelay: 1000,
  });

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "low":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-orange-600 bg-orange-100";
      case "high":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "low":
        return AlertTriangle;
      case "medium":
        return Package;
      case "high":
        return CheckCircle;
      default:
        return Package2;
    }
  };

  if (loading) {
    return (
      <Card className="p-6 mb-8 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-emerald-100 rounded-lg">
            <Package2 className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Low-Stock Management
            </h3>
            <p className="text-gray-500">Real-time inventory alerts</p>
          </div>
        </div>

        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">Loading inventory data...</p>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 mb-8 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-emerald-100 rounded-lg">
            <Package2 className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Low-Stock Management
            </h3>
            <p className="text-gray-500">Real-time inventory alerts</p>
          </div>
        </div>

        <div className="text-center py-12">
          <AlertTriangle className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Failed to Load Inventory
          </h4>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button
            onClick={() => onRefresh()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </button>
        </div>
      </Card>
    );
  }

  if (!lowStockData) {
    return (
      <Card className="p-6 mb-8 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-emerald-100 rounded-lg">
            <Package2 className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Low-Stock Management
            </h3>
            <p className="text-gray-500">Real-time inventory alerts</p>
          </div>
        </div>

        <div className="text-center py-12">
          <Warehouse className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            No Inventory Data
          </h4>
          <p className="text-gray-600">
            No inventory information available at the moment.
          </p>
        </div>
      </Card>
    );
  }

  const StatusIcon = getStatusIcon(lowStockData.status);

  return (
    <Card className="p-6 mb-8 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-100 rounded-lg">
            <Package2 className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Low-Stock Management
            </h3>
            <p className="text-gray-500">Real-time inventory alerts via API</p>
          </div>
        </div>

        <button
          onClick={() => onRefresh()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-800">
              {lowStockData.item}
            </h4>
            <p className="text-sm text-gray-600">ID: {lowStockData.id}</p>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              lowStockData.status
            )}`}
          >
            <StatusIcon className="h-4 w-4 inline mr-1" />
            {lowStockData.status}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-gray-800">
              {lowStockData.quantity}
            </div>
            <div className="text-sm text-gray-600">{lowStockData.unit}</div>
            <div className="text-xs text-gray-500 mt-1">Current Stock</div>
          </div>

          <div className="text-center p-4 bg-white rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-gray-800">
              {lowStockData.minThreshold}
            </div>
            <div className="text-sm text-gray-600">{lowStockData.unit}</div>
            <div className="text-xs text-gray-500 mt-1">Min Threshold</div>
          </div>

          <div className="text-center p-4 bg-white rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-gray-800">
              ${lowStockData.price}
            </div>
            <div className="text-sm text-gray-600">per {lowStockData.unit}</div>
            <div className="text-xs text-gray-500 mt-1">Unit Price</div>
          </div>

          <div className="text-center p-4 bg-white rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-gray-800">
              ${(lowStockData.quantity * lowStockData.price).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Value</div>
            <div className="text-xs text-gray-500 mt-1">Stock Worth</div>
          </div>
        </div>

        {/* Stock Level Indicator */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Stock Level Progress
            </span>
            <span className="text-sm text-gray-600">
              {lowStockData.quantity} / {lowStockData.minThreshold * 2}{" "}
              {lowStockData.unit}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all duration-500 ${
                lowStockData.quantity < lowStockData.minThreshold
                  ? "bg-gradient-to-r from-red-500 to-red-600"
                  : lowStockData.quantity < lowStockData.minThreshold * 1.5
                  ? "bg-gradient-to-r from-orange-500 to-orange-600"
                  : "bg-gradient-to-r from-green-500 to-green-600"
              }`}
              style={{
                width: `${Math.min(
                  (lowStockData.quantity / (lowStockData.minThreshold * 2)) *
                    100,
                  100
                )}%`,
              }}
            ></div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {Math.min(
              (lowStockData.quantity / (lowStockData.minThreshold * 2)) * 100,
              100
            ).toFixed(1)}
            % of optimal stock level
          </div>
        </div>

        {/* API Status Indicator */}
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-green-600" />
            <span className="text-green-800 font-medium text-sm">
              Live API Data (React Query Cached)
            </span>
            <span className="text-green-600 text-xs">
              • Connected to webhook/low-stock endpoint
            </span>
          </div>
        </div>

        {/* Alert Section */}
        {lowStockData.quantity < lowStockData.minThreshold && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-red-800 font-medium">
                Critical Stock Alert!
              </span>
            </div>
            <p className="text-red-700 text-sm mb-3">
              Current stock ({lowStockData.quantity} {lowStockData.unit}) is
              below minimum threshold ({lowStockData.minThreshold}{" "}
              {lowStockData.unit}). Immediate restocking required.
            </p>

            <div className="bg-red-100 rounded-lg p-3">
              <h5 className="text-sm font-semibold text-red-800 mb-2">
                Restock Recommendations:
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-red-700">
                <div>
                  • Suggested order:{" "}
                  {lowStockData.minThreshold * 2 - lowStockData.quantity}{" "}
                  {lowStockData.unit}
                </div>
                <div>
                  • Estimated cost: $
                  {(
                    (lowStockData.minThreshold * 2 - lowStockData.quantity) *
                    lowStockData.price
                  ).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default LowStockManagement;
