import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./OpListApplic.css";
import { useNavigate } from 'react-router-dom';

export const OpListApplic = () => {
    const [dataArray, setDataArray] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [inProgressCount, setInProgressCount] = useState(0);
    const [awaitingOperatorCount, setAwaitingOperatorCount] = useState(0);
    const [closedCount, setClosedCount] = useState(0);
    const [applyAnimation, setApplyAnimation] = useState(false);
    const tg = window.Telegram.WebApp;

    const navigate = useNavigate();

    const handleRowClick = (id) => {
        navigate(`/requestsOperator/${id}`);
    };

    useEffect(() => {
        tg.BackButton.hide();
    }, [navigate, tg]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://www.tgbottp.ru/req');
                setDataArray(response.data.map(item => ({
                    id: item.id,
                    username: item.username,
                    category: item.category,
                    status: item.status,
                    messageReq: item.messageReq
                })));
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();
    }, []);

    const filterDataByStatus = (status) => {
        setSelectedStatus(status);
    };
    useEffect(() => {
        const inProgress = dataArray.filter(item => ((item.status === 'Заявка в обработке'))).length;
        const awaitingOperator = dataArray.filter(item => item.status === 'ожидает ответа оператора').length;
        const closed = dataArray.filter(item => ((item.status === 'Заявка закрыта'))).length;


        setInProgressCount(inProgress);
        setAwaitingOperatorCount(awaitingOperator);
        setClosedCount(closed);
    }, [dataArray]);

    const filteredData = selectedStatus === 'all' ? dataArray : dataArray.filter(item => item.status === selectedStatus);
    const getStatusClassName = (status) => {
        return status === selectedStatus ? 'selected' : '';
    };
    useEffect(() => {
        const applicElements = document.querySelectorAll('.applic');
        applicElements.forEach(element => {
            element.classList.add('appear');
        });
    }, [filteredData]);
    useEffect(() => {
        const applicElements = document.querySelectorAll('.applic');
        applicElements.forEach(element => {
            element.classList.add('appear');
        });
        setApplyAnimation(true); 
    }, [filteredData]);
    const handleTransitionEnd = () => {
        setApplyAnimation(false);
    };
    return (
        <div className="form" onTransitionEnd={handleTransitionEnd}>
            <div className='greeting'>
                <div className='applic-text'>Заявок {dataArray.length}</div>
                <div className='applic-list'>
                    <div className={`all-list ${getStatusClassName('all')}`} onClick={() => filterDataByStatus('all')}>
                        <div className="textForList">Все {dataArray.length}</div>
                    </div>
                    <div className={`processing-list ${getStatusClassName('Заявка в обработке')}`} onClick={() => filterDataByStatus('Заявка в обработке')}>
                        <div className="textForList">В обработке {inProgressCount}</div>
                    </div>
                    <div className={`close-list ${getStatusClassName('Заявка закрыта')}`} onClick={() => filterDataByStatus('Заявка закрыта')}><div className="textForList">Закрыты {closedCount}</div></div>
                    <div className={`wait-list ${getStatusClassName('ожидает ответа оператора')}`} onClick={() => filterDataByStatus('ожидает ответа оператора')}><div className="textForList">В ожидании {awaitingOperatorCount}</div></div>
                </div>
            </div>
            <div className={`form-filling1 ${applyAnimation ? 'disappear' : ''}`}>
                {filteredData.map((row) => (
                    <div className='applic' key={row.id} onClick={() => handleRowClick(row.id)}>
                        <div className='applic-label'>
                            <div className='applic-numb'>#{row.id}</div>
                            <div className={`applic-status${((row.status === 'Заявка в обработке')) ? 'status-in-progress' : (((row.status === 'Заявка закрыта')) ? 'status-closed' : 'status-awaiting-operator')}`}><div className="textForList">{row.status}</div></div>
                            {/* <div className={`applic-status${row.status === 'Заявка в обработке' ? 'status-in-progress' : (row.status === 'Заявка закрыта' ? 'status-closed' : 'status-awaiting-operator')}`}><div className="textForList">{row.status}</div></div> */}
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
                                Тема заявки
                            </div>
                            <div className='nick'>
                                {row.category}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OpListApplic;