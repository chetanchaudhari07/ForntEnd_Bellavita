
// All Product 

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

import axios from "axios";
export const fetchProductsRequest = () => ({
    type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
});

export const fetchProductsFailure = (error) => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: error,
});

export const fetchProducts = (category) => async (dispatch) => {
    dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
    try {
        const endpoint = category 
            ? `http://localhost:3000/api/product?category=${category}` 
            : 'http://localhost:3000/api/product/';
        const response = await axios.get(endpoint);
        dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
    }
};

// Action types
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const LOGOUT = 'LOGOUT';

// Register action
export const registerUser = (userData) => async (dispatch) => {
    dispatch({ type: AUTH_REQUEST });
    try {
        await axios.post('http://localhost:3000/api/users/register', userData);
        dispatch({ type: AUTH_SUCCESS, payload:  { isRegistered: true } });
        alert("Registration successful!");
    } catch (error) {
        dispatch({ type: AUTH_FAILURE, payload: error.response.data.message });
        alert(error.response.data.message);
    }
};

// Login action
export const loginUser = (credentials) => async (dispatch) => {
    dispatch({ type: AUTH_REQUEST });
    try {
        const { data } = await axios.post('http://localhost:3000/api/users/login', credentials);
        dispatch({ type: AUTH_SUCCESS, payload: { user: data.user, token: data.token } });
        localStorage.setItem('token', data.token);
        localStorage.setItem('role',data.role);
        return Promise.resolve();
    } catch (error) {
        dispatch({ type: AUTH_FAILURE, payload: error.response.data.message });
        alert(error.response.data.message);
        return Promise.reject(error);
    }
};

// Logout action
export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    dispatch({ type: LOGOUT });
};


//cart

export const FETCH_CART_SUCCESS = "FETCH_CART_SUCCESS";
export const ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS";
export const REMOVE_FROM_CART_SUCCESS = "REMOVE_FROM_CART_SUCCESS";

export const fetchCartSuccess = (cartProducts) => ({
    type: FETCH_CART_SUCCESS,
    payload: cartProducts,
});

export const addToCartSuccess = (product) => ({
    type: ADD_TO_CART_SUCCESS,
    payload: product,
});

export const removeFromCartSuccess = (productId) => ({
    type: REMOVE_FROM_CART_SUCCESS,
    payload: productId,
});

export const fetchCart = () => async (dispatch) => {
    try {
      const response = await axios.get("/api/cart");
      dispatch(fetchCartSuccess(response.data.data));
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };
  
  export const addToCart = (productId, quantity = 1) => async (dispatch) => {
    try {
      const response = await axios.post("/api/cart/add", { productId, quantity });
      dispatch(addToCartSuccess(response.data.data));
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  
  export const removeFromCart = (cartProductId) => async (dispatch) => {
    try {
      await axios.delete(`/api/cart/remove/${cartProductId}`);
      dispatch(removeFromCartSuccess(cartProductId));
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };


  // adress

export const ADD_ADDRESS = 'ADD_ADDRESS';
export const GET_ADDRESSES = 'GET_ADDRESSES';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
export const DELETE_ADDRESS = 'DELETE_ADDRESS';

export const addAddress = (addressData) => async (dispatch, getState) => {
    try {
        const token = localStorage.getItem("token"); // Retrieve the token
        const config = {
            headers: { Authorization: `Bearer ${token}` }, // Attach token to headers
        };
        const { data } = await axios.post('http://localhost:3000/api/address/add-address', addressData,config);
        dispatch({ type: ADD_ADDRESS, payload: data.data });
    } catch (error) {
        console.error('Error adding address', error);
    }
};

export const getAddresses = () => async (dispatch) => {
    try {
        const token = localStorage.getItem("token"); // Retrieve the token
        console.log("Token retrieved:", token);
        const config = {
            headers: { Authorization: `Bearer ${token}` }, // Attach token to headers
        };
        const { data } = await axios.get('http://localhost:3000/api/address/get-address',config);
        dispatch({ type: GET_ADDRESSES, payload: data.data });
    } catch (error) {
        console.error('Error fetching addresses', error.response || error.message);
    }
};

export const updateAddress = (addressId, addressData) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token"); // Retrieve the token
        const config = {
            headers: { Authorization: `Bearer ${token}` }, // Attach token to headers
        };
        const { data } = await axios.put(`http://localhost:3000/api/address/${addressId}`,  addressData,config);
        dispatch({ type: UPDATE_ADDRESS, payload: data.data });
    } catch (error) {
        console.error('Error updating address', error);
    }
};

export const deleteAddress = (addressId) => async (dispatch, getState) => {
    try {
        const token = localStorage.getItem("token"); // Retrieve the token
        const config = {
            headers: { Authorization: `Bearer ${token}` }, // Attach token to headers
        };

        await axios.delete(`http://localhost:3000/api/address/${addressId}`, config);
        dispatch({ type: DELETE_ADDRESS, payload: addressId });
    } catch (error) {
        console.error('Error deleting address', error);
    }
};



