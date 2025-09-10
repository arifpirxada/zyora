import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import axios from "../../lib/axios";
import { useParams } from "react-router-dom";
import { useEffect, useState, type FormEvent } from "react";
import { useAppContext } from "../../context/AppContext";

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

interface CommentRequest {
    comment: string;
}

const API_URL = import.meta.env.VITE_API_URL;

const SingleProductItem = () => {

    const { id: productId } = useParams<{ id: string }>();

    const { user } = useAppContext()

    const [product, setProduct] = useState<Product | null>(null);
    const [message, setMessage] = useState<string>("");

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`/products/${productId}`);

            if (res.data.success === true) {
                setProduct(res.data.product)
            } else {
                alert("could not fetch product")
            }

        } catch (err) {
            console.error("could Not fetch product")
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [productId])

    const toggleLike = async (productId: string) => {
        try {
            await axios.put(`/products/${productId}/like`);
            fetchProduct();
        } catch (err) {
            console.error("Error toggling like:", err);
        }
    };

    const addComment = async (e: FormEvent) => {
        try {
            e.preventDefault();
            await axios.post(`/products/${productId}/comment`, { 'comment': message } as CommentRequest);
            setMessage("");
            fetchProduct()

        } catch (error) {
            console.error("could not add comment")
        }
    }

    return (
        <section className="py-8 md:py-16 bg-[#0e0e0e] antialiased" >
            { product && <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                    {/* <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                    <img className="w-full hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="" />
                </div> */}
                    <Swiper
                        spaceBetween={ 20 }
                        slidesPerView={ 1 }
                        modules={ [Navigation, Pagination, Autoplay] }
                        navigation
                        pagination={ { clickable: true } }
                        autoplay={ { delay: 5000 } }
                        className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                        { product.images.length === 0 ? (
                            <SwiperSlide className="w-full">
                                <img
                                    className="w-full hidden dark:block"
                                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                                    alt="Default Product"
                                />
                            </SwiperSlide>
                        ) : (
                            product.images.map((image, index) => (
                                <SwiperSlide className="w-full" key={ index }>
                                    <img
                                        className="w-full hidden dark:block"
                                        src={ `${API_URL}/api/${image}` }
                                        alt={ `Product Image ${index + 1}` }
                                    />
                                </SwiperSlide>
                            ))
                        ) }

                    </Swiper>

                    <div className="mt-6 sm:mt-8 lg:mt-0">
                        <h1
                            className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
                        >
                            { product.name }
                        </h1>
                        <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                            <p
                                className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white"
                            >
                                ₹ { product.price }
                            </p>
                        </div>

                        <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                            <button
                                title=""
                                className="flex cursor-pointer items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                role="button"
                                onClick={ () => toggleLike(product._id) }
                            >
                                {
                                    product.likes.some(like => like.user?._id === user?.data._id) ?
                                        <>
                                            <svg
                                                className="w-5 h-5 -ms-2 me-2"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="red"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke="red"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                                />
                                            </svg>
                                            Dislike ({product.likes.length})
                                        </>
                                        :
                                        <>
                                            <svg
                                                className="w-5 h-5 -ms-2 me-2"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                                />
                                            </svg>
                                            Like {product.likes.length > 0 && `(${product.likes.length})`}
                                        </>
                                }

                            </button>
                        </div>

                        <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                        <p className="mb-6 text-gray-500 dark:text-gray-400">
                            { product.description }
                        </p>
                    </div>

                    <div className="comment-form mb-8">

                        <form className="max-w-sm mx-auto" onSubmit={ addComment }>
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                            <textarea id="message" value={ message } onChange={ (e) => setMessage(e.target.value) } rows={ 4 } className="block outline-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                            <button type="submit" className="text-white mt-4 cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Comment</button>
                        </form>

                    </div>

                    <div className="comments">
                        { product.comments.map((comment, index) => (

                            <div key={ index } className="comment mb-8 border-b-[#f9f9f638] border-b pb-4 ">
                                <div className="user flex gap-4 items-center pb-2 mb-4">
                                    <img className="w-8 rounded-full" src={ `${API_URL}/api/${comment.userId.profilePic}` } alt="" />
                                    <p>{ comment.userId.name }</p>
                                </div>
                                <p className="ml-2">{ comment.content }</p>
                            </div>
                        )) }
                    </div>
                </div>
            </div> }
        </section >
    )
}

export default SingleProductItem