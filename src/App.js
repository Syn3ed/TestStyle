import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OperIndex from './Operator/OperIndex'
import Req from './Operator/Req'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OperIndex />} />
        <Route path="/req/:id" element={<Req />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
