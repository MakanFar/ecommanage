import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import ClientTable from '../components/clientTable';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import DashboardLayout from '../layouts/dashboard';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {db} from '../firebase/firebase';
import Loading from '../components/loading';
import { query, collection, where, onSnapshot, serverTimestamp, addDoc} from '@firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";



const ClientList = () => {

const navigate = useNavigate();
const [clients, setClients] = useState([]);
const [loading, setLoading] = useState(true);
const auth = getAuth();
const user = auth.currentUser;
let uid=''

useEffect(() => {
  
  onAuthStateChanged(auth, (user) => {

    const uid = user.uid;

    try {
      const q = query(
        collection(db, 'clients'),
        where('user_id', '==', uid)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const firebaseClients = [];
        querySnapshot.forEach((doc) => {
          firebaseClients.push({ data: doc.data(), id: doc.id });
        });
        setClients(firebaseClients);
        setLoading(false);
        return () => unsubscribe();
      });
    } catch (error) {
      console.log(error);
    }

  });
 
}, []);



 

  return (


    <>
      {loading ? (
        <Loading />
      ) : (

        <DashboardLayout>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>

          <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    
                      
                      <ClientTable clients={clients} /> 

              
                  </Paper>
            </Grid>
                  
          </Grid>

        </Container>



        </DashboardLayout>
        
    
        )}
      </>
  );
}

export default ClientList;