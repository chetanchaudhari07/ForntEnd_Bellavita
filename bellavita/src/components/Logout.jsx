import React  ,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/action';

function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // Dispatch logout action and redirect to home page
        dispatch(logout());
        navigate('/');
    }, [dispatch, navigate]);

    return <div>Logging out...</div>; // Optional loading message
}

export default Logout;