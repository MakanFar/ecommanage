import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './title';
import { useNavigate } from 'react-router-dom';


function preventDefault(event) {
  event.preventDefault();
}
export default function Orders({clients, businessDetails}) {
  const navigate = useNavigate();


  const currency = businessDetails[0].data.currency;

  return (
    <React.Fragment>
      <Title>Recent Invoices</Title>
      
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Invoices (#)</TableCell>
            <TableCell>Total ({currency})</TableCell>
            <TableCell>Debt ({currency})</TableCell>
            <TableCell>Profit ({currency})</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.slice(0, 5).filter(client =>client.data.ClientInvoiceDebt > 0)
          .sort((a, b) => (a.data.ClientInvoiceDebt < b.data.ClientInvoiceDebt) ? 1 : -1)
          .map((item, Index) => (
         
            <TableRow key={Index}>
                 <TableCell>{item.data.customerName}</TableCell>
                 <TableCell>{item.data.ClientInvoiceNum}</TableCell>
                 <TableCell>{item.data.ClientInvoiceTotal}</TableCell>
                 <TableCell>{item.data.ClientInvoiceDebt}</TableCell>
                 <TableCell>{item.data.ClientInvoiceTotal}</TableCell>    
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={navigate("/clients")} sx={{ mt: 3 }}>
        See more
      </Link>
    </React.Fragment>
  );
}