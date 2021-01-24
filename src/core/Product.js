import React, { useState,useEffect } from 'react'
import Layout from './Layout'
import {read,listRelated} from './apiCore'
import Card from './Card'

const Product=(props)=>{
    const [product,setProduct]=useState({})
    const [relatedProduct,setrelatedProduct]=useState([])
    const [error,setError]=useState(false)
    

    const loadSingleProduct=productId=>{
        read(productId).then(data=>{
            if(data.error){
                setError(data.error)
            }
            else{
                setProduct(data);
                listRelated(data._id).then(data=>{
                    if(data.error){
                        setError(data.error)
                    }else{
                        setrelatedProduct(data);
                    }
                })
            }
        })
    }
    useEffect(()=>{
        const productId=props.match.params.productId
        loadSingleProduct(productId)
    },[props])
    return(
        <Layout title={product?product.name:"Welcome to Manmohini Collections"} description="Happy Shopping" className="container-fluid">
            <div className="row">
                <div className="col-sm-12 col-md-8 mt-3">
                    {product&&product.description&&<Card product={product} view={false} />}
                </div>
                <div className="col-sm-12 col-md-4">
                    <h4 style={{textAlign:'center'}}>Related Products</h4>
                    {relatedProduct.map((p,i)=>(
                        <div className="mb-3">
                            <Card key={i} product={p}/>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Product;