import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import OperIndex from './Operator/OperIndex'
// import Req from './Operator/Req'
import OpApplic from './New/Operator/OpApplic';
// import UserReq from './User/UserIndex'
// import UsereRequest from './User/Req'
// import InlineReq from './InlineMode/Operator/Req'
// import InlineUsereRequest from './InlineMode/User/Req'
// import FormReq from './FormReq/RequestForm'
import Chat from './Chat/Chat';
import AdminIndex from './Admin/AdminIndex';
// import FullList from './Admin/FullList';
import OperatorList from './Admin/OperatorList';
import UserList from './Admin/UserList';
import InlineFormReq from './InlineMode/FormReq/RequestForm'
import OpListApplic from './New/Operator/OpListApplic';
import UsApplic from './New/User/UsApplic';
import UsListApplic from './New/User/UsApplicList';
import Form from './New/Form/Form';
import OpApplicInline from './New/Operator/OpApplicInline';
import UsApplicInline from './New/User/UsApplicInline';
import FullList1 from './New/Admin/FullList';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OpListApplic />} />
        <Route path="/requestsOperator/:id" element={<OpApplic />} />
        <Route path="/RequestUserList/:id" element={<UsListApplic />} />
        <Route path="/requests/:id" element={<UsApplic />} />
        <Route path="/Inlinerequests/:id" element={<UsApplicInline />} />
        <Route path="/InlinerequestsOperator/:id" element={<OpApplicInline />} />
        <Route path="/FormReq" element={< Form/>} />
        <Route path="/Chat" element={< Chat/>} />
        <Route path="/AdminIndex" element={< AdminIndex/>} />
        <Route path="/AdminIndex/FullList" element={< FullList1/>} />
        <Route path="/AdminIndex/OperatorList" element={< OperatorList/>} />
        <Route path="/AdminIndex/UserList" element={< UserList/>} />
        <Route path="/InlineFormReq" element={<InlineFormReq/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
