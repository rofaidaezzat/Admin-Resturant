import {
  BarChart3,
  DollarSign,
  Package,
  Percent,
  Target,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { Card } from "../Card";

// Define the type for revenue stats data
interface RevenueData {
  financial?: {
    grossSales?: number;
    totalDiscounts?: number;
    netSales?: number;
    costOfGoodsSold?: number;
    grossProfit?: number;
    netProfit?: number;
    profitMarginPercent?: number;
    reportDate?: string;
  };
}

// Revenue Stats Component
const RevenueStats = ({ data }: { data: RevenueData }) => {
  if (!data) return null;

  const financial = data.financial || {};

  return (
    <div className="space-y-6 mb-8">
      {/* First Row - Financial Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all duration-300">
          <div className="text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-3 text-blue-600" />
            <div className="text-2xl font-bold mb-2 text-gray-800">
              ${financial.grossSales?.toLocaleString() || "0"}
            </div>
            <div className="text-blue-600 text-sm font-medium">Gross Sales</div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-all duration-300">
          <div className="text-center">
            <Percent className="h-8 w-8 mx-auto mb-3 text-purple-600" />
            <div className="text-2xl font-bold mb-2 text-gray-800">
              ${financial.totalDiscounts?.toLocaleString() || "0"}
            </div>
            <div className="text-purple-600 text-sm font-medium">
              Total Discounts
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 hover:shadow-lg transition-all duration-300">
          <div className="text-center">
            <DollarSign className="h-8 w-8 mx-auto mb-3 text-emerald-600" />
            <div className="text-2xl font-bold mb-2 text-gray-800">
              ${financial.netSales?.toLocaleString() || "0"}
            </div>
            <div className="text-emerald-600 text-sm font-medium">
              Net Sales
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-lg transition-all duration-300">
          <div className="text-center">
            <Package className="h-8 w-8 mx-auto mb-3 text-orange-600" />
            <div className="text-2xl font-bold mb-2 text-gray-800">
              ${financial.costOfGoodsSold?.toLocaleString() || "0"}
            </div>
            <div className="text-orange-600 text-sm font-medium">
              Cost of Goods
            </div>
          </div>
        </Card>
      </div>

      {/* Second Row - Profit & Performance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-all duration-300">
          <div className="text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-3 text-green-600" />
            <div className="text-2xl font-bold mb-2 text-gray-800">
              ${financial.grossProfit?.toLocaleString() || "0"}
            </div>
            <div className="text-green-600 text-sm font-medium">
              Gross Profit
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 hover:shadow-lg transition-all duration-300">
          <div className="text-center">
            <Target className="h-8 w-8 mx-auto mb-3 text-indigo-600" />
            <div className="text-2xl font-bold mb-2 text-gray-800">
              ${financial.netProfit?.toLocaleString() || "0"}
            </div>
            <div className="text-indigo-600 text-sm font-medium">
              Net Profit
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 hover:shadow-lg transition-all duration-300">
          <div className="text-center">
            <BarChart3 className="h-8 w-8 mx-auto mb-3 text-cyan-600" />
            <div className="text-2xl font-bold mb-2 text-gray-800">
              {financial.profitMarginPercent?.toFixed(2) || "0"}%
            </div>
            <div className="text-cyan-600 text-sm font-medium">
              Profit Margin
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 hover:shadow-lg transition-all duration-300">
          <div className="text-center">
            <XCircle className="h-8 w-8 mx-auto mb-3 text-red-600" />
            <div className="text-2xl font-bold mb-2 text-gray-800">
              {financial.reportDate || "N/A"}
            </div>
            <div className="text-red-600 text-sm font-medium">Report Date</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RevenueStats;
