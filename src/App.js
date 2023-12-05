import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OperIndex from './Operator/OperIndex'
import Req from './Operator/Req'
import UserReq from './User/UserIndex'
import UsereRequest from './User/Req'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OperIndex />} />
        <Route path="/requestsOperator/:id" element={<Req />} />
        <Route path="/RequestUserList/:id" element={<UserReq />} />
        <Route path="/requests/:id" element={<UsereRequest />} />
        <Route path="/Inlinerequests/:id" element={<Req />} />
        <Route path="/InlinerequestsOperator/:id" element={<Req />} />
        <Route path="/FormReq" element={<Req />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
