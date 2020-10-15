import React from 'react'
import Menu from './Menu'
import "../styles.css"

const Layout=({title='Title',description="Description",children,className})=>(
    <div>
        <Menu/>    
        <div className="jumbotron">
            <h1>{title}</h1>
            <h3 className="lead">{description}</h3>
        </div>
        <div className={className===undefined?'none':className}>{children===undefined?'':children}</div>
    </div>

);

export default Layout;