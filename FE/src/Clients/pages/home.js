import React, {useState, useEffect} from "react";
import "../styles/home.css";
import WatchService from "../services/watch.js";
import ColorService from "../services/color.js";
import ProductCard from "../components/productCard.js";

import EmptyPage from "../../Admins/components/emptyPage.js";
import Pagination from "../../Admins/components/pagination.js";
import SizeService from "../services/size.js";

function Home() {
    const [allProducts, setAllProducts] = useState(null);
    const [products, setProducts] = useState(null);
    const [query, setQuery] = useState("");
    const [listColor, setListColor] = useState([]);
    const [listSize, setListSize] = useState([]);
    
    const [totalPages, setTotalPages] = useState(0);
    const [indexPage, setIndexPage] = useState(0);
    const [cardPerPage, setCardPerPage] = useState(32);
    
    const [indexFilterPrice, setIndexFilterPrice] = useState(null);
    const [indexFilterColor, setIndexFilterColor] = useState(null);
    const [indexFilterSize, setIndexFilterSize] = useState(null);

    const filterPrice = [
        {name: "< 1.000.000đ", min: 0, max: 1000000},
        {name: "1.000.000đ - 2.000.000đ", min: 1000000, max: 2000000},
        {name: "2.000.000đ - 3.000.000đ", min: 2000000, max: 3000000},
        {name: "3.000.000đ > ", min: 3000000, max: 9999999999},
    ]
    const listCardPerPage = [16, 24, 32];

    useEffect(() => {
        ColorService.getAll().then(res=>{
            setListColor(res.data)
        })
        SizeService.getAll().then(res=>{
            setListSize(res.data)
        })
    }, []);

    useEffect(() => {
        WatchService.getAll().then((response) => {
            HandleSetAllProducts(response.data);
        });
        // eslint-disable-next-line
    }, [indexFilterPrice, indexFilterColor, indexFilterSize]);

    const getProductByName = () => {
        let q = document.querySelector(".search-input").value;
        setQuery(q);
        if(q === ""){
            WatchService.getAll().then((response) => {
                HandleSetAllProducts(response.data);
            });
        }
        else{
            WatchService.getByName(q).then((response) => {
                console.log(response.data);
                HandleSetAllProducts(response.data);
            });
        }
    }

    const HandleSetAllProducts = (data) => {
        if(indexFilterPrice!==null){
            let arr = [];
            data.forEach(product => {
                let range = GetRangePrice(product);
                let min = filterPrice[indexFilterPrice].min;
                let max = filterPrice[indexFilterPrice].max;
                if((min < range.min && range.min <= max) || (min < range.max && range.max <= max)) arr.push(product);
            });
            data = arr;
        }
        if(indexFilterSize!==null){
            let arr = [];
            data.forEach(product => {
                if(product?.id_size === indexFilterSize) arr.push(product);
            });
            data = arr;
        }
        if(indexFilterColor!==null){
            let arr = [];
            data.forEach(product => {
                product.details.forEach(detail => {
                    if(indexFilterColor.includes(detail?.id_color)){
                        if(!arr.includes(product)) arr.push(product);
                    }
                });
            });
            data = arr;
        }
        setAllProducts(data);
        setIndexPage(1);
        setTotalPages(Math.ceil(data.length/cardPerPage));
        setProducts(data.slice(0, cardPerPage));
    }

    useEffect(() => {
        if(allProducts!==null){
            let start = (indexPage-1)*cardPerPage;
            let end = indexPage*cardPerPage;
            setProducts(allProducts.slice(start, end));
        }
        // eslint-disable-next-line
    }, [allProducts, indexPage]);

    useEffect(() => {
        if(allProducts!==null){
            setTotalPages(Math.ceil(allProducts.length/cardPerPage));
            setIndexPage(1);
            setProducts(allProducts.slice(0, cardPerPage));
        }
        // eslint-disable-next-line
    }, [cardPerPage]);

    const HandleSort = (value) => {
        let temp = allProducts;
        if(value === "null"){
            WatchService.getAll().then((response) => {
                HandleSetAllProducts(response.data);
            });
        }
        else if(value === "price.asc"){
            temp.sort((a, b) => {
                return GetRangePrice(a).min - GetRangePrice(b).min;
            });
        }
        else if(value === "price.des"){
            temp.sort((a, b) => {
                return GetRangePrice(b).min - GetRangePrice(a).min;
            });
        }
        HandleSetAllProducts(temp);
    }

    const GetRangePrice = (product) => {
        let min = null;
        let max = null;
        product?.details?.forEach(element => {
            if(min === null || element.price < min) min = element.price;
            if(max === null || element.price > max) max = element.price;
        });
        return {min: min, max: max};
    }

    const HandleFilter = (setIndex, preIndex, newIndex, multi= false) => {
        if(multi){
            let rs = [];
            if(preIndex!==null) rs = [...preIndex];
            if(preIndex!==null&&preIndex.includes(newIndex)) rs = preIndex.filter(element=>element!==newIndex);
            else rs.push(newIndex);
            if(rs.length===0) setIndex(null);
            else setIndex(rs);
        }
        else{
            if(preIndex === newIndex) setIndex(null);
            else setIndex(newIndex);
        }
    }

    return (
        <div className="cl-home">
            <div className="poster">
                <div className="poster-content">
                    <h1> TUẤN NGHĨA <br/> APPLE WATCH </h1>    
                    <h2> UY TÍN - CHẤT LƯỢNG </h2>
                    <p className="phone"> <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"></path></svg> 037.345.4444 </p>
                    <p className="address"> <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z"></path></svg> 89 Lương Định Của </p>
                </div>  
                <img src="https://png.pngtree.com/png-vector/20240309/ourmid/pngtree-the-smartwatch-banner-png-image_11919210.png" alt="poster"/>
            </div>
            <div className="home-content"> 
                <div className="filter-container">
                    <div className="search-container"> 
                        <input className="search-input" type="text" placeholder="Tìm kiếm sản phẩm" onKeyDown={(e)=>{if(e.key === "Enter") getProductByName();}}></input>
                        <button onClick={()=>getProductByName()}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M456.69 421.39 362.6 327.3a173.81 173.81 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3zM97.92 222.72a124.8 124.8 0 1 1 124.8 124.8 124.95 124.95 0 0 1-124.8-124.8z"></path></svg></button>
                    </div>
                    <div className="top"> 
                        <h1> Bộ lọc </h1>
                        <button className="btn-unfilter" onClick={()=>{setIndexFilterPrice(null); setIndexFilterColor(null);}} disabled={(indexFilterColor!==null||indexFilterPrice!==null)?false:true}> Bỏ lọc </button>
                    </div>
                    <div className="bottom">
                        <div className="price">
                            <h3> Giá </h3>
                            <ul>
                                {filterPrice.map((price, index) => {
                                    return (
                                        <li key={index} className={indexFilterPrice===index?"active":""} onClick={()=>{HandleFilter(setIndexFilterPrice, indexFilterPrice, index)}}> {price.name} </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="size">
                            <h3> Kích cỡ </h3>
                            <ul>
                                {listSize.map((size, index) => {
                                    return (
                                        <li key={index} className={indexFilterSize===size.id?"active":""} onClick={()=>{HandleFilter(setIndexFilterSize, indexFilterSize, size.id)}}> {size.name} </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="color">
                            <h3> Màu sắc </h3>
                            <ul>
                                {listColor.map((color, index) => {
                                    return (
                                        <li key={index} className={indexFilterColor!==null&&indexFilterColor.includes(color.id)?"active":""} style={{backgroundColor: color.hex, border: (color.hex==="#ffffff"?"0.01rem solid #000":"")}} onClick={()=>{HandleFilter(setIndexFilterColor, indexFilterColor, color.id, true)}} data-color={color.name}> </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="product-container">
                    {products!==null&&products.length>0?
                        <div>
                            <div className="options">
                                <div className="show">
                                    <h3> Hiển thị </h3>
                                    <select onChange={(e)=>{setCardPerPage(e.target.value)}}>
                                        {listCardPerPage.map((card, index) => {
                                            return (
                                                <option key={index} value={card} selected={cardPerPage===card?true:false}> {card} </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="sort">
                                    <h3> Sắp xếp </h3>
                                    <select onChange={(e)=>{HandleSort(e.target.value)}}>
                                        <option value={"null"}> Không sắp sếp </option>
                                        <option value={"price.asc"}> Giá tăng dần </option>
                                        <option value={"price.des"}> Giá giảm dần </option>
                                    </select>
                                </div>
                            </div>
                            <div className="products-list">
                                {products.map((product, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <ProductCard product={product}/>
                                        </React.Fragment>
                                    );
                                })
                                }
                            </div>
                            <Pagination totalPages={totalPages} indexPage={indexPage} setIndexPage={setIndexPage} showPagination={true}/>
                        </div>
                    :<EmptyPage data={products} query={query}/>}
                </div>
            </div>
        </div>
    );
}

export default Home;