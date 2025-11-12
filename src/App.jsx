import React from "react";
// import OrbitPage from "./OrbitPage";
import './global.css';
import Chat from "./pages/Chat";
import { Boxes } from "./components/background-boxes";
import { cn } from "./lib/utils";
import { Footer } from "./footer";
import FloatingPillNavbar from "./components/FloatingPillNavbar";
import Hero from "./Hero";
import { Features } from "./pages/Features";
import { Routes, Route } from 'react-router-dom';
import  Layout  from "../src/components/Layout";

function App() {
  return (
    <>  
    <FloatingPillNavbar />
    <Routes>
      <Route path="/chat" element={<Chat/>} />
      <Route element={<Layout/>}>
        <Route path="/" element={<Hero />} />
        <Route path="/features" element={<Features />} />

      
      </Route>

    </Routes>
   
   
  

    </>
  );
}

export default App;
