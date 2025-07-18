import "./shipping.css"
import { useNavigate } from 'react-router-dom'
const CheckOutSteps = (props) => {
    const navigate = useNavigate()
    const userAddress = JSON.parse(localStorage.getItem('shippingAddress')) || []

    return (
        <div className="flex justify-center items-center checkout-steps">
            <div onClick={() => userAddress ? navigate('/shipping') : ''} className={props.step1 ? 'active' : ''} style={{ width: '100%', height: '100%', textAlign: "center", cursor: "pointer" }}>Shipping Address</div>
            <div onClick={() => navigate('/payment')} className={props.step2 ? 'active' : ''} style={{ width: '100%', height: '100%', textAlign: "center", cursor: "pointer" }}>Payment</div>
            <div onClick={() => navigate('/order-summary')} className={props.step3 ? 'active' : ''} style={{ width: '100%', height: '100%', textAlign: "center", cursor: "pointer" }}>Order Summary</div>
        </div>
    )
}

export default CheckOutSteps
