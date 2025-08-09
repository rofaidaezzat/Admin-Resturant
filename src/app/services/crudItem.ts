import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ITracks {
    row_number: number;
    id: string; // Make sure this matches your API response (_id vs id)
    name: string;
    nameAr: string;
    price: number;
    category: string;
    description: string;
    descriptionAr: string;
    image: string;
}

interface ICreate {
    name: string;
    nameAr: string;
    price: number;
    category: string;
    description: string;
    descriptionAr: string;
    image: string;
}

interface IUpdate extends ICreate {
    id: string;
}

export type IItemsResponse = ITracks[];

export const ItemApiSlice = createApi({
    reducerPath: 'ApiItems',
    tagTypes: ['DashboardItems'],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://primary-production-d29f0.up.railway.app/"
    }),
    endpoints: (builder) => ({
        // GET - Fetch all items
        getDashboardItem: builder.query<IItemsResponse, void>({
            query: () => ({
                url: "webhook/get-menu"
            }),
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
            // Optimistic update for better UX
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        ItemApiSlice.util.updateQueryData(
                            'getDashboardItem',
                            undefined,
                            (draft) => {
                                draft.unshift(data);
                            }
                        )
                    );
                } catch (err) {
                    console.error("Error in cache update after create:", err);
                }
            },
            invalidatesTags: [{ type: "DashboardItems", id: "LIST" }]
        }),

        // PUT/PATCH - Update existing item
updateDashboardItem: builder.mutation<ITracks, { id: string; body: Partial<IUpdate> }>({
    query: ({ id, body }) => ({
        url: `webhook/update-menu-item/${id}`,
        method: "PUT",
        body: body  // ← This was the issue! You had body: {} instead of body: body
    }),
    // Optimistic update
    async onQueryStarted({ id, body }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
            ItemApiSlice.util.updateQueryData(
                'getDashboardItem',
                undefined,
                (draft) => {
                    const item = draft.find(item => item.id === id);
                    if (item) {
                        Object.assign(item, body);
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
    invalidatesTags: (result, error, { id }) => [
        { type: 'DashboardItems', id },
        { type: 'DashboardItems', id: 'LIST' }
    ]
}),

        // DELETE - Remove item (matches your Postman API)
        deleteDashboardItem: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: "webhook/delete-menu-item",
                method: "DELETE",
                body: { id }, // Send ID in body as shown in Postman
                headers: {
                    'Content-Type': 'application/json',
                }
            }),
            // Optimistic update
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    ItemApiSlice.util.updateQueryData(
                        'getDashboardItem',
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
            invalidatesTags: (result, error, id) => [
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