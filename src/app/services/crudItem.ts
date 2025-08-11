import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ITracks {
    row_number: number;
    id: string;
    name: string;
    nameAr: string;
    price: number;
    category: string;
    description: string;
    descriptionAr: string;
    image: string;
    visible?: boolean; // Added visible field
}

interface ICreate {
    name: string;
    nameAr: string;
    price: number;
    category: string;
    description: string;
    descriptionAr: string;
    image: string;
    visible?: boolean;
}

interface IUpdate extends ICreate {
    id: string;
}

export type IItemsResponse = ITracks[];

export const ItemApiSlice = createApi({
    reducerPath: 'ApiItems',
    tagTypes: ['DashboardItems'],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://primary-production-d29f0.up.railway.app/",
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        // GET - Fetch all items
        getDashboardItem: builder.query<IItemsResponse, void>({
            query: () => ({
                url: "webhook/get-menu"
            }),
            transformResponse: (response: any[]): ITracks[] => {
                console.log("✅ GET API Response:", response);
                return response.map((item, index) => ({
                    ...item,
                    row_number: index + 1,
                    // Handle both id and _id cases
                    id: item.id || item._id
                }));
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({
                            type: 'DashboardItems' as const,
                            id: id,
                        })),
                        { type: 'DashboardItems', id: 'LIST' },
                    ]
                    : [{ type: 'DashboardItems', id: 'LIST' }],
        }),

        // POST - Create new item
        createDashboardItem: builder.mutation<ITracks, { body: ICreate }>({
            query: ({ body }) => ({
                url: "webhook/add-menu-item",
                method: "POST",
                body: body
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log("✅ CREATE API Response:", data);
                    
                    // Force refresh the entire list after creation
                    dispatch(
                        ItemApiSlice.util.invalidateTags([
                            { type: "DashboardItems", id: "LIST" }
                        ])
                    );
                } catch (error) {
                    console.error("❌ Create failed:", error);
                }
            },
            invalidatesTags: [{ type: "DashboardItems", id: "LIST" }]
        }),

        // PUT - Update existing item (Fixed to match Postman URL)
        updateDashboardItem: builder.mutation<ITracks, { id: string; body: Partial<IUpdate> }>({
            query: ({ id, body }) => {
                console.log("🔍 UPDATE Request:");
                console.log("📝 ID:", id);
                console.log("📝 Body:", body);
                
                return {
                    url: "webhook/update-item", // ✅ Fixed URL to match Postman
                    method: "PUT",
                    body: { 
                        id, // Include ID in body as shown in Postman
                        ...body 
                    }
                };
            },
            async onQueryStarted({ id, body }, { dispatch, queryFulfilled }) {
                // Optimistic update
                const patchResult = dispatch(
                    ItemApiSlice.util.updateQueryData(
                        'getDashboardItem',
                        undefined,
                        (draft) => {
                            const item = draft.find(item => item.id === id);
                            if (item) {
                                Object.assign(item, body);
                                console.log("✅ Optimistically updated item:", item);
                            }
                        }
                    )
                );
                
                try {
                    const { data } = await queryFulfilled;
                    console.log("✅ UPDATE API Response:", data);
                } catch (error) {
                    console.error("❌ Update failed, reverting optimistic update:", error);
                    patchResult.undo();
                }
            },
            invalidatesTags: (_, __, { id }) => [
                { type: 'DashboardItems', id },
                { type: 'DashboardItems', id: 'LIST' }
            ]
        }),

        // DELETE - Remove item
        deleteDashboardItem: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: "webhook/delete-menu-item",
                method: "DELETE",
                body: { id },
                headers: {
                    'Content-Type': 'application/json',
                }
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                // Optimistic update
                const patchResult = dispatch(
                    ItemApiSlice.util.updateQueryData(
                        'getDashboardItem',
                        undefined,
                        (draft) => {
                            const index = draft.findIndex(item => item.id === id);
                            if (index !== -1) {
                                draft.splice(index, 1);
                                console.log("✅ Optimistically removed item with ID:", id);
                            }
                        }
                    )
                );
                
                try {
                    const { data } = await queryFulfilled;
                    console.log("✅ DELETE API Response:", data);
                } catch (error) {
                    console.error("❌ Delete failed, reverting optimistic update:", error);
                    patchResult.undo();
                }
            },
            invalidatesTags: (_, __, id) => [
                { type: 'DashboardItems', id },
                { type: 'DashboardItems', id: 'LIST' }
            ]
        }),
    })
});

export const {
    useGetDashboardItemQuery,
    useCreateDashboardItemMutation,
    useUpdateDashboardItemMutation,
    useDeleteDashboardItemMutation,
} = ItemApiSlice;