import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table'
import { calculateDebt, findGrandTotal, findInvoiceNum, calculateProfit, findGrossInvoice, findDebtTotal } from '../utils/functions';
import {db} from '../firebase/firebase';
import { doc, updateDoc, deleteDoc, addDoc, collection,setDoc, arrayUnion,serverTimestamp  } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Title from './title';
const InvoiceTable = ( {client, invoices} ) => {

  
  const [tableData, setTableData] = useState(invoices)
  const [selectedRows, setSelectedRows] = useState([])
  const auth = getAuth();
  const user = auth.currentUser;


  const columns = [
    { title: "Name", field: "data.itemName" },
    { title: "Cost (TRY)", field: "data.itemCost" },
    { title: "Sold (Rial)", field: "data.itemSold" },
    { title: "Rate (Rial)", field: "data.itemRate" },
    { title: "Qty", field: "data.itemQuantity" },
    { title: "Paid (Rial)", field: "data.itemPaid" },
    { title: "Debt (Rial)", field: "data.itemDebt",editable: 'never'},
    { title: "Profit (Rial)", field: "data.itemProfit" ,editable: 'never'},
  ]

  async function updateClient(){

    const docRef = doc(db, "clients", client);

    try {
      await setDoc(docRef, {
        ClientInvoiceTotal: findGrandTotal(invoices),
        ClientInvoiceNum: findInvoiceNum(invoices),
        ClientInvoiceDebt: findDebtTotal(invoices),
        ClientInvoiceProfit: findGrossInvoice(invoices),
      }, { merge: true });

  } catch (err) {
    console.log(err)
  }
}
  async function updateInvoice(id, name,cost,sold,rate,qty,paid) {
    const docRef = doc(db, "clients", client);
    try {
      await updateDoc(doc (docRef, "invoices", id), {
        itemName: name,
      itemCost: cost,
      itemSold: sold,
      itemRate: rate,
      itemQuantity: qty,
      itemPaid: paid,
      itemDebt: calculateDebt(sold, qty, paid),
      itemProfit: calculateProfit(sold, cost, rate, qty),
      });


      console.log(updateInvoice,updateClient)
      toast.success("Invoice was updated.")
      
      
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err)
    }
  }
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
      user_id: user.uid,
      itemName: name,
      itemCost: cost,
      itemSold: sold,
      itemRate: rate,
      itemQuantity: qty,
      itemPaid: paid,
      itemDebt: calculateDebt(sold, qty, paid),
      itemProfit: calculateProfit(sold, cost, rate, qty),
  
    })

      .then(() => {
        toast.success("Invoice was added.");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      });
  }
  useEffect(() => {
    return () => {
      
    }
  }, [updateClient()])

  
  

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

                  deleteInvoice(oldData.id);

                  
                  }),

                  onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {

                    updateInvoice(
                      oldData.id, 
                      newData.data.itemName,
                      newData.data.itemCost,
                      newData.data.itemSold,
                      newData.data.itemRate,
                      newData.data.itemQuantity,
                      newData.data.itemPaid,
                      );

                    
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