import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from '../store/SearchProduct';


function SearchProduct() {
    const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.root.search.searchQuery);

  const handleSearchChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
     <div style={{ padding: "10px",   }}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{
          width: "100%",
          padding: "8px",
          fontSize: "16px",
          borderRadius: "4px",
          borderBottom:'1px solid',
          backgroundColor:'transparent',
          
        }}
      />
    </div>
  );
}

export default SearchProduct