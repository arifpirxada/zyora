import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import axios from "../lib/axios";
import { useEffect } from "react";

interface Props {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {

    const authenticateUser = async () => {
        const response = await axios.get("/auth/me");

        if (!response.data?.success) {
            console.error("Could not authenticate user: ")
            return null;
        }

        const user = response.data.user;

        return user;
    };

    const navigate = useNavigate()

    const { user, setUser } = useAppContext();

    // Authenticate user
    useEffect(() => {
        if (!user || !user.isLoggedin) {

            const fetchUser = async () => {
                try {
                    const userData = await authenticateUser();

                    if (!userData) {
                        navigate("/login")
                        return;
                    }

                    const userDt = {
                        isLoggedin: true,
                        data: userData
                    }

                    setUser(userDt)

                } catch {
                    console.error("User not authenticated");
                    navigate("/login")
                }
            };

            fetchUser();
        }
    }, [])

    return <>{ children }</>;
};

export default ProtectedRoute;