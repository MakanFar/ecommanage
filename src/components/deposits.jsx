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