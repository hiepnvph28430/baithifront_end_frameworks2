import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import productApi from '../api/product'


export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(productApi.middleware)
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch