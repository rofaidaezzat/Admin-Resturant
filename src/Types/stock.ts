// ✅ Unified type definitions for the entire project
// Use these types consistently across all components

// ✅ Main stock item interface - matches your API structure
export interface IStock {
  id: string; // Always string to match your API
  itemName: string;
  quantity: number;
  unit: string;
  MinT: number; // Minimum threshold
  price: number;
}

// ✅ API response interface (what your backend actually returns)
export interface IApiStockItem {
  id: string;
  Item: string; // API uses 'Item' instead of 'itemName'
  quantity: number;
  Unit: string; // API uses 'Unit' instead of 'unit'
  price: number;
  MinThreshold: number; // API uses 'MinThreshold' instead of 'MinT'
}

// ✅ For replenish functionality
export interface IReplenishEntry {
  item: IStock;
  quantity: number;
}

// ✅ For creating new items (what we send to API)
export interface ICreateStockRequest {
  itemName: string;
  quantity: number;
  price: number;
  unit: string;
  MinT: number;
}

// ✅ For updating items (what we send to API)
export interface IUpdateStockRequest {
  itemName: string;
  quantity: number;
  price: number;
  unit: string;
  MinT: number;
}

// ✅ Form data interfaces
export interface IStockFormData {
  itemName: string;
  quantity: string;
  price: string;
  unit: string;
  MinT: string;
}

export interface IStockFormErrors {
  itemName?: string;
  quantity?: string;
  price?: string;
  unit?: string;
  MinT?: string;
}

// ✅ API response arrays
export type IStocksResponse = IApiStockItem[];

// ✅ Utility function to map API response to frontend interface
export const mapApiToStock = (apiItem: IApiStockItem): IStock => ({
  id: apiItem.id,
  itemName: apiItem.Item || "Unknown Item",
  quantity: typeof apiItem.quantity === "number" ? apiItem.quantity : 0,
  unit: apiItem.Unit || "unit",
  MinT: apiItem.MinThreshold || 0,
  price: apiItem.price || 0,
});

// ✅ Utility function to map frontend interface to API request
export const mapStockToApi = (stock: Omit<IStock, 'id'>): ICreateStockRequest => ({
  itemName: stock.itemName,
  quantity: stock.quantity,
  price: stock.price,
  unit: stock.unit,
  MinT: stock.MinT,
});

// ✅ Stats calculation type
export interface IStockStats {
  totalItems: number;
  lowStockItems: number;
  totalValue: number;
}