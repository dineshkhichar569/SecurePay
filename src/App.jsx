import { Routes, Route } from "react-router-dom";


import './App.css'
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  
  return (
    <>

    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/Login" element={<Login/>} />
    </Routes>

    </>
  )
}

export default App
