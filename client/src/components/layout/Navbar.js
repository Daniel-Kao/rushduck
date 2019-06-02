import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1 style={{ marginBottom: 0 }}>
        <Link to='/'>
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/login'>登陆</Link>
        </li>
        <li>
          <Link to='!#'>注销</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
