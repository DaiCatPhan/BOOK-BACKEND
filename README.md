# BOOK-BACKEND

# Controller

try {
return res.json( {
EM: data.EM,
EC: data.EC,
DT: data.DT,
});
} catch (error) {
console.log(">>> error", error);
}

### Service

try {

}catch(error) {
console.log('>>> error' , error);
return {
EM : " Lỗi server",
EC: -5,
DT: []
}
}
