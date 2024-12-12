import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../store/reducer'; // Import actions
import { useForm } from 'react-hook-form';

function AdminDashboard() {
    const dispatch = useDispatch();
    const { products = [] } = useSelector((state) => state.root.addproductReducer) || []; // Access products from Redux state
    const [editProduct, setEditProduct] = useState(null); // For editing mode
    const { register, handleSubmit, reset } = useForm();

    // Fetch products on mount
    useEffect(() => {
        console.log('Fetching products...');
        dispatch(getProducts());
    }, [dispatch]);

    // Handle adding a product
    const handleAddProduct = (data) => {
        
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (key === "image") {
                Array.from(data[key]).forEach((file) => formData.append("image", file));
            } else {
                formData.append(key, data[key]);
            }
        });
        console.log("Submitting data:", formData);
        dispatch(addProduct(formData));
       
        reset();

    };

    // Handle editing a product
    const handleEditProduct = (product) => {
        setEditProduct(product);
        reset(product); // Pre-fill the form with product data
    };

    // Handle updating a product
    const handleUpdateProduct = (data) => {
        dispatch(updateProduct(editProduct._id, data));
        setEditProduct(null);
        reset();
    };

    // Handle deleting a product
    const handleDeleteProduct = (productId) => {
        dispatch(deleteProduct(productId));
    };

    return (
        <div className="max-w-6xl mx-auto py-10">
            <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>

            {/* Add/Update Product Form */}
            <div className="border-b pb-5 mb-5">
                <h2 className="text-xl font-semibold mb-3">
                    {editProduct ? "Update Product" : "Add Product"}
                </h2>
                <form
                    onSubmit={editProduct ? handleSubmit(handleUpdateProduct) : handleSubmit(handleAddProduct)}
                    className="space-y-4"
                >
                    <input
                        type="text"
                        {...register("name", { required: true })}
                        placeholder="Product Name"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        {...register("category", { required: true })}
                        placeholder="Category"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="number"
                        {...register("price", { required: true })}
                        placeholder="Price"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="number"
                        {...register("unit", { required: true })}
                        placeholder="unit"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                  
                   

                    <textarea
                        {...register("description", { required: true })}
                        placeholder="Description"
                        className="w-full p-2 border border-gray-300 rounded"
                    ></textarea>
                    <input
                        type="file"
                        {...register("image", { required: !editProduct })}
                        multiple
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-500 text-white rounded"
                    >
                        {editProduct ? "Update Product" : "Add Product"}
                    </button>
                </form>
            </div>

            {/* Product List */}
            <div>
                <h3 className="text-xl font-semibold">Product List</h3>
                <div className="space-y-4">
                    {products.map((product) => (
                        <div key={product._id} className="border p-4 rounded">
                            <p><strong>{product.name}</strong></p>
                            <p>Category: {product.category}</p>
                            <p>Price: ₹{product.price}</p>
                            <p>Stock: {product.stock}</p>
                            <div className="flex justify-between mt-2">
                                <button
                                    onClick={() => handleEditProduct(product)}
                                    className="text-blue-500"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(product._id)}
                                    className="text-red-500"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
