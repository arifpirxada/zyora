import { useState } from "react";
import axios from "../../lib/axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const LoginUser = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { user, setUser } = useAppContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const navigate = useNavigate()

    const login = async (e: React.FormEvent) => {
        e.preventDefault(); // prevent form reload
        try {
            const data = {
              email: formData.email,
              password: formData.password
            }

            const res = await axios.post("/auth/login", data);

            if (res.data.success !== true) {
                alert("Login unsuccessful! Please Try again later")
                return;
            }

            const newUser = {
                isLoggedin: true,
                data: {
                    _id: '',
                    name: '',
                    email: formData.email,
                    profilePic: ''
                }
            }

            setUser(newUser)

            navigate('/')
        } catch (err: any) {
            if (err.response?.data?.success === false) {
                alert(err.response.data.message)
            }
            console.error("Login unsuccessful: ", err);
        }
    };

    if (user && user.isLoggedin) {
        return <Navigate to="/" replace />;
    }


    return (
        <div className="flex flex-col justify-center items-center py-24">
          <h1 className="text-2xl mb-4 font-bold">Login</h1>
            <form onSubmit={ login } className="max-w-sm mx-auto">
         
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={ formData.email }
                        onChange={ handleChange }
                        className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@gmail.com"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={ formData.password }
                        onChange={ handleChange }
                        className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                     focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto 
                     px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                     dark:focus:ring-blue-800"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginUser;
