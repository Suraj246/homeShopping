import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios'
import "./header.css";
import { useDispatch, useSelector } from "react-redux";

import { apiEndpoint } from "../../API_ENDPOINT";
import { allCustomerOrders } from "../../redux/slice/orderSlice";

const Header = ({ input, setInput }) => {
  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem('userLogIn')) || {}

  const [dropdown, setDropdown] = useState(true)

  const dispatch = useDispatch()
  const ordersData = useSelector(state => state.orderItems)
  const { allOrders } = ordersData

  const pendingData = allOrders?.orders?.filter((item) => {
    return item.isPaid === false || item.isDelivered === false ? item : null
  })
  useEffect(() => {
    dispatch(allCustomerOrders())
  }, [dispatch])

  const [userCartData, setUserCartData] = useState([])
  const sendId = () => {
    const data = { userId: localStorage.getItem('userId') }
    axios.post(`${apiEndpoint}/get-products`, data)
      .then((response) => {
        setUserCartData(response.data.data.cart)
      })
      .catch((error) => { return ("user Product error", error) })
  }
  useEffect(() => {
    sendId()
  }, [userCartData])

  return (
    <header className="flex justify-around items-center shadow-md">
      <NavLink to="/" className="text-black text-2xl font-semibold ">
        Home Shopping
      </NavLink>

      <div className="flex gap-8 items-center w-2/6 justify-between">
        <div className="w-full">
          <label className="relative block ">
            <input
              className="product_search_input placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md   shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search for product..."
              type="text"
              name="search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="off"
            />
          </label>
        </div>

        {/* <NavLink className="text-black" to="/categary">
          Categary
        </NavLink> */}
      </div>
      <div className="flex gap-3 items-center">
        {userInfo?.userAvailable && (
          <NavLink className="flex" to="/cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                clipRule="evenodd"
              />
            </svg>
            <sub className="text-black font-bold">{userCartData?.length}</sub>
          </NavLink>
        )}
        {userInfo?.adminAvailable && (
          <NavLink className="flex" to="/customer-orders">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
              />
            </svg>

            <sub className="text-red-800">{pendingData?.length}</sub>
          </NavLink>
        )}
        <div className="flex gap-3 items-center">
          {userInfo?.userAvailable || userInfo.adminAvailable ? (
            <div
              className="relative inline-block text-left"
              onClick={() => setDropdown(!dropdown)}
            >
              <div>
                <button
                  className="user_profile_click cursor-pointer inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white text-sm font-semibold text-gray-900 shadow-md  hover:bg-gray-50"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  {userInfo?.userAvailable?.name ||
                    userInfo?.adminAvailable?.type}
                  <svg
                    className="-mr-1 h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {dropdown ? null : (
                <div
                  className="absolute right-0 z-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg  ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                >
                  {userInfo?.userAvailable ? (
                    <div role="none">
                      <NavLink
                        to="/orders"
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-0"
                      >
                        Orders
                      </NavLink>
                    </div>
                  ) : (
                    <div role="none">
                      <NavLink
                        to="/create-product"
                        className="user_profile_navLink text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-0"
                      >
                        Create Product
                      </NavLink>
                      <NavLink
                        to="/users"
                        className="user_profile_navLink text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-0"
                      >
                        All Users
                      </NavLink>
                    </div>
                  )}

                  <div role="none">
                    <NavLink
                      to="#"
                      className="user_profile_navLink text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-6"
                      onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                        navigate("/");
                      }}
                    >
                      Logout
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login" className="text-black font-semibold">
              Log In
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
