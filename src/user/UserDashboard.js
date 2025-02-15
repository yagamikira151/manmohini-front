import React from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import { Link } from 'react-router-dom'

const Dashboard=()=>{
    const {user:{name,email,role}}=isAuthenticated()
    const userLinks=()=>{
        return (
            <div className="card">
                <h4 className="card-header">User-Links</h4>
                <ul className="list-group">
                    <li className="list-group-item"><Link className="nav-link" to="/cart">My Cart</Link></li>
                    <li className="list-group-item"><Link className="nav-link" to="/profile/update">Update Profile</Link></li>
                </ul>
            </div>
        )
    }
    const userInfo=()=>{
        return(
            <div className="card mb-5">
                <h3 className="card-header">User Info</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role?"Admin":"Registered User"}</li>
                </ul>
            </div>
        )
    }
    const purchaseHistory =()=>{
        return (
            <div className="card mb-5">
                <h3 className="card-header">Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">History</li>
                </ul>
            </div>
        );
    }
    return (
        <Layout title="Dashboard" description={`G'day ${name}`} className="container">
            <div className="row">
                <div className="col-sm-12 col-md-4">
                    {userLinks()}
                </div>
                <div className="col-sm-12 col-md-8">
                    {userInfo()}
                    {purchaseHistory()}
                </div>
            </div>  
        </Layout>
    )
}

export default Dashboard;