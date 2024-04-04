import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchUser = () => {
    const [dataArray, setDataArray] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [filteredDataArray, setFilteredDataArray] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        window.Telegram.WebApp.MainButton.hide();
        window.Telegram.WebApp.BackButton.show();
    }, []);

    useEffect(() => {
        const handleBackButton = () => {
            navigate(-1);
        };
        window.addEventListener('popstate', handleBackButton);
        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, [navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://www.tgbottp.ru/adminFullList');
                const users = response.data.map(item => ({
                    id: item.id,
                    telegramId: item.telegramId,
                    username: item.username,
                    RoleId: item.RoleId,
                }));
                setDataArray(users);
                setFilteredDataArray(users);
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, []);

    const roleMap = {
        1: 'Администратор',
        2: 'Пользователь',
        3: 'Оператор'
    };

    const handleRowClick = (id) => {
        navigate(`/Profile/${id}`);
    };

    const handleSearch = (value) => {
        setSearchId(value);
        const filteredUsers = dataArray.filter(user =>
            user.telegramId.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredDataArray(filteredUsers);
    };

    return (
        <div className="form">
            <div className='greeting'>
                <div className='applic-list'></div>
            </div>
            <div className={`form-filling1 disappear`}>
                <input
                    type="text"
                    placeholder="Введите ID телеграмма"
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
                            <div className='nick'>{roleMap[user.RoleId]}</div>
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

export default SearchUser;