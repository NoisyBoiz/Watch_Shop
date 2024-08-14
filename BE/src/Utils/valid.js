const Valid = {
    isEmpty: (value) => {
        if(value == "") return true;
        if(value == null) return true;
        if(value == undefined) return true;
        return false;
    },
    isEmail: (value) => {
        const reg = /\S+@\S+\.\S+/;
        return reg.test(value);
    },
    isPassword: (value) => {
        const reg = /[\d\w]{6,30}/;
        return reg.test(value);
    },
    isName: (value) => {
        const reg = /^[a-zA-Z\S]{1,50}$/;
        return reg.test(value);
    },
    isNameVI: (value) => {
        const reg = /[a-zA-Zăắằẳẵặâấầẩẫậđêếềểễệôốồổỗộơớờởỡợưứừửữự\S]+/;
        return reg.test(value);
    },
    isString: (value) => {
        const reg = /^[a-zA-Z0-9 ]{1,30}$/;
        return reg.test(value);
    },
    isNumber: (value) => {
        const reg = /[0-9]/;
        return reg.test(value);
    },
    isDescription: (value) => {
        const reg = /[a-zA-Z0-9-,."'? ]/;
        return reg.test(value);
    },
    isUrl: (value) => {
        const reg = /^(http|https):\/\/[^ "]+$/;
        return reg.test(value);
    },
    isHex: (value) => {
        const reg = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        return reg.test(value);
    },
    isBase64: (value) => {
        const reg = /^data:image\/[a-zA-Z]*;base64,/;
        return reg.test(value);
    },
}

export default Valid;