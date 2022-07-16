
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";

// pages
import DashboardContent from "./pages/dashboard";

import InvoiceList from "./pages/invoiceList";

import Auth from "./pages/auth";

import SignupBusiness from "./pages/signupBusiness";
import InvoiceDetail from "./pages/invoiceDetail";

const App = () => {


    return (
      <>
      
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<DashboardContent />} />
            <Route path="/business" element={<SignupBusiness />} />
            <Route path="/invoices" element={<InvoiceList />} />
            <Route path="/view/invoice/:id" element={<InvoiceDetail/>}/>
          </Routes>
     
      </>
    );
  };
  
  export default App;