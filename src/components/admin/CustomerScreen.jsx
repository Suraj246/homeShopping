import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { customerDetailsApi } from '../../redux/slice/userSlice'

const CustomerScreen = () => {
    const params = useParams()
    const { id } = params
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // fetching customer details
    const customerDetail = useSelector(state => state.userLogin)
    const { status, error, customerDetails } = customerDetail

    useEffect(() => {
        dispatch(customerDetailsApi(id))
    }, [dispatch, id])

    const userInfo = JSON.parse(localStorage.getItem('userLogIn')) || []
    useEffect(() => {
        if (!userInfo.adminAvailable) {
            navigate("/")
        }
    }, [userInfo.adminAvailable, navigate])

    return (
        <div className="flex flex-col gap-5">
            <button className="back_navigation_button cursor-pointer bg-teal-500  rounded-lg text-white font-semibold w-fit"
                onClick={() => navigate(-1)}
            >
                Back
            </button>
            <h2 className="text-2xl" >Customer Details</h2>
            {status === "loading" ?
                <div className="text-center max-w-full text-2xl capitalize font-semibold"><span>Loading...</span></div> : error ?
                    <div className="text-center max-w-full text-2xl capitalize font-semibold"><span>failed to get product details</span></div> :
                    <>
                        <div className="flex flex-col gap-2" style={{ padding: "10px" }}>
                            <span className="text-md ">Name : {customerDetails?.name}</span>
                            <span className="text-md ">Email : {customerDetails?.email}</span>
                            <span className="text-md ">joined date : {customerDetails?.createdAt?.slice(0, 10)}</span>
                            <span className="text-md ">Total Orders : {customerDetails?.orders?.length}</span>
                        </div>
                        <h2 className="text-4xl">Order Details</h2>
                        {
                            customerDetails?.orders?.length === 0 ? <span className="text-lg font-semibold">No orders found</span> :
                                <div className="flex flex-col ">
                                    {customerDetails?.orders?.map((item, idx) => {
                                        return (
                                            <div key={idx} style={{ border: "1px solid", padding: "10px", margin: "10px" }}>
                                                <div className="flex gap-4">
                                                    <div className="flex gap-3 flex-col w-50">
                                                        <h2 className="text-xl">Products</h2>
                                                        {item?.orderItems?.map((elem, id) => {
                                                            return (
                                                                <div className="flex flex-col gap-1" key={id}>
                                                                    <span className="text-md">Name : {elem?.name}</span>
                                                                    <span className="text-md">brand : {elem?.brand}</span>
                                                                    <span className="text-md">product price : {elem?.price}</span>
                                                                    <span className="text-md">product quantity : {elem?.quantity}</span>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                    <div className="flex gap-4 justify-between w-full" >
                                                        <div className="flex flex-col gap-1">
                                                            <h2 className="text-xl">Shipping Address</h2>
                                                            <span className="text-md">Name : {item?.shippingAddress?.name}</span>
                                                            <span className="text-md">Contact : {item?.shippingAddress?.phone}</span>
                                                            <span className="text-md">Address : {item?.shippingAddress?.address}</span>
                                                        </div>

                                                        <div className="flex flex-col gap-1">
                                                            <span className="text-md">Payment Mode : {item?.payment}</span>
                                                            <span className="text-md">Delivered : {item?.isDelivered === false ? "False" : "True"}</span>
                                                            <span className="text-md">Total Amount : {item?.totalAmount}</span>
                                                            <span className="text-md">Paid : {item?.isPaid === false ? "False" : "True"}</span>
                                                            <span className="text-md">Date : {item?.createdAt.slice(0, 10)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    })}

                                </div>
                        }
                    </>
            }
        </div>
    )
}

export default CustomerScreen
