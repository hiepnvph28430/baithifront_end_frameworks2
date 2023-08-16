import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProduct } from '../interface/product'

const productApi = createApi({
    reducerPath: "products",
    tagTypes: ['Product'],
    baseQuery: fetchBaseQuery({
        baseUrl: " http://localhost:3000"
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<IProduct[], void>({
            query: () => `/products`,
            providesTags: ['Product']
        }),
        getProductById: builder.query<IProduct, number | string>({
            query: (id) => `/products/${id}`,
            providesTags: ['Product']
        }),
        addProduct: builder.mutation<IProduct, IProduct>({
            query: (product) => ({
                url: `/products`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        editProduct: builder.mutation<IProduct, IProduct>({
            query: (product) => ({
                url: `/products/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        removeProduct: builder.mutation<IProduct, number | string>({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",

            }),
            invalidatesTags: ['Product']
        })
    })
})

export const {
    useAddProductMutation, useEditProductMutation, useGetProductByIdQuery, useGetProductsQuery, useRemoveProductMutation
} = productApi

export const productReducer = productApi.reducer

export default productApi