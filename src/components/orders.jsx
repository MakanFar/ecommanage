import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './title';
import axios from 'axios';


function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {

  const [itemList, setItemList] = useState([])

  useEffect(() => {
    refreshItemList();
  }, [])


  function refreshItemList() {
    const getOrders = axios.get('https://sheetdb.io/api/v1/zmtrya7kgc2ln')
    .then( response => { 
      
      setItemList(response.data)
      console.log(response.data);
    }
    );
  }
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Bought</TableCell>
            <TableCell>Sold</TableCell>
            <TableCell>Profit</TableCell>
            <TableCell>Debt</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemList.map((item, Index) => (
            <TableRow key={Index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.bought}</TableCell>
              <TableCell>{item.sold}</TableCell>
              <TableCell>{item.profit}</TableCell>
              <TableCell>{item.debt}</TableCell>
              <TableCell align="right">{`$${item.date}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}