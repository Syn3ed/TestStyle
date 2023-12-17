import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OperReq.css';

const Table = ({ data }) => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/requestsOperator/${id}`);
  };

  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th>ID пользователя</th>
          <th>Имя пользователя</th>
          <th>Телеграмм ID пользователя</th>
          <th>ID роли</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} onClick={() => handleRowClick(row.id)}>
            <td>{row.id}</td>
            <td>{row.username}</td>
            <td>{row.telegramId}</td>
            <td>{row.RoleId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
