import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import InvoiceTable from '../components/invoices';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import DashboardLayout from '../layouts/dashboard';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { setInvoice } from '../redux/invoice';
import { useNavigate } from 'react-router-dom';
import {db} from '../firebase/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from '../components/loading';
import { doc ,query, collection, where, onSnapshot, serverTimestamp, addDoc} from '@firebase/firestore';
import ItemListTable from '../components/itemListTable'
import { useParams } from 'react-router-dom';



const InvoiceDetail = () => {

    const { id } = useParams();
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [invoiceDetails, setInvoiceDetails] = useState(null);
    const [businessDetails, setBusinessDetails] = useState(null);
    const auth = getAuth();
    const uid = '';
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

      
      }, [id, navigate, uid]);




 

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