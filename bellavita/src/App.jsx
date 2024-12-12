import React from "react";
import { createBrowserRouter, RouterProvider, Route, Routes } from "react-router-dom"
// import { Provider } from "react-redux";


import Home from './pages/Home';
import Header from "./components/Header";
import Footer from "./components/Footer";
import store from "./store/store";

//pages
import ShopAll from "./pages/ShopAll";
import CrazyDeals from "./pages/CrazyDeals";
import BathSop from "./pages/BathSop";
import BestSellers from "./pages/BestSellers";
import Cosmetics from "./pages/Cosmetics";
import Gifting from "./pages/Gifting";
import NewArrivals from "./pages/NewArrivals";
import Perfumes from "./pages/Perfumes";
import SkinCare from "./pages/SkinCare";
import UserProfile from "./pages/UserProfile";
import Cart from "./pages/Cart";
import LoginForm from "./components/loginForm";
import RegisterForm from './components/RegisterForm'
import AdminDashboard from "./components/AdminDashbord";
import AppInitializer from "./Hooks/AppInitializer";
import Logout from "./components/Logout";
import MenProducts from "./components/MenProducts";
import ProductList from "./components/ProductList";

function App() {
  return (
    <>

      <Header />

      <main>
      
        <AppInitializer/>
       <Routes>
       <Route path="/" element={<Home />} />
        <Route path="/allproduct" element={<ShopAll />} />
        <Route path="/skincare" element={<SkinCare />} />
        <Route path="/bathsop" element={<BathSop />} />
        <Route path="/bestsellers" element={<BestSellers />} />
        <Route path="/crazydeal" element={<CrazyDeals />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/gifting" element={<Gifting />} />
        <Route path="/newarrivals" element={<NewArrivals />} />
        <Route path="/perfumes" element={<Perfumes />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/Admin" element={<AdminDashboard />} />
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/menproduct" element={<MenProducts/>}/>
        <Route path="/productlist" element={<ProductList/>}/>
       </Routes>
       
      </main>

      <Footer />

    </>
  )
}

export default App
