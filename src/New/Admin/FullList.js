import React, { useEffect, useState } from "react";
import axios from 'axios';

const FullList = () => {
    const [dataArray, setDataArray] = useState([]);

    useEffect(() => {
        window.Telegram.WebApp.MainButton.hide()
        window.Telegram.WebApp.BackButton.show()
    }, [])


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
                    <div className='applic' key={row.id} >
                        {/*  onClick={() => handleRowClick(row.id) */}
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
                                {row.RoleId}
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

export default FullList;