import {API} from '../config'

export const signup=user=>{
    // console.log(JSON.stringify(user))
    return fetch(`${API}/signup`,{
        method:"POST",
        body:JSON.stringify(user),
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json"
        }
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{
        console.log(err);
    })
}
export const signin=user=>{
    // console.log(JSON.stringify(user))
    return fetch(`${API}/signin`,{
        method:"POST",
        body:JSON.stringify(user),
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json"
        }
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{
        console.log(err);
    })
}

export const authenticate=(data,next)=>{
    if(typeof window!='undefined'){
        localStorage.setItem('jwt',JSON.stringify(data))
        next();
    }
}

export const signout=(next)=>{
    if(typeof window!='undefined'){
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/signout`,{
            method:"GET"
        })
        .then(response=>{
            console.log("Signput ",response);
        })
        .catch(err=>{
            console.log(err);
        })
    }
}

export const isAuthenticated=()=>{
    if(typeof window==undefined)return false;
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'));
    }
    return false;
}