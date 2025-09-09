import { Link } from "react-router-dom"

const Header = () => {
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="flex flex-wrap items-center justify-between mx-auto p-4 md:px-40">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="src/assets/logo.png" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ZYORA</span>
                </Link>
                <div className="right flex g-4">
                <Link to="/products" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl whitespace-nowrap dark:text-white">Products</span>
                </Link>
                </div>
            </div>
        </nav>
    )
}

export default Header