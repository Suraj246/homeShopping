import React, { useState } from 'react'
import CheckOutSteps from './CheckOutSteps'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../../redux/slice/cartSlice'

const ShippingAddress = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userInfo = JSON.parse(localStorage.getItem('user')) || []
    const userAddress = JSON.parse(localStorage.getItem('shippingAddress')) || []

    const [input, setInput] = useState({
        name: userAddress?.name ? userAddress?.name : userInfo?.userAvailable?.name,
        phone: "", address: ""
    })
    const inputHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setInput({ ...input, [name]: value })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        if (!input.address || !input.phone || !input.name) {
            alert("empty field")
            return
        }
        navigate("/payment")
        dispatch(saveShippingAddress(input))

    }
    return (
        <div>
            <CheckOutSteps step1 />
            <div className="flex p-5 flex-col w-full items-center">
                <form
                    className="shippingAddressForm flex flex-col gap-3 w-2/4 xl:w-full"
                    onSubmit={submitHandler}
                >
                    <div className="flex flex-col text-gray-400 text-lg">
                        <label className="text-gray-800" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            className="shippingAddressInput rounded-lg bg-orange-100 focus:border-blue-500 focus:bg-orange-200 focus:outline-none text-gray-800 text-lg"
                            name="name"
                            placeholder="enter your name"
                            autoComplete="off"
                            value={input.name}
                            onChange={inputHandler}
                        />
                    </div>

                    <div className="flex flex-col py-1 text-gray-400 text-lg">
                        <label className="text-gray-800" htmlFor="email">
                            Contact
                        </label>
                        <input
                            type="number"
                            className="shippingAddressInput rounded-lg bg-orange-100 focus:border-blue-500 focus:bg-orange-200 focus:outline-none text-gray-800 text-lg"
                            name="phone"
                            placeholder="Enter Phone Number"
                            autoComplete="off"
                            value={input.phone}
                            onChange={inputHandler}
                        />
                    </div>

                    <div className="flex flex-col py-1 text-gray-400 text-lg">
                        <label className="text-gray-800" htmlFor="address">
                            Delivery Address
                        </label>
                        <input
                            type="text"
                            className="shippingAddressInput rounded-lg bg-orange-100 focus:border-blue-500 focus:bg-orange-200 focus:outline-none text-gray-800 text-lg"
                            placeholder="Enter Your Delivery Address"
                            name="address"
                            autoComplete="off"
                            value={input.address}
                            onChange={inputHandler}
                        />
                    </div>

                    <button className="shippingAddressButton cursor-pointer flex items-center justify-center gap-2 w-full bg-orange-500 shadow-lg  rounded-lg text-white font-semibold">
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ShippingAddress
