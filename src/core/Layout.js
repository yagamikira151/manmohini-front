import React from 'react'
import Menu from './Menu'
import "../styles.css"

const Layout=({title='Title',description="Description",children,className})=>(
    <div>
        <Menu/>    
        <div className="jumbotron">
            <div style={{textAlign:'center'}}>
                {/* <img src= "logo.jpeg" alt="manmohini" style={{marginRight:'-10px',height:'75px',width:'50px'}}/> */}
                <h1 style={{fontSize: '300%',fontWeight:'bold',fontFamily:'-moz-initial',marginTop:'-13px',marginBottom:'2.5eu'}}>{title}</h1>
                <h3 style={{fontFamily:'cursive'}}>{description}</h3>
            </div>
        </div>
        <div className={className===undefined?'none':className}>{children===undefined?'':children}</div>
    </div>

);

export default Layout;