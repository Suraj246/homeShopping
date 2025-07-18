import { NavLink } from 'react-router-dom';
import './footer.css';
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white " style={{ marginTop: "20px" }}>
            <div className="footer_details">
                <div className="about_us_text" >
                    <h4 className="text-xl font-bold">About Us</h4>
                    <p className="text-gray-300">
                        Welcome to our ecommerce store! We are passionate about
                        providing high-quality products and exceptional customer
                        service. Our mission is to make online shopping a seamless and
                        enjoyable experience for our valued customers.
                    </p>
                </div>
                <div className='flex items-center justify-around gap-10 md:w-1/2'>
                    <div className="w-full ">
                        <h4 className="text-xl font-bold">Customer Service</h4>
                        <ul className="text-gray-300">
                            <li>
                                <NavLink to="/contact" className="hover:text-white">
                                    Contact Us
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/faqs" className="hover:text-white">
                                    FAQs
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/shipping" className="hover:text-white">
                                    Shipping & Returns
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/privacy" className="hover:text-white">
                                    Privacy Policy
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full  flex flex-col gap-4 items-center">
                        <h4 className="text-xl font-bold">Connect with Us</h4>
                        <ul className="text-gray-300 flex gap-10 items-center">
                            <li>
                                <i className="bx bxl-facebook bx-sm"></i>
                            </li>
                            <li>
                                <i className="bx bxl-twitter bx-sm"></i>
                            </li>
                            <li>
                                <i className="bx bxl-instagram bx-sm"></i>
                            </li>
                            <li>
                                <i className="bx bxl-pinterest-alt bx-sm"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900" style={{ padding: "10px 0" }}>
                <p className="text-gray-300 text-center">
                    &copy; {new Date().getFullYear()} Home Shopping All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
