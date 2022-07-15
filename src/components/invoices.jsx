import React, { useState } from 'react';
import MaterialTable from 'material-table'
import { findGrandTotal, findDebtTotal } from '../utils/functions';
import {db} from '../firebase/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

const InvoiceTable = ({ invoices }) => {

  const [tableData, setTableData] = useState(invoices)
  const [selectedRows, setSelectedRows] = useState([])

  const columns = [
    { title: "Name", field: "data.customerName" },
    { title: "Invoices (#)", field: "data.itemList.length" },
    { title: "Total (Rial)", field: "total", render:(row)=>findGrandTotal(row.data)},
    { title: "Debt (Rial)", field: 'debt' , render:(row)=>findDebtTotal(row.data)},
  ]
  const handleBulkDelete = () => {
    const updatedData = tableData.filter(row => !selectedRows.includes(row))
    setTableData(updatedData)
  }

  async function deleteInvoice(id) {
    try {
      await deleteDoc(doc(db, 'invoices', id));
      alert("success")
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div className="App">
      <MaterialTable
        title="Employee Data"
        data={tableData}
        onSelectionChange={(rows) => setSelectedRows(rows)}
        columns={columns}
        options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
        editable={{
        
        }}
      />
    </div>
  );
}

export default InvoiceTable;