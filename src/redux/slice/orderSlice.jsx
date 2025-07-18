import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndpoint } from "../../API_ENDPOINT";

const initialState = {
    status: 'loading',
    error: null,
    orderItems: [],
    currentUserOrders: [],
    allOrders: [],
}

export const createNewOrder = createAsyncThunk("orderItems/createNewOrder", async (order) => {
    const { data } = await axios.post(`${apiEndpoint}/api/order/order`, order)
    return data
})

export const saveUserOrder = createAsyncThunk("orderItems/saveUserOrder", async (userId, orderId) => {
    const { data } = await axios.post(`${apiEndpoint}/api/order/get-order`, { userId: userId, orderId: orderId })
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('saveCart')
    localStorage.removeItem('payment')
    return data
})

export const currentUserOrdersApi = createAsyncThunk("currentUserOrders/currentUserOrdersApi", async (userId) => {
    const { data } = await axios.post(`${apiEndpoint}/api/order/get-user-orders`, { userId: userId })
    return data
})

export const allCustomerOrders = createAsyncThunk("allOrders/allCustomerOrders", async () => {
    const { data } = await axios.get(`${apiEndpoint}/api/order/all-orders`)
    return data
})

export const isPaidCustomerOrder = createAsyncThunk("allOrders/isPaidCustomerOrder", async (order) => {
    const { data } = await axios.post(`${apiEndpoint}/api/order/update-order/isPaid`, order)
    return data
})

export const isDeliveredCustomerOrder = createAsyncThunk("allOrders/isDeliveredCustomerOrder", async (order) => {
    const { data } = await axios.post(`${apiEndpoint}/api/order/update-order/isDelivered`, order)
    return data
})


export const orderSlice = createSlice({
    name: "orderItems",
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(createNewOrder.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createNewOrder.fulfilled, (state, action) => {
                state.status = 'success'
                state.orderItems = action.payload
                state.error = ''
            })
            .addCase(createNewOrder.rejected, (state, action) => {
                state.status = 'something went wrong'
                state.orderItems = []
                state.error = action.error.message || 'something went wrong'
            })

            .addCase(currentUserOrdersApi.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(currentUserOrdersApi.fulfilled, (state, action) => {
                state.status = 'success'
                state.currentUserOrders = action.payload
                state.error = ''
            })
            .addCase(currentUserOrdersApi.rejected, (state, action) => {
                state.status = 'something went wrong'
                state.currentUserOrders = []
                state.error = action.error.message || 'something went wrong'
            })

            .addCase(allCustomerOrders.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(allCustomerOrders.fulfilled, (state, action) => {
                state.status = 'success'
                state.allOrders = action.payload
                state.error = ''
            })
            .addCase(allCustomerOrders.rejected, (state, action) => {
                state.status = 'something went wrong'
                state.allOrders = []
                state.error = action.error.message || 'something went wrong'
            })

            .addCase(isPaidCustomerOrder.fulfilled, (state, action) => {
                state.status = 'success'
                state.allOrders = action.payload
                state.error = ''
            })
            .addCase(isDeliveredCustomerOrder.fulfilled, (state, action) => {
                state.status = 'success'
                state.allOrders = action.payload
                state.error = ''
            })
    }
})

export default orderSlice.reducer