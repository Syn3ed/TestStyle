import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RequestDescriptionForm.css'

import axios from 'axios';


const RequestDescriptionForm = ({ request }) => {
    // const [dataArray, setDataArray] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const tg = window.Telegram.WebApp;
    // const queryId = tg.initDataUnsafe?.query_id;
    const navigate = useNavigate();

    const idu = request.userRequestId;
    useEffect(() => {
        tg.BackButton.show();
    }, [navigate, tg]);


    useEffect(() => {
        const handleBackButton = () => {
            navigate(-1);
        };
        tg.BackButton.onClick(handleBackButton);
        return () => {
            tg.BackButton.offClick(handleBackButton);
        };
    }, [navigate, tg.BackButton]);


    useEffect(() => {
        const fetchChatMessages = async () => {
            try {
                const response = await axios.get(`https://www.tgbottp.ru/chat/${request.userRequestId}`);
                setChatMessages(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Ошибка при получении сообщений чата', error);
            }
        };

        fetchChatMessages();
    }, [request]);



    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`https://tg-server-0ckm.onrender.com/reqPhoto/${request.userRequestId}`);

    //             const dataArray = response.data.map(item => ({
    //                 id: item.id,
    //                 idMedia: item.idMedia,
    //                 UserRequestId: item.UserRequestId
    //             }));
    //             setDataArray(dataArray);
    //             console.log(dataArray);
    //         } catch (error) {
    //             console.error('Ошибка при получении данных', error);
    //         }
    //     };
    //     fetchData();
    // }, [request]);





    const sendPhoto = useCallback(() => {
        tg.sendData(`/resToOperatorPhoto ${idu}`);
        // tg.close();
    }, [tg, idu]);

    const sendData = useCallback(() => {
        tg.sendData(`/resToUser ${idu}`);
        // tg.close();
    }, [tg, idu]);



    const sendPhotoChat = useCallback((id) => {
        tg.sendData(`/handleShowPhoto ${id}`);
        // tg.close();
    }, [tg])




    const closeReq = useCallback(() => {
        tg.sendData(`/closeReq ${idu}`);
        // tg.close();
    }, [tg, idu]);


    const renderButtons = () => {
        if (request.status === 'ожидает ответа оператора') {
            return (
                <div>
                    <button type="button" onClick={closeReq}>Закрыть заявку</button>
                    <button type="button" onClick={sendData}>Обработать заявку и отправить ответ</button>
                    <button type="button" onClick={sendPhoto}>Отправить фото</button>
                </div>
            );
        } else if (request.status === 'Заявка в обработке!') {
            return (
                <div>
                    <button type="button" onClick={closeReq}>Закрыть заявку</button>
                    <button type="button" onClick={sendData}>Ответить</button>
                    <button type="button" onClick={sendPhoto}>Отправить фото</button>
                </div>
            );
        }
    }

    return (
        <div className="request-description-form">
            <h2>Описание заявки</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Никнейм пользователя</label>
                    <input type="text" id="username" name="username" value={request.username} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Статус заявки</label>
                    <input type="text" id="subject" name="subject" value={request.status} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Тема заявки</label>
                    <input type="text" id="subject" name="subject" value={request.subject} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Адрес</label>
                    <input type="text" id="address" name="address" value={request.address} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Описание</label>
                    <input type="text" id="description" name="description" value={request.description} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="dialog">Диалог с оператором</label>
                    {/* <textarea type="text" id="dialog" name="dialog" value={request.dialog} readOnly /> */}
                </div>
                <div className="chat-container">
                    {chatMessages.map((message, index) => (
                        <div key={index} className={message.roleUser === 'User' ? 'User' : 'Operator'}>
                            <div className="message-header">{message.username}</div>
                            {message.textMessage}
                            {message.IdMedia && (
                                <button onClick={() => sendPhotoChat(message.IdMedia)}>
                                    Показать файл
                                </button>
                            )}
                             <div className="message-Time">{message.Time}</div>
                        </div>
                    ))}
                </div>
                {renderButtons()}
                
            </form>
        </div>
    );

};


export default RequestDescriptionForm;