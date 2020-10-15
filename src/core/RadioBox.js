import React ,{useState} from 'react'

const RadioBox=({prices,handleFilters})=>{
    const [,setValue]=useState(0)
    const handleChange=(event)=>{
        handleFilters(event.target.value)
        setValue(event.target.value)
    }
    return prices.map((p,i)=>(
        <div key={i}>
            <input onChange={handleChange} name={p} value={`${p._id}`} type="radio" className="mr-2 ml-4"/>
            <label className="form-check-label">{p.name}</label>
        </div>
    ))
}

export default RadioBox;