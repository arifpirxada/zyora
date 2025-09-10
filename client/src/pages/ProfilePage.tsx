import { useEffect, useState } from 'react';
import CreateProduct from '../components/profile/CreateProduct'
import ProductList from '../components/profile/ProductList'
import ProfileCard from '../components/profile/ProfileCard'
import axios from '../lib/axios';

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

const ProfilePage = () => {

  const [products, setProducts] = useState<[Product] | []>([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/products/me');

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
  return (
    <div className='p4 md:p-8'>

      <div className="flex p-3 gap-8 justify-center flex-wrap">
        <ProfileCard />
        <CreateProduct fetchProducts={ fetchProducts } />
      </div>

      <div className="mt-16">
        <h3 className='text-3xl mb-4 font-bold pl-3'>My Products</h3>
        <ProductList products={ products } fetchProducts={ fetchProducts } />
      </div>
    </div>
  )
}

export default ProfilePage