import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import '../styles/updateProduct.css';
import watchService from "../services/watch.js";
import colorService from "../services/color.js";
import sizeService from "../services/size.js";
import Notification from '../components/notification.js';
import FormatPrice from '../functions/formatPrice.js';

function Add(){
    const {method} = useParams();
    const {id} = useParams();

    const [name, setName] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionErr, setDescriptionErr] = useState('');
    const [size, setSize] = useState('');
    const [sizeErr, setSizeErr] = useState('');
    const [dataImage, setDataImage] = useState([{id: null, url: "", urlErr: ""}]);
    const [dataDetail, setDataDetail] = useState([{id: null, id_color: "", quantity: "", price: "", oldPrice: "", colorErr: "", quantityErr: "", priceErr: "", oldPriceErr: ""}]);

    const [showImage, setShowImage] = useState(false);
    const [imageReview, setImageReview] = useState('');
    const [position, setPosition] = useState({x:0, y:0});

    const [listColor, setListColor] = useState([]);
    const [listSize, setListSize] = useState([]);
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        colorService.getAll().then((response) => {
            setListColor(response.data);
        });
        sizeService.getAll().then((response) => {
            setListSize(response.data);
        });
    }, []);

    useEffect(() => {
        if(method === "edit"){
            watchService.getById(id).then((response) => {
                let data = response.data;
                setName(data.name);
                setDescription(data.description);
                setSize(data.id_size);
                let dataImage = [];
                data.images.forEach(image => {
                    dataImage.push({id: image.id, url: image.url, urlErr: ""});
                });
                setDataImage(dataImage);
                let dataDetail = [];
                data.details.forEach(detail => {
                    dataDetail.push({id: detail.id, id_color: detail.id_color, quantity: ""+detail.quantity, price: ""+detail.price, oldPrice: "" + (detail.oldPrice===null?"":detail.oldPrice), colorErr: "", quantityErr: "", priceErr: "", oldPriceErr: ""});
                });
                setDataDetail(dataDetail);
            });
        }
        else{
            setName('');
            setDescription('');
            setSize('');
            setDataImage([{id: null, url: "", urlErr: ""}]);
            setDataDetail([{id: null, id_color: "", quantity: "", price: "", oldPrice: "", colorErr: "", quantityErr: "", priceErr: "", oldPriceErr: ""}]);
        }
    }, [id, method]);

    const AddDetail = () => {
        setDataDetail([...dataDetail, {id: null, id_color: "", quantity: "", price: "", oldPrice: "", colorErr: "", quantityErr: "", priceErr: "", oldPriceErr: ""}]);
    }

    const RemoveDetail = (index) => {
        let newData = [...dataDetail];
        newData.splice(index, 1);
        setDataDetail(newData);
    }

    const AddImage = () => {
        setDataImage([...dataImage, {id: null, url: "", urlErr: ""}]);
    }

    const RemoveImage = (index) => {
        let newData = [...dataImage];
        newData.splice(index, 1);
        setDataImage(newData);
    }

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

    const ChangeDataImage = (value, i) => {
        let newData = [...dataImage];
        newData[i].url = value;
        newData[i].id = null;
        setDataImage(newData);
    }

    const ChangeDataDetail = (e, i) =>{ 
        const {name, value} = e.target;
        let newData = [...dataDetail];
        newData[i][name] = value;
        newData[i].id = null;
        setDataDetail(newData);
    }
    
    const HandleSave = async () => {
        if(isLoad) return;
        let check = false;
        if(name.trim() === ""){
            setNameErr("Tên không được để trống");
            check = true;
        }
        else setNameErr("");
        if(description.trim() === "") {
            setDescriptionErr("Mô tả không được để trống");
            check = true;
        }
        else setDescriptionErr("");
        if(size === "") {
            setSizeErr("Size không được để trống");
            check = true;
        }
        else setSizeErr("");

        let dataImageSave = [];
        let newDataImage = [...dataImage];
        newDataImage.forEach(data => {
            dataImageSave.push({id: data.id, url: data.url.trim()});
            if(data.url.trim() === ""){
                data.urlErr = "Hình ảnh không được để trống";
                check = true;
            }
            else data.urlErr = "";
        });
        setDataImage(newDataImage);

        let dataDetailSave = [];
        let newdataDetail = [...dataDetail];
        newdataDetail.forEach(data => {
            dataDetailSave.push({id: data.id, id_color: Number(data.id_color), quantity: data.quantity.trim(), price: data.price.trim(), oldPrice: data.oldPrice.trim()});
            if(data.id_color === "") {
                data.colorErr = "Màu sắc không được để trống";
                check = true;
            }
            else data.colorErr = "";
            if(data.quantity.trim() === "") {
                data.quantityErr = "Số lượng không được để trống";
                check = true;
            }
            else data.quantityErr = "";
            if(data.price.trim() === "") {
                data.priceErr = "Giá không được để trống";
                check = true;
            }
            else data.priceErr = "";
        });
        setDataDetail(newdataDetail);

        console.log(dataImageSave, dataDetailSave);
        if(check) return;

        setIsLoad(true);
        Notification.load();
        if(method === "add"){
            let data = {
                name: name.trim(),
                description: description.trim(),
                id_size: Number(size),
                images: dataImageSave,
                details: dataDetailSave
            }
            await watchService.create(data).then((response) => {
                if(response?.status === 200) Notification.success2({title: "Success", message: "Thêm thành công", handleAccept: ()=>{window.location.href = "/admin/product/list"}, titleAccept: "OK"});
                else if(response?.status !== 403) Notification.error({title: "Error", message: response.message});
                setIsLoad(false);
            });
        }
        else{
            let data = {
                id: id,
                name: name.trim(),
                description: description.trim(),
                id_size: Number(size),
                images: dataImageSave,
                details: dataDetailSave
            }
            await watchService.update(data).then((response) => {
                if(response?.status === 200) Notification.success2({title: "Success", message: "Cập nhật thành công", handleAccept: ()=>{window.location.href = "/admin/product/list"}, titleAccept: "OK"});
                else if(response?.status !== 403) Notification.error({title: "Error", message: response.message});
                setIsLoad(false);
            });
        }  
    }

    const ResizeImage = async (url,index) => {
        let img = new Image();
        img.src = url;
        img.onload = () => {
            let o_width = img.width;
            let o_height = img.height;
            let ex_width = 512;
            let ex_height = 512;
            let scale = 1;
            if(o_width > ex_width || o_height > ex_height){
                if(o_width > o_height) scale = ex_width/o_width;
                else scale = ex_height/o_height;
            }
            else{
                ChangeDataImage(url, index);
                return;
            }
            let canvas = document.createElement("canvas");
            canvas.width = o_width*scale;
            canvas.height = o_height*scale;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, o_width*scale, o_height*scale);
            ChangeDataImage(canvas.toDataURL("image/jpeg"), index);
        }
    }

    return (
        <div className='add-container'>
            <h1 className='title'> {method === "add"?"Thêm sản phẩm":"Cập nhật sản phẩm"} </h1>
            <div className="box-container top">
                <div className='form-group'>
                    <label> Tên <span className='asterisk-required'> * </span> </label>
                    <input type="text" placeholder="Name" className='name' value={name} onChange={(e)=>setName(e.target.value)}></input>
                    <p className="error-message"> {nameErr} </p>
                </div>
                <div className='form-group'>
                    <label> Mô tả <span className='asterisk-required'> * </span> </label>
                    <textarea type="text" placeholder="Description" className='description' value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                    <p className="error-message"> {descriptionErr} </p>
                </div>
                <div className='form-group'>
                    <label> Kích cỡ <span className='asterisk-required'> * </span> </label>
                    <select className="size-select" name="id_size" onChange={(e)=>{setSize(e.target.value)}}>
                        <option value="" style={{backgroundColor: '#ffffff'}}> -- Chọn size -- </option>
                        {listSize.map((sz, index) => {
                            return (
                                <option key={index} value={sz.id} selected={sz.id===size}>
                                    {sz.name}
                                </option>
                            )
                        })}
                    </select>
                    <p className="error-message"> {sizeErr} </p>
                </div>
            </div>

            <div className='box-container middle'>
                <div className='form-group'>
                    <label> Hình ảnh <span className='asterisk-required'> * </span> </label>
                    <button className='btn-add' onClick={()=>AddImage()}> <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M416 277.333H277.333V416h-42.666V277.333H96v-42.666h138.667V96h42.666v138.667H416v42.666z"></path></svg> </button>
                </div>
                <ul className='images'>
                    {dataImage.map((data, index) => {
                        return (
                            <li className='image' key={index}>
                                <div className='input-box'>
                                    <input type='file' onChange={(e)=>{
                                        let file = e.target.files[0];
                                        let reader = new FileReader();
                                        reader.onload = (e) => ResizeImage(e.target.result, index);
                                        reader.readAsDataURL(file);
                                    }}></input>

                                    <input type="text" placeholder="VD: https://abcdef" value={data.url} onChange={(e)=>{ChangeDataImage(e.target.value, index)}}></input>

                                    <span className='eye' onMouseEnter={(e)=>{setImageReview(data.url); CalculatePosition(e); setShowImage(true)}} onMouseLeave={()=>{setShowImage(false); setPosition({x:0,y:0})}}> <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path></svg> </span>
                                    {dataImage.length>1?<button className='btn-remove' onClick={()=>RemoveImage(index)}> <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M18 11h-12c-1.104 0-2 .896-2 2s.896 2 2 2h12c1.104 0 2-.896 2-2s-.896-2-2-2z"></path></svg> </button>:""}
                                </div>
                                <p className="error-message"> {data.urlErr} </p>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className='box-container bottom'>
                <button className='btn-add' onClick={()=>AddDetail()}> <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M416 277.333H277.333V416h-42.666V277.333H96v-42.666h138.667V96h42.666v138.667H416v42.666z"></path></svg> </button>
                <ul className='details'>
                    {dataDetail.map((detail, index) => {
                        return (
                        <li className='detail'>
                            <div className='form-group'>
                                <div className='form-input'>
                                    <label> Màu sắc <span className='asterisk-required'> * </span> </label>
                                    <div className="select-color">
                                        <select className="color-select" name="id_color" onChange={(e)=>{ChangeDataDetail(e,index)}} style={{backgroundColor: listColor.find((x)=>x.id===Number(detail.id_color))?.hex}}>
                                            <option value="" style={{backgroundColor: '#ffffff'}}> -- Chọn màu -- </option>
                                            {listColor.map((color, index) => {
                                                return (
                                                    <option key={index} value={color.id} style={{backgroundColor: color.hex}} selected={detail.id_color===color.id}>
                                                        {color.name}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                        {dataDetail.length>1?<button className='btn-remove' onClick={()=>RemoveDetail(index)}> <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M18 11h-12c-1.104 0-2 .896-2 2s.896 2 2 2h12c1.104 0 2-.896 2-2s-.896-2-2-2z"></path></svg> </button>:""}
                                    </div>
                                </div>
                                <p className="error-message"> {detail.colorErr} </p>
                            </div>
                            <div className='form-group'>
                                <div className='form-input'>
                                    <label> Số lượng <span className='asterisk-required'> * </span> </label>
                                    <input type="text" placeholder='VD: 10' className='quantity' name="quantity" value={detail.quantity} onChange={(e)=>{ChangeDataDetail(e,index)}}></input>
                                </div>
                                <p className="error-message"> {detail.quantityErr} </p>
                            </div>
                            <div className='form-group'>
                                <div className='form-input'>
                                    <label> Giá <span className='asterisk-required'> * </span> </label>
                                    <div className='price-input'>
                                        <input type="text" placeholder='VD: 1000000' className='price' name="price" value={detail.price} onChange={(e)=>{ChangeDataDetail(e,index)}}></input>
                                        <span> {FormatPrice(detail.price)} </span>
                                    </div>
                                </div>
                                <p className="error-message"> {detail.priceErr} </p>
                            </div>
                            <div className='form-group'>   
                                <div className='form-input'>
                                    <label> Giá gốc </label>
                                    <div className='price-input'>
                                        <input type="text" placeholder='VD: 1500000' className='old-price' name="oldPrice" value={detail.oldPrice} onChange={(e)=>{ChangeDataDetail(e,index)}}></input>
                                        <span> {FormatPrice(detail.oldPrice)} </span>
                                    </div>
                                </div>
                                <p className="error-message"> {detail.oldPriceErr} </p>
                            </div>
                        </li>
                        )
                    })}
                </ul>
            </div> 
            <button className='btn-save' onClick={()=>HandleSave()}> Save </button>
            <div className={`image-review ${showImage?'':'image-review-hide'}`} style={{left: position.x, top: position.y}}> <img  src={imageReview} alt="image-review"/> </div>
        </div>
    )
}

export default Add;