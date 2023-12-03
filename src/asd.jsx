import React from 'react';
import './asdS.css';

const Table = ({ data }) => {
  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th>Номер заявки</th>
          <th>Имя пользователя</th>
          <th>Тема заявки</th>
          <th>Статус заявки</th>
          {/* Добавьте заголовки для каждого столбца */}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.id}</td>
            <td>{row.username}</td>
            <td>{row.category}</td>
            <td>{row.status}</td>
            {/* Добавьте ячейки для каждого столбца */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
