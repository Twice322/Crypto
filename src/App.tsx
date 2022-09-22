import React, {useState } from 'react';
import Main from './pages/Main';
import CoinDetails from './components/CoinDetails';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/:id' element={<CoinDetails/>}/>
      </Routes>
    </Router>
  );
}

export default App;
