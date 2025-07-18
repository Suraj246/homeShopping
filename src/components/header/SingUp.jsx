import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios'
import { apiEndpoint } from "../../API_ENDPOINT";
import "./header.css";


const SingUp = () => {
    const navigate = useNavigate()

    const [input, setInput] = useState({ name: "", email: "", password: "" });
    const inputHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setInput({ ...input, [name]: value })
    }
    const handleSubmit = async (event) => {
        const { name, email, password } = input;
        event.preventDefault();
        if (!input.email || !input.password || !input.name) {
            alert("Please enter a valid name, email or password")
            return
        }
        try {
            await axios.post(
                `${apiEndpoint}/api/users/signup`,
                { name, email, password }
                // { withCredentials: true }
            )
                .then((res) => {
                    // console.log(res)
                    if (res.status === 201) {
                        navigate("/login")
                    }
                })
        } catch (err) {
            if (err.response.status === 409) {
                alert("user already in use")
            }
            return err
        }

    };
    return (
        <div className="flex justify-center items-center " style={{ height: '70vh' }}>
            <form onSubmit={(e) => handleSubmit(e)} className="login_form  flex flex-col gap-3 w-4/6 lg:w-4/6 md:w-full">
                <span className="text-3xl text-gray font-bold text-center">Create Your Account</span>
                {/* {error && <span className="text-red-700 font-bold text-lg capitalize">{error}</span>} */}
                <div className="flex flex-col  text-gray-400 text-lg">
                    <label className="text-gray-800" htmlFor="name">Enter Name</label>
                    <input
                        type="text"
                        className="rounded-lg bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                        name="name"
                        placeholder="enter your name"
                        autoComplete="off"
                        value={input.name}
                        onChange={inputHandler}
                    />
                </div>

                <div className="flex flex-col  text-gray-400 text-lg">
                    <label className="text-gray-800" htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        className="rounded-lg bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                        name="email"
                        placeholder="enter your email"
                        autoComplete="off"
                        value={input.email}
                        onChange={inputHandler}
                    />
                </div>

                <div className="flex flex-col  text-gray-400 text-lg">
                    <label className="text-gray-800" htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="rounded-lg bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                        placeholder="enter your Password"
                        name="password"
                        autoComplete="off"
                        value={input.password}
                        onChange={inputHandler}
                    />
                </div>

                <button className="login_button cursor-pointer w-full  bg-teal-500 shadow-lg  rounded-lg text-white font-semibold">Sing Up</button>
                <div className="w-full">
                    <span className="font-bold">Already have an account ?</span>
                    <NavLink to="/login" className="text-blue-900 font-semibold"> Log In</NavLink>
                </div>
            </form>


        </div>
    )
}

export default SingUp
