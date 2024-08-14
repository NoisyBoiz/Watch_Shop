import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import "../styles/updateColor.css";
import ColorService from "../services/color.js";
import Notification from "../components/notification.js";

function UpdateColor() {
    const {method} = useParams();
    const {id} = useParams();
    const [color, setColor] = useState({name: "", hex: "", nameError: "", hexError: ""})
    const [isLoad, setIsLoad] = useState(false);

    useEffect(()=>{
        if(method === "edit"){
            ColorService.getById(id).then(res=>{
                setColor(res.data)
            })
        }
    },[id, method])

    const HandleChange = (e) => {
        let {name, value} = e.target;
        if(name === "hex") if(value.length > 7) return;
        setColor({...color, [name]: value})
    }

    const HandleSave = async () => {
        if(isLoad) return;
        let check = false;
        let data = {...color}
        if(color.name === ""){
            check = true;
            data.nameError = "Name is required";
        }
        else data.nameError = "";
        if(color.hex === ""){
            check = true;
            data.hexError = "Hex is required";
        }
        else data.hexError = "";
        console.log(data)
        setColor(data);
        if(check) return;

        setIsLoad(true);
        Notification.load();
        if(method === "add"){
            let data = {name: color.name, hex: color.hex}
            await ColorService.create(data).then(response=>{
                if(response.status === 200) Notification.success2({title: "Success", message: "Create color successfully", handleAccept: ()=>{window.location.href = "/admin/color/list"}, titleAccept: "OK"});
                else if(response?.status !==403) Notification.error({title: "Error", message: response.message});
                setIsLoad(false);
            })
        }
        else{
            let data = {id: id, name: color.name, hex: color.hex}
            await ColorService.update(data).then(response=>{
                if(response.status === 200) Notification.success2({title: "Success", message: "Update color successfully", handleAccept: ()=>{window.location.href = "/admin/color/list"}, titleAccept: "OK"});
                else if(response?.status !==403) Notification.error({title: "Error", message: response.message});
                setIsLoad(false);
            })
        }
    }

    return (
        <div className="update-color">
            <h1 className='title'>{method==='add'?"Thêm màu":"Cập nhật màu"}</h1>
            <div className="form-group">
                <label>Name <span className='asterisk-required'> * </span></label>
                <input className="input-name" name="name" type="text" value={color.name} onChange={(e)=>HandleChange(e)}/>
                <p className='error-message'> {color.nameError} </p>
            </div>
            <div className="form-group">
                <label>Hex <span className='asterisk-required'> * </span></label>
                <div className="input-color-box">
                    <input name="hex" type="color" value={color.hex} onChange={(e)=>HandleChange(e)}/>
                    <input name="hex" type="text" value={color.hex} onChange={(e)=>HandleChange(e)}/>
                </div>
                <p className='error-message'> {color.hexError} </p>
            </div>
            <button className="btn-save" onClick={()=>HandleSave()}> Save </button>
        </div>
    );
}

export default UpdateColor;