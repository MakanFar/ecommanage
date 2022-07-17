import React, { useState } from 'react';
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
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/user';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const theme = createTheme();

const Auth = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


  const [createAccount, setCreateAccount] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  

  const signUpUser = (data) => {
    createUserWithEmailAndPassword(
      auth,
      data.registerEmail,
      data.registerPassword
    )
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(setUser({ id: user.uid, email: user.email }));
        navigate('/business');
      })
      .catch((error) => {
        
        toast.error('Something went wrong!');
        
      });
  };

  const loginUser = (data) => {
    signInWithEmailAndPassword(auth, data.loginEmail, data.loginPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(setUser({ id: user.uid, email: user.email }));
        navigate('/dashboard');
      })
      .catch((error) => {
        if(error.code === 'auth/wrong-password'){
          toast.error('Please check the Password');
        }
        if(error.code === 'auth/user-not-found'){
          toast.error('Please check the Email');
        }
      });
  };

 

  const switchView = (value) => {
    setCreateAccount(!value);
    reset();
  };
 

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <AuthSide />
        <ToastContainer />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {createAccount ? (
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

            
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(loginUser)}>
              
            {errors?.loginEmail && (
                <Typography style={{ color: 'red' }}>
                  {errors.loginEmail.message}
                </Typography>
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                {...register('loginEmail', {
                  required: 'Please provide a valid email',
                  pattern: {
                    value: emailFormat,
                    message: 'Enter a valid email',
                  },
                })}
              />

              {errors?.loginPassword && (
                <Typography style={{ color: 'red' }}>
                  {errors.loginPassword.message}
                </Typography>
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"

                {...register('loginPassword', {
                  required: 'Please enter a password',
                  minLength: {
                    value: 8,
                    message: 'Password must contain at least 8 characters',
                  },
                })}
              />
             
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" onClick={() => switchView(true)}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
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
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(signUpUser)}>
            
            {errors?.registerEmail && (
                <Typography style={{ color: 'red' }}>
                  {errors.registerEmail.message}
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                {...register('registerEmail', {
                  required: 'Please provide a valid email',
                  pattern: {
                    value: emailFormat,
                    message: 'Provide valid email',
                  },
                })}
                
              />

              {errors?.registerPassword && (
                <Typography style={{ color: 'red' }}>
                  {errors.registerPassword.message}
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                {...register('registerPassword', {
                  required: 'Please enter a password',
                  minLength: {
                    value: 8,
                    message: 'Your password must contain at least 8 characters',
                  },
                })}
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
              
                <Link href="#" variant="body2"  onClick={() => switchView(false)}>
                  {"Already have an account? Sign in"}
                </Link>
                
              </Grid>
            </Box>
          </Box>

        )}
       </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Auth;