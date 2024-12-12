import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchQuery: "",
    products: [], // Initial list of products
    filteredProducts: [],
  };

  const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
      setProducts: (state, action) => {
        state.products = action.payload;
        state.filteredProducts = action.payload; // Initially show all products
      },
      setSearchQuery: (state, action) => {
        state.searchQuery = action.payload;
        state.filteredProducts = state.products.filter(product =>
          product.name.toLowerCase().includes(action.payload.toLowerCase())
        );
      },
    },
  });
  
  export const { setProducts, setSearchQuery } = searchSlice.actions;
  export default searchSlice.reducer;

  