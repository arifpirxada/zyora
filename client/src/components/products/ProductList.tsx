import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "../../lib/axios"
import likeImg from "../../assets/img/like.png"
import likedImg from "../../assets/img/liked.png"
import { useAppContext } from "../../context/AppContext"

interface Product {
    _id: string;
    name: string;
    description: string;
    images: string[],
    price: number,
    likes: [{
        user: {
            _id: string,
            name: string,
            email: string,
            profilePic: string
        }
    }],
    comments: [{
        userId: {
            _id: string,
            name: string,
            email: string,
            profilePic: string
        },
        content: string
    }],
    __v: number;
}

const API_URL = import.meta.env.VITE_API_URL;

const ProductList = () => {

    const [products, setProducts] = useState<[Product] | []>([]);

    const { user } = useAppContext()

    const fetchProducts = async () => {
        try {
            const res = await axios.get('/products');

            if (res.data?.success === true && res.data.data) {
                setProducts(res.data.data);
            }
        } catch (err) {
            console.error("Could not fetch products", err)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])


    const toggleLike = async (productId: string) => {
        try {
            await axios.put(`/products/${productId}/like`);
            fetchProducts();
        } catch (err) {
            console.error("Error toggling like:", err);
        }
    };

    return (
        <div className="p-3">
            <div className="card-list flex flex-wrap justify-center mt-8 gap-8">

                { products.map((product) => {

                    const hasLiked = product.likes.some(like => like.user?._id === user?.data._id);

                    return (

                        <div key={ product._id } className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                            <Link to={ `/products/${product._id}` }>
                                <img className="rounded-t-lg" src={ `${API_URL + '/api/' + product.images[0]}` } alt="" />
                            </Link>
                            <div className="p-5">
                                <div>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ product.name }</h5>
                                </div>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    { product.description?.length > 100
                                        ? product.description.slice(0, 100) + "..."
                                        : product.description }
                                </p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">₹ { product.price }</p>
                                <div className="flex gap-4">

                                    <button
                                        onClick={ () => toggleLike(product._id) }
                                        className="cursor-pointer flex gap-1">
                                        { hasLiked ? (
                                            <img className="w-8" src={ likedImg } alt="liked icon" />
                                        ) : (
                                            <img className="w-8" src={ likeImg } alt="like icon" />
                                        ) }
                                        {product.likes.length > 0 && `(${product.likes.length})`}
                                    </button>
                                    <Link to={ `/products/${product._id}` } className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Comment
                                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </Link>
                                    <Link to={ `/products/${product._id}` } className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        View
                                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </Link>
                                </div>

                            </div>
                        </div>

                    )
                }
                ) }


            </div>
        </div>
    )
}

export default ProductList