import React, { useState,useEffect } from 'react'
import Layout from './Layout'
import {getProducts} from './apiCore'
import Card from './Card'
import Search from './Search'

const Home=()=>{
    const [productBySell,setProductBySell]=useState([])
    const [productByArrival,setProductByArrival]=useState([])
    const [error,setError]=useState(false)

    const loadProductBySell=()=>{
        getProducts('sold').then(data=>{
            if(data.error){
                setError(data.error)
            }
            else{
                setProductBySell(data)
            }
        })
    }
    const loadProductByArrival=()=>{
        getProducts('createdAt').then(data=>{
            if(data.error){
                setError(data.error)
            }
            else{
                setProductByArrival(data)
            }
        })
    }

    useEffect(() => {
        loadProductByArrival();
        loadProductBySell();
    }, [])
    const showError=()=>(
        <div className="alert alert-danger" style={{display:error?'':'none'}}>
            Unable To Fetch The Products
        </div>
    )
    return (
    <Layout title="Home Page" description="Manmohini Collection" className="container-fluid">
        <Search/>
        {showError}
       <h2 className="mb-4">New Arrivals</h2>
       <div className="row">
            {productByArrival.map((p,i)=>(
            <div key={i} className="col-4 mb-3">
                <Card product={p}/>
            </div>
            ))}
       </div>
       <h2 className="mb-4">Best Seller</h2>
       <div className="row">
            {productBySell.map((p,i)=>(
            <div key={i} className="col-4 mb-3">
                <Card product={p}/>
            </div>
            ))}
       </div>
    </Layout>
    )
};

export default Home;