import React,{useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import {addItem,updateItem,removeItem} from './cartHelpers'

const Card=({product,view=true,cartview=true,cartUpdate=false,removeview=false})=>{
    const [redirect,setRedirect]= useState(false)
    const [count,setCount]= useState(product.count)
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
    const shouldRedirect=redirect=>{
        if(redirect){
            return <Redirect to="/cart"/>
        }
    };

    const addToCart=()=>{
        addItem(product,setRedirect(true));
    }

    const handleChange=productId=>event=>{
        setCount(event.target.value<1?1:event.target.value);
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
    const showRemoveButton=()=>(
        removeview&&(
        <Link to="/">
            <button onClick={()=>removeItem(product._id)} className="btn btn-outline-danger mt-2 mb-2">
                Remove Item
            </button>
        </Link>
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
                <div className="card-header name" >{product.name}</div>
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    <ShowImage item={product} url="product"/>
                    <p className="lead mt-2">{view===undefined?product.description.substring(0,30)+"....":product.description}</p>
                    <p className="balck-10">Rs {product.price}</p>
                    <p className="black-9">Category: {product.category&&product.category.name}</p>
                    <p className="black-8">
                        Added on {moment(product.createdAt).fromNow()}
                    </p>
                    {showStock(product.quantity)}
                    <br/>
                    {showViewButton(view)}
                    {showAddtoCartButton()}
                    {showRemoveButton()}
                    {showCartUpdateOptions()}
                </div>
            </div>
    )
}

export default Card;