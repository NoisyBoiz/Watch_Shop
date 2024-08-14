import Notification from "../components/notification.js";

const path = "http://localhost:3005";

const Fetch = {
    get: async (url) => {
        try{
            const response = await fetch(
                path + url,
                {
                    method: "get",
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            );
            if(response?.status === 404) return {status: 404, message: "Not found"};
            const res = await response.json();
            return res;
        }
        catch(err){
            return {status: 500, message: err.message};
        }
    },
    post: async (url, data) => {
        return common(url, data, "post");
    },

    put: async (url, data) => {
        return common(url, data, "put");
    },

    delete: async (url, data) => {
        return common(url, data, "delete");
    },

    logout: async () => {
        let token = localStorage.getItem('user')!==null?JSON.parse(localStorage.getItem('user')).token:"";
        await fetch(path+"/admins/logout", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': token
            },
        })
        localStorage.removeItem("user");
        window.location.href = "/admin/login";
    }
}

const common = async (url, data, method) => {
    let token = localStorage.getItem('user')!==null?JSON.parse(localStorage.getItem('user')).token:"";
    try{
        const response = await fetch(
            path + url,
            {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': token
                },
                body: JSON.stringify(data)
            }
        );
        if(response?.status === 404) return {status: 404, message: "Not found"};
        const res = await response.json();
        if(res.status === 403){
            Notification.warning2({
                title: "Error",
                message: "Login session ended!",
                handleAccept: ()=>{Fetch.logout()},
                titleAccept: "Login"  
            })
        }
        return res;
    }
    catch(err){
        return {status: 500, message: err.message};
    }
}

export default Fetch;