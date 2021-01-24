import React,{useEffect, useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import {addItem,updateItem,removeItem} from './cartHelpers'
import {isAuthenticated} from '../auth'
import {deleteProduct} from '../admin/apiAdmin'

const Card=({product,view=true,cartview=true,cartUpdate=false,removeview=false,setRun = f => f,  run = undefined })=>{
    const [redirect,setRedirect]= useState(false)
    const [count,setCount]= useState(product.count)
    const {token,user}=isAuthenticated();
    const showViewButton=view=>{
        return(
            view&&(
               <Link to={`/product/${product._id}`} className="mr-2">
                   <button className="btn btn-outline-primary mt-2 mb-2">
                       View Product
                    </button>
                </Link>
            )
        )

    }
    const destroy=(producId)=>{
        deleteProduct(producId,user._id,token).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setRedirect(true)
                shouldRedirect(redirect);
            }
        })
    }
    const shouldRedirect=redirect=>{
        if(redirect){
            return <Redirect to="/"/>
        }
    };

    const addToCart=()=>{
        addItem(product,setRedirect(true));
    }

    const handleChange=productId=>event=>{
        setRun(!run);
        const p=Math.max(1,Math.min(event.target.value,product.quantity));
        setCount(p);
        if(event.target.value>=1){
            updateItem(productId,event.target.value)
        }
    }
    const showAddtoCartButton=()=>(
        cartview&&(
        <Link to="/">
            <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
                Add to Cart
            </button>
        </Link>
        )
    )
    const showRemoveButton=(removeview)=>(
        removeview&&(
        <Link to="/cart">
            <button onClick={()=>{removeItem(product._id);setRun(!run);}} className="btn btn-outline-danger mt-2 mb-2">
                Remove Item
            </button>
        </Link>
        )
    )
    
    const showDeleteButton=()=>(
        view===false&&isAuthenticated()&&isAuthenticated().user.role===1&&(<div>
                <button onClick={()=>{destroy(product._id);}} className="btn btn-outline-danger mt-2 mb-2">
                    Delete Product
                </button>
                <Link to={`/admin/product/update/${product._id}`}>
                        <button className="btn btn-outline-primary mt-2 mb-2">
                            Update
                        </button>
                </Link>
            </div>
        )
    )
    const showStock=qty=>{
        return qty>0 ? (<span className="badge badge-primary badge-pill">In Stock</span>):
        (<span className="badge badge-primary badge-pill">Out Of Stock</span>)
    }

    const showCartUpdateOptions=()=>{
        return cartUpdate&&
        <div>
            <div className="input-group mb-3">
                <div className="input-group-prepent">
                    <span className="input-group-text">Adjust Quantity</span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleChange(product._id)}/>
            </div>    
        </div>
    }
    return (
            <div className="card">
                <div className="card-header name" style={{textAlign:'center'}} >{product.name}</div>
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    <ShowImage item={product} url="product"/>
                    <p className="lead mt-2">{view===true?product.description.substring(0,30)+"....":product.description}</p>
                    <p className="balck-10">Rs {product.price}</p>
                    <p className="black-9">Category: {product.category&&product.category.name}</p>
                    <p className="black-8">
                        Added on {moment(product.createdAt).fromNow()}
                    </p>
                    {showStock(product.quantity)}
                    <br/>
                    {showViewButton(view)}
                    {showAddtoCartButton()}
                    {showDeleteButton()}
                    {showRemoveButton(removeview)}
                    {showCartUpdateOptions()}
                </div>
            </div>
    )
}

export default Card;