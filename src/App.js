import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Main from './components/Main';
import Signup from './components/Signup';
import Display from './components/creatyourprofile/Display';
import Gender from './components/creatyourprofile/Gender';
import Biography from './components/creatyourprofile/Biography';
import ProfilePhoto from './components/creatyourprofile/ProfilePhoto';
import Success from './components/creatyourprofile/Success';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/home' element={<Main />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/display' element={<Display />} />
          <Route path='/gender' element={<Gender />} />
          <Route path='/biography' element={<Biography />} />
          <Route path='/profilephoto' element={<ProfilePhoto />} />
          <Route path='/success' element={<Success />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
