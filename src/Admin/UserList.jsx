import React, { useEffect, useState } from "react";
import Table from './Table';
import axios from 'axios';

const UserList = () => {
    const [dataArray, setDataArray] = useState([]);

  useEffect(()=>{
    window.Telegram.WebApp.MainButton.hide()
    window.Telegram.WebApp.BackButton.show()
  },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://tg-server-0ckm.onrender.com/adminList');
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
    <div>
      <Table data={dataArray} />
    </div>
  );
};

export default UserList;