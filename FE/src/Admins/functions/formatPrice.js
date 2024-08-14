const FormatPrice = (price) => {
    if(price === null || price === 0 || price === undefined || price === "") return "";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+"đ";
}

export default FormatPrice;