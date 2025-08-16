import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, Loader, Package2, RefreshCw } from "lucide-react";
import { axiosInstance } from "../config/axios.config";
import RevenueStats from "../Components/BusinessSummary/RevenueStats";
import PerformanceMetrics from "../Components/BusinessSummary/PerformanceMetrics";
import OrderStatusOverview from "../Components/BusinessSummary/OrderStatusOverview";
import LowStockManagement from "../Components/BusinessSummary/LowStockManagement";
import SalesBreakdown from "../Components/BusinessSummary/SalesBreakdown";
import CancelledOrdersAnalysis from "../Components/BusinessSummary/CancelledOrdersAnalysis";
import TopSellingItems from "../Components/BusinessSummary/TopSellingItems";

// API Functions
const fetchDashboardData = async () => {
  try {
    const response = await axiosInstance.get("webhook/revenue-summary");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch dashboard data"
    );
  }
};

// Main Dashboard Component with React Query
const BusinessSummary = () => {
  const queryClient = useQueryClient();

  // Dashboard data query
  const {
    data: dashboardData,
    isLoading: dashboardLoading,
    error: dashboardError,
    refetch: refetchDashboard,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardData,
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    refetchInterval: 5 * 60 * 1000, // Auto-refetch every 5 minutes
  });

  const handleRefreshAll = () => {
    refetchDashboard();
    queryClient.invalidateQueries(["lowStock"]);
  };

  const lastUpdated = new Date(dataUpdatedAt);

  if (dashboardLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 text-lg">Loading dashboard data...</p>
          <p className="text-gray-500 text-sm mt-2">
            Fetching latest business insights from API
          </p>
        </div>
      </div>
    );
  }

  if (dashboardError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertTriangle className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-600 mb-6">{dashboardError.message}</p>
          <button
            onClick={() => refetchDashboard()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="h-5 w-5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Extract the first item if dashboardData is an array
  const data = Array.isArray(dashboardData) ? dashboardData[0] : dashboardData;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Enhanced Business Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                Real-time business insights with React Query caching •{" "}
                {data?.reportDate}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => queryClient.invalidateQueries(["lowStock"])}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2"
              >
                <Package2 className="h-4 w-4" />
                Refresh Stock
              </button>
              <button
                onClick={handleRefreshAll}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
              >
                <RefreshCw className="h-5 w-5" />
                Refresh All
              </button>
            </div>
          </div>
          {dataUpdatedAt && (
            <div className="flex items-center gap-4 mt-3">
              <p className="text-sm text-gray-400">
                Last updated: {lastUpdated.toLocaleString()}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-8">
          {/* Financial Overview */}
          <RevenueStats data={data} />

          {/* Performance Metrics */}
          <PerformanceMetrics data={data} />

          {/* Order Status Overview */}
          <OrderStatusOverview data={data} />

          {/* Low-Stock Management with React Query */}
          <LowStockManagement />

          {/* Sales Breakdown */}
          <SalesBreakdown data={data} />

          {/* Cancelled Orders Analysis */}
          <CancelledOrdersAnalysis data={data} />

          {/* Top Selling Items */}
          <TopSellingItems data={data} />
        </div>
      </div>
    </div>
  );
};

export default BusinessSummary;
