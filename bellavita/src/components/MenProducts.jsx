import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/action";
import ProductList from "./ProductList";

function MenProducts () {
    const dispatch = useDispatch();
    const { loading, products, error } = useSelector((state) => state.root.productReducer);

    useEffect(() => {
        dispatch(fetchProducts('Fragrance'));
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">FRAGRANCE</h2>
                <ProductList products={products} />
            </div>
        </div>
    );
}

export default MenProducts;