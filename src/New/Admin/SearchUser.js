import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchUser = () => {
    const [dataArray, setDataArray] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [foundItem, setFoundItem] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.Telegram.WebApp.MainButton.hide()
        window.Telegram.WebApp.BackButton.show()
    }, [])

    useEffect(() => {
        const handleBackButton = () => {
            navigate(-1);
        };
        window.addEventListener('popstate', handleBackButton);
        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, [navigate]);

    const handleRowClick = (id) => {
        navigate(`/Profile/${id}`);
    };

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

    const roleMap = {
        1: 'Администратор',
        2: 'Пользователь',
        3: 'Оператор'
    };

    const handleSearch = (value) => {
        setSearchId(value);
        const found = dataArray.find(item => new RegExp(`^${value}`, 'i').test(item.telegramId));
        setFoundItem(found);
    };

    return (
        <div className="form">
            <div className='greeting'>
                <div className='applic-list'>
                </div>
            </div>
            <div className={`form-filling1 disappear`}>
                <input
                    type="text"
                    placeholder="Введите ID телеграмма"
                    value={searchId}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                {foundItem && (
                    <div className='applic appear' onClick={() => handleRowClick(foundItem.id)}>
                        <div className='applic-label'>
                        </div>
                        <div className='applic-nickname'>
                            <div className='nick-label'>
                                Имя пользователя
                            </div>
                            <div className='nick'>
                                {foundItem.username}
                            </div>
                        </div>
                        <div className='applic-theme'>
                            <div className='nick-label'>
                                Роль
                            </div>
                            <div className='nick'>
                                {roleMap[foundItem.RoleId]}
                            </div>
                        </div>
                        <div className='applic-theme'>
                            <div className='nick-label'>
                                ID телеграмма
                            </div>
                            <div className='nick'>
                                {foundItem.telegramId}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchUser;

