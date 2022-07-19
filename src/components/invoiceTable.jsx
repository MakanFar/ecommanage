import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table'
import { findDebtTotal, findDebt, findProfit, findGrossInvoice } from '../utils/functions';
import {db} from '../firebase/firebase';
import { doc, updateDoc, deleteDoc, addDoc, collection, arrayUnion,serverTimestamp  } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Title from './title';
const InvoiceTable = ( {client, invoices} ) => {

  
  const [tableData, setTableData] = useState(invoices)
  const [selectedRows, setSelectedRows] = useState([])


  const columns = [
    { title: "Name", field: "data.itemName" },
    { title: "Cost (TRY)", field: "data.itemCost" },
    { title: "Sold (Rial)", field: "data.itemSold" },
    { title: "Rate (Rial)", field: "data.itemRate" },
    { title: "Qty", field: "data.itemQuantity" },
    { title: "Paid (Rial)", field: "data.itemPaid" },
    { title: "Debt (Rial)", field: "debt", render:(row)=>findDebt(row.data),editable: 'never' },
    { title: "Profit (Rial)", field: "profit", render:(row)=>findProfit(row.data),editable: 'never' },
  ]



  async function deleteInvoice(id) {
    const docRef = doc(db, "clients", client);
    try {
      await deleteDoc(doc(docRef, "invoices", id));
      toast.success("Invoice was removed.");
    } catch (err) {
      toast.error("Something went wrong!");
    }
  }

  async function addInvoice(name,cost,sold,rate,qty,paid) {

    const docRef = doc(db, "clients", client);
    const colRef = collection(docRef, "invoices")


    await addDoc(colRef, {
      itemName: name,
      itemCost: cost,
      itemSold: sold,
      itemRate: rate,
      itemQuantity: qty,
      itemPaid: paid,
  
    })
      .then(() => {
        toast.success("Invoice was added.");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      });
  }


  
  

  return (
          
          <div className="App">
            <ToastContainer />
            <MaterialTable
              title="Invoice list"
              data={tableData}
              onSelectionChange={(rows) => setSelectedRows(rows)}
              columns={columns}
              options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
              editable={{
                onRowDelete: (oldData) => new Promise((resolve, reject) => {

                  deleteInvoice(oldData.id)
                  
                  }),

                  onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {

                    deleteInvoice(oldData.id)
                    
                    }),

                  onRowAdd: (newData) => new Promise((resolve, reject) => {

                    addInvoice(
                      newData.data.itemName,
                      newData.data.itemCost,
                      newData.data.itemSold,
                      newData.data.itemRate,
                      newData.data.itemQuantity,
                      newData.data.itemPaid,
                      )
                 
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
                  </Typography>
                </Paper>
                
                
                </Stack>
          </div>

  );
}

export default InvoiceTable;