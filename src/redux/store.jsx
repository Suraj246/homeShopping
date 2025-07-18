import { configureStore } from '@reduxjs/toolkit'
import productSlice from './slice/productSlice'
import userSlice from './slice/userSlice'
import cartSlice from './slice/cartSlice'
import orderSlice from './slice/orderSlice'

const store = configureStore({
    reducer: {
        productLists: productSlice,
        userLogin: userSlice,
        cartItems: cartSlice,
        orderItems: orderSlice,
    },
})

export default store