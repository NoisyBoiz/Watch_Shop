import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "../styles/listProduct.css";
import SizeService from "../services/size.js";
import Notification from "../components/notification.js";

function ListSize() {
    const [sizes, setSizes] = useState([]);
    useEffect(()=>{
        SizeService.getAll().then(res=>{
            setSizes(res.data)
        })
    },[])

    const HandleDelete = async (id) =>{
        Notification.load()
        await SizeService.delete(id).then((response) =>{
            if(response?.status === 200) {setSizes(sizes.filter((x) => x.id !== id)); Notification.close();}
            else if(response?.status !== 403) Notification.error({title: "Error", message: response.message});
        });
    }

    return (
        <div className="list">
            <h1>Color List</h1>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sizes.map((color,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{color.id}</td>
                                    <td>{color.name}</td>
                                    <td className="actions">
                                    <Link to={`/admin/size/update/edit/${color.id}`}> <button className="btn-edit"> <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg> </button> </Link>
                                    <button className="btn-delete" onClick={()=>{
                                        Notification.confirm({
                                            title: "Delete",
                                            message: "Are you sure you want to delete this size?",
                                            handleAccept: ()=>{HandleDelete(color.id);},
                                            handleCancel: ()=>{return;},
                                            titleAccept: "Yes",
                                            titleCancel: "No"
                                        });
                                    }}> 
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12 1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                                    </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListSize;