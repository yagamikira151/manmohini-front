import React, { useState,useEffect } from 'react'
import Layout from './Layout'
import Card from './Card'
import {getCategory,getFilteredProduct} from './apiCore'
import Checkbox from './Checkbox'
import {prices} from './fixedPrices'
import RadioBox from './RadioBox'

const Shop =() =>{
    const [myFilters,setMyFilters]=useState({
        filters:{category:[],price:[]}
    })
    const [categories,setCategories]=useState([])
    const [error,setError]=useState(false)
    const [limit,setLimit]=useState(3);
    const [skip,setSkip]=useState(0);
    const [size,setSize]=useState(0);
    const [filteredResult,setFilteredResult]=useState([]);

    const init=()=>{
        getCategory()
        .then(data=>{
            if(data.error){
                setError(data.error);
            }else{
                setCategories(data);
            }
        })
    }

    const loadFilteredResults=(newFilters)=>{
        getFilteredProduct(skip,limit,newFilters)
        .then(data=>{
            if(data.error){
                setError(data.error)
            }
            else{
                setFilteredResult(data.data);
                setSize(data.size)
                setSkip(0)
            }
        })
    }
    useEffect(()=>{
        init();
        loadFilteredResults(skip,limit,myFilters.filters);
    },[]);
    
    const loadMore=()=>{
        let toskip=skip+limit;
        getFilteredProduct(toskip,limit,myFilters.filters)
        .then(data=>{
            if(data.error){
                setError(data.error)
            }
            else{
                console.log(data.data);
                setFilteredResult([...filteredResult,...data.data]);
                setSize(data.size)
                setSkip(toskip)
            }
        })
    }

    const loadMoreButton=()=>{
        return (
            size>0&&size>=limit&&(
                <button className="btn btn-warning mb-5" onClick={loadMore}>Load More</button>
            )
        )
    }

    
    const handleFilters=(filters,filterBy)=>{
        // console.log('shop',filters,filterBy)
        const newFilters={...myFilters}
        newFilters.filters[filterBy]=filters;
        if(filterBy==="price"){
            let priceValues=handlePrice(filters);
            newFilters.filters[filterBy]=priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters)
    }
    const handlePrice=value=>{
        const data=prices
        let array=[]
        for(let key in data){
            if(data[key]._id===parseInt(value)){
                array=data[key].array
            }
        }
         return array;
    }

    
    return (
            <Layout title="Your Shop" description="Buy From The Best" className="container-fluid">
            <div className="row">
                <div className="col-sm-12 col-md-4">
                    <h4>Filter By Categories</h4>
                    <ul>
                            <Checkbox categories={categories}
                            handleFilters={filters=>handleFilters(filters,'category')}/>
                    </ul>
                    <h4>Filter By Price</h4>
                    <div>
                            <RadioBox prices={prices}
                            handleFilters={filters=>handleFilters(filters,'price')}/>
                    </div>
                </div>
                <div className="col-sm-12 col-md-8">
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {filteredResult.map((p,i)=>(
                        <div key={i} className="col-sm-12 col-md-4 mb-3">
                            <Card product={p}/>
                        </div>
                        ))}
                    </div>
                    <hr/>
                    {loadMoreButton()}
                </div>
            </div>
            </Layout>
    )
}

export default Shop;