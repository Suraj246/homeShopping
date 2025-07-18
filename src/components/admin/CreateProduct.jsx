import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./admin.css"
import { useNavigate } from 'react-router-dom'
import { createProduct, productLists } from '../../redux/slice/productSlice'
const CreateProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()



    // getting product 
    const getUpdateProductDetails = useSelector(state => state.productLists)
    const { productsData } = getUpdateProductDetails

    // getting unique category elements from array
    const categories = productsData?.map((product) => product?.category)
    let unique = [...new Set(categories)];

    useEffect(() => {
        dispatch(productLists())
    }, [dispatch])

    const [input, setInput] = useState({
        name: "",
        slug: "",
        description: "",
        price: "",
        rating: '',
        brand: "",
        inStock: "",
        instruction: ""
    })
    const [selected, setSelected] = useState('')
    const [isActive, setIsActive] = useState(false)
    const [image, setImage] = useState('')

    const inputHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setInput({ ...input, [name]: value })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const { name, slug, description, price, rating, brand, inStock, instruction } = input

        const formData = new FormData()
        formData.append("name", name)
        formData.append("slug", slug)
        formData.append("image", image)
        formData.append("category", selected)
        formData.append("description", description)
        formData.append("price", price)
        formData.append("rating", rating)
        formData.append("brand", brand)
        formData.append("inStock", inStock)
        formData.append("instruction", instruction)
        if (!name || !slug || !description || !price || !rating || !brand || !inStock || !instruction) {
            alert("all fields requires")
            return
        }
        dispatch(createProduct({ formData }))
            .then((res) => {
                if (res.payload.success) {
                    setInput({ name: "", slug: "", description: "", price: "", rating: '', brand: "", inStock: "", instruction: "" })
                    setSelected("")
                    setImage("")
                    navigate('/')
                }
                return
            })
    }


    return (
        <div className="flex flex-col justify-center items-center w-full">
            <h3 className="text-3xl font-semibold text-gray-900">Create Product</h3>
            <div className="flex flex-col gap-4 w-full" style={{ padding: "10px" }}>
                <form className="flex flex-col gap-2">
                    <div className="flex flex-col text-gray-400 text-md">
                        <label htmlFor="name" className="text-gray-800">
                            Product Name
                        </label>
                        <input
                            type="text"
                            className="adminUpdateCartInput rounded-lg bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-md"
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
                        <label htmlFor="image" className="text-gray-800">
                            Image
                        </label>
                        <input
                            type="file"
                            className="adminUpdateCartInput rounded-lg bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-lg"
                            name="image"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                    <div className="dropdown-container">
                        <label className="text-gray-800">Product Category</label>

                        <div className="dropdown" onClick={() => setIsActive(!isActive)}>
                            {selected ? (
                                <>
                                    <div className="dropdown-btn">{selected}</div>
                                    <i className="bx bx-chevron-down arrow-city"></i>
                                </>
                            ) : (
                                <>
                                    <span className="se">Select Product Category</span>
                                    <i className="bx bx-chevron-down arrow-city"></i>
                                </>
                            )}
                            {isActive && (
                                <div className="dropdown-content">
                                    {unique.map((option, idx) => {
                                        return (
                                            <div
                                                className="dropdown-item"
                                                key={idx}
                                                onClick={() => {
                                                    setSelected(option);
                                                    setIsActive(false);
                                                }}
                                            >
                                                {option}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col text-gray-400 text-md">
                        <label htmlFor="description" className="text-gray-800">
                            description
                        </label>
                        <input
                            type="text"
                            className="adminUpdateCartInput rounded-lg bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-md"
                            name="description"
                            placeholder="product description"
                            value={input.description}
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="flex flex-col text-gray-400 text-md">
                        <label htmlFor="price" className="text-gray-800">
                            Price
                        </label>
                        <input
                            type="text"
                            className="adminUpdateCartInput rounded-lg bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-md"
                            name="price"
                            placeholder="product price must be numbers"
                            value={input.price}
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="flex flex-col text-gray-400 text-md">
                        <label htmlFor="rating" className="text-gray-800">
                            Rating
                        </label>
                        <input
                            type="text"
                            className="adminUpdateCartInput rounded-lg bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-md"
                            name="rating"
                            placeholder="product rating must be in number between 1 to 5"
                            value={input.rating}
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="flex flex-col text-gray-400 text-md">
                        <label htmlFor="brand" className="text-gray-800">
                            Brand
                        </label>
                        <input
                            type="text"
                            className="adminUpdateCartInput rounded-lg bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-md"
                            name="brand"
                            placeholder="product brand"
                            value={input.brand}
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="flex flex-col text-gray-400 text-md">
                        <label htmlFor="inStock" className="text-gray-800">
                            Product Stock
                        </label>
                        <input
                            type="text"
                            className="adminUpdateCartInput rounded-lg bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-md"
                            name="inStock"
                            placeholder="product inStock"
                            value={input.inStock}
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="flex flex-col text-gray-400 text-md">
                        <label htmlFor="instruction" className="text-gray-800">
                            Product Instruction
                        </label>
                        <input
                            type="text"
                            className="adminUpdateCartInput rounded-lg bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white text-md"
                            name="instruction"
                            placeholder="product instruction"
                            value={input.instruction}
                            onChange={inputHandler}
                        />
                    </div>
                    {/* {error && <span className="text-red-700 font-bold text-md capitalize">{error}</span>} */}

                    <button
                        onClick={submitHandler}
                        style={{ padding: "10px 20px", marginTop: "20px" }}
                        className="w-full cursor-pointer bg-teal-500 shadow-lg shadow-teal-700/60 rounded-lg text-white font-semibold"
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateProduct
