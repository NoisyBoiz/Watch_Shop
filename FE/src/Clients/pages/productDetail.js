import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import WatchService from "../services/watch.js";
import FormatPrice from "../../Admins/functions/formatPrice.js";

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [indexImage, setIndexImage] = useState(0);
    const [listImage, setListImage] = useState([]);
    const [indexListImage, setIndexListImage] = useState(0);
    const [indexColor, setIndexColor] = useState(0);

    useEffect(() => {
        WatchService.getById(id).then((response) => {
            setIndexImage(0);
            setIndexListImage(0);
            setProduct(response.data);
            splitListImage(response.data.images, 0);
        });
        // eslint-disable-next-line
    }, []);

    const splitListImage = (images, index) => {  
        setListImage(images.slice(index*4, (index+1)*4));
    }

    return (
        <>
        {product!==null?
            <div className="product-detail">
                <div className="image-container">
                    <img className="main-image" src={product?.images[indexImage]?.url} alt="product"></img>
                    <ul className="list-image">
                        {listImage.map((element, index) => {
                            return (
                                <li key={index} className={index+indexListImage*4===indexImage?"active":""}>
                                    <img src={element.url} alt="product" onClick={()=>setIndexImage(indexListImage*4+index)}></img>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="btn-carousel">
                        {Math.ceil(product?.images?.length/4)>1?Array.from({length: Math.ceil(product?.images?.length/4)}, (v, k) => k).map((element, index) => {
                            return (
                                <button key={index} className={index===indexListImage?"active":""} onClick={()=>{splitListImage(product.images, index); setIndexListImage(index)}}> </button>
                            )
                        }):""}
                    </div>
                </div>
                <div className="content">
                    <p className="product-name"> {product.name} </p>
                    <div className="content-group">
                        <p className="title"> Kích cỡ: </p>
                        <div> {product?.sizes.name} </div>
                    </div>
                    <div className="content-group">
                        <p className="title"> Màu sắc: </p>
                        <div className="list-color">
                            {product?.details.map((detail, index) => {
                                return (
                                    <li key={index} onClick={()=>{setIndexColor(index)}} data-color={detail.colors.name}>
                                        <div style={{backgroundColor: detail.colors.hex, border: (detail.colors.hex==="#ffffff"?"0.01rem solid #000":"")}} className={index===indexColor?"active":""}></div>
                                    </li>
                                );
                            })}
                        </div>
                    </div>
                    <div className="content-group">
                        <p className="title"> Giá: </p>
                        <div className="price"> {FormatPrice(product?.details[indexColor]?.price)}  <span className="old-price"> {FormatPrice(product?.details[indexColor]?.oldPrice)} </span> </div>
                    </div>
                    <div className="content-group">
                        <p className="title"> Số lượng: </p>
                        <div> {product?.details[indexColor]?.quantity} </div>
                    </div>
                    <p className="title des"> Mô tả: </p>
                    <div> 
                        {product.description.split(/\n/g).map(e=>{
                            return (
                                <>{e}<br/></>
                            );
                        })} 
                    </div>
                </div>
            </div>
        :""}
        </>
    );
}

export default ProductDetail;