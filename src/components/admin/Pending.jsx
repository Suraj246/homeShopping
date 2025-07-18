import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import "./admin.css"
import { allCustomerOrders, isDeliveredCustomerOrder, isPaidCustomerOrder } from '../../redux/slice/orderSlice'

const Pending = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // getting all customers orders
    const ordersData = useSelector(state => state.orderItems)
    const { allOrders, status, error } = ordersData

    // filtering out pending orders
    const pendingData = allOrders?.orders?.filter((item) => {
        return item.isPaid === false || item.isDelivered === false ? item : null
    })

    // getting all customers orders
    useEffect(() => {
        dispatch(allCustomerOrders())
    }, [dispatch])

    const userInfo = JSON.parse(localStorage.getItem('userLogIn')) || []
    useEffect(() => {
        if (!userInfo.adminAvailable) {
            navigate("/")
        }
    }, [userInfo.adminAvailable, navigate])


    const btnIsPaidHandel = (item) => {
        const order = { orderId: item._id, isPaid: true }
        dispatch(isPaidCustomerOrder(order))
    }

    const btnIsDeliveredHandel = (item) => {
        const order = { orderId: item._id, isDelivered: true }
        dispatch(isDeliveredCustomerOrder(order))
    }

    return (
        <div className="flex flex-col  w-full">
            <h3 className="text-4xl font-semibold text-gray-900">Pending Orders</h3>
            <div className="flex flex-col w-full">
                {pendingData?.length === 0 && <span>No orders found</span>}

                {status === "loading" ?
                    <div className="text-center max-w-full text-2xl capitalize font-semibold"><span>Loading...</span></div> : error ?
                        <div className="text-center max-w-full text-2xl capitalize font-semibold"><span>failed to get product details</span></div> :
                        <div className="scroll flex flex-col w-full">
                            <table className="table">
                                <tr className="tr">
                                    <th className="p-2">Customer Name</th>
                                    <th className="p-2">Products</th>
                                    <th className="p-2">Shipping Address</th>
                                    <th className="p-2">Phone</th>
                                    <th className="p-2">Total Amount</th>
                                    <th className="p-2">Paid</th>
                                    <th className="p-2">Delivered</th>
                                    <th className="p-2">Date</th>
                                </tr>
                                {
                                    pendingData?.map((item, idx) => {
                                        return (
                                            <tr key={idx} className='' >
                                                <td className="td">{item?.shippingAddress?.name}</td>
                                                <td className="td">{item?.orderItems?.map((elem, id) => {
                                                    return (
                                                        <div className="flex gap-4 " key={id}>
                                                            <span className="w-1/3">{elem?.name}</span>
                                                            <span>Quantity : {elem?.quantity}</span>
                                                            <span>Brand : {elem?.brand}</span>
                                                        </div>
                                                    )
                                                })}</td>
                                                <td className="td">{item?.shippingAddress?.address}</td>
                                                <td className="td">{item?.shippingAddress?.phone}</td>
                                                <td className="td">{item?.totalAmount}</td>
                                                <td className="td"><button onClick={() => btnIsPaidHandel(item)} style={{ backgroundColor: item?.isPaid === false ? "red" : "green" }} className="isPaid_btn cursor-pointer rounded-full text-white">{item?.isPaid === false ? "False" : "True"}</button></td>
                                                <td className="td"><button onClick={() => btnIsDeliveredHandel(item)} style={{ backgroundColor: item?.isDelivered === false ? "red" : "green" }} className="isPaid_btn cursor-pointer rounded-full text-white">{item?.isDelivered === false ? "False" : "True"}</button></td>
                                                <td className="td">{item?.createdAt.slice(0, 10)}</td>
                                            </tr>
                                        )
                                    })
                                }

                            </table>


                        </div>
                }
            </div>
        </div>
    )
}

export default Pending
