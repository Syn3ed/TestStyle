import React, { useEffect, useState, useCallback } from 'react';
// import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UsApplic.css';
import OpSvg from '../component/OpSvg';
import UsSvg from '../component/UsSvg';
import { useParams } from 'react-router-dom';

export const UsApplic = () => {
    const { id } = useParams();
    const tg = window.Telegram.WebApp;
    const navigate = useNavigate();
    const [dataArray, setDataArray] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);

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


    const closeReq = useCallback(() => {
        tg.sendData(`/closeReq ${id}`);
        tg.close();
    }, [tg, id]);


    const sendPhoto = useCallback(() => {
        tg.sendData(`/resToOperatorPhoto ${id}`);
        tg.close();
    }, [tg, id]);

    const resumReq = useCallback(() => {
        tg.sendData(`/resumeReq ${id}`);
        tg.close();
    }, [tg, id]);

    // const sendData = useCallback(() => {
    //     tg.sendData(`/resToOperator ${id}`);
    //     tg.close();
    // }, [tg, id])

    const sendPhotoChat = useCallback((id) => {
        tg.sendData(`/handleShowPhoto ${id}`);
        tg.close();
    }, [tg])


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
                // console.log(dataArray.address)
                console.log(dataArray[0])
            } catch (error) {
                console.error('Ошибка при получении данных о заявке:', error);
            }
        };

        fetchData();
    }, [id]);


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
                    <button type="button" className='buttonEl' onClick={sendPhoto}>Отправить сообщение</button>
                </div>
            );
        } else if (dataArray.length > 0 && ((dataArray[0].status === 'Заявка в обработке!') || dataArray[0].status === 'Заявка в обработке')) {
            return (
                <div className='button-list'>
                    <button type="button" className='buttonEl' onClick={closeReq}>Закрыть заявку</button>
                    <button type="button" className='buttonEl' onClick={sendPhoto}>Отправить сообщение</button>
                </div>
            );
        } else {
            return (
                <div className='button-list'>
                    <button type="button" className='buttonEl' onClick={resumReq}>Возобновить заявку</button>
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

                    <div className='TextApplic'>{dataArray.length > 0 ? dataArray[0]?.username : ''}</div>
                </div>
                <div className='adres'>

                    <label className='lable-filling'>Aдрес ПЗУ</label>

                    <div className='TextApplic'>{dataArray.length > 0 ? dataArray[0]?.address : ''}</div>
                </div>
                <div className='theme'>

                    <label className='lable-filling'>Тема заявки</label>

                    <div className='TextApplic'>{dataArray.length > 0 ? dataArray[0]?.subject : ''}</div>
                </div>

                <div className='description'>

                    <label className='lable-filling'>Описание</label>

                    <div className='TextApplic'>{dataArray.length > 0 ? dataArray[0]?.description : ''}</div>
                </div>
                <div className='chat-container'>
                    {chatMessages.map((message, index) => (
                        <div key={index} className={message.roleUser === 'User' ? 'User' : 'Operator'}>
                            <div className={message.roleUser === 'User' ? 'UserMessage' : 'OperatorMessage'}>
                                {message.roleUser === 'User' ? message.username : message.nicknameOperator}
                            </div>
                            <div className={message.roleUser === 'User' ? 'UserTextMessage' : 'OperatorTextMessage'}> {message.textMessage}</div>
                            {message.IdMedia && (
                                <button className='buttonPhoto' onClick={() => sendPhotoChat(message.IdMedia)}>
                                    Показать файл
                                </button>
                            )}
                            <div className={message.roleUser === 'User' ? 'UsMessageTime' : 'OpMessageTime'}>{message.Time}</div>
                            <div className={message.roleUser === 'User' ? 'lolSvg' : 'OpSvg'}><OpSvg /></div>
                            <div className={message.roleUser === 'User' ? 'UsSvg' : 'lolSvg'}><UsSvg /></div>
                        </div>
                    ))}
                </div>
                {renderButtons()}
            </div>

        </div>
    );
}

export default UsApplic;
