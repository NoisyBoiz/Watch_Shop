import React from "react";
import {Link} from 'react-router-dom';
import "../../Admins/styles/productCard.css";
import FormatPrice from "../../Admins/functions/formatPrice";

function ProductCard({product}) {
    const getPrice = (list) => {
        let max = null;
        let min = null;
        list.forEach(element => {
            if(min === null || element.price < min) min = element.price;
            if(max === null || element.price > max) max = element.price;
        });
        if(min === null || max === null) return "";
        if(min===max) return FormatPrice(min);
        return FormatPrice(min)+" - "+FormatPrice(max);
    }

    const getOldPrice = (list) => {
        let max = null;
        let min = null;
        list.forEach(element => {
            const price = element.oldPrice;
            if(!isEmty(price)){
                if(min === null || price < min) min = price;
                if(max === null || price > max) max = price;
            }
        });

        if(min===null || max===null) return "";
        if(min===max) return FormatPrice(min);
        return FormatPrice(min)+" - "+FormatPrice(max);
    }
    const isEmty = (discount) => {
        if(discount===null||discount===0||discount===undefined){
            return true;
        }
        return false;
    }

    return (
        <Link to={`/product/${product.id}`} className="product-card">
            <div className="image"> 
                <img src={product?.images[0]?.url} alt={product.name} />
                <p className="size"> {product.sizes.name} </p>
            </div>
            <div className="content">
                <p className="name" >{product.name}</p>
                <p className="price">{getPrice(product?.details)} <br/> <span className="old-price">{getOldPrice(product?.details)}</span> </p>
            </div>
            <div className="bottom">
                <button className="btn-detail"> View </button>
                <ul className="list-color"> 
                    {product?.details.map((detail, index) => {
                        return (
                            <li key={index} style={{backgroundColor: detail.colors.hex, border: (detail.colors.hex==="#ffffff"?"0.01rem solid #000":"")}}></li>
                        );
                    })}
                </ul>
            </div>
        </Link>
    );
}

export default ProductCard;