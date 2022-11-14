import React, { useState,lazy, Suspense } from 'react'
import './Menu.css'
import {HashRouter,Route,Routes,Navigate,useLocation  } from 'react-router-dom'

//import Home from '../Home'
//import About from '../About'
//import Contact from '../Contact'

const Home=lazy(()=>import('../Home'))
const About=lazy(()=>import('../About'))
const Contact=lazy(()=>import('../Contact'))


const Menu = () => {
  const location=useLocation()
  const [menuItem,setMenuItem]=useState(location.pathname.slice(1))
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
       <Suspense fallback="Loading...">
               <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<Navigate to='/home' />}  />
               </Routes>
       </Suspense>
    </div>
  )
}

export default Menu
