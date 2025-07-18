import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./admin.css"
import { useNavigate } from 'react-router-dom'
import { productLists, updateSelectedProduct } from '../../redux/slice/productSlice'

const UpdateProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // getting product update data
    const getUpdateProductDetails = useSelector(state => state.productLists)
    const { updateProductDetails } = getUpdateProductDetails

    useEffect(() => {
        dispatch(productLists())
    }, [dispatch])

    const [input, setInput] = useState({
        name: updateProductDetails?.name || "",
        slug: updateProductDetails?.slug || "",
        description: updateProductDetails?.description || "",
        price: updateProductDetails?.price || null,
        rating: updateProductDetails?.ratings || null,
        brand: updateProductDetails?.brand || "",
        inStock: updateProductDetails?.inStock || null,
        instruction: updateProductDetails?.instruction || ""
    })

    const inputHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setInput({ ...input, [name]: value })
    }



    const updateSelectedProductData = (e) => {
        e.preventDefault()

        const { name, slug, description, price, rating, brand, inStock, instruction } = input

        if (!name || !slug || !description || !price || !rating || !brand || !inStock || !instruction) {
            alert("all fields requires")
            return
        }
        dispatch(updateSelectedProduct({ id: updateProductDetails?._id, input }))
            .then(() => {
                setInput({ name: "", slug: "", description: "", price: "", rating: '', brand: "", inStock: "", instruction: "" })
                navigate("/")
            })
    }

    return (
        <div
            className="flex flex-col justify-center items-center w-full"
            style={{ padding: "10px" }}
        >
            <h3 className="text-4xl font-semibold text-gray-900 ">
                Update Product
            </h3>
            <div className="flex flex-col w-full ">
                <form className="flex flex-col gap-3" onSubmit={updateSelectedProductData}>
                    <div className="flex flex-col text-gray-400 text-lg">
                        <label htmlFor="name" className="text-gray-800">
                            Product Name
                        </label>
                        <input
                            type="text"
                            className="adminUpdateCartInput rounded-lg bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                            name="name"
                            placeholder="product name"
                            autoComplete="off"
                            value={input.name}
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="flex flex-col text-gray-400 text-lg">
                        <label htmlFor="slug" className="text-gray-800">
                            Slug Name
                        </label>
                        <input
                            type="text"
                            className="adminUpdateCartInput rounded-lg bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                            name="slug"
                            placeholder="slug Name must be product related and little bit unique"
                            autoComplete="off"
                            value={input.slug}
                            onChange={inputHandler}
                        />
                    </div>

                    <div className="flex flex-col text-gray-400 text-lg">
                        <label htmlFor="description" className="text-gray-800">
                            description
                        </label>
                        <input
                            type="text"
                            className="adminUpdateCartInput rounded-lg bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                            name="description"
                            placeholder="product description"
                            value={input.description}
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="flex flex-col text-gray-400 text-lg">
                        <label htmlFor="price" className="text-gray-800">
                            Price
                        </label>
                        <input
                            type="text"
                            className="adminUpdateCartInput rounded-lg bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                            name="price"
                            placeholder="product price must be numbers"
                            value={input.price}
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="flex flex-col text-gray-400 text-lg">
                        <label htmlFor="rating" className="text-gray-800">
                            Rating
                        </label>
                        <input
                            type="text"
                            className="adminUpdateCartInput rounded-lg bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                            name="rating"
                            placeholder="product rating must be in number between 1 to 5"
                            value={input.rating}
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="flex flex-col text-gray-400 text-lg">
                        <label htmlFor="brand" className="text-gray-800">
                            Brand
                        </label>
                        <input
                            type="text"
                            className="adminUpdateCartInput rounded-lg bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                            name="brand"
                            placeholder="product brand"
                            value={input.brand}
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="flex flex-col text-gray-400 text-lg">
                        <label htmlFor="inStock" className="text-gray-800">
                            Product Stock
                        </label>
                        <input
                            type="text"
                            className="adminUpdateCartInput rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                            name="inStock"
                            placeholder="product inStock"
                            value={input.inStock}
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="flex flex-col text-gray-400 text-lg">
                        <label htmlFor="instruction" className="text-gray-800">
                            Product Instruction
                        </label>
                        <input
                            type="text"
                            className="adminUpdateCartInput rounded-lg bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                            name="instruction"
                            placeholder="product instruction"
                            value={input.instruction}
                            onChange={inputHandler}
                        />
                    </div>

                    <button style={{ padding: "10px" }} className="cursor-pointer w-full bg-teal-500 shadow-lg shadow-teal-700/60 rounded-lg text-white font-semibold">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateProduct
