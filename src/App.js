import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OperIndex from './Operator/OperIndex'
import Req from './Operator/Req'
import UserReq from './User/UserIndex'
import UsereRequest from './User/Req'
import InlineReq from './InlineMode/Operator/Req'
import InlineUsereRequest from './InlineMode/User/Req'
import FormReq from './FormReq/RequestForm'
import Chat from './Chat/Chat';



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OperIndex />} />
        <Route path="/requestsOperator/:id" element={<Req />} />
        <Route path="/RequestUserList/:id" element={<UserReq />} />
        <Route path="/requests/:id" element={<UsereRequest />} />
        <Route path="/Inlinerequests/:id" element={<InlineUsereRequest />} />
        <Route path="/InlinerequestsOperator/:id" element={<InlineReq />} />
        <Route path="/FormReq" element={< FormReq/>} />
        <Route path="/Chat" element={< Chat/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
