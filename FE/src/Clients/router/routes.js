import Home from "../pages/home.js";
import ProductDetail from "../pages/productDetail.js";

export const publicClientRoutes = [
    {path:"/home", layout:"Layout", component: Home},
    {path:"/product/:id", layout:"Layout", component: ProductDetail},
];