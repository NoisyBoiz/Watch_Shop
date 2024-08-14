import React from 'react';
import '../styles/layout.css';
import Header from '../components/header.js';
import Footer from '../components/footer.js';

function Layout({children}){
    return (
        <div className="cl-layout-container">
            <div className="layout-header">
                <Header/>
            </div>
            <div className="layout-content">
                {children}
                <Footer/>
            </div>
        </div> 
    )
}
export default Layout;