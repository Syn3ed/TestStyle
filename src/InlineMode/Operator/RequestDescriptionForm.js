import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RequestDescriptionForm.css'
import axios from 'axios';


const RequestDescriptionForm = ({ request }) => {
    const [chatMessages, setChatMessages] = useState([]);
    const tg = window.Telegram.WebApp;
    const queryId = tg.initDataUnsafe?.query_id;
    const navigate = useNavigate();
    const operatorId = tg.initDataUnsafe.user.id;
    console.log(operatorId)

    useEffect(() => {
            tg.BackButton.hide();
        }, [navigate,tg]);

        
    useEffect(() => {
            const handleBackButton = () => {
                navigate(-1);
            };
            tg.BackButton.onClick(handleBackButton);
            return () => {
                tg.BackButton.offClick(handleBackButton);
            };
        }, [navigate,tg.BackButton]);


    useEffect(() => {
        const fetchChatMessages = async () => {
            try {
                const response = await axios.get(`https://tg-server-0ckm.onrender.com/chat/${request.userRequestId}`);
                setChatMessages(response.data);
            } catch (error) {
                console.error('Ошибка при получении сообщений чата', error);
            }
        };

        fetchChatMessages();
    }, [request]);


    const onSendData = useCallback(() => {
        const data = {
            userRequestId: request.userRequestId,
            username: request.username,
            queryId,
            userId: request.userId,
            operatorId: operatorId
        }
        fetch('https://tg-server-0ckm.onrender.com/replyToUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        // tg.close();
    }, [request,queryId,operatorId])

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

    const handleShowPhoto = (idMedia) => {
        console.log(idMedia);
        const data = {
            userRequestId: request.userRequestId,
            username: request.username,
            queryId,
            idMedia,
            operatorId,
            
        }
        fetch('https://tg-server-0ckm.onrender.com/handleShowPhoto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
    };

    const onSendPhoto = useCallback(() => {
        const data = {
            userRequestId: request.userRequestId,
            username: request.username,
            queryId,
        }
        fetch('https://tg-server-0ckm.onrender.com/replyToOperatorPhoto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        tg.close();
    }, [request,queryId,tg]);

    const closeReq = useCallback(() => {
        tg.close();
        const data = {
            userRequestId: request.userRequestId,
            username: request.username,
            queryId,
            operatorId,
        }
        fetch('https://tg-server-0ckm.onrender.com/closeReq', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [request, queryId, tg,operatorId]);
    const renderButtons = () => {
        if (request.status === 'ожидает ответа оператора') {
            return (
                <div>
                    <button type="button" onClick={closeReq}>Закрыть заявку</button>
                    <button type="button" onClick={onSendData}>Ответить</button>
                    <button type="button" onClick={onSendPhoto}>Отправить фото</button>
                </div>
            );
        } else if (request.status === 'Заявка в обработке!') {
            return (
                <div>
                    <button type="button" onClick={closeReq}>Закрыть заявку</button>
                    <button type="button" onClick={onSendData}>Ответить</button>
                    <button type="button" onClick={onSendPhoto}>Отправить фото</button>
                </div>
            );
        }
    }

    return (
        <div className="request-description-form">
            <h2>Описание заявки</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Никенейм пользователя</label>
                    <input type="text" id="username" name="username" value={request.username} readOnly />
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
                </div>
                <div className="chat-container">
                    {chatMessages.map((message, index) => (
                        <div key={index} className={message.roleUser === 'User' ? 'User' : 'Operator'}>
                            <div className="message-header">{message.username}</div>
                            {message.textMessage}
                            {message.IdMedia && (
                                <button onClick={() => handleShowPhoto(message.IdMedia)}>
                                    Показать файл
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                {renderButtons()}

            </form>
        </div>
    );

};


export default RequestDescriptionForm;