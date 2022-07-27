import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from '../components/charts';
import Deposits from '../components/deposits';
import Orders from '../components/orders';
import DashboardLayout from '../layouts/dashboard';
import { useSelector } from 'react-redux';
import { query, collection, where, onSnapshot } from '@firebase/firestore';
import {db} from '../firebase/firebase';
import Loading from '../components/loading';
import { getAuth, onAuthStateChanged } from "firebase/auth";


function DashboardContent() {

  const [clients, setClients] = useState([]);
  const [businessDetails, setBusinessDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;
  let uid=''

  const props = {
    clients: clients,
    businessDetails: businessDetails,
  };

  useEffect(() => {
  
    onAuthStateChanged(auth, (user) => {
  
      const uid = user.uid;
  
      try {

        const qb = query(
          collection(db, 'businesses'),
          where('user_id', '==', uid)
        );
        const q = query(
          collection(db, 'clients'),
          where('user_id', '==', uid)
        );
        onSnapshot(qb, (querySnapshot) => {
          const firebaseBusinesses  = [];
          querySnapshot.forEach((doc) => {
            firebaseBusinesses.push({ data: doc.data(), id: doc.id });
          });
          setBusinessDetails(firebaseBusinesses);

        });
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
                  <Chart {...props}/>
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
                  <Deposits {...props} />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders {...props}/>
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