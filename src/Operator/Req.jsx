import React, {useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RequestDescriptionForm from './RequestDescriptionForm'

const Req = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const tg = window.Telegram.WebApp;
    const [dataArray, setDataArray] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                tg.BackButton.show();
                const response = await axios.get(`https://tg-server-0ckm.onrender.com/mes/${id}`);
                const dataArray = response.data.map(item => ({
                    dialog: item.dialog,
                    userRequestId: item.userRequestId,
                    status: item.status,
                    description: item.description,
                    subject: item.subject,
                    username: item.username,
                    address: item.address
                }));
                console.log('Full Data Array:', dataArray[0].status);
                setDataArray(dataArray);
            } catch (error) {
                console.error('Ошибка при получении данных о заявке:', error);
            }
        };

        fetchData();
    }, [id]);

    // useEffect(() => {
    //     const handleBackButton = () => {
    //         navigate(-1);
    //     };
    //     tg.BackButton.onClick(handleBackButton);
    //     return () => {
    //         tg.BackButton.offClick(handleBackButton);
    //     };
    // }, [navigate]);



    return (
        <div>
            {dataArray.length > 0 ? (
                <RequestDescriptionForm
                    request={{
                        dialog: dataArray[0].dialog,
                        userRequestId: dataArray[0].userRequestId,
                        status: dataArray[0].status,
                        description: dataArray[0].description,
                        subject: dataArray[0].subject,
                        username: dataArray[0].username,
                        address: dataArray[0].address,
                    }}
                />
            ) : (
                <div>Загрузка данных...</div>
            )}
        </div>
    );
};


export default Req;