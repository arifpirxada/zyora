import { Link, useNavigate } from "react-router-dom"
import { useAppContext } from "../context/AppContext";
import logo from '../assets/logo.png'
import axios from "../lib/axios";

const Header = () => {

    const { user, setUser } = useAppContext();

    const navigate = useNavigate()

    const logout = async () => {
        try {
            await axios.post('/auth/logout');
            setUser((prev) => prev ? { ...prev, isLoggedin: false, data: prev.data } : null);
            navigate("/login");
        } catch (error) {
            console.log("Logout error", error)
            alert("Could not logout")
        }
    }

    return (
        <nav className="border-gray-200 bg-[#2a2e3e]">
            <div className="flex flex-wrap items-center justify-between mx-auto p-4 md:px-40">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={ logo } className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ZYORA</span>
                </Link>
                <div className="right mt-4 md:mt-0 flex gap-4">
                    { (user && user.isLoggedin) &&
                        <>
                            <Link to="/products" className="flex items-center space-x-3 rtl:space-x-reverse">
                                <span className="self-center text-xl whitespace-nowrap dark:text-white">Products</span>
                            </Link>
                            <Link to="/profile" className="flex items-center space-x-3 rtl:space-x-reverse">
                                <span className="self-center text-xl whitespace-nowrap dark:text-white">Profile</span>
                            </Link>
                            <button onClick={ logout } className="flex cursor-pointer items-center space-x-3 rtl:space-x-reverse">
                                <span className="self-center text-xl whitespace-nowrap dark:text-white">Logout</span>
                            </button>
                        </> }
                    { (!user || !user.isLoggedin) && <Link to="/login" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-xl whitespace-nowrap dark:text-white">Login</span>
                    </Link> }
                    { (!user || !user.isLoggedin) && <Link to="/register" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-xl whitespace-nowrap dark:text-white">Register</span>
                    </Link> }
                </div>
            </div>
        </nav>
    )
}

export default Header