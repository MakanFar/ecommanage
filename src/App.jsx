
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";

// pages
import DashboardContent from "./pages/dashboard";

import ClientList from "./pages/clients";

import Auth from "./pages/auth";

import SignupBusiness from "./pages/signupBusiness";
import Invoices from "./pages/invoices";

const App = () => {


    return (
      <>
      
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<DashboardContent />} />
            <Route path="/business" element={<SignupBusiness />} />
            <Route path="/clients" element={<ClientList />} />
            <Route path="/view/client/:id" element={<Invoices/>}/>
          </Routes>
     
      </>
    );
  };
  
  export default App;