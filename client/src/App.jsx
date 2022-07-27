import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<PublicLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
