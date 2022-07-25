import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import DashboardLayout from '../layouts/dashboard';

import { useNavigate } from 'react-router-dom';
import {db} from '../firebase/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from '../components/loading';
import { doc ,query, collection, where, onSnapshot, serverTimestamp, addDoc} from '@firebase/firestore';
import InvoiceTable from '../components/invoiceTable'
import { useParams } from 'react-router-dom';



const Invoices = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [Invoices, setInvoices] = useState([]);

    const [businessDetails, setBusinessDetails] = useState(null);
    const auth = getAuth();
    const user = auth.currentUser;
    let uid='';

    const props = {
      client: id,
      invoices: Invoices,
    };

    
    useEffect(() => {


      onAuthStateChanged(auth, (user) => {

        if (!user) return navigate('/auth');
        const uid = user.uid;
    
        try {
          const docRef = doc(db, "clients", id);
          const q = query(
            collection(docRef, 'invoices')
          );
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const firebaseInvoices = [];
            querySnapshot.forEach((doc) => {
              firebaseInvoices.push({ data: doc.data(), id: doc.id });
            });
            setInvoices(firebaseInvoices);
            setLoading(false);
            return () => unsubscribe();
          });
        } catch (error) {
          console.log(error);
        }
    
      });
     
    }, [uid]);




 

  return (


    <>
      {loading ? (
        <Loading />
      ) : (

        <DashboardLayout>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>


       

               <InvoiceTable {...props} />
                
             
          
        </Container>



        </DashboardLayout>
        
    
        )}
      </>
  );
}

export default Invoices;