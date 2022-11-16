import React, { useState,lazy, Suspense } from 'react'
import './Menu.css'
import {Route,Routes,Navigate,useLocation  } from 'react-router-dom'

//import Home from '../Home'
//import About from '../About'
//import Contact from '../Contact'

const Home=lazy(()=>import('../Home'))
const About=lazy(()=>import('../About'))
const Contact=lazy(()=>import('../Contact'))


const Menu = () => {
  const location=useLocation()
  const path=location.pathname.slice(1);
  const [menuItem,setMenuItem]=useState(path||'home')
  const [isMobileView, setIsMobileview]=useState(document.body.offsetWidth < 600  )
  const [left,setLeft]=useState(-150)
  let timeOutid;
  let flag=true;
  window.addEventListener('resize',()=>{
    if(flag){
      handleResize()
      flag=false
    }
    clearTimeout(timeOutid)
    timeOutid=setTimeout(()=>{
      handleResize()
    },100)
   
  })

  const handleResize=()=>{
      let _width=document.body.offsetWidth;
      let _isMobileView=false
      if(_width<600)_isMobileView=true
      setIsMobileview(_isMobileView)
  }
  const fnMenuClick=(eve)=>{
     eve.stopPropagation()
     const {id,nodeName}=eve.target
     if(nodeName== 'A'){
      setMenuItem(id)
     }
     if(isMobileView)setLeft(-150)
  }

  const fnMobileMenuBtnClick=()=>{
    setLeft(left == 0  ? -150 : 0)
  }

  return (
    <div>
       {isMobileView && <button onClick={fnMobileMenuBtnClick} className='mobile-menu-btn'><img src='mobileMenu.jpg' ></img></button>}
       <div style={{left: left + 'px'}}  className={`${isMobileView ? 'mobile-menu': 'menu'} text-end`} onClick={fnMenuClick}>
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
