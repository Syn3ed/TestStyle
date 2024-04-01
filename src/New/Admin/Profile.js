import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const Profile = () => {
    const { id } = useParams();
    const tg = window.Telegram.WebApp;
    const navigate = useNavigate();
    const [dataArray, setDataArray] = useState([]);
    const [filteredArray, setFilteredArray] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://www.tgbottp.ru/adminFullList');
                setDataArray(response.data.map(item => ({
                    id: item.id,
                    telegramId: item.telegramId,
                    username: item.username,
                    RoleId: item.RoleId,
                })));
                console.log(dataArray)
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();

    },);

    const roleMap = {
        1: 'Администратор',
        2: 'Пользователь',
        3: 'Оператор'
    };

    useEffect(() => {
        const filteredData = dataArray.filter(item => item.id === parseInt(id));
        console.log(filteredData)
        console.log(id)
        setFilteredArray(filteredData);
    }, [dataArray, id]);

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



    const changeRoleUser = useCallback(() => {
        tg.sendData(`/changeRoleUser ${filteredArray[0]?.telegramId}`);
        // tg.close();
    }, [tg, filteredArray]);

    const changeRoleOperator = useCallback(() => {
        tg.sendData(`/changeRoleOperator ${filteredArray[0]?.telegramId}`);
        // tg.close();
    }, [tg, filteredArray]);

    const changeRoleAdmin = useCallback(() => {
        tg.sendData(`/changeRoleAdmin ${filteredArray[0]?.telegramId}`);
        // tg.close();
    }, [tg, filteredArray]);


    const renderButtons = () => {

        if (filteredArray.length > 0 && filteredArray[0].id === 1) {
            return (
                <div className='button-list'>
                    <button type="button" className='buttonEl' onClick={changeRoleUser}>Изменить роль на пользователя </button>
                    <button type="button" className='buttonEl' onClick={changeRoleOperator}>Изменить роль оператора</button>
                </div>
            );
        } else  if (filteredArray.length > 0 && filteredArray[0].id === 2) {
            return (
                <div className='button-list'>
                    <button type="button" className='buttonEl' onClick={changeRoleOperator}>Изменить роль оператора</button>
                    <button type="button" className='buttonEl' onClick={changeRoleAdmin}>Изменить роль администратора</button>
                </div>
            );
        } else {
            return (
                <div className='button-list'>
                    <button type="button" className='buttonEl' onClick={changeRoleUser}>Изменить роль на пользователя </button>
                    <button type="button" className='buttonEl' onClick={changeRoleAdmin}>Изменить роль администратора</button>
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
                <div className='theme'>
                    <label className='lable-filling'>Роль</label>
                    <div className='TextApplic'>{filteredArray.length > 0 ? roleMap[filteredArray[0]?.id] : ''}</div>
                </div>
                {renderButtons()}
            </div>

        </div>
    );
}

export default Profile;
