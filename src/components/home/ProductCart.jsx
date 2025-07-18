import Ratings from "./Ratings";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiEndpoint } from "../../API_ENDPOINT";
import { deleteProduct, updateProductDetails } from "../../redux/slice/productSlice";

function ProductCart({ item }) {
  const userInfo = JSON.parse(localStorage.getItem('userLogIn')) || []
  const navigate = useNavigate()

  const dispatch = useDispatch()

  // delete product admin side
  const deleteSingleProduct = (id) => {
    dispatch(deleteProduct(id))
  }

  // edit product admin side
  const editSingleProduct = (elem) => {
    dispatch(updateProductDetails(elem))
    navigate("/update-product")
  }

  return (
    <div className="product-info">
      <NavLink to={`/product/${item?._id}`}>
        <div className="product-img-container">
          {item?.img?.includes("jpeg") || item?.img?.includes("jpg") ? (
            <img
              variant="top"
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
        <div className="product_info flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm capitalize font-semibold">
              {item?.name}
            </span>
            <span className="text-sm capitalize ">
              Rs. {item?.price}
            </span>
          </div>
          <div>
            <span className="flex items-center">
              <Ratings ratings={item?.ratings} />
              {item?.ratings}
            </span>
          </div>
        </div>
      </NavLink>

      {/* show icons only for admin */}
      {userInfo?.adminAvailable && (
        <div className="flex justify-between items-center pl-4 pr-4">
          <span className="cursor-pointer" onClick={() => editSingleProduct(item)}>edit</span>
          <span className="cursor-pointer" onClick={() => deleteSingleProduct(item._id)}>delete</span>
        </div>
      )}
    </div>
  );
}

export default ProductCart;
