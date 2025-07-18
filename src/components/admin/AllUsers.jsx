import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { allUsersApi } from '../../redux/slice/userSlice'

const AllUsers = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // getting all users
    const ordersData = useSelector(state => state.userLogin)
    const { allUsers, status, error } = ordersData

    // getting all users
    useEffect(() => {
        dispatch(allUsersApi())
    }, [dispatch])

    const userInfo = JSON.parse(localStorage.getItem('userLogIn')) || []
    useEffect(() => {
        if (!userInfo.adminAvailable) {
            navigate("/")
        }
    }, [userInfo.adminAvailable, navigate])
    return (

        <div className="flex flex-col items-center w-full min-h-[70vh]">

            <h3 className="text-3xl font-semibold uppercase text-gray-900" style={{ marginBottom: "10px" }}>Users</h3>
            <div className="flex flex-col gap-4 w-full">
                {status === "loading" && <div className="text-center max-w-full text-2xl capitalize font-semibold"><span>Loading...</span></div>}
                {error && <div className="text-center max-w-full text-2xl capitalize font-semibold"><span>failed to get userData</span></div>}
                {allUsers?.length === 0 && "no orders"}
                <table className="table-auto bg-gray-100">
                    <thead>
                        <tr>
                            <th className="p-4">User Names</th>
                            <th>email</th>
                            <th>Total Orders</th>
                            {/* <th>Date</th> */}
                        </tr>
                    </thead>
                    <tbody >
                        {
                            allUsers?.map((item, idx) => {
                                return (
                                    <tr className="p-4" key={idx}>
                                        <td className="pl-6 pr-4 pb-4">
                                            <NavLink to={`/customer/${item._id}`}>
                                                {item?.name}
                                            </NavLink>
                                        </td>
                                        <td>{item?.email}</td>
                                        <td>{item?.orders?.length}</td>
                                        {/* <td>{item.createdAt.slice(0, 10)}</td> */}
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </table>
            </div>

        </div>
    )
}

export default AllUsers
