import React, { useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, addToCart, removeFromCart } from '../store/action';

function CartItem({ item, onRemove }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.root.cartReducer.cartItems) || [];
  
    useEffect(() => {
      dispatch(fetchCart());
    }, [dispatch]);

    console.log(cartItems);
  
    const handleRemove = (id) => {
      dispatch(removeFromCart(id));
    };
  
    const subtotal =cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <li className="flex py-6">
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.image}
          alt={item.altText}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{item.name}</h3>
            <p className="ml-4">${item.price.toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{item.color}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {item.quantity}</p>
          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => onRemove(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

function Cart() {
  const dispatch = useDispatch();
  const  cartItems  = useSelector((state) => state.root.cartReducer.cartItems) || [];

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);

  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
      <ul role="list" className="divide-y divide-gray-200">
        {cartItems.map((item) => (
          <li key={item._id} className="flex py-4">
            <img
              src={item.productId.image}
              alt={item.productId.title}
              className="h-16 w-16 rounded-md object-cover"
            />
            <div className="ml-4 flex-1">
              <h3 className="text-sm font-medium text-gray-900">{item.productId.title}</h3>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              <p className="text-sm font-medium text-gray-900">${item.productId.price}</p>
            </div>
            <button
              onClick={() => handleRemove(item._id)}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <p className="text-lg font-medium text-gray-900">Subtotal: ${subtotal.toFixed(2)}</p>
        <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
