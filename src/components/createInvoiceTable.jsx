import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {findProfit, findDebt} from '../utils/functions'

const CreateInvoiceTable = ({ itemList }) => {
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>Product</TableCell>
          <TableCell align="right">Cost (TRY)</TableCell>
          <TableCell align="right">Sold (Rial)</TableCell>
          <TableCell align="right">Rate (Rial)</TableCell>
          <TableCell align="right">Qty</TableCell>
          <TableCell align="right">Profit (Rial)</TableCell>
          <TableCell align="right">Debt (Rial)</TableCell>

        </TableRow>
      </TableHead>
      <TableBody>
        {itemList.map((item) => (
          <TableRow
            key={item.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {item.itemName}
            </TableCell>
            <TableCell align="right">{item.itemCost}</TableCell>
            <TableCell align="right">{item.itemSold}</TableCell>
            <TableCell align="right">{item.itemRate}</TableCell>
            <TableCell align="right">{item.itemQuantity}</TableCell>
            <TableCell align="right">{findProfit(item)}</TableCell>
            <TableCell align="right">{findDebt(item)}</TableCell>


          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
};

export default CreateInvoiceTable;



