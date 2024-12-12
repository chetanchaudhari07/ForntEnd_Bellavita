import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from '../store/SearchProduct';

function AppInitializer() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Example product list
        const products = [
            { id: 1, name: "Laptop" },
            { id: 2, name: "Headphones" },
            { id: 3, name: "Smartphone" },
        ];
        dispatch(setProducts(products));
    }, [dispatch]);

    return null;
}

export default AppInitializer;