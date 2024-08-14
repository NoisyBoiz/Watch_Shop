import React from "react";
import "../styles/load.css";

function Load() {
    return(
        <div className="load">
            <h1> Watting to load </h1>
            <div className="spinner">
                <div></div>   
                <div></div>    
                <div></div>    
                <div></div>    
            </div>
        </div>
    )
}

export default Load;