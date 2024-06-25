import React from "react";
import Login from './Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Signup'
import Home from './Home'
import Profile from "./Pofile";
import AAC from "./AAC";
import IEEE from "./IEEE";
import Rhythms from "./Rhythms";
import SDC from "./SDC";
import Logout from "./Logout";




function App(){
  return (
    <BrowserRouter>
     <Routes>
    

      <Route path="/" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path="/ieee" element={<IEEE/>}></Route>
      <Route path="/aac" element={<AAC/>}></Route>
      <Route path="/sdc" element={<SDC/>}></Route>
      <Route path="/rhythms" element={<Rhythms/>}></Route>
      <Route path="/logout" element={<Logout/>}></Route>

     </Routes>
     
    </BrowserRouter>
  )
}
export default App