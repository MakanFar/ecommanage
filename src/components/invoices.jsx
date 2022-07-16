import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table'
import { findGrandTotal, findDebtTotal } from '../utils/functions';
import {db} from '../firebase/firebase';
import { doc, deleteDoc, updateDoc, addDoc, serverTimestamp, collection } from 'firebase/firestore';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

const InvoiceTable = ({ invoices }) => {

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [tableData, setTableData] = useState(invoices)
  const [selectedRows, setSelectedRows] = useState([])
  const [loading, setLoading] = useState(true);

  const columns = [
    { title: "Name", field: "data.customerName" },
    { title: "Invoices (#)", field: "data.itemList.length",editable: 'never' },
    { title: "Total (Rial)", field: "total", editable: 'never',render:(row)=>findGrandTotal(row.data)},
    { title: "Debt (Rial)", field: 'debt' , editable: 'never',render:(row)=>findDebtTotal(row.data)},
  ]


  async function deleteInvoice(id) {
    try {
      await deleteDoc(doc(db, 'invoices', id));
      alert("success")
    } catch (err) {
      alert(err)
    }
  }

  async function updateInvoice(id, name) {

    const docRef = doc(db, "invoices", id);
    try {
      await updateDoc(docRef, {
        customerName: name
      });
      alert("success")
      
    } catch (err) {
      alert(err)
    }
  }

  async function addInvoice(name) {

    await addDoc(collection(db, 'invoices'), {
      user_id: user.id,
      customerName: name,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        alert("done");
      })
      .catch((err) => {
        console.log(err);
      });
  }


  useEffect(() => {
    if (!user.id) return navigate('/auth');
    setLoading(false);
  }, [navigate, user.id]);

  return (
    <div className="App">
      <MaterialTable
        title="Employee Data"
        data={tableData}
        onSelectionChange={(rows) => setSelectedRows(rows)}
        columns={columns}
        options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
        editable={{

          onRowAdd: (newData) => new Promise((resolve, reject) => {

            addInvoice(newData.data.customerName)
         
          }),
          onRowDelete: (oldData) => new Promise((resolve, reject) => {
           
            deleteInvoice(oldData.id)

            }),

            onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {

            setTimeout(() => {

              updateInvoice(oldData.id, newData.data.customerName)

              resolve();

             }, 1000)
            }),
            
        
        }}
        actions={[
          {
            icon: 'description',
            tooltip: 'Open',
            onClick: (event, rowData) => { 
              navigate(`/view/invoice/${rowData.id}/`)
              
            }
          }
        ]}
      />
    </div>
  );
}

export default InvoiceTable;