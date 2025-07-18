import React, { useEffect } from 'react'
import CheckOutSteps from './CheckOutSteps'
import { useDispatch, useSelector } from 'react-redux'
// import { userCartOrder, userSaveOrder } from '../../redux/actions/orderAction'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { apiEndpoint } from '../../API_ENDPOINT'
import { createNewOrder, saveUserOrder } from '../../redux/slice/orderSlice'

const OrderSummary = () => {
    const userAddress = JSON.parse(localStorage.getItem('shippingAddress')) || []
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const [sent, setSent] = useState(false)

    const orderData = useSelector(state => state.orderItems)
    const { order, status, error } = orderData

    // console.log(orderData)

    const payment = localStorage.getItem('payment') || []
    const cart = JSON.parse(localStorage.getItem('saveCart')) || []
    const delivery_charges = 60
    const tax = 100
    const totalAmount = cart?.totalPrice + delivery_charges + tax

    // const orderId = order?.saveOrder?._id
    const userId = localStorage.getItem('userId')

    // useEffect(() => {

    //     setTimeout(() => {
    //         if (sent === true) {
    //             dispatch(userSaveOrder(userId, orderId))
    //             axios.delete(`${apiEndpoint}/${userId}`)
    //             setTimeout(() => {
    //                 // navigate('/')
    //                 navigate(`/orders/?orders=${userId}`)


    //             }, 1000)
    //         }
    //     }, 2000)

    // }, [dispatch, userId, orderId, sent, navigate])

    const orderHandler = async () => {
        // setSent(true)
        const userOrder = {
            userAddress: userAddress,
            cart: cart.cartItems,
            payment: payment,
            totalAmount: totalAmount
        }
        await dispatch(createNewOrder(userOrder))
            .then((res) => {
                if (res?.payload?.saveOrder) {
                    dispatch(saveUserOrder({ userId, orderId: res?.payload?.saveOrder?._id }))
                    axios.delete(`${apiEndpoint}/${userId}`)
                    setTimeout(() => {
                        navigate(`/orders/?orders=${userId}`)
                    }, 1000)
                }
            })
    }

    const userInfo = JSON.parse(localStorage.getItem('userLogIn')) || []
    useEffect(() => {
        if (!userInfo.userAvailable) {
            navigate("/")
        }
    }, [userInfo.userAvailable, navigate])

    return (
        <div>
            <CheckOutSteps step1 step2 step3 />

            <div className="flex gap-3 justify-center w-full flex-wrap" style={{ padding: "10px" }}>
                <div className="flex flex-col gap-3 items-start justify-start w-full">
                    <div className="flex flex-col gap-3 items-start justify-start">
                        <h3 className="text-md font-bold capitalize">shipping address</h3>
                        <span className="font-semibold text-sm capitalize">receiver name : {userAddress?.name}</span>
                        <span className="font-semibold text-sm capitalize">receiver phone : {userAddress?.phone}</span>
                        <span className="font-semibold text-sm capitalize">address : {userAddress?.address}</span>
                    </div>

                    <div className="flex flex-col gap-3 items-start">
                        <h3 className="text-md font-bold capitalize">Payment Mode</h3>
                        <span className="capitalize">{payment}</span>

                    </div>

                    <div className="flex flex-col gap-3 items-start justify-start  w-full">
                        <h3 className="text-md font-bold capitalize">cart product</h3>
                        {
                            cart?.cartItems?.map((item, idx) => {
                                return (
                                    <div
                                        className="flex gap-4 items-center justify-around w-full shadow-md "
                                        style={{ padding: "10px" }}
                                        key={idx}
                                    >
                                        {/* <img src={item?.img} alt={item?.name} className="w-20 h-20" loading="lazy" /> */}

                                        {item?.img?.includes("jpeg") ||
                                            item?.img?.includes("jpg") ? (
                                            <img
                                                src={item?.img}
                                                alt={item?.name}
                                                className="w-20 h-20"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <img
                                                src={`${apiEndpoint}/uploads/${item?.img}`}
                                                className="w-20 h-20"
                                                loading="lazy"
                                                alt={item?.name}
                                            />
                                        )}
                                        {/* <img src={item?.data?.img} alt={item?.data?.name} className="header-img" /> */}
                                        <div className="flex w-full gap-3 items-center justify-around" >
                                            <div className="flex gap-2 items-center text-md font-semibold w-2/6 xl:w-fit xl:flex-wrap xl:justify-center">
                                                <span className="text-gray-800">
                                                    {item?.name}
                                                </span>
                                            </div>
                                            <span className="text-gray-800 font-semibold">
                                                quantity : {item?.quantity}
                                            </span>
                                            <span className="font-semibold">
                                                Rs.{item?.price}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-3 w-2/4 md:w-full'>
                    <h3 className="text-md font-bold capitalize ">payment summary</h3>
                    <span className="text-md font-semibold capitalize ">delivery charges : {delivery_charges} Rs</span>
                    <span className="text-md font-semibold capitalize ">tax : {tax} Rs</span>
                    <span className="text-md font-semibold capitalize ">product total : {cart?.totalPrice} Rs</span>
                    <span className="text-md font-semibold capitalize ">Total Pay: {totalAmount} Rs</span>
                    {
                        status === "   loading" ?
                            <button className="w-full my-1 py-2 bg-orange-500 shadow-lg  rounded-lg text-white font-semibold"
                                onClick={orderHandler}
                            >loading...</button>
                            :
                            <button className="shippingAddressButton cursor-pointer w-full bg-orange-500 shadow-lg  rounded-lg text-white font-semibold"
                                onClick={orderHandler}
                            >Continue</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default OrderSummary
