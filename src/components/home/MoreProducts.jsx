import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from "react-router-dom";
import Ratings from './Ratings';
import { apiEndpoint } from '../../API_ENDPOINT';
import { productLists } from '../../redux/slice/productSlice';

const MoreProducts = ({ input }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productLists)
    const { productsData, status, error } = productList

    useEffect(() => {
        dispatch(productLists())
    }, [dispatch])
    const name = location.search ? location.search.split("=")[1] : "fruits"
    const product = productsData?.filter((item) => item.category === name ? item : null)


    return (
        <div className="more_product_container">
            <button
                className="back_navigation_button bg-teal-500  rounded-lg text-white font-semibold"
                onClick={() => navigate(-1)}
            >
                Back
            </button>
            {status === "loading" ? (
                <div className="text-center max-w-full text-2xl capitalize font-semibold">
                    <span>Loading...</span>
                </div>
            ) : error ? (
                <div className="text-center max-w-full text-2xl capitalize font-semibold">
                    <span>{error}</span>
                </div>
            ) : (
                <div className="all-product-info">
                    {product
                        ?.filter((elem) => {
                            if (input === elem) {
                                return elem;
                            } else if (elem.name.toLowerCase().includes(input)) {
                                return elem;
                            } else {
                                return false;
                            }
                        })
                        .map((item, idx) => {
                            return (
                                <div className="product-info" key={idx}>
                                    <NavLink to={`/product/${item?._id}`} className="navlink">
                                        <div className="product-img-container">
                                            {item?.img?.includes("jpeg") ||
                                                item?.img?.includes("jpg") ? (
                                                <img
                                                    src={item?.img}
                                                    loading="lazy"
                                                    className="img-product"
                                                    alt={item?.name}
                                                />
                                            ) : (
                                                <img
                                                    variant="top"
                                                    src={`${apiEndpoint}/uploads/${item?.img}`}
                                                    loading="lazy"
                                                    className="img-product"
                                                    alt={item?.name}
                                                />
                                            )}
                                        </div>
                                        <div className="flex flex-col p-2">
                                            <span className="text-sm capitalize font-semibold">
                                                {item?.name}
                                            </span>
                                            <span className="text-sm capitalize font-semibold">
                                                Rs. {item?.price}
                                            </span>

                                            <div>
                                                <span className="flex items-center">
                                                    <Ratings ratings={item?.ratings} />
                                                    {item?.ratings}
                                                </span>
                                            </div>
                                        </div>
                                    </NavLink>
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
}

export default MoreProducts
