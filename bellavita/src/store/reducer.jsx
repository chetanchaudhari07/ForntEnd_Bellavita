import { combineReducers } from 'redux';
import axios from "axios";
import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
} from "./action";

const someReducer = {
    loading: false,
    products: [],
    error: null,
};

const productReducer = (state = someReducer, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
            };
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};



// SIGN up Or SIGN in

import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_FAILURE,
    LOGOUT
} from './action'

const token = localStorage.getItem('token');

const initialStateForm = {
    isAuthenticated: false,
    user: null,
    token: token || null,
    loading: false,
    error: null,
    isRegistered: false,
};

const authReducer = (state = initialStateForm, action) => {
    switch (action.type) {
        case AUTH_REQUEST:
            return { ...state, loading: true, error: null,isRegistered: false };
        case AUTH_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: !!action.payload.token,
                user: action.payload.user,
                token: action.payload.token,
                isRegistered: action.payload.isRegistered || false,
                error: null,
            };
        case AUTH_FAILURE:
            return { ...state, loading: false, error: action.payload ,isRegistered: false };
        case LOGOUT:
            return { ...state, isAuthenticated: false, user: null, token: null,isRegistered: false  };
        default:
            return state;
    }
};


// cart

import {
    FETCH_CART_SUCCESS,
    ADD_TO_CART_SUCCESS,
    REMOVE_FROM_CART_SUCCESS,
} from './action'

const initialState = {
    cartItems: [],
    loading: false,
    error: null,
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CART_SUCCESS:
            return { ...state, cartItems: action.payload };

        case ADD_TO_CART_SUCCESS:
            return { ...state, cartItems: [...state.cartItems, action.payload] };

        case REMOVE_FROM_CART_SUCCESS:
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item._id !== action.payload),
            };

        default:
            return state;
    }
}

// adress
import { ADD_ADDRESS, GET_ADDRESSES, UPDATE_ADDRESS, DELETE_ADDRESS } from './action';

const initialStateAdress = {
    addresses: [],
};

const addressReducer = (state = initialStateAdress, action) => {
    switch (action.type) {
        case GET_ADDRESSES:
            return { ...state, addresses: action.payload };
        case ADD_ADDRESS:
            return { ...state, addresses: [...state.addresses, action.payload] };
        case UPDATE_ADDRESS:
            return {
                ...state,
                addresses: state.addresses.map(address =>
                    address._id === action.payload._id ? action.payload : address
                ),
            };
        case DELETE_ADDRESS:
            return {
                ...state,
                addresses: state.addresses.filter(address => address._id !== action.payload),
            };
        default:
            return state;
    }
};


// add product


// Get all products
export const getProducts = () => async (dispatch) => {
    try {
        const { data } = await axios.get('http://localhost:3000/api/product/');
        dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'GET_PRODUCTS_FAIL', payload: error.message });
    }
};

// Add a product
export const addProduct = (formData) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token"); // Ensure the token is retrieved correctly
        const { data } = await axios.post(
            'http://localhost:3000/api/product/add-Product',
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token here
                },
            }
        );
        console.log("API Response:", data);
        dispatch({ type: 'ADD_PRODUCT_SUCCESS', payload: data });
    } catch (error) {
        console.error("API Error:", error.message);
        dispatch({ type: 'ADD_PRODUCT_FAIL', payload: error.message });
    }
};

// Update a product
export const updateProduct = (id, updatedData) => async (dispatch) => {
    try {
        const { data } = await axios.put(`http://localhost:3000/api/product/update-product/${id}`, updatedData);
        dispatch({ type: 'UPDATE_PRODUCT_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'UPDATE_PRODUCT_FAIL', payload: error.message });
    }
};

// Delete a product
export const deleteProduct = (id) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:3000/api/product/delete-product/${id}`);
        dispatch({ type: 'DELETE_PRODUCT_SUCCESS', payload: id });
    } catch (error) {
        dispatch({ type: 'DELETE_PRODUCT_FAIL', payload: error.message });
    }
};


const initialStateProduct = { products: [] };

const addproductReducer = (state = initialStateProduct, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS_SUCCESS':
            return { ...state, products: action.payload };
        case 'ADD_PRODUCT_SUCCESS':
            return { ...state, products: [...state.products, action.payload] };
        case 'UPDATE_PRODUCT_SUCCESS':
            return {
                ...state,
                products: state.products.map((product) =>
                    product._id === action.payload._id ? action.payload : product
                ),
            };
        case 'DELETE_PRODUCT_SUCCESS':
            return {
                ...state,
                products: state.products.filter((product) => product._id !== action.payload),
            };
        default:
            return state;
    }
};

import searchReducer from './SearchProduct';

const rootReducer = combineReducers({
    productReducer,
    authReducer,
    cartReducer,
    addressReducer,
    addproductReducer,
    search: searchReducer,
    
})

export default rootReducer;
