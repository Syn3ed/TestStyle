import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Table from './UserReq.jsx';
import axios from 'axios';

const UserIndex = () => {
    const [dataArray, setDataArray] = useState([]);
    const { id } = useParams();

  useEffect(()=>{
    window.Telegram.WebApp.MainButton.show()
    window.Telegram.WebApp.BackButton.hide()
  },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://tg-server-0ckm.onrender.com/reqUser/${id}`);
        setDataArray(response.data.map(item => ({
          id: item.id,
          status: item.status,
          messageReq: item.messageReq,
          username: item.username,
          category: item.category
        })));
      } catch (e) {
        console.log(e);
      }
    }

    fetchData(); 

  }, [id]); 

  return (
    <div>
      <Table data={dataArray} />
    </div>
  );
};

export default UserIndex;