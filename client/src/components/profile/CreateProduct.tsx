import { type ChangeEvent, type FormEvent, useState } from 'react';
import axios from '../../lib/axios';

type ProductData = {
    name: string;
    description: string;
    price: number;
};

const CreateProduct = ({ fetchProducts }: { fetchProducts: () => void }) => {
    const [product, setProduct] = useState<ProductData>({
        name: '',
        description: '',
        price: 0,
    });
    const [files, setFiles] = useState<FileList | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setProduct(prev => ({ ...prev, [id]: id === 'price' ? Number(value) : value }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 8) {
            alert('Maximum 8 photos allowed');
            return;
        }
        setFiles(e.target.files);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price.toString());

        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append('photos', files[i]);
            }
        }

        try {
            const response = await axios.post('/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Product created:', response.data);
            fetchProducts()
            setProduct({ name: '', description: '', price: 0 });
            setFiles(null);
        } catch (error) {
            console.error('Error creating product:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="w-full md:w-1/3" onSubmit={ handleSubmit }>
            <h3 className="text-2xl mb-4 font-bold">Create Product</h3>

            <div className="mb-5">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                <input
                    type="text"
                    id="name"
                    value={ product.name }
                    onChange={ handleChange }
                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                />
            </div>

            <div className="mb-5">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea
                    id="description"
                    rows={ 4 }
                    value={ product.description }
                    onChange={ handleChange }
                    className="block outline-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                />
            </div>

            <div className="mb-5">
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                <input
                    type="number"
                    id="price"
                    value={ product.price || '' }
                    onChange={ handleChange }
                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                />
            </div>

            <div className="mb-5">
                <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="photos"
                >
                    Upload Pictures (Max 8)
                </label>
                <input
                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="photos"
                    type="file"
                    multiple
                    onChange={ handleFileChange }
                    accept="image/*"
                />
            </div>

            <button
                type="submit"
                disabled={ isSubmitting }
                className="text-white bg-blue-700 cursor-pointer hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                { isSubmitting ? 'Creating...' : 'Create Product' }
            </button>
        </form>
    );
};

export default CreateProduct;
