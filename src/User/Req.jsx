import React, {useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RequestDescriptionForm from './RequestDescriptionForm'

const Req = () => {
    const { id } = useParams();;
    const [dataArray, setDataArray] = useState([]);

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
                console.log('Full Data Array:', dataArray[0].status);
                setDataArray(dataArray);
            } catch (error) {
                console.error('Ошибка при получении данных о заявке:', error);
            }
        };

        fetchData();
    }, [id]);


    return (
        <div>
            {dataArray.length > 0 ? (
                <RequestDescriptionForm
                    request={{
                        userRequestId: dataArray[0].userRequestId,
                        status: dataArray[0].status,
                        description: dataArray[0].description,
                        subject: dataArray[0].subject,
                        username: dataArray[0].username,
                        address: dataArray[0].address,
                        userId: dataArray[0].userId
                    }}
                />
            ) : (
                <div>Загрузка данных...</div>
            )}
        </div>
    );
};


export default Req;