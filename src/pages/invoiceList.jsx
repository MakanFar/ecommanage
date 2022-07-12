import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import InvoiceTable from '../components/invoices';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import DashboardLayout from '../layouts/dashboard';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';


const InvoiceList = () => {

  const [listInvoice, setListInvoice] = useState(true);

  const {
    formState: { errors },
    reset,
  } = useForm();


  const switchView = (value) => {
    setListInvoice(!value);
    reset();
  };

 

  return (
    <DashboardLayout>

    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>

      <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                {listInvoice ? (

                <>
                  <InvoiceTable />
                  <Button variant="contained" sx={{ mt: 2, mb: 2 }} onClick={() => switchView(true)}> Create Invoice</Button>

                </>


                ) : (

                  <Box
                  sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Register User
                  </Typography>
                  <Box component="form" noValidate sx={{ mt: 1 }} >
          
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      type="email"
                    />
                  
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                  
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      register
                    </Button>
                    <Grid container >
                    </Grid>
                  </Box>
                </Box>
  

                )}
              </Paper>
        </Grid>
              
      </Grid>

    </Container>



    </DashboardLayout>
    
    
     
  );
}

export default InvoiceList;