import React, { useState, useEffect } from 'react';
import logo from '../assets/logo2.jpg';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import SearchProduct from './SearchProduct';

import firstImage from '../assets/1stimage.jpg';
import secondImage from '../assets/2ndimage.jpg';
import thirdImage from '../assets/3rdimage.jpg';



const images = [firstImage, secondImage, thirdImage];

function Header() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check for admin role and login status in localStorage
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        setIsLoggedIn(true);
        setIsLoggedIn(!!token); // Set true if token exists
        setIsAdmin(role === 'ADMIN');

    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    const handleLogout = () => {
        // Remove token and role from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('role');

        // Update state
        setIsLoggedIn(false);
        setIsAdmin(false);

        // Redirect to home
        navigate('/');
    };

    return (
        <header
        className="relative shadow-md flex flex-col items-center py-4 h-screen overflow-hidden"
        style={{ position: 'relative', color: 'white', height: '90vh' }}
    >
        {/* Sliding background image */}
        <div className="absolute inset-0 z-[-10] h-full w-full overflow-hidden">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ backgroundImage: `url(${image})` }}
                ></div>
            ))}
        </div>

        {/* Header Content */}
        <div className="relative z-10 w-full flex items-center justify-between px-6">
            {/* Search Bar on the Left */}
            <div className="flex flex-1">
                <SearchProduct />
            </div>

            {/* Logo in the Center */}
            <div className="flex justify-center flex-shrink-0">
                <img src={logo} alt="logo" className="h-10 w-auto bg-transparent" />
            </div>

            {/* Empty div for spacing (optional) */}
            <div className="flex flex-1"></div>
        </div>

        {/* Navigation Links Below the Logo */}
        <nav className="flex gap-4 mt-4">
            <Link className="hover:text-blue-500" to="/">HOME</Link>
            <Link className="hover:text-blue-500" to="/">MENS</Link>
            <Link className="hover:text-blue-500" to="/">WOMEN</Link>
            <Link className="hover:text-blue-500" to="/">UNISEX</Link>
            <Link className="hover:text-blue-500" to="/">OUD COLLECTION</Link>
            <Link className="hover:text-blue-500" to="/">ATTARS</Link>
            <Link className="hover:text-blue-500" to="/">LITTLE LUXURIES</Link>
            <Link className="hover:text-blue-500" to="/">PERFUMES</Link>
            <Link className="hover:text-blue-500" to="/userprofile">USER</Link>
            <Link className="hover:text-blue-500" to="/">MOOD COLLECTION</Link>
            <Link className="hover:text-blue-500" to="/cart">CART</Link>

            {!isLoggedIn && (
                <>
                    <Link className="hover:text-blue-500" to="/login">Login</Link>
                    <Link className="hover:text-blue-500" to="/register">Register</Link>
                </>
            )}

            {isLoggedIn && (
                <>
                    {isAdmin && <Link className="hover:text-blue-500" to="/Admin">Admin</Link>}
                    <button
                        onClick={handleLogout}
                        className="hover:text-blue-500 bg-transparent border-none cursor-pointer"
                    >
                        Logout
                    </button>
                </>
            )}
        </nav>
    </header>
    );
}

export default Header;