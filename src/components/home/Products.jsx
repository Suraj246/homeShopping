import { useEffect } from "react";
import "./product.css";
import ProductCart from "./ProductCart";
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from "react-router-dom";
import { productLists } from "../../redux/slice/productSlice";

const Products = ({ input }) => {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productLists)
  const { productsData, status, error } = productList

  useEffect(() => {
    dispatch(productLists())
  }, [dispatch])

  const dairy = productsData?.filter((item) => item?.category === 'dairy' ? item : null)
  const fruits = productsData?.filter((item) => item?.category === 'fruits' ? item : null)
  const vegetables = productsData?.filter((item) => item?.category === 'vegetables' ? item : null)
  const meat = productsData?.filter((item) => item?.category === 'meat' ? item : null)

  return (
    <>
      {status === "loading" ? <div className="text-center max-w-full text-2xl capitalize font-semibold"><span>Loading...</span></div>
        :
        error ? <div className="text-center max-w-full text-2xl capitalize font-semibold"><span>{error}</span></div> :
          <>
            <div className="product-lists">
              <div className="flex justify-between ">
                <h3 className="fs-5 py-1">Dairy Products</h3>
                <NavLink to="/more_products?=dairy" className="text-blue-900 underline">More</NavLink>
              </div>
              <div className="product">
                <div className="p">
                  {dairy?.filter((elem) => {
                    if (input === elem) {
                      return elem;
                    } else if (elem.name.toLowerCase().includes(input)) {
                      return elem;
                    }
                    else {
                      return false;
                    }
                  })
                    .map((item, idx) => {
                      return (
                        <div key={idx} className="">
                          <ProductCart item={item} />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>


            <div className="product-lists  ">
              <div className="flex justify-between ">
                <h3 className="fs-5 py-1">Fruits</h3>
                <NavLink to="/more_products?=fruits" className="text-blue-900 underline">More</NavLink>
              </div>
              <div className="product">
                <div className="p">
                  {fruits?.filter((elem) => {
                    if (input === elem) {
                      return elem;
                    } else if (elem.name.toLowerCase().includes(input)) {
                      return elem;
                    }
                    else {
                      return false;
                    }
                  })
                    .map((item, idx) => {
                      return (
                        <div key={idx}>
                          <ProductCart item={item} />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            <div className="product-lists  ">
              <div className="flex justify-between ">
                <h3 className="fs-5 py-1">Vegetables</h3>
                <NavLink to="/more_products?=vegetables" className="text-blue-900 underline">More</NavLink>
              </div>
              <div className="product">
                <div className="p">
                  {vegetables?.filter((elem) => {
                    if (input === elem) {
                      return elem;
                    } else if (elem.name.toLowerCase().includes(input)) {
                      return elem;
                    }
                    else {
                      return false;
                    }
                  })
                    .map((item, idx) => {
                      return (
                        <div key={idx}>
                          <ProductCart item={item} />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            <div className="product-lists  ">
              <div className="flex justify-between ">
                <h3 className="fs-5 py-1">Meat and More Non Vegetarian</h3>
                <NavLink to="/more_products?=meat" className="text-blue-900 underline">More</NavLink>
              </div>
              <div className="product">
                <div className="p">
                  {meat?.filter((elem) => {
                    if (input === elem) {
                      return elem;
                    } else if (elem.name.toLowerCase().includes(input)) {
                      return elem;
                    }
                    else {
                      return false;
                    }
                  })
                    .map((item, idx) => {
                      return (
                        <div key={idx}>
                          <ProductCart item={item} />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </>
      }

    </>

  );
};

export default Products;
