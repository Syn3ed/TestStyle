import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const UserProfile = () => {
    const { id } = useParams();
    const tg = window.Telegram.WebApp;
    const [filteredArray, setFilteredArray] = useState([]);


    useEffect(() => {
        tg.MainButton.hide()
        tg.BackButton.hide()
    }, [tg])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://www.tgbottp.ru/adminFullList');
                const data = response.data.map(item => ({
                    id: item.id,
                    telegramId: item.telegramId,
                    username: item.username,
                    RoleId: item.RoleId,
                }));
                
                console.log(data)
                const filteredData = data.filter(item => item.telegramId === parseInt(id));
                console.log(filteredData)
                setFilteredArray(filteredData);
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, [id]);
    console.log(id)
    // const roleMap = {
    //     1: 'Администратор',
    //     2: 'Пользователь',
    //     3: 'Оператор'
    // };
    


    const changeName = useCallback(() => {
        tg.sendData(`/changeName ${filteredArray[0]?.telegramId}`);
        // tg.close();
    }, [tg, filteredArray]);




    const renderButtons = () => {
        if (filteredArray.length > 0 && filteredArray[0].id === 1) {
            return (
                <div className='button-list'>
                    <button type="button" className='buttonEl' onClick={changeName}>Изменить ФИО</button>
                </div>
            )
        }
    }

    return (
        <div className="UserApplicForm">
            <div className="UserApplicFormFilling">
                <div className='adres'>
                    <label className='lable-filling'>Имя пользователя</label>
                    <div className='TextApplic'>{filteredArray.length > 0 ? filteredArray[0]?.username : ''}</div>
                </div>
                <div className='adres'>
                    <label className='lable-filling'>Телеграм id</label>
                    <div className='TextApplic'>{filteredArray.length > 0 ? filteredArray[0]?.telegramId : ''}</div>
                </div>
                {renderButtons()}
            </div>

        </div>
    );
}

export default UserProfile;