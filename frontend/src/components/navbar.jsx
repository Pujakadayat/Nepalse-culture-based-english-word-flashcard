import React, { useState, useEffect } from "react";
import About from "../pages/About";
import Favourites from "../pages/favourites";
import "../style/navbar.css"
import Learn from "../pages/learn";
import { Link } from 'react-router-dom'

// export const Navbar = () =>{
//   const [toggle,setToggle] = useState(false);

//   function openMenu(){
//     setToggle(true);
//   }
//   function closeMenu(){
//     setToggle(false);
//   }
//     return (
// <>
// <nav className="navbar"> 
//   <div class="nav-brand">
//      <span class="nav-title">NeplaiLearn</span>
     
//       </div> 
//       {/* DESKTOP NAV LINK */}
//       <div className="nav-links">
        
//          <Link className="nav-link active" aria-current="page" to="/"> 
//          <i className="fa-regular fa-house-user"></i>Home
//          </Link> 
//          <Link className="nav-link" to="/learn"> 
//          <i class="fa-regular fa-book-open"></i>Learn
//           </Link> 
//          <Link className="nav-link" to="/favourites"> 
//          <i class = "fa-heart fa-regular"></i>Favourites
//           </Link>
//           <Link className="nav-link" to="/about">
//            <i class="fa-regular fa-star"></i>About </Link>
//            </div>
//            {/* MOBILE MENU TOGGLE */}
//            <div className="nav-links lg:hidden">
//   {toggle ? (
//  <AiOutlineClose  onClick = {closeMenu} 
//  size = {30}
//   className="text-black cursor-pointer"/>
//   ):( <HiMenuAlt1 
//    onClick = {openMenu} size = {30}
//     className="text-black"/>)}
 
// </div>
// {/* MOBILE MENU DROPDOWN */}
//    <div className="sm:block lg:hidden">
//       {toggle ?(
//   <div className="flex justify-between ml-10">
//         <ul>
//         <li className="text-black text-xl mb-2 cursor-pointer">
//           <Link to ="/learn" onClick={closeMenu}>Learn
//           </Link>
//           </li>
//          <li className="text-black text-xl mb-2 cursor-pointer">
//           <Link to ="/favourites" onClick={closeMenu}>Favourites
//           </Link>
//           </li>
//           <li className="text-black text-xl mb-2 ">
//                 <Link to ="/about" onClick={closeMenu}>About
//           </Link>
//           </li>
//         </ul>
//       </div>
//       ):(
//         <div> </div>
//       )}
    
//     </div> 
//           </nav>
//            </> 
//            )
//            }

export const Navbar = () =>{ 
  return (
     <>
      <nav className="navbar"> 
        <div class="nav-brand"> 
          <span class="nav-title">NeplaiLearn</span> 
          {/* <span class="nav-subtitle"> Cultural Flashcards</span> */} 
          </div> 
          <div className="nav-links"> <a class="nav-link active" aria-current="page" href="#"> 
            <i class="fa-regular fa-house-user"></i>Home</a>
             <a class="nav-link" href="/pages/About.jsx"> <i class="fa-regular fa-book-open"></i>Learn</a>
              <a class="nav-link" href="#"> <i class = "fa-heart fa-regular"></i>Favourites</a> 
              <a class="nav-link" href="#"> <i class="fa-regular fa-star"></i>About</a> 
              </div> </nav> </> ) }