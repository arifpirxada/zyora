import { useAppContext } from "../../context/AppContext"

const API_URL = import.meta.env.VITE_API_URL;

const ProfileCard = () => {

    const { user } = useAppContext()

    return (
        user && <div className="max-w-sm bg-transparent rounded-lg shadow-sm">
            <div>
                <img className="rounded-t-lg" src={ `${API_URL + '/api/' + user?.data.profilePic}` } alt="" />
            </div>
            <div className="p-5">
                <div>
                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ user.data.name }</h2>
                </div>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Email: { user.data.email }
                </p>

            </div >
        </div>
    )
}

export default ProfileCard