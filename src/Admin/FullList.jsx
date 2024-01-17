import React, { useEffect, useState } from "react";
import Table from './Table';
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
        const response = await axios.get('https://85.119.146.125:3000/adminFullList');
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

export default FullList;