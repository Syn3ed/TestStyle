import React, { useEffect, useState, useMemo } from "react";
import axios from 'axios';
import './AdminStyle.css';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const [dataArray, setDataArray] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [filteredDataArray, setFilteredDataArray] = useState([]);
    const tg = window.Telegram.WebApp;
    const navigate = useNavigate();


    useEffect(() => {
        tg.MainButton.hide()
        tg.BackButton.show()
    }, [tg])

    useEffect(() => {
        const handleBackButton = () => {
            navigate(-1);
        };
        tg.BackButton.onClick(handleBackButton);
        return () => {
            tg.BackButton.offClick(handleBackButton);
        };
    }, [navigate, tg]);

    const roleMap = useMemo(() => ({
        1: 'Администратор',
        2: 'Пользователь',
        3: 'Оператор'
    }), []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://www.tgbottp.ru/adminFullList');
                const users = response.data.map(item => ({
                    id: item.id,
                    telegramId: item.telegramId,
                    username: item.username,
                    RoleId: roleMap[item.RoleId],
                }));
                setDataArray(users);
                setFilteredDataArray(users);
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, [roleMap]);

    const handleRowClick = (id) => {
        navigate(`/Profile/${id}`);
    };

    const handleSearch = (value) => {
        setSearchId(value);
        const filteredUsers = dataArray.filter(user =>
            user.telegramId.toLowerCase().includes(value.toLowerCase()) ||
            user.username.toLowerCase().includes(value.toLowerCase()) ||
            roleMap[user.RoleId].toLowerCase().includes(value.toLowerCase())
        );
        setFilteredDataArray(filteredUsers);
    };

    return (
        <div className="form">
            <div className={`form-filling1 disappear`}>
                <input
                    className="SearchUser"
                    type="text"
                    placeholder="Введите ID телеграмма для поиска"
                    value={searchId}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                {filteredDataArray.map(user => (
                    <div className='applic appear' key={user.id} onClick={() => handleRowClick(user.id)}>
                        <div className='applic-label'></div>
                        <div className='applic-nickname'>
                            <div className='nick-label'>Имя пользователя</div>
                            <div className='nick'>{user.username}</div>
                        </div>
                        <div className='applic-theme'>
                            <div className='nick-label'>Роль</div>
                            <div className='nick'>{user.RoleId}</div>
                        </div>
                        <div className='applic-theme'>
                            <div className='nick-label'>ID телеграмма</div>
                            <div className='nick'>{user.telegramId}</div>
                        </div>
                    </div>
                ))}
                {filteredDataArray.length === 0 && (
                    <div>Нет результатов</div>
                )}
            </div>
        </div>
    );
};

export default UserList;