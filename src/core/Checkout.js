import React from 'react'
import {isAuthenticated} from '../auth'
import { Link } from 'react-router-dom'

const Checkout=({products})=>{
    const getTotal=()=>{
        return products.reduce((currentValue,nextValue)=>{
            return currentValue+nextValue.count*nextValue.price
        },0)
    }
    const showCheckout=()=>{
        return  isAuthenticated()?(
            <Link to="/info"><button className="btn btn-success">Checkout</button></Link>
        ):(
            <Link to="/signin">
                <button className="btn btn-primary">Signin to Checkout</button>
            </Link>
        )
    }
    return( 
    <div>
        <h2>Total: Rs {getTotal()}</h2>
        {showCheckout()}
    </div>
    )
}

export default Checkout