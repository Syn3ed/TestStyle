import React, { useEffect, useState, useCallback } from 'react';
// import { useParams } from 'react-router-dom';
import axios from 'axios';
import './OpApplic.css';
import OpSvg from '../component/OpSvg';
import UsSvg from '../component/UsSvg';
import { useParams } from 'react-router-dom';

export const OpApplic = () => {
    const { id } = useParams();;
    // const [address, setAddress] = useState('');
    // const [theme, setTheme] = useState('');
    // const [category, setCategory] = useState('');
    // const [description, setDescription] = useState('');
    const [dataArray, setDataArray] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);


    const autoResizeTextarea = (e) => {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };


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
            } catch (error) {
                console.error('Ошибка при получении сообщений чата', error);
            }
        };

        fetchChatMessages();
    }, [id]);

    const sendPhotoChat = useCallback((id) => {
        // tg.sendData(`/handleShowPhoto ${id}`);
        // tg.close();
    }, [])
    const renderButtons = () => {
        if (dataArray.length > 0 && dataArray[0].status === 'ожидает ответа оператора') {
            return (
                <div className='button-list'>
                    <button type="button" className='buttonEl' >Закрыть заявку</button>
                    <button type="button" className='buttonEl' >Отправить ответ</button>
                    <button type="button" className='buttonEl' >Отправить фото</button>
                </div>
            );
        } else if (dataArray.length > 0 && dataArray[0].status === 'Заявка в обработке!') {
            return (
                <div className='button-list'>
                    <button type="button" className='buttonEl' >Закрыть заявку</button>
                    <button type="button" className='buttonEl' >Отправить ответ</button>
                    <button type="button" className='buttonEl' >Отправить фото</button>
                </div>
            );
        } else {
            return null; // Возвращаем null, если массив dataArray пуст или статус неизвестен
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
                    <textarea
                        id="address"
                        className='textIn'
                        // placeholder="Введите адрес ПЗУ"
                        value={dataArray.length > 0 ? dataArray[0]?.username : ''}
                        // onChange={(e) => setAddress(e.target.value)}
                        onInput={autoResizeTextarea}
                        autoComplete="off"
                    >{ }</textarea>
                </div>
                <div className='adres'>
                    
                    <label className='lable-filling'>Aдрес ПЗУ</label>
                    <textarea
                        id="address"
                        className='textIn'
                        // placeholder="Введите адрес ПЗУ"
                        value={dataArray.length > 0 ? dataArray[0]?.address : ''}
                        // onChange={(e) => setAddress(e.target.value)}
                        onInput={autoResizeTextarea}
                        autoComplete="off"
                    >{ }</textarea>
                </div>
                <div className='theme'>
                    
                    <label className='lable-filling'>Тема заявки</label>
                    <textarea
                        id="theme"
                        className='textIn'
                        // placeholder="Введите тему заявки"
                        value={dataArray.length > 0 ? dataArray[0]?.subject : ''}
                        // onChange={(e) => setTheme(e.target.value)}
                        onInput={autoResizeTextarea}
                        autoComplete="off"
                    />
                </div>

                <div className='description'>
                
                    <label className='lable-filling'>Описание</label>
                    <textarea
                        id="description"
                        className='textIn'
                        // placeholder="Введите описание заявки"
                        value={dataArray.length > 0 ? dataArray[0]?.description : ''}
                        // onChange={(e) => setDescription(e.target.value)}
                        onInput={autoResizeTextarea}
                        autoComplete="off"
                    />
                </div>
                <div className='chat-container'>
                    {chatMessages.map((message, index) => (
                        <div key={index} className={message.roleUser === 'User' ? 'Operator' : 'User'}>
                            <div className={message.roleUser === 'User' ? 'OperatorMessage' : 'UserMessage'}>{message.username}</div>
                            <div className={message.roleUser === 'User' ? 'OperatorTextMessage' : 'UserTextMessage'}> {message.textMessage}</div>
                            {message.IdMedia && (
                                <button onClick={() => sendPhotoChat(message.IdMedia)}>
                                    Показать файл
                                </button>
                            )}
                            <div className={message.roleUser === 'User' ? 'OpMessageTime' : 'UsMessageTime'}>{message.Time}</div>UsMessageTime
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

export default OpApplic;
