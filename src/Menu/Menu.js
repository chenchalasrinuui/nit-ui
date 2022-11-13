import React, { useState } from 'react'
import './Menu.css'
import {HashRouter,Route,Routes,Navigate  } from 'react-router-dom'
import Home from '../Home'
import About from '../About'
import Contact from '../Contact'

const Menu = () => {
  const [menuItem,setMenuItem]=useState('home')
  const fnMenuClick=(eve)=>{
     eve.stopPropagation()
     const {id,nodeName}=eve.target
     if(nodeName== 'A'){
      setMenuItem(id)
     }
  }

  return (
    <div>
       <div className='menu text-end' onClick={fnMenuClick}>
          <a className={menuItem=='home' && "menuActive"} id="home" href="#/home">Home</a>
          <a className={menuItem=='about' && "menuActive"} id='about' href='#/about'>About</a>
          <a className={menuItem=='contact' && "menuActive"}id='contact' href='#/contact'>Contact</a>
       </div>
       <HashRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Navigate to='/home' />}  />
            </Routes>
       </HashRouter>
    </div>
  )
}

export default Menu
