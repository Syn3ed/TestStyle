import React, { useEffect, useState, useCallback } from 'react';
// import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OpApplic.css';
// import OpSvg from '../component/OpSvg';
// import UsSvg from '../component/UsSvg';
import { useParams } from 'react-router-dom';

export const OpApplicInline = () => {
    const { id } = useParams();
    const tg = window.Telegram.WebApp;
    const navigate = useNavigate();
    const [dataArray, setDataArray] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const queryId = tg.initDataUnsafe?.query_id;
    const operatorId = tg.initDataUnsafe.user.id;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://www.tgbottp.ru/mes/${id}`);
                const dataArray = response.data.map(item => ({
                    userRequestId: item.userRequestId,
                    status: item.status,
                    description: item.description,
                    subject: item.subject,
                    username: item.username,
                    address: item.address,
                    userId: item.userId
                }));
                console.log('Full Data Array:', dataArray[0]);
                setDataArray(dataArray);
                console.log(dataArray[0])
            } catch (error) {
                console.error('Ошибка при получении данных о заявке:', error);
            }
        };

        fetchData();
    }, [id]);


    useEffect(() => {
        tg.BackButton.hide();
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


    // const onSendData = useCallback(() => {
    //     const data = {
    //         userRequestId: dataArray[0].userRequestId,
    //         username: dataArray[0].username,
    //         queryId,
    //         userId: dataArray[0].userId,
    //         operatorId: operatorId
    //     }
    //     fetch('https://www.tgbottp.ru/replyToUser', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data)
    //     });
    //     console.log(data)
    // }, [dataArray, queryId, operatorId])

    const onSendPhoto = useCallback(() => {
        const data = {
            userRequestId: dataArray[0].userRequestId,
            username: dataArray[0].username,
            queryId,
            operatorId
        };

        fetch('https://www.tgbottp.ru/resToUserPhoto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => {
            tg.close();
        }).catch(error => {
            console.error('Ошибка при отправке запроса:', error);
        });
    }, [dataArray, queryId, operatorId, tg]);



    const resumeReq = useCallback(() => {
        const data = {
            userRequestId: dataArray[0].userRequestId,
            username: dataArray[0].username,
            queryId
        }
        fetch('https://www.tgbottp.ru/resumeReq', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                tg.close();
            })
            .catch(error => {
                console.error('Ошибка при отправке запроса:', error);
            });
    }, [dataArray, queryId, tg]);


    const handleShowPhoto = (idMedia) => {
        console.log(idMedia);
        const data = {
            userRequestId: dataArray[0].userRequestId,
            username: dataArray[0].username,
            queryId,
            idMedia,
            operatorId,

        }
        fetch('https://www.tgbottp.ru/handleShowPhoto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => {
            tg.close();
        }).catch(error => {
            console.error('Ошибка при отправке запроса:', error);
        });

    };

    const closeReq = useCallback(() => {
        const data = {
            userRequestId: dataArray[0].userRequestId,
            username: dataArray[0].username,
            queryId,
            operatorId,
        }
        fetch('https://www.tgbottp.ru/closeReq', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => {
            tg.close();
        })
            .catch(error => {
                console.error('Ошибка при отправке запроса:', error);
            });
    }, [dataArray, queryId, operatorId, tg]);

    useEffect(() => {
        const fetchChatMessages = async () => {
            try {
                const response = await axios.get(`https://www.tgbottp.ru/chat/${id}`);
                setChatMessages(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Ошибка при получении сообщений чата', error);
            }
        };

        fetchChatMessages();
    }, [id]);


    const renderButtons = () => {
        if (dataArray.length > 0 && dataArray[0].status === 'ожидает ответа оператора') {
            return (
                <div className='button-list'>
                    <button type="button" className='buttonEl' onClick={closeReq}>Закрыть заявку</button>
                    <button type="button" className='buttonEl' onClick={onSendPhoto}>Обработать заявку и отправить сообщение</button>
                </div>
            );
        } else if (dataArray.length > 0 && (dataArray[0].status === 'Заявка в обработке')) {
            return (
                <div className='button-list'>
                    <button type="button" className='buttonEl' onClick={closeReq}>Закрыть заявку</button>
                    <button type="button" className='buttonEl' onClick={onSendPhoto}>Отправить сообщение</button>
                </div>
            );
        } else {
            return (
                <div className='button-list'>
                    <button type="button" className='buttonEl' onClick={resumeReq}>Возобновить заявку</button>
                </div>
            )
        }
    }

    return (
        <div className="UserApplicForm">
            <div className='UserApplicGreeting'>
                <div className='applic-text'>Заявка #{dataArray.length > 0 ? dataArray[0]?.userRequestId : ''}</div>
                <div className='applic-text1'>{dataArray.length > 0 ? dataArray[0]?.status : ''}</div>
            </div>
            <div className="UserApplicFormFilling">
                <div className='adres'>

                    <label className='lable-filling'>Имя пользователя</label>
                    {/* <textarea
                        id="address"
                        className='textIn'
                        // placeholder="Введите адрес ПЗУ"
                        value={dataArray.length > 0 ? dataArray[0]?.username : ''}
                        // onChange={(e) => setAddress(e.target.value)}

                        autoComplete="off"
                    >{ }</textarea> */}
                    <div className='TextApplic'>{dataArray.length > 0 ? dataArray[0]?.username : ''}</div>
                </div>
                <div className='adres'>

                    <label className='lable-filling'>Aдрес ПЗУ</label>
                    {/* <textarea
                        id="address"
                        className='textIn'
                        // placeholder="Введите адрес ПЗУ"
                        value={dataArray.length > 0 ? dataArray[0]?.address : ''}
                        // onChange={(e) => setAddress(e.target.value)}

                        autoComplete="off"
                    >{ }</textarea> */}
                    <div className='TextApplic'>{dataArray.length > 0 ? dataArray[0]?.address : ''}</div>
                </div>
                <div className='theme'>

                    <label className='lable-filling'>Тема заявки</label>
                    {/* <textarea
                        id="theme"
                        className='textIn'
                        // placeholder="Введите тему заявки"
                        value={dataArray.length > 0 ? dataArray[0]?.subject : ''}
                        // onChange={(e) => setTheme(e.target.value)}

                        autoComplete="off"
                    /> */}
                    <div className='TextApplic'>{dataArray.length > 0 ? dataArray[0]?.subject : ''}</div>
                </div>

                <div className='description'>

                    <label className='lable-filling'>Описание</label>
                    {/* <textarea
                        id="description"
                        className='textIn'
                        value={dataArray.length > 0 ? dataArray[0]?.description : ''}

                        autoComplete="off"
                    /> */}
                    <div className='TextApplic'>{dataArray.length > 0 ? dataArray[0]?.description : ''}</div>
                </div>
                <div className='chat-container'>
                    {chatMessages.map((message, index) => (
                        <div key={index} className={message.roleUser === 'User' ? 'Operator' : 'User'}>
                            <div className={message.roleUser === 'User' ? 'OperatorMessage1' : 'UserMessage1'}>{message.username}</div>
                            <div className={message.roleUser === 'User' ? 'OperatorTextMessage' : 'UserTextMessage'}> {message.textMessage}</div>
                            {message.IdMedia && (
                                <button className='buttonPhoto' onClick={() => handleShowPhoto(message.IdMedia)}>
                                    Показать файл
                                </button>
                            )}
                            <div className={message.roleUser === 'User' ? 'OpMessageTime' : 'UsMessageTime'}>{message.Time}</div>
                            {/* <div className={message.roleUser === 'User' ? 'lolSvg' : 'OpSvg'}><OpSvg /></div> */}
                            {/* <div className={message.roleUser === 'User' ? 'UsSvg' : 'lolSvg'}><UsSvg /></div> */}
                        </div>
                    ))}
                </div>
                {renderButtons()}
            </div>

        </div>
    );
}

export default OpApplicInline;
