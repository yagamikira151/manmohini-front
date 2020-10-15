import React, { useState } from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {createCategory} from './apiAdmin'
import { Link } from 'react-router-dom'

const AddCategory=()=>{
    const [name,setName]=useState('');
    const [error,setError]=useState(false);
    const [success,setSuccess]=useState(false);
    const {user,token} = isAuthenticated();

    const clickSubmit=(e)=>{
        e.preventDefault()
        setError('')
        setSuccess(false)
        createCategory(user._id,token,{name})
        .then(data=>{
            if(data.error){
                console.log('w');
                setError(true)
            }else{
                console.log('p');
                setError('');
                setSuccess(true);
                setName('');
            }
        });
    };
    const handleChange=(e)=>{
        setError('')
        setName(e.target.value)
    };

    const showSuccess= ()=>{
        if(success){
            return <h3 className="text-success">New Category Is Created</h3>
        }
    }
    const showError=()=>{
        if(error){
            return <h3 className="text-danger">{name} Already Exist!!</h3>
        }
    }
    const goBack=()=>(
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">Back to Dashboard</Link>
        </div>
    );
    const newCategoryForm=()=>{
        return (<form onSubmit={clickSubmit}>
            <div className="form-group" >
                <label className="text-muted">Name</label>
                <input type="text" 
                 className="form-control"
                 onChange={handleChange}
                 value={name}
                 autoFocus 
                 required
                 />
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
        )
    }
    return (
        
        <Layout title="Add a new Category" description={`G'day ${user.name}, ready to add a new Category`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()} 
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>  
        </Layout>
    )
}
export default AddCategory;