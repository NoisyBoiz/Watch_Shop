const ResponseObj = (status, message, data = null) => {
    return {"status": status, "message": message, "data": data}
}

export default ResponseObj;