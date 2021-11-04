import React from "react";
import { logoutUser } from '../../redux/actions/authActions' 
import { useDispatch, useSelector } from 'react-redux' 
import { Link } from "react-router-dom";
import "./nav.css";


const Nav = (props) => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    return (
        <div className="nav-strip">
            <div className="nav-link-style nav-user-email">
                <label className="nav-label">{auth.email}</label>
            </div>
            <Link to={"/order"} className="nav-link">
                <div className="nav-link-style">
                    <label className="nav-label">Order Form</label>
                </div>
            </Link>
            <Link to={"/view-orders"} className="nav-link" id="middle-link">
                <div className="nav-link-style">
                    <label className="nav-label">View Orders</label>
                </div>
            </Link>
            <Link to={"/"} className="nav-link">
                <div className="nav-link-style">
                    <label className="nav-label" onClick={()=> dispatch(logoutUser())}>Log Out</label>
                    
                </div>
            </Link>
        </div>
    );
}

export default Nav;