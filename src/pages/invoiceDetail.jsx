import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import DashboardLayout from '../layouts/dashboard';

import { useNavigate } from 'react-router-dom';
import {db} from '../firebase/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from '../components/loading';
import { doc ,query, collection, where, onSnapshot, serverTimestamp, addDoc} from '@firebase/firestore';
import ItemListTable from '../components/itemListTable'
import { useParams } from 'react-router-dom';



const InvoiceDetail = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [invoiceDetails, setInvoiceDetails] = useState(null);
    const [businessDetails, setBusinessDetails] = useState(null);
    const auth = getAuth();
    const user = auth.currentUser;
    let uid='';

    
    useEffect(() => {


      onAuthStateChanged(auth, (user) => {

        if (!user) return navigate('/auth');
        const uid = user.uid;

        try {
          const q = query(
            collection(db, 'businesses'),
            where('user_id', '==', uid)
          );
          onSnapshot(q, (querySnapshot) => {
            const firebaseBusinesses = [];
            querySnapshot.forEach((doc) => {
              firebaseBusinesses.push({ data: doc.data(), id: doc.id });
            });
            setBusinessDetails(firebaseBusinesses);
          });
          if (id) {
            const unsub = onSnapshot(doc(db, 'invoices', id), (doc) => {
              setInvoiceDetails({ data: doc.data(), id: doc.id });
            });
            setLoading(false);
            return () => unsub();
          }
        } catch (error) {
          console.error(error);
        }
       




      });

      
      }, [id,  uid]);




 

  return (


    <>
      {loading ? (
        <Loading />
      ) : (

        <DashboardLayout>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>


        {invoiceDetails && (
                
                  <ItemListTable invoice={invoiceDetails} />
                
              )}
          
        </Container>



        </DashboardLayout>
        
    
        )}
      </>
  );
}

export default InvoiceDetail;