
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";

// pages
import Login from "./pages/auth";
import DashboardContent from "./pages/dashboard";
import { AuthContext } from "./context/authContext";

import InvoiceList from "./pages/invoiceList";

import Auth from "./pages/auth";

import SignupBusiness from "./pages/signupBusiness";

const App = () => {


    return (
      <>
      
          <Routes>
            <Route path="/login" element={<Auth />} />
            <Route path="/dashboard" element={<DashboardContent />} />
            <Route path="/business" element={<SignupBusiness />} />
            <Route path="/invoices" element={<InvoiceList />} />
          </Routes>
     
      </>
    );
  };
  
  export default App;