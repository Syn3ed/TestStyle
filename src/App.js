import React, { useEffect, useState } from "react";
import Table from './asd';
import axios from 'axios';

const App = () => {
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://tg-server-0ckm.onrender.com/req');
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

export default App;
