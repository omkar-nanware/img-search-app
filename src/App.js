import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ImageDetails from './Pages/ImageDetails';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="details/:id" element={<ImageDetails />} />
    </Routes>
  );
};

export default App;
