import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute'
import Dashboard from './user/UserDashboard'
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart'
import Info from './core/Info'
import UpdateProduct from './admin/UpdateProduct'

const Routes=()=>{
    return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/product/:productId" exact component={Product}/>
            <Route path="/shop" exact component={Shop}/>
            <Route path="/signin" exact component={Signin}/>
            <Route path="/signup" exact component={Signup}/>
            <Route path="/cart" exact component={Cart}/>
            <Route path="/info" exact component={Info}/>
            <PrivateRoute path="/user/dashboard" exact component={Dashboard}/>
            <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
            <AdminRoute path="/create/category" exact component={AddCategory}/>
            <AdminRoute path="/create/product" exact component={AddProduct}/>
            <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/>
        </Switch>
    </BrowserRouter>
    );
};

export default Routes;