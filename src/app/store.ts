import { configureStore } from '@reduxjs/toolkit'
import { ItemApiSlice } from './services/crudItem'

export const store = configureStore({
    reducer: {
        [ItemApiSlice.reducerPath]:ItemApiSlice.reducer,
       

    }, 
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        })
        .concat(
            ItemApiSlice.middleware,
           
        )
})

 
    export type RootState = ReturnType<typeof store.getState>
    export type AppDispatch = typeof store.dispatch
