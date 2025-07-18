import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndpoint } from "../../API_ENDPOINT";

const initialState = {
    status: 'loading',
    error: null,
    userLogIn: {},
    allUsers: [],
    customerDetails: {}
}

export const userLogin = createAsyncThunk("userLogIn/userLogin", async ({ input }) => {
    const { data } = await axios.post(`${apiEndpoint}/api/users/login`, input)
    localStorage.setItem("userLogIn", JSON.stringify(data))
    if (data?.userAvailable) {
        localStorage.setItem("userId", data?.userId)
        localStorage.setItem("token", data?.token)
    }
    return data
})

export const allUsersApi = createAsyncThunk("allUsers/allUserApi", async () => {
    const { data } = await axios.get(`${apiEndpoint}/api/users/all-users`)
    return data
})
export const customerDetailsApi = createAsyncThunk("customerDetails/customerDetailsApi", async (id) => {
    const { data } = await axios.get(`${apiEndpoint}/api/users/${id}`)
    return data
})

export const userSlice = createSlice({
    name: "userLogIn",
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.status = 'success'
                state.userLogIn = action.payload
                state.error = ''
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.status = 'something went wrong'
                state.userLogIn = {}
                state.error = action.error.message || 'something went wrong'
            })

            .addCase(allUsersApi.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(allUsersApi.fulfilled, (state, action) => {
                state.status = 'success'
                state.allUsers = action.payload
                state.error = ''
            })
            .addCase(allUsersApi.rejected, (state, action) => {
                state.status = 'something went wrong'
                state.allUsers = []
                state.error = action.error.message || 'something went wrong'
            })

            .addCase(customerDetailsApi.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(customerDetailsApi.fulfilled, (state, action) => {
                state.status = 'success'
                state.customerDetails = action.payload
                state.error = ''
            })
            .addCase(customerDetailsApi.rejected, (state, action) => {
                state.status = 'something went wrong'
                state.customerDetails = {}
                state.error = action.error.message || 'something went wrong'
            })

    }
})
export default userSlice.reducer