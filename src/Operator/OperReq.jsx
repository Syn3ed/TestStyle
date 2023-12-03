import './App.css';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from "react";


function App() {

  const requestList = [
    { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
    { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
    { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
    { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
    { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
    { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
    { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
    { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
    { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
    { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
    { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
    { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
    { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
    { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
    { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
    { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
    { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
    { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
    { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
    { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
    { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
    { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
    { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
    { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
    { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
    { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
    { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
    { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
    { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
    { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
    { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
    { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
    { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
    { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
    { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
    { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
    { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
    { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
    { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
    { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
    { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
    { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
    { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
    { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
    { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
    { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
    { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
    { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
  ];


  const tg = window.Telegram.WebApp
  useEffect(() => {
    tg.ready();
  }, [])

  return (
    <div className='req-list' >
      <div className='req-header'>
        <h1>Номер заявки</h1>
        <h1>Никнейм пользователя</h1>
        <h1>Тема заявки</h1>
        <h1>Статус заявки</h1>
      </div>
      {requestList.length > 0 ? (
        requestList.map((request) => (
            <div className="request-item">
              <div className="request-id">{request.id}</div>
              <div className="request-subject">{request.subject}</div>
              <div className="request-subject">{request.address}</div>
              <div className="request-status">{request.status}</div>
            </div>
        ))
      ) : (
        <div>Загрузка данных...</div>
      )}
    </div>
  );
}

export default App;
