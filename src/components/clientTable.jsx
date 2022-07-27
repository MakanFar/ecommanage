import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table'
import { findGrandTotal, findDebtTotal, findInvoiceNum } from '../utils/functions';
import {db} from '../firebase/firebase';
import { doc, deleteDoc, updateDoc, addDoc, serverTimestamp, collection,query, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClientTable = ({ clients }) => {

  const navigate = useNavigate();
  const [Invoices, setInvoices] = useState([]);

  const [tableData, setTableData] = useState(clients)
  const [selectedRows, setSelectedRows] = useState([])
  const auth = getAuth();
  const user = auth.currentUser;
  let uid=''

  

  const columns = [
    { title: "Name", field: "data.customerName" },
    { title: "Invoices (#)", field: "data.ClientInvoiceNum",editable: 'never'},
    { title: "Total (Rial)", field: "data.ClientInvoiceTotal", editable: 'never'},
    { title: "Debt (Rial)", field: 'data.ClientInvoiceDebt' , editable: 'never'},
    { title: "Profit (Rial)", field: 'data.ClientInvoiceProfit' , editable: 'never'},

  ]


  async function deleteClient(id) {
    try {
      await deleteDoc(doc(db, 'clients', id));
      toast.success("Client was removed.");
    } catch (err) {
      console.log(err);
        toast.error("Something went wrong!");
    }
  }

  async function updateClient(id, name) {

    const docRef = doc(db, "clients", id);
    try {
      await updateDoc(docRef, {
        customerName: name
      });
      toast.success("Client was updated.");
      
    } catch (err) {
      console.log(err);
        toast.error("Something went wrong!");
    }
  }

  async function addClient(name) {

    await addDoc(collection(db, 'clients'), {
      user_id: user.uid,
      customerName: name,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        toast.success("Client was added.");
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
        title="Client list"
        data={tableData}
        onSelectionChange={(rows) => setSelectedRows(rows)}
        columns={columns}
        options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
        editable={{

          onRowAdd: (newData) => new Promise((resolve, reject) => {
            addClient(newData.data.customerName)
            setTimeout(() => {
              {
                const updatedRows = [...tableData, { id: Math.floor(Math.random() * 100), ...newData }]
                setTableData(updatedRows)
              }
              resolve()
            }, 1000)
         
          }),
          onRowDelete: (oldData) => new Promise((resolve, reject) => {
           
            deleteClient(oldData.id)
            setTimeout(() => {
              const dataDelete = [...tableData];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setTableData([...dataDelete]);
              
              resolve()
            }, 1000)

            }),

            onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {

              updateClient(oldData.id, newData.data.customerName)
              setTimeout(() => {
                const dataUpdate = [...tableData];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setTableData([...dataUpdate]);

                resolve();
            }, 1000);
          
            }),
            
        
        }}
        actions={[
          {
            icon: 'description',
            tooltip: 'Open',
            onClick: (event, rowData) => { 
              navigate(`/view/client/${rowData.id}/`)
              
            }
          }
        ]}
      />
    </div>
  );
}

export default ClientTable;