import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OperReq.css';

const Table = ({ data }) => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/req/${id}`);
  };

  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th>Номер заявки</th>
          <th>Имя пользователя</th>
          <th>Тема заявки</th>
          <th>Статус заявки</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} onClick={() => handleRowClick(row.id)}>
            <td>{row.id}</td>
            <td>{row.username}</td>
            <td>{row.category}</td>
            <td>{row.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
