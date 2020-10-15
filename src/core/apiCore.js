import {API} from '../config'
import queryString from "query-string"
export const getProducts=(sortBy)=>{
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=100`,{
        method:"GET"
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{
        console.log(err);
    })
}

export const getCategory=()=>{
    return fetch(`${API}/categories`,{
        method:"GET"
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{
        console.log(err);
    })
}

export const getFilteredProduct=(skip,limit,filters={})=>{
    const data={limit,skip,filters}
    console.log(data);
    return fetch(`${API}/products/by/search`,{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json",
        }
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{
        console.log(err);
    })
}

export const list=params=>{
    const query=queryString.stringify(params)
    console.log(query);
    return fetch(`${API}/products/search?${query}`,{
        method:"GET"
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{
        console.log(err);
    })
}

export const read=productId=>{
    return fetch(`${API}/product/${productId}`,{
        method:"GET"
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{
        console.log(err);
    })
}