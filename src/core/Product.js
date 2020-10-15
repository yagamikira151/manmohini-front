import React, { useState,useEffect } from 'react'
import Layout from './Layout'
import {read} from './apiCore'
import Card from './Card'

const Product=(props)=>{
    const [product,setProduct]=useState({})
    const [error,setError]=useState(false)
    
    const loadSingleProduct=productId=>{
        read(productId).then(data=>{
            if(data.error){
                setError(data.error)
            }
            setProduct(data);
        })
    }
    useEffect(()=>{
        const productId=props.match.params.productId
        loadSingleProduct(productId)
    },[])
    return(
        <Layout title={product?product.name:"Welcome to Manmohini Collections"} description="Happy Shopping" className="container-fluid">
            <div className="row">
                {product&&product.description&&<Card product={product} view="full" />}
            </div>
        </Layout>
    )
}

export default Product;