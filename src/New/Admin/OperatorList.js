import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OperatorList = () => {
    const [dataArray, setDataArray] = useState([]);
    const tg = window.Telegram.WebApp;
    const navigate = useNavigate();


    useEffect(() => {
        window.Telegram.WebApp.MainButton.hide()
        window.Telegram.WebApp.BackButton.show()
    }, [])
    
    useEffect(() => {
        const handleBackButton = () => {
            navigate(-1);
        };
        tg.BackButton.onClick(handleBackButton);
        return () => {
            tg.BackButton.offClick(handleBackButton);
        };
    }, [navigate, tg.BackButton]);

    const roleMap = {
        1: 'Админ',
        2: 'Пользователь',
        3: 'Оператор'
    };

    const handleRowClick = (id) => {
        navigate(`/Profile/${id}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://www.tgbottp.ru/adminListOperator');
                setDataArray(response.data.map(item => ({
                    id: item.id,
                    telegramId: item.telegramId,
                    username: item.username,
                    RoleId: item.RoleId,
                })));
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();

    }, []);

    return (
        <div className="form">
            <div className='greeting'>
                <div className='applic-list'>
                </div>
            </div>
            <div className={`form-filling1 disappear`}>
                {dataArray.map((row) => (
                    <div className='applic appear' key={row.id} onClick={() => handleRowClick(row.id)}>
                        <div className='applic-label'>
                        </div>
                        <div className='applic-nickname'>
                            <div className='nick-label'>
                                Имя пользователя
                            </div>
                            <div className='nick'>
                                {row.username}
                            </div>
                        </div>
                        <div className='applic-theme'>
                            <div className='nick-label'>
                                Роль
                            </div>
                            <div className='nick'>
                                {roleMap[row.RoleId]}
                            </div>
                        </div>
                        <div className='applic-theme'>
                            <div className='nick-label'>
                                ID телеграмма
                            </div>
                            <div className='nick'>
                                {row.telegramId}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default OperatorList;