import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import OperIndex from './Operator/OperIndex'
// import Req from './Operator/Req'
import UserReq from './User/UserIndex'
import UsereRequest from './User/Req'
import InlineReq from './InlineMode/Operator/Req'
import InlineUsereRequest from './InlineMode/User/Req'
import FormReq from './FormReq/RequestForm'
import Chat from './Chat/Chat';
import AdminIndex from './Admin/AdminIndex';
import FullList from './Admin/FullList';
import OperatorList from './Admin/OperatorList';
import UserList from './Admin/UserList';
import InlineFormReq from './InlineMode/FormReq/RequestForm'
import OpListApplic from './New/Operator/OpListApplic';
import UsApplic from './New/User/UsApplic';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OpListApplic />} />
        <Route path="/requestsOperator/:id" element={<UsApplic />} />
        <Route path="/RequestUserList/:id" element={<UserReq />} />
        <Route path="/requests/:id" element={<UsereRequest />} />
        <Route path="/Inlinerequests/:id" element={<InlineUsereRequest />} />
        <Route path="/InlinerequestsOperator/:id" element={<InlineReq />} />
        <Route path="/FormReq" element={< FormReq/>} />
        <Route path="/Chat" element={< Chat/>} />
        <Route path="/AdminIndex" element={< AdminIndex/>} />
        <Route path="/AdminIndex/FullList" element={< FullList/>} />
        <Route path="/AdminIndex/OperatorList" element={< OperatorList/>} />
        <Route path="/AdminIndex/UserList" element={< UserList/>} />
        <Route path="/InlineFormReq" element={<InlineFormReq/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
