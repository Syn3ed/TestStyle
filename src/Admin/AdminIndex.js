import React from "react";
import { useNavigate } from 'react-router-dom';
import './OperReq.css';

const AdminIndex = () => {
    const navigate = useNavigate();
    const handleRowClickFullList = () => {
        navigate(`/AdminIndex/FullList`);
    };
    const handleRowClickOperatorList = () => {
        navigate(`/AdminIndex/OperatorList`);
    };
    const handleRowClickUserList = () => {
        navigate(`/AdminIndex/UserList`);
    };

    return (
        <table className="custom-table">
            <thead>
                <tr>
                    <th>Меню Администратора</th>
                </tr>
            </thead>
            <tbody>
                <tr onClick={() => handleRowClickFullList}>
                    <td>Полный список пользователей</td>
                </tr>
                <tr onClick={() => handleRowClickOperatorList}>
                    <td>Список операторов</td>
                </tr>
                <tr onClick={() => handleRowClickUserList}>
                    <td>Список пользователей</td>
                </tr>
            </tbody>
        </table>
    );
};

export default AdminIndex;
