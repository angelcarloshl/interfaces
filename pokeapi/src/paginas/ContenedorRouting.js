import React from 'react'
import { Link, Outlet } from 'react-router-dom'


function ContenedorRouting() {
  return (
    <div>
        <nav>
            <h1>Mi sitio Web</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/info">Info</Link>
                </li>
            </ul>
            <hr/>
            <Outlet/>
        </nav>
    </div>
  )
}

export default ContenedorRouting
