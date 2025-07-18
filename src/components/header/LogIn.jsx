import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/slice/userSlice";

const LogIn = () => {
    const userData = useSelector(state => state.userLogin)
    const { status, error } = userData

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [input, setInput] = useState({ email: "", password: "" });



    const inputHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setInput({ ...input, [name]: value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!input.email || !input.password) {
            alert("Please enter a valid email or password")
            return
        }

        dispatch(userLogin({ input }))
            .then((res) => {
                if (res?.payload?.message) {
                    navigate('/')
                }
                return
            })

    };

    return (
        <div className="flex justify-center items-center " style={{ height: '70vh' }}>
            <form onSubmit={(e) => handleSubmit(e)} className="login_form flex flex-col gap-3 w-4/6 lg:w-4/6 md:w-full">
                <span className="text-2xl text-gray font-bold text-center">Enter Login Details</span>
                {error && <span className="text-red-700 font-bold text-lg capitalize">{status}</span>}
                <div className="flex flex-col text-gray-400 text-lg">
                    <label htmlFor="email" className="text-md text-gray-800">Email Address</label>
                    <input
                        type="email"
                        className="rounded-lg bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                        name="email"
                        placeholder="Email"
                        autoComplete="off"
                        value={input.email}
                        onChange={inputHandler}
                    />
                </div>
                <div className="flex flex-col py-2 text-gray-400 text-lg">
                    <label htmlFor="password" className="text-md text-gray-800">Password</label>
                    <input
                        type="password"
                        className="rounded-lg bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                        placeholder="Password"
                        name="password"
                        autoComplete="off"
                        value={input.password}
                        onChange={inputHandler}
                    />
                </div>
                <button className="login_button cursor-pointer w-full bg-teal-500 shadow-lg shadow-teal-700/60 rounded-lg text-white font-semibold">Login</button>
                <div className="w-full">
                    <span className="font-bold">Don't have an account ?</span>
                    <NavLink to="/signup" className="text-blue-900 font-semibold"> Sign Up</NavLink>
                </div>
            </form>
        </div>
    )
}

export default LogIn
