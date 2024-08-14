import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import "../styles/listProduct.css";
import watchService from "../services/watch.js";
import Notification from "../components/notification.js";
import EmptyPage from "../components/emptyPage.js";
import FormatPrice from "../functions/formatPrice.js";

function List(){
    const [products, setProducts] = useState(null);
    const [imageReview, setImageReview] = useState("https://cdn.glitch.global/691e9654-9699-4334-99d8-38f295d5ef2f/avatar.jpg?v=1719659189327");    
    const [position, setPosition] = useState({x:0, y:0});
    const [showImage, setShowImage] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
        watchService.getAll().then((response) => {
            setProducts(response.data);
        });
    }, []); 

    const CalculatePosition = (event) => {
        let ScreenWidth = window.innerWidth;
        let ScreenHeight = window.innerHeight;

        let bodyRect = document.querySelector(".layout-content").getBoundingClientRect();
        let parRect = event.target.getBoundingClientRect();
        let eleRect = document.querySelector(".image-review").getBoundingClientRect();
        let x = parRect.x - bodyRect.x - eleRect.width;
        let y = parRect.y - bodyRect.y;
        
        if(x < 0) x = 0;
        if(y < 0) y = 0;

        if(x + eleRect.width > ScreenWidth) x = parRect.x - bodyRect.x - eleRect.width - parRect.width;
        if(y + eleRect.height > ScreenHeight) y = parRect.y - bodyRect.y - eleRect.height + parRect.height;

        let scrollX = document.querySelector(".layout-content").scrollLeft;
        let scrollY = document.querySelector(".layout-content").scrollTop;
        x += scrollX;
        y += scrollY;

        setPosition({x, y});
    }

    const HandleDelete = async (id) =>{
        Notification.load();
        await watchService.delete(id).then((response) =>{
            if(response?.status === 200) {setProducts(products.filter((product) => product.id !== id));Notification.close();}
            else if(response?.status !==403) Notification.error({title: "Error", message: response.message});
        });
    }

    const FormatDate = (date) => {
        if(date === null) return "";
        let d = date.split("T")[0];
        let t = date.split("T")[1].split(".")[0];
        return `${d} ${t}`;
    }

    const getProductByName = () => {
        let q = document.querySelector(".search-input").value;
        setQuery(q);
        if(q=== ""){
            watchService.getAll().then((response) => {
                console.log(response.data);
                setProducts(response.data);
            });
        }
        else{
            watchService.getByName(q).then((response) => {
                console.log(response.data);
                setProducts(response.data);
            });
        }
    }

    const checkEnter = (e) => {
        if(e.key === "Enter"){
            getProductByName();
        }
    }

    return(
        <div className="list">
            <h1>Danh sách sản phẩm</h1> <div className="search-container"> 
                <input className="search-input" type="text" placeholder="Tìm kiếm sản phẩm" onKeyDown={(e)=>checkEnter(e)}></input>
                <button onClick={()=>getProductByName()}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M456.69 421.39 362.6 327.3a173.81 173.81 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3zM97.92 222.72a124.8 124.8 0 1 1 124.8 124.8 124.95 124.95 0 0 1-124.8-124.8z"></path></svg></button>
            </div>
            {products !== null&&products.length>0?
            <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th> Id </th>
                        <th> Tên </th>
                        <th> Mô tả </th>
                        <th> Kích cỡ </th>
                        <th> Ngày tạo </th>
                        <th> Ảnh </th>
                        <th className="details">
                            <ul>
                                <li>Màu</li>
                                <li>Số lượng</li>
                                <li>Giá</li>
                                <li>Giá gốc</li>
                            </ul>
                        </th>
                        <th> Hành động </th>
                    </tr>
                </thead>
                <tbody>
                {products.map((product, index) => {
                    return (
                        <tr key={index}>
                            <td className="id">{product.id}</td>
                            <td className="name">{product.name}</td>
                            <td className="description"> 
                                {product.description.split(/\n/g).map(e=>{
                                    return (
                                        <>{e}<br/></>
                                    );
                                })} 
                            </td>
                            <td className="size">{product.sizes.name}</td>
                            <td className="createdAt">{FormatDate(product.createdAt)}</td>
                            <td className="images">
                                <ul>
                                    {product.images.map((ele, index) => {
                                        return (
                                            <li key={index} onMouseEnter={(e)=>{setImageReview(ele.url); CalculatePosition(e); setShowImage(true)}} onMouseLeave={()=>{setShowImage(false); setPosition({x:0,y:0})}}> {ele.url} </li>
                                        );
                                    })}
                                </ul>
                            </td>
                            <td className="details">
                                {product.details.map((ele, index) => {
                                    return (
                                        <ul key={index}>
                                            <li className="colors"> <span className="color-review" style={{backgroundColor: ele.colors.hex}}></span> {ele.colors.name} </li>
                                            <li>{ele.quantity} </li>
                                            <li>{FormatPrice(ele.price)} </li>
                                            <li>{FormatPrice(ele.oldPrice)} </li>
                                        </ul>
                                    );
                                })}
                            </td>
                            <td className="actions">
                                <Link to={`/admin/product/update/edit/${product.id}`}> <button className="btn-edit"> <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg> </button> </Link>
                                <button className="btn-delete" onClick={()=>{
                                    Notification.confirm({
                                        title: "Delete",
                                        message: "Are you sure you want to delete this product?",
                                        handleAccept: ()=>{HandleDelete(product.id);},
                                        handleCancel: ()=>{return;},
                                        titleAccept: "Yes",
                                        titleCancel: "No"
                                    });
                                }}> 
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12 1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                                </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <div className={`image-review ${showImage?'':'image-review-hide'}`} style={{left: position.x, top: position.y}}> <img  src={imageReview} alt="image-review"/> </div>
            </div>
        :<EmptyPage data={products} query={query}/>}
        </div>
    );
}

export default List;

