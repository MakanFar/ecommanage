import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table'
import { findDebtTotal, findDebt, findProfit, findGrossInvoice } from '../utils/functions';
import {db} from '../firebase/firebase';
import { doc, updateDoc, arrayRemove, arrayUnion, deleteField  } from 'firebase/firestore';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Title from './title';
const ItemListTable = ( {invoice} ) => {

  
  const [tableData, setTableData] = useState(invoice.data.itemList)
  const [selectedRows, setSelectedRows] = useState([])


  const columns = [
    { title: "Name", field: "itemName" },
    { title: "Cost (TRY)", field: "itemCost" },
    { title: "Sold (Rial)", field: "itemSold" },
    { title: "Rate (Rial)", field: "itemRate" },
    { title: "Qty", field: "itemQuantity" },
    { title: "Paid (Rial)", field: "itemPaid" },
    { title: "Debt (Rial)", field: "debt", render:(row)=>findDebt(row),editable: 'never' },
    { title: "Profit (Rial)", field: "profit", render:(row)=>findProfit(row),editable: 'never' },
  ]


  async function deleteInvoice(item) {
    const docRef = doc(db, 'invoices', invoice.id);

    await updateDoc(docRef, {
      itemList: arrayRemove(item.id)
    }).then(() => {
      alert("done");
    })
    .catch((err) => {
      console.log(err);
    });
   
  }

  async function addInvoice(itemName, itemCost, itemSold, itemRate, itemPaid, itemQuantity) {

    const docRef = doc(db, 'invoices', invoice.id);

    await updateDoc(docRef, {
      itemList: arrayUnion(itemName, itemCost, itemSold, itemRate, itemPaid, itemQuantity)
    })
      .then(() => {
        alert("done");
      })
      .catch((err) => {
        console.log(err);
      });
  }


  
  

  return (

          <div className="App">
            <MaterialTable
              title={invoice.data.customerName}
              data={tableData}
              onSelectionChange={(rows) => setSelectedRows(rows)}
              columns={columns}
              options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
              editable={{
                onRowDelete: (oldData) => new Promise((resolve, reject) => {
                  //Backend call
                  deleteInvoice(oldData)
      
                  }),

                  onRowAdd: (newData) => new Promise((resolve, reject) => {

                    addInvoice(newData, newData, newData, newData, newData, newData)
                 
                  }),

              
              }}
              

        
            />

              <Stack direction="row" spacing={1}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 150,
                  }}
                >
                   <Title>Gross Profit</Title>
                  <Typography component="p" variant="h4">
                    {findGrossInvoice(invoice.data)} Rial
                  </Typography>
                </Paper>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 150,
                  }}
                >
                   <Title>Total Debt</Title>
                  <Typography component="p" variant="h4">
                  {findDebtTotal(invoice.data)} Rial
                  </Typography>
                </Paper>
                
                
                </Stack>
          </div>

  );
}

export default ItemListTable;