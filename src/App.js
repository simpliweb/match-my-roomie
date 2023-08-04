import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Navbar from "./components/Nav";
import SignIn from './components/Signin';

import "./App.css";

function App() {
  return (
    <Router>
      <div className='App'>
        {/* <Navbar /> */}
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/home' element={<Main />} />
          <Route path='/signin' element={<SignIn />} />

          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
