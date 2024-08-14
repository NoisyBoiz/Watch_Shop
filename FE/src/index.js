import React  from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom" 
import ReactDOM from 'react-dom/client';
import {publicAdminRoutes} from './Admins/router/routes';
import {publicClientRoutes} from './Clients/router/routes';

import AdminLayout from './Admins/layout';
import ClientLayout from './Clients/layout';

import "./index.css";

function Main(){
  return(
    <>
      <Router>
        <Routes>
          {publicAdminRoutes.map((route,index)=>{
            const LayoutPage = route.layout===null?React.Fragment:AdminLayout;
            return(
              <Route key={index} path={route.path} element={<LayoutPage><route.component/></LayoutPage>}/>
            )
          })}

          {publicClientRoutes.map((route,index)=>{
            const LayoutPage = route.layout===null?React.Fragment:ClientLayout;
            return(
              <Route key={index} path={route.path} element={<LayoutPage><route.component/></LayoutPage>}/>
            )
          })}
        </Routes>
      </Router>
    </>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main/>);

