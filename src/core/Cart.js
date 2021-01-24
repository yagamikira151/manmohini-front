import React, { useState,useEffect } from 'react'
import Layout from './Layout'
import {getCart,removeItem} from './cartHelpers'
import Card from './Card'
import { Link } from 'react-router-dom'
import Checkout from './Checkout'

const Cart=()=>{
    const [items ,setItem]=useState([])
    const [run, setRun] = useState(false);
    useEffect(()=>{
        setItem(getCart())
    },[run])

    const showItems=(items)=>{
        return(
            <div>
                <h2 className="mb-4">Your Cart has {`${items.length}`} Items</h2>
                <hr/>
                {items.map((p,i)=>(
                    <Card key={i} 
                    product={p}
                    cartview={false}
                    cartUpdate={true}
                    removeview={true}
                    setRun={setRun}
                    run={run}
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
               <div className="col-sm-12 col-md-6">
                   {items.length>0?showItems(items):noItemMessage()}
               </div>
               <div className="col-sm-12 col-md-6">
                   <h2 className="mb-4">Your cart Summary</h2>
                   <hr/>
                   <Checkout products={items}/>
               </div>
           </div>
        </Layout>
        )
}
export default Cart;