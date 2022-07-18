import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from '../components/charts';
import Deposits from '../components/deposits';
import Orders from '../components/orders';
import DashboardLayout from '../layouts/dashboard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { query, collection, where, onSnapshot } from '@firebase/firestore';
import {db} from '../firebase/firebase';
import Loading from '../components/loading';
import { getAuth, onAuthStateChanged } from "firebase/auth";


function DashboardContent() {

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  let uid=''


  useEffect(() => {

    onAuthStateChanged(auth, (user) => {

      if (!user) return navigate('/auth');
      const uid = user.uid;

      try {
        const q = query(
          collection(db, 'invoices'),
          where('user_id', '==', uid)
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
    
  }, [ uid]);



  return (

    <>
      {loading ? (
        <Loading />
      ) : (
    
     <DashboardLayout>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
          </Container>


       </DashboardLayout>


      )}
  </>
     
  );
}

export default DashboardContent;