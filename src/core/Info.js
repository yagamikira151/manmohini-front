import React from 'react'
import Layout from './Layout'
import '../styles.css'

const Info=()=>{
    const DealerInfo=()=>{
        return(
            <div className="card mt-5" style={{backgroundColor:'skyblue'}}>
                <h3 className="card-header">Dealer Info</h3>
                <ul className="list-group">
                    <li className="list-group-item" >Ekta Sinha</li>
                    <li className="list-group-item"><a href="collectionmanmohini@gmail.com">collectionmanmohini@gmail.com</a></li>
                    <li className="list-group-item"><a href="#">+91 9421898342</a></li>
                    <li className="list-group-item">Manmohini Collection <br/>Shop No.04 Ground Floor, Aaji Aura City <br/>Sr.No 276/1/2, H No. 1/2 Sathe Wasti<br/> Lohegaon, Pune City<br/>Pune- 411047</li>
                </ul>
            </div>
        )
    }
    const ShopImage=()=>{
        return(
            <div key className="row">
                <div className="col-sm-12 col-md-6">
                <img style={{maxHeight:'100%',maxWidth:'100%'}} src="logo.jpeg"/>
                </div>
                <div className="col-sm-12 col-md-6">
                <img style={{maxHeight:'100%',maxWidth:'100%'}} src="2.jpeg"/>
                </div>
            </div>
        )
    }
    return (
    <Layout title="Dealer Info" description="Please Contact Us Here" className="container-fluid">
        <div className="row">
            <div className="col-sm-12 col-md-4">
                {DealerInfo()}
            </div>
            <div className="col-sm-12 col-md-8">
                {ShopImage()}
            </div>
        </div>
    </Layout>
    )
};

export default Info;