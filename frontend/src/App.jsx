import React from "react"
import {Routes, Route} from "react-router-dom";

import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import IndexPage from "./Pages/IndexPage";
import Layout from "./Layout";

function App() {


  return (
    <Routes>
     <Route path="/" element ={<Layout />} >
     <Route  index element ={<IndexPage />} />
     <Route  path="/login" element ={<LoginPage />} />
     <Route  path="/Register" element ={<RegisterPage />} />
     </Route>
    </Routes>
  )
}

export default App
