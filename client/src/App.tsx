import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom';
import Products from './pages/Products';
import Register from './pages/Register';
import Login from './pages/Login';
import axios from './lib/axios';
import { useEffect } from 'react';
import { useAppContext } from './context/AppContext';
import ProtectedRoute from './components/ProtectedRoute';
import SingleProduct from './pages/SingleProduct';
import ProfilePage from './pages/ProfilePage';

function App() {

  const { user, setUser } = useAppContext()

  const authenticateUser = async () => {
    const response = await axios.get("/auth/me");

    if (!response.data?.success) {
      console.error("Could not authenticate user: ")
      return null;
    }

    const user = response.data.user;

    return user;
  };

  // Authenticate user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authenticateUser();

        if (!userData) {
          return;
        }

        const userDt = {
          isLoggedin: true,
          data: userData
        }

        setUser(userDt)

      } catch {
        console.error("User not authenticated")
      }
    };

    fetchUser();
  }, [user])

  return (
    <>
      <Header />
      <main className='mb-16'>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/products" element={ <><ProtectedRoute><Products /></ProtectedRoute></> } />
          <Route path="/products/:id" element={ <><ProtectedRoute><SingleProduct /></ProtectedRoute></> } />
          <Route path="/profile" element={ <><ProtectedRoute><ProfilePage /></ProtectedRoute></> } />
        </Routes>
      </main>
    </>
  )
}

export default App
