import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import "../styles/updateColor.css";
import SizeService from "../services/size.js";
import Notification from "../components/notification.js";

function UpdateSize() {
    const {method} = useParams();
    const {id} = useParams();
    const [size, setSize] = useState({name: "", nameError: ""})
    const [isLoad, setIsLoad] = useState(false);

    useEffect(()=>{
        if(method === "edit"){
            SizeService.getById(id).then(res=>{
                setSize(res.data)
            })
        }
    },[id, method])

    const HandleChange = (e) => {
        let {name, value} = e.target;
        if(name === "hex") if(value.length > 7) return;
        setSize({...size, [name]: value})
    }

    const HandleSave = async () => {
        if(isLoad) return;
        let check = false;
        let data = {...size}
        if(size.name === ""){
            check = true;
            data.nameError = "Name is required";
        }
        else data.nameError = "";
        
        setSize(data);
        if(check) return;

        setIsLoad(true);
        Notification.load();
        if(method === "add"){
            let data = {name: size.name}
            await SizeService.create(data).then(response=>{
                if(response.status === 200) Notification.success2({title: "Success", message: "Create size successfully", handleAccept: ()=>{window.location.href = "/admin/size/list"}, titleAccept: "OK"});
                else if(response?.status !==403) Notification.error({title: "Error", message: response.message});
                setIsLoad(false);
            })
        }
        else{
            let data = {id: id, name: size.name}
            await SizeService.update(data).then(response=>{
                if(response.status === 200) Notification.success2({title: "Success", message: "Update size successfully", handleAccept: ()=>{window.location.href = "/admin/size/list"}, titleAccept: "OK"});
                else if(response?.status !==403) Notification.error({title: "Error", message: response.message});
                setIsLoad(false);
            })
        }
    }

    return (
        <div className="update-color">
            <h1 className='title'>{method==='add'?"Thêm size":"Cập nhật size"}</h1>
            <div className="form-group">
                <label>Name <span className='asterisk-required'> * </span></label>
                <input className="input-name" name="name" type="text" value={size.name} onChange={(e)=>HandleChange(e)}/>
                <p className='error-message'> {size.nameError} </p>
            </div>
            <button className="btn-save" onClick={()=>HandleSave()}> Save </button>
        </div>
    );
}

export default UpdateSize;