import { useState } from 'react'
import CheckOutSteps from './CheckOutSteps'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePayment } from '../../redux/slice/cartSlice'

const Payment = () => {
    const dispatch = useDispatch()
    const [paymentMethod, setPaymentMethod] = useState("cash on delivery")
    const navigate = useNavigate()

    const submitPayment = (e) => {
        e.preventDefault()
        dispatch(savePayment(paymentMethod))
        navigate("/order-summary")
    }
    return (
        <div>
            <CheckOutSteps step1 step2 />
            <div className="flex flex-col w-full items-center h-100" style={{ padding: "10px" }}>
                <form className="flex flex-col w-2/4 xl:w-full" onSubmit={submitPayment}>
                    {/* <div className="flex items-center gap-3">
                        <input
                            type="radio"
                            value="PayPal"
                            name="paymentMethod"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className='cursor-pointer'
                        />
                        <label className="text-gray-800" htmlFor="PayPal">PayPal</label>
                    </div> */}
                    <div className="flex items-center gap-3">
                        <input
                            type="radio"
                            value="cash on delivery"
                            name="paymentMethod"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className='cursor-pointer'

                        />
                        <label className="text-gray-800" htmlFor="cash on delivery">Cash On Delivery</label>
                    </div>
                    <button className="shippingAddressButton cursor-pointer  w-full bg-orange-500 shadow-lg  rounded-lg text-white font-semibold"

                    >Continue</button>
                </form>
            </div>
        </div>
    )
}

export default Payment
