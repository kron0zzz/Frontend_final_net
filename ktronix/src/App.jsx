//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { Routes, Route } from "react-router-dom";
import './App.css'
import Login from './features/autenticacion/components/login'
import Register from './features/autenticacion/components/register';
function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
