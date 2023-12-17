import React from "react";
import { useNavigate } from 'react-router-dom';
import './OperReq.css';

const AdminIndex = () => {
    const navigate = useNavigate();
    const handleRowClick = (id) => {
        navigate(`/requestsOperator/${id}`);
      };

    return (
        <table className="custom-table">
            <thead>
                <tr>
                    <th>Меню Администратора</th>
                </tr>
            </thead>
            <tbody>
                <tr onClick={() => handleRowClick(row.id)}>
                    <td>Полный список пользователей</td>
                </tr>
                <tr onClick={() => handleRowClick(row.id)}>
                    <td>Список операторов</td>
                </tr>
                <tr onClick={() => handleRowClick(row.id)}>
                    <td>Список пользователей</td>
                </tr>
            </tbody>
        </table>
    );
};

export default AdminIndex;
