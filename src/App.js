import logo from './logo.svg';
import './App.css';

import Navbar from './components/Navbar';
import  Home  from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState'
import Signup from './components/Signup';
import Login from './components/Login';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react'

const App = () => {
  return (
    <div>
      <NoteState>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home/>
            }
          />

          <Route
            exact
            path="/about"
            element={
              <About/>
              
            }
          />
           <Route
            exact
            path="/login"
            element={
              <Login/>
              
            }
          />
           <Route
            exact
            path="/signup"
            element={
              <Signup/>
              
            }
          />
        
         
        </Routes>
      
      </BrowserRouter>

      </NoteState>

    </div>
  )
}



export default App;