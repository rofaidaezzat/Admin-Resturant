import { configureStore } from '@reduxjs/toolkit'
import { ItemApiSlice } from './services/crudItem'
import { StockApiSlice } from './services/crudStock'

export const store = configureStore({
    reducer: {
        [ItemApiSlice.reducerPath]: ItemApiSlice.reducer,
        [StockApiSlice.reducerPath]: StockApiSlice.reducer, // ← هنا التعديل
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(
            ItemApiSlice.middleware,
            StockApiSlice.middleware
        )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
