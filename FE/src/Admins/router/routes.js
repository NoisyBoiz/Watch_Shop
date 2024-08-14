import AdminHome from "../pages/home.js";
import ProductDetail from "../pages/productDetail.js";
import ListProduct from "../pages/listProduct.js";
import UpdateProduct from "../pages/updateProduct.js";
import ListColor from "../pages/listColor.js";
import UpdateColor from "../pages/updateColor.js";
import listSize from "../pages/listSize.js";
import UpdateSize from "../pages/updateSize.js";
import ChangePassword from "../pages/changePassword.js";
import Login from "../pages/login.js";

export const publicAdminRoutes = [
    {path:"/admin/home", layout:"Layout", component: AdminHome},
    {path:"/admin/product/:id", layout:"Layout", component: ProductDetail},
    {path:"/admin/product/list", layout:"Layout", component: ListProduct},
    {path:"/admin/product/update/:method/:id", layout:"Layout", component: UpdateProduct},
    {path:"/admin/color/list", layout:"Layout", component: ListColor},
    {path:"/admin/color/update/:method/:id", layout:"Layout", component: UpdateColor},
    {path:"/admin/size/list", layout:"Layout", component: listSize},
    {path:"/admin/size/update/:method/:id", layout:"Layout", component: UpdateSize},
    {path:"/admin/changePassword", layout:"Layout", component: ChangePassword},
    {path:"/admin/login", layout:null, component: Login}
];