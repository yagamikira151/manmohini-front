import React, { useState,useEffect } from 'react'
import {getCategory,list} from './apiCore'
import Card from './Card'

const Search=()=>{
    const [data,setData]=useState({
        categories:[],
        category:'',
        search:'',
        results:[],
        searched:false
    });

    const {categories,category,search,results,searched}=data
    const loadCategories=()=>{
        getCategory()
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setData({...data,categories:data});
            }
        })
    }
    useEffect(()=>{
        loadCategories();
    },[])

    const handleChange=(name)=>(event)=>{
        setData({...data,[name]:event.target.value,searched:false});
    }
    const searchSubmit=(e)=>{
        e.preventDefault();
        searchData();
    }
    
    const searchData=()=>{
        if(search){
            list({search:search||undefined,category:category})
            .then(response=>{
                if(response.error){
                    console.log(response.error)
                }else{
                    setData({...data,results:response,searched:true})
                }
            })
        }
    }
    const searchMessage=(searched,results)=>{
        if(searched&& results.length>0){
            return `Found ${results.length} Products`;
        }
        else if(searched&& results.length<1){
            return `No Products Found`
        }
    }
    const searchedProducts=(results=[])=>{
        return (
            <div>
                <h2 className="mt-4 mb-4">{searchMessage(searched,results)}</h2>
                <div className="row">
                    {results.map((p,i)=>(
                    <div key={i} className="col-sm-12 col-md-4 mb-3">
                        <Card product={p}/>
                    </div>
                    ))}
                </div>
            </div>
        )
    }

    const searchForm=()=>{
        return (<form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange("category")}>
                            <option value="All">All Category</option>
                            {categories.map((c,i)=>(<option key={i} value={c._id}>{c.name}</option>))}
                        </select>
                    </div>
                    <input type="search" className="form-control" onChange={handleChange("search")} placeholder="Search By Name"/>
                </div>
                <div className="btn input-group-append" style={{border:'none'}}>
                    <button className="input-group-text">Search</button>
                </div>
            </span>
        </form>
        )
    }

    return (
        <div>
            <div className="container mb-3">
                {searchForm()}
            </div>
            <div className="container-fluid mb-3">
                {searchedProducts(results)}
            </div>
        </div>
    )
};

export default Search;