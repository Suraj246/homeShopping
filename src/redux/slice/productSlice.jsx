import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndpoint } from "../../API_ENDPOINT";

const initialState = {
    status: 'loading',
    error: null,
    productsData: [],
    updateProductDetails: {},
    singleProductData: {}

}

export const productLists = createAsyncThunk("productsData/productLists", async () => {
    const { data } = await axios.get(`${apiEndpoint}`)
    return data
})

export const singleProductDetails = createAsyncThunk("productsData/singleProductDetails", async (id) => {
    const { data } = await axios.get(`${apiEndpoint}/${id}`)
    return data
})

export const createProduct = createAsyncThunk("productsData/createProduct", async ({ formData }) => {
    const { data } = await axios.post(`${apiEndpoint}/api/product/create-product`, formData)
    return data
})

export const updateSelectedProduct = createAsyncThunk("productsData/updateSelectedProduct", async ({ id, input }) => {
    const { data } = await axios.put(`${apiEndpoint}/api/product/update-product/${id}`, input)
    return data
})

export const deleteProduct = createAsyncThunk("productsData/deleteProduct", async (id) => {
    const { data } = await axios.delete(`${apiEndpoint}/api/product/delete-product/${id}`)
    return data
})

export const productSlice = createSlice({
    name: "productsData",
    initialState,
    reducers: {
        updateProductDetails: (state, action) => {
            state.updateProductDetails = action.payload
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(productLists.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(productLists.fulfilled, (state, action) => {
                state.status = 'success'
                state.productsData = action.payload
                state.error = ''
            })
            .addCase(productLists.rejected, (state, action) => {
                state.status = 'failed'
                state.productsData = []
                state.error = action.error.message || 'something went wrong'
            })

            .addCase(singleProductDetails.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(singleProductDetails.fulfilled, (state, action) => {
                state.status = 'success'
                state.singleProductData = action.payload
                state.error = ''
            })
            .addCase(singleProductDetails.rejected, (state, action) => {
                state.status = 'failed'
                state.singleProductData = {}
                state.error = action.error.message || 'something went wrong'
            })

            .addCase(deleteProduct.fulfilled, (state, action) => {
                const { products } = action.payload
                state.status = 'success'
                state.productsData = products
                state.error = ''
            })

    }
})

export const { updateProductDetails } = productSlice.actions
export default productSlice.reducer