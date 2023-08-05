import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import SignUp from './components/SignUp';

import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/home' element={<Main />} />
          <Route path='/sign-up' element={<SignUp />} />

          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
