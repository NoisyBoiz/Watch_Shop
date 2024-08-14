import React from "react";
import '../styles/header.css';
import {Link} from 'react-router-dom';

function Header({sidebarShow, setSidebarShow}) {
    window.addEventListener("click", () => {
        setSidebarShow(false);
    });

    const handleMenuClick = (e) => {
        e.stopPropagation();
        setSidebarShow(!sidebarShow);
    }

    return (
        <div className="header">
            <button className="btn-menu" onClick={(e)=>handleMenuClick(e)}> <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="48" d="M88 152h336M88 256h336M88 360h336"></path></svg> </button>
            <Link to="/admin/" className="brand-name"> <span>David</span> IWatch </Link>

            <div className="admin-infor">
                <Link to="/admin/changePassword"> <img className="avatar" src="https://cdn.glitch.global/691e9654-9699-4334-99d8-38f295d5ef2f/avatar.jpg?v=1719659189327" alt="Avatar"></img> </Link>
                <div> 
                    <h2 className="admin-name"> {localStorage.getItem("user")!==null?JSON.parse(localStorage.getItem("user")).fullname:"Unknow"} </h2>  
                    <h5 className="admin-role"> Admin </h5>
                </div>
            </div>
        </div>
    );
}

export default Header;