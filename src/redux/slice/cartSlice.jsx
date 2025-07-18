import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndpoint } from "../../API_ENDPOINT";

const initialState = {
    status: 'loading',
    error: null,
    cartItems: []
}

// export const userLogin = createAsyncThunk("cart/userLogin", async ({ productData }) => {
//     const { data } = await axios.post(`${apiEndpoint}/product`, productData)
//     return data
// })

export const addToCart = createAsyncThunk("cartItems/addToCart", async (productData) => {
    const { data } = await axios.post(`${apiEndpoint}/product`, productData)
    return data
})

export const cartItemLists = createAsyncThunk("cartItems/cartItemLists", async (userId) => {
    const { data } = await axios.post(`${apiEndpoint}/get-products`, userId)
    return data
})

export const removeCartItem = createAsyncThunk("cartItems/removeCartItem", async ({ id, idx }) => {
    const { data } = await axios.delete(`${apiEndpoint}/${id}/${idx}`)
    return data
})

export const cartSlice = createSlice({
    name: "cartItems",
    initialState,
    reducers: {
        saveShippingAddress: (state, action) => {
            localStorage.setItem('shippingAddress', JSON.stringify(action.payload))
        },

        savePayment: (state, action) => {
            localStorage.setItem('payment', action.payload)
        },
        increaseQuantity: (state, action) => {
            state.cartItems = action.payload
        },
        decreaseQuantity: (state, action) => {
            state.cartItems = action.payload
        }

    },

    extraReducers: (builder) => {
        builder
            .addCase(cartItemLists.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(cartItemLists.fulfilled, (state, action) => {
                state.status = 'success'
                state.cartItems = action.payload.data.cart
                state.error = ''
            })
            .addCase(cartItemLists.rejected, (state, action) => {
                state.status = 'something went wrong'
                state.cartItems = []
                state.error = action.error.message || 'something went wrong'
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.status = 'success'
                state.cartItems = action.payload.data.cart

                state.error = ''
            })
    }
})

export const { saveShippingAddress, savePayment, increaseQuantity, decreaseQuantity } = cartSlice.actions
export default cartSlice.reducer