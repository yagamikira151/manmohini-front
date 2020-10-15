import React from 'react'
import {Link} from 'react-router-dom'
import ShowImage from './ShowImage'

const Card=({product,view})=>{
    return (
            <div className="card">
                <div className="card-header" style={{textAlign:'center',backgroundColor:'#FFDAB9'}}>{product.name}</div>
                <div className="card-body">
                    <ShowImage item={product} url="product"/>
                    <p>{view===undefined?product.description.substring(0,30)+"....":product.description}</p>
                    <p>Rs {product.price}</p>
                    {view===undefined&&<Link to={`/product/${product._id}`}><button className="btn btn-outline-primary mt-2 mb-2 mr-2">View Product</button></Link>}
                    <Link to="/"><button className="btn btn-outline-warning mt-2 mb-2">Add to Cart</button></Link>
                </div>
            </div>
    )
}

export default Card;