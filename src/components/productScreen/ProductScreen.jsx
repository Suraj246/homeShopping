import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Ratings from "../home/Ratings";
import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../redux/actions/cartAction";
import { apiEndpoint } from "../../API_ENDPOINT";
import { singleProductDetails } from "../../redux/slice/productSlice";
import { addToCart, cartItemLists } from "../../redux/slice/cartSlice";
import "./product_screen.css";
const ProductScreen = () => {
    const navigate = useNavigate()
    const params = useParams();
    const { id } = params;

    const dispatch = useDispatch()
    const productDetail = useSelector(state => state.productLists)
    const { status, error, singleProductData } = productDetail

    useEffect(() => {
        dispatch(singleProductDetails(id))
    }, [dispatch, id])

    const addToCartHandler = async (id) => {
        const productId = id
        const userId = localStorage.getItem('userId')

        const productData = { productId, userId }

        dispatch(addToCart(productData))
            .then(() => {
                dispatch(cartItemLists(userId))
                navigate(`/cart/?productId=${productId}`)
            })
    }

    const a = () => {
        if (!localStorage.getItem('token')) {
            alert('Please login')
            navigate('/login')
        }
    }

    return (
        <div className="product_screen_container">
            <button
                className="product_screen_navigation_button bg-teal-500  rounded-lg text-white font-semibold cursor-pointer"
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
                    <span>failed to get product details</span>
                </div>
            ) : (
                <div className="product_screen_details flex justify-center shadow-xl shadow-black/20 dark:shadow-black/20 capitalize bg-slate-200 rounded-lg  lg:flex-wrap">
                    <div className="w-1/2">
                        {singleProductData?.img?.includes("jpeg") ||
                            singleProductData?.img?.includes("jpg") ? (
                            <img
                                src={singleProductData?.img}
                                className="img-product object-cover rounded-lg"
                                loading="lazy"
                                alt={singleProductData?.name}
                            />
                        ) : (
                            <img
                                src={`${apiEndpoint}/uploads/${singleProductData?.img}`}
                                className="img-product object-cover"
                                loading="lazy"
                                alt={singleProductData?.name}
                            />
                        )}
                    </div>
                    <div className="grid  w-full">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <span className="text-md">{singleProductData?.name}</span>
                                <span>
                                    {singleProductData?.inStock > 1 ? (
                                        <span className="in_stock_text inline-block whitespace-nowrap rounded-[0.27rem] bg-blue-800  text-center  text-lg font-semibold leading-none text-white">
                                            Available
                                        </span>
                                    ) : (
                                        <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-red-800  text-center  text-lg font-semibold leading-none text-white">
                                            Not Available
                                        </span>
                                    )}
                                </span>
                            </div>
                            <span className="rating-span flex items-center text-sm">
                                <Ratings ratings={singleProductData?.ratings} />
                                {singleProductData?.ratings}
                            </span>
                            <div>
                                <strong className=" text-md ">Brand : </strong>
                                <span className="text-sm">{singleProductData?.brand}</span>
                            </div>
                            <div>
                                <strong className=" text-md ">Price : </strong>Rs.
                                <span className="text-sm"> {singleProductData?.price}</span>
                            </div>
                            {/* <div>
                                        <strong className=" text-lg">quantity</strong>
                                        <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                                            {
                                                [...Array(product?.inStock).keys()].map((x) => <option kay={x + 1} value={x + 1}>{x + 1}</option>)

                                            }
                                        </select>
                                    </div> */}
                            {/* <div className="flex items-center">
                                        <span><strong className=""> Select Size : </strong></span>
                                        <select name="options" id="options" className="text-center"
                                        // onChange={(e) => setSelected(e.target.value)}
                                        >
                                            {product?.size.map((curSize, idx) => {
                                                return (
                                                    <option value={curSize} key={idx}>{curSize}</option>
                                                )
                                            })}
                                        </select>
                                    </div> */}
                            {/* <div className="product-color-container">
                                        Select Color :
                                        {product?.colors.map((c, idx) => {
                                            return (
                                                <button key={idx}
                                                    // onClick={() => setColor(c)}
                                                    // className={color === c ? "color-btn btn-selected" : "color-btn"}
                                                    style={{ backgroundColor: c }}
                                                >{c}</button>
                                            )
                                        })}
                                    </div> */}
                            <div className="flex flex-col gap-2">
                                <div>
                                    <strong className=" text-md ">Description : </strong>
                                    <span> {singleProductData?.description}</span>
                                </div>

                                <div>
                                    <strong className=" text-md ">instruction : </strong>
                                    <span className="text-sm">
                                        {singleProductData?.instruction}
                                    </span>
                                </div>
                            </div>

                            {singleProductData?.inStock > 1 ? (
                                <button
                                    className="order_now_button w-fit bg-blue-800  text-white rounded"
                                    onClick={() => {
                                        addToCartHandler(singleProductData?._id);
                                        a();
                                    }}
                                >
                                    Order Now
                                </button>
                            ) : (
                                <button className="order_now_button w-fit bg-blue-500  text-white rounded">
                                    Order Now
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductScreen;
