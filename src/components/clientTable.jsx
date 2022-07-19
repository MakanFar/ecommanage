import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table'
import { findGrandTotal, findDebtTotal, findLength } from '../utils/functions';
import {db} from '../firebase/firebase';
import { doc, deleteDoc, updateDoc, addDoc, serverTimestamp, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClientTable = ({ clients }) => {

  const navigate = useNavigate();
  
  const [tableData, setTableData] = useState(clients)
  const [selectedRows, setSelectedRows] = useState([])
  const auth = getAuth();
  const user = auth.currentUser;
  let uid=''

  

  const columns = [
    { title: "Name", field: "data.customerName" },
    { title: "Invoices (#)", field: "lenght",editable: 'never',render:(row)=>findLength(row.data) },
    { title: "Total (Rial)", field: "total", editable: 'never',render:(row)=>findGrandTotal(row.data)},
    { title: "Debt (Rial)", field: 'debt' , editable: 'never',render:(row)=>findDebtTotal(row.data)},
  ]


  async function deleteClient(id) {
    try {
      await deleteDoc(doc(db, 'clients', id));
      alert("success")
    } catch (err) {
      alert(err)
    }
  }

  async function updateClient(id, name) {

    const docRef = doc(db, "inclientsvoices", id);
    try {
      await updateDoc(docRef, {
        customerName: name
      });
      alert("success")
      
    } catch (err) {
      alert(err)
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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
  
      if (!user) return navigate('/auth');
      const uid = user.uid;
  
    });
   
  }, [navigate ,uid]);

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
         
          }),
          onRowDelete: (oldData) => new Promise((resolve, reject) => {
           
            deleteClient(oldData.id)

            }),

            onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {


              updateClient(oldData.id, newData.data.customerName)

          
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