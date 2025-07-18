import { useEffect, useState } from 'react'
import Pending from './Pending'
import Successful from './Successful'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { allCustomerOrders } from '../../redux/slice/orderSlice'
const CustomerOrders = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const ordersData = useSelector(state => state.orderItems)
    const { allOrders } = ordersData

    const pendingData = allOrders?.orders?.filter((item) => {
        return item.isPaid === false || item.isDelivered === false ? item : null
    })

    const completedData = allOrders?.orders?.filter((item) => {
        return item.isPaid && item.isDelivered
    })

    useEffect(() => {
        dispatch(allCustomerOrders())
    }, [dispatch])




    const userInfo = JSON.parse(localStorage.getItem('userLogIn')) || []
    useEffect(() => {
        if (!userInfo.adminAvailable) {
            navigate("/")
        }
    }, [userInfo.adminAvailable, navigate])

    const [comp, setComp] = useState("pending")

    return (
        <div className="p-5 flex flex-col gap-5">
            <div className="flex gap-5">
                <button
                    onClick={() => setComp("pending")}
                    className="bg-red-400 text-white p-3 text-center text-2xl uppercase font-bold rounded flex flex-col items-center justify-center">
                    <span>
                        pending
                    </span>
                    <span>{pendingData?.length}</span>
                </button>
                <button
                    onClick={() => setComp("successful")}
                    className="bg-green-400 text-white p-3 text-center text-2xl uppercase font-bold rounded flex flex-col items-center justify-center">
                    <span>
                        completed
                    </span>
                    <span>{completedData?.length}</span>
                </button>
            </div>
            <div>
                {comp === "pending" && <Pending />}
                {comp === "successful" && <Successful />}
            </div>
        </div>
    )
}

export default CustomerOrders
