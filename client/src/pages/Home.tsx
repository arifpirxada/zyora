import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="p-4">
      <h1 className="font-inter-700 text-3xl mt-8 text-center">Welcome to ZYORA</h1>
      <div className="text-center mt-8">
        <Link to="/products" type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">View Products</Link>
      </div>
    </div>
  )
}

export default Home