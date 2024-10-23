import React, { useEffect, useState } from 'react';
import Adminmenu from './adminmenu';
import { useRouter } from 'next/router';

const AddProduct = ({user}) => {
    const router = useRouter();
    useEffect(() => {
      if(user.role != 'admin'){
        router.push('/')
      }
    }, [])
    const [products, setProducts] = useState([
        {
            title: '',
            slug: '',
            desc: '',
            img: '',
            category: '',
            price: '',
            availableQty: '',
            size: '',
            color: '',
        },
    ]);

    const handleChange = (index, e) => {
        const updatedProducts = [...products];
        updatedProducts[index][e.target.name] = e.target.value;
        setProducts(updatedProducts);
    };

    const handleAddProduct = () => {
        setProducts([
            ...products,
            {
                title: '',
                slug: '',
                desc: '',
                img: '',
                category: '',
                price: '',
                availableQty: '',
                size: '',
                color: '',
            },
        ]);
    };

    const handleRemoveProduct = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/addproducts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(products),
            });

            if (response.ok) {
                alert('Products added successfully!');
                setProducts([{ title: '', slug: '', desc: '', img: '', category: '', price: '', availableQty: '', size: '', color: '' }]);
            } else {
                alert('Error adding products!');
            }
        } catch (error) {
            console.error('Failed to submit products', error);
        }
    };

    return (
        <>
            <div>
                <h2 className='text-center my-2 text-pink-400 text-4xl uppercase'>Dashboard</h2>
            </div>
            <div className="flex w-full my-8 p-6 mx-4 bg-white border shadow-xl rounded-lg overflow-hidden">
                <div className="w-1/6"><Adminmenu /></div>
                <div className="w-5/6 mx-4 bg-green-100 p-4 rounded-lg">
                    <div className="min-h-screen my-6 bg-gray-100 flex items-center justify-center">
                        <div className="bg-white shadow-xl rounded-lg p-8 max-w-3xl w-full">
                            <h2 className="text-3xl font-bold text-center text-pink-400 mb-6">Add New Products</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {products.map((product, index) => (
                                    <div key={index} className="border p-4 rounded-lg">
                                        <h3 className="text-xl font-semibold mb-4">Product {index + 1}</h3>
                                        <div>
                                            <label className="block font-semibold mb-1">Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={product.title}
                                                onChange={(e) => handleChange(index, e)}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-semibold mb-1">Slug</label>
                                            <input
                                                type="text"
                                                name="slug"
                                                value={product.slug}
                                                onChange={(e) => handleChange(index, e)}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-semibold mb-1">Description</label>
                                            <textarea
                                                name="desc"
                                                value={product.desc}
                                                onChange={(e) => handleChange(index, e)}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                                                required
                                            ></textarea>
                                        </div>

                                        <div>
                                            <label className="block font-semibold mb-1">Image URL</label>
                                            <input
                                                type="text"
                                                name="img"
                                                value={product.img}
                                                onChange={(e) => handleChange(index, e)}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-semibold mb-1">Category</label>
                                            <input
                                                type="text"
                                                name="category"
                                                value={product.category}
                                                onChange={(e) => handleChange(index, e)}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-semibold mb-1">Price</label>
                                            <input
                                                type="number"
                                                name="price"
                                                value={product.price}
                                                onChange={(e) => handleChange(index, e)}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-semibold mb-1">Available Quantity</label>
                                            <input
                                                type="number"
                                                name="availableQty"
                                                value={product.availableQty}
                                                onChange={(e) => handleChange(index, e)}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-semibold mb-1">Size</label>
                                            <input
                                                type="text"
                                                name="size"
                                                value={product.size}
                                                onChange={(e) => handleChange(index, e)}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-semibold mb-1">Color</label>
                                            <input
                                                type="text"
                                                name="color"
                                                value={product.color}
                                                onChange={(e) => handleChange(index, e)}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                                                required
                                            />
                                        </div>

                                        {/* Button to remove product */}
                                        <div className="text-center mt-4">
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveProduct(index)}
                                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                                            >
                                                Remove Product
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={handleAddProduct}
                                        className="px-4 py-2 bg-green-400 text-white rounded hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                                    >
                                        Add Another Product
                                    </button>
                                </div>

                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-pink-400 text-white rounded hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
                                    >
                                        Submit Products
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>




        </>
    );
};

export default AddProduct;
