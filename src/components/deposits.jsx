import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './title';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {

  const [itemList, setItemList] = useState([])

  useEffect(() => {
    refreshItemList();
  }, [])


  function refreshItemList() {
    axios.get('https://sheetdb.io/api/v1/58f61be4dda40/cells/B1')
    .then( response => {
        console.log(response.data);
    });
    
  }


  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}