import { apiSlice } from './apiSlice';
import { ORDERS_URL, PAYPAL_URL } from '../constants';

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // 1. Add an endpoint for adding an order.
        addOrderItems: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: order,
            }),
        }),
        getOrderById: builder.query({
            query: (id) => `${ORDERS_URL}/${id}`,
            keepUnusedDataFor: 5,
        }),
        // getMyOrders: builder.query({
        //     query: () => `${ORDERS_URL}/myorders`,
        // }),
        // getOrders: builder.query({
        //     query: () => `${ORDERS_URL}`,
        // }),
        // updateOrderToDelivered: builder.mutation({
        //     query: (id) => ({
        //         url: `${ORDERS_URL}/${id}/deliver`,
        //         method: 'PUT',
        //     }),
        // }),
        updateOrderToPaid: builder.mutation({
            query: ({ orderID, details }) => ({
                url: `${ORDERS_URL}/${orderID}/pay`,
                method: 'PUT',
                body: { ...details },
            }),
        }),

        getPaypalClientId: builder.query({
            query: () => PAYPAL_URL,
            keepUnusedDataFor: 5,
        }),
    }),
});

export const {
    useAddOrderItemsMutation,
    useGetOrderByIdQuery,
    // useGetMyOrdersQuery,
    // useGetOrdersQuery,
    // useUpdateOrderToDeliveredMutation,
    useUpdateOrderToPaidMutation,
    useGetPaypalClientIdQuery,
} = orderApiSlice;
