import React from "react";
import '../styles/header.css';
import {Link} from 'react-router-dom';

function Header() {
    return (
        <div className="cl-header">
            <Link to="/home" className="brand-name"> <span>David</span> IWatch </Link>
        </div>
    );
}

export default Header;