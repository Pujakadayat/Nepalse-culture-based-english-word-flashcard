import React from 'react' 
import Home from "./pages/home"

import Flashcard from "./components/flashcard"
import Favourites from "./pages/favourites"
import "./App.css"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Menu from './components/menu'

function App() {



    return (
     <Menu ></Menu>
      
    // <Router>
    //   <div className='app-container' >
       
    //     {/* <Navbar /> */}
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/login" element={<Login />} />
    //       <Route path="/signup" element={<Signup />} />
    //       <Route path="/flashcard" element={<Flashcard />} />
    //       <Route path="/quiz" element={<Quiz />} />
    //       <Route path="/favourites" element={<Favourites />} />
    //       <Route path="/learn" element={<Learn />} />
    //       <Route path="/landing" element={<Landing />} />
    //           <Route path="/roleplay" element={<RolePlay  />} />

    //     </Routes>
    //   </div>
    // </Router>
  );

}

export default App
