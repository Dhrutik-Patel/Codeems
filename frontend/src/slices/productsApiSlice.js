import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // 1. Add a `getProducts` endpoint here.
        getProducts: builder.query({
            query: () => ({ url: PRODUCTS_URL }),
            // providesTags: ['Product'],
            keepUnusedDataFor: 5, // 5 seconds
        }),

        // 2. Add a `getProductById` endpoint here.
        getProductById: builder.query({
            query: (id) => ({ url: `${PRODUCTS_URL}/${id}` }),
            // providesTags: ['Product'],
            keepUnusedDataFor: 5, // 5 seconds
        }),
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApiSlice;
