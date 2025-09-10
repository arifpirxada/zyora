import { useState } from "react";
import axios from "../../lib/axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const RegisterUser = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [photo, setPhoto] = useState<File | null>(null);

    const { user, setUser } = useAppContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    };

    const navigate = useNavigate()

    const register = async (e: React.FormEvent) => {
        e.preventDefault(); // prevent form reload
        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("password", formData.password);
            if (photo) data.append("photo", photo);

            const res = await axios.post("/auth/register", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.data.success !== true) {
                alert("Registration unsuccessful! Please Try again later")
                return;
            }

            const newUser = {
                isLoggedin: true,
                data: {
                    _id: '',
                    name: formData.name,
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
            console.error("Could not register user: ", err);
        }
    };

    if (user && user.isLoggedin) {
        return <Navigate to="/" replace />;
    }


    return (
        <div className="flex flex-col justify-center items-center py-24">
          <h1 className="text-2xl mb-4 font-bold">Register</h1>
            <form onSubmit={ register } className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={ formData.name }
                        onChange={ handleChange }
                        className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Name"
                        required
                    />
                </div>

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

                <div className="mb-5">
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="photo"
                    >
                        Upload Profile Picture
                    </label>
                    <input
                        className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer 
                       bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 
                       dark:border-gray-600 dark:placeholder-gray-400"
                        id="photo"
                        type="file"
                        onChange={ handleFileChange }
                    />
                </div>

                <button
                    type="submit"
                    className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                     focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto 
                     px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                     dark:focus:ring-blue-800"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterUser;
