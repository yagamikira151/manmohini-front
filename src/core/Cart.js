import React, { useState,useEffect } from 'react'
import Layout from './Layout'
import {getCart,removeItem} from './cartHelpers'
import Card from './Card'
import { Link } from 'react-router-dom'

const Cart=()=>{
    const [items ,setItem]=useState([])
    useEffect(()=>{
        setItem(getCart())
    },[items])

    const showItems=(items)=>{
        return(
            <div>
                <h2>Your Cart has {`${items.length}`}</h2>
                <hr/>
                {items.map((p,i)=>(
                    <Card key={i} 
                    product={p}
                    cartview={false}
                    cartUpdate={true}
                    removeview={true}
                    />
                ))}
            </div>
        )
    }
    const noItemMessage=()=>(  
        <h2>
            Your Cart is empty. <br/>
            <Link to="/shop">Continue Shopping</Link>
        </h2>
    )
    return (
        <Layout title="Shopping Cart" description="Manage Your Cart" className="container-fluid">
           <div className="row">
               <div className="col-6">
                   {items.length>0?showItems(items):noItemMessage()}
               </div>
               <div className="col-6">
                   <p>Show checkout /shipping/total</p>
               </div>
           </div>
        </Layout>
        )
}
export default Cart;