import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IStocks {
    id: string; 
    Item: string;
    quantity: number;
    unit: string;
    price: number | string; // Allow price to be string or number since API returns strings
    MinThreshold: number;
}

interface ICreate {
    itemName: string;
    quantity: number;
    price: number;
    unit: string;
    MinT: number;
}

interface IUpdate {
    itemName: string;
    quantity: number;
    price: number;
    unit: string;
    MinT: number;
}

export type IStocksResponse = IStocks[];
 interface IQuantityUpdate {
    id: string;
    quantity: number;
 }

export const StockApiSlice = createApi({
    reducerPath: 'ApiStocks',
    tagTypes: ['DashboardItems'],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://primary-production-c413.up.railway.app/",
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        // GET - Fetch all items
        getDashboardStock: builder.query<IStocksResponse, void>({
            query: () => ({
                url: "webhook/get-stock"
            }),
            // Transform response to handle price field properly
            transformResponse: (response: any[]): IStocksResponse => {
                return response.map((item: any) => ({
                    id: String(item.id),
                    Item: item.Item || "Unknown Item",
                    quantity: typeof item.quantity === "number" ? item.quantity : 0,
                    unit: item.unit || "unit", 
                    price: parseFloat(item.price?.toString() || "0") || 0, // Convert empty strings to 0
                    MinThreshold: item.MinThreshold || 0
                }));
            },
            providesTags: (result) => {
                if (!result || !Array.isArray(result)) {
                    return [{ type: 'DashboardItems', id: 'LIST' }];
                }
                
                return [
                    ...result
                        .filter(item => item && typeof item === 'object' && item.id)
                        .map(({ id }) => ({
                            type: 'DashboardItems' as const,
                            id: id,
                        })),
                    { type: 'DashboardItems', id: 'LIST' },
                ];
            },
        }),

        // POST - Create new item
        createDashboardStock: builder.mutation<IStocks, { body: ICreate }>({
            query: ({ body }) => ({
                url: "webhook/manage-stock",
                method: "POST",
                body: body
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log("✅ Create API Response:", data);
                    
                    dispatch(
                        StockApiSlice.util.invalidateTags([
                            { type: "DashboardItems", id: "LIST" }
                        ])
                    );
                    
                    console.log("🔄 Cache invalidated, refreshing data...");
                } catch (error) {
                    console.error("❌ Create failed:", error);
                }
            },
            invalidatesTags: [{ type: "DashboardItems", id: "LIST" }]
        }),

        // PUT - Update existing item
        updateDashboardStock: builder.mutation<IStocks, { id: string; body: Partial<IUpdate> }>({
            query: ({ id, body }) => ({
    url: "webhook/update-stock",
    method: "PUT",
    body: { ...body, id }, // Corrected to match API's flat structure
}),
            invalidatesTags: (_, __, { id }) => [
                { type: 'DashboardItems', id },
                { type: 'DashboardItems', id: 'LIST' }
            ]
        }),

        // DELETE - Fixed endpoint with proper error handling
       deleteDashboardStock: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: "webhook/delete",
                method: "DELETE",
                body: { id }, // Send ID in body as shown in Postman
                headers: {
                    'Content-Type': 'application/json',
                }
            }),
            // Optimistic update
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    StockApiSlice.util.updateQueryData(
                        'getDashboardStock',
                        undefined,
                        (draft) => {
                            const index = draft.findIndex(item => item.id === id);
                            if (index !== -1) {
                                draft.splice(index, 1);
                            }
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
            invalidatesTags: (_, __, id) => [
                { type: 'DashboardItems', id },
                { type: 'DashboardItems', id: 'LIST' }
            ]
        }),
        // PUT - Update quantity of an existing stock item
        updateDashboardQuantity: builder.mutation<IQuantityUpdate, { id: string; body: Partial<IUpdate> }>({
            query: ({ id, body }) => ({
                url: `webhook/add-quantity`,
                method: "PUT",
                body: { id, ...body },
            }),
            invalidatesTags: (_, __, { id }) => [
                { type: 'DashboardItems', id },
                { type: 'DashboardItems', id: 'LIST' }
            ]
        }),
        // Helper to manually refetch data
        refetchDashboardStock: builder.mutation<void, void>({
            queryFn: async (_, { dispatch }) => {
                dispatch(StockApiSlice.util.invalidateTags([{ type: "DashboardItems", id: "LIST" }]));
                return { data: undefined };
            }
        })
    })
});

export const {
    useGetDashboardStockQuery,
    useCreateDashboardStockMutation,
    useUpdateDashboardStockMutation,
    useDeleteDashboardStockMutation,
    useRefetchDashboardStockMutation,
    useUpdateDashboardQuantityMutation
} = StockApiSlice;