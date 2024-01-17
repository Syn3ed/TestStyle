import React, { useEffect, useState } from "react";
import Table from './OperReq';
import axios from 'axios';

const OperIndex = () => {
    const [dataArray, setDataArray] = useState([]);

  useEffect(()=>{
    window.Telegram.WebApp.MainButton.hide()
    window.Telegram.WebApp.BackButton.hide()
  },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://192.168.0.2:3000/req');
        setDataArray(response.data.map(item => ({
          id: item.id,
          username: item.username,
          category: item.category,
          status: item.status
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

export default OperIndex;
