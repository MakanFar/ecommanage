import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthSide from '../components/authSide';
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  onSnapshot,
  query,
  where,
} from '@firebase/firestore';
import { useNavigate } from 'react-router-dom';
import {db} from '../firebase/firebase';
import { useSelector } from 'react-redux';


const theme = createTheme();

const SignupBusiness = () => {

  const user = useSelector((state) => state.user.user);
  const [businessName, setBusinessName] = useState('');
  const [currency, setCurrency] = useState('');

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!user.id) return navigate('/login');
    try {
      const q = query(
        collection(db, 'businesses'),
        where('user_id', '==', user.id)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const business = [];
        querySnapshot.forEach((doc) => {
          business.push(doc.data().name);
        });
        setLoading(false);
        if (business.length > 0) {
          navigate('/dashboard');
        }
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }, [navigate, user.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, 'businesses'), {
      user_id: user.id,
      businessName,
      currency,

    });
    {
      
      navigate('/dashboard');
    }
  };
 

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <AuthSide />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="businessName"
                label="Business Name"
                name="businessName"
                autoComplete="Business name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                autoFocus
              />
               <TextField
                margin="normal"
                required
                fullWidth
                id="currency"
                label="Currency"
                name="currency"
                autoComplete="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register Business
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>

  );
}

export default SignupBusiness;