import React, {useState} from 'react';
import '../styles/layout.css';
import SideBar from '../components/sideBar.js';
import Header from '../components/header.js';


function Layout({children}){
    // if(localStorage.getItem("user") === null) window.location.href = "/admin/login";

    const [sidebarShow, setSidebarShow] = useState(false);
    const handleMenuClick = (e) => {
        e.stopPropagation();
    }

    return (
        <div className="layout-container">
            <div className="layout-header"> 
                <Header sidebarShow={sidebarShow} setSidebarShow={setSidebarShow}/>
            </div>
            <div className={`layout-sidebar ${sidebarShow?'sidebar-show':'sidebar-hide'}`} onClick={(e)=>handleMenuClick(e)}> 
                <SideBar/>
            </div>
            <div className="layout-content">
                {children}
            </div>
        </div> 
    )
}
export default Layout;