import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OperIndex from './Operator/OperIndex'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OperIndex />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
