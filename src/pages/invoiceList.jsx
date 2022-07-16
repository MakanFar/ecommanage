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
import CreateInvoiceTable from '../components/createInvoiceTable';
import Loading from '../components/loading';
import { query, collection, where, onSnapshot, serverTimestamp, addDoc} from '@firebase/firestore';



const InvoiceList = () => {

const navigate = useNavigate();
const [listInvoice, setListInvoice] = useState(true);
const [invoices, setInvoices] = useState([]);

const [customerName, setCustomerName] = useState("");
const [itemName, setItemName] = useState("");
const [itemCost, setItemCost] = useState(0);
const [itemSold, setItemSold] = useState(0);
const [itemRate, setItemRate] = useState(0);
const [itemQuantity, setItemQuantity] = useState(1);
const [itemPaid, setItemPaid] = useState(0);
const [itemList, setItemList] = useState([]);
const dispatch = useDispatch();
const user = useSelector((state) => state.user.user);
const [loading, setLoading] = useState(true);

useEffect(() => {
  if (!user.id) return navigate('/auth');
  try {
    const q = query(
      collection(db, 'invoices'),
      where('user_id', '==', user.id)
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
}, [navigate, user.id]);


  const {
    formState: { errors },
    reset,
  } = useForm();


  const switchView = (value) => {
    setListInvoice(!value);
    reset();
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemName.trim() && itemCost > 0 && itemQuantity >= 1) {
      setItemList([
        ...itemList,
        {
          itemName,
          itemCost,
          itemSold,
          itemRate,
          itemQuantity,
          itemPaid,
        },
      ]);
    }

    setItemName('');
    setItemCost('');
    setItemRate('');
    setItemQuantity('');
    setItemPaid('');
    setItemSold('');
  };

  const saveInvoice = async (e) => {
    e.preventDefault();
    dispatch(
      setInvoice({
        customerName,
        itemList,
   
      })
    );

    await addDoc(collection(db, 'invoices'), {
      user_id: user.id,
      customerName,
      itemList,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        alert("done");
      })
      .then(() => navigate('/invoices'))
      .catch((err) => {
        console.log(err);
      });
  };

 

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
                    {listInvoice ? (

                    <>
                      
                      {invoices[0] && <InvoiceTable invoices={invoices} /> }
                      <Button variant="contained" sx={{ mt: 2, mb: 2 }} onClick={() => switchView(true)}> Create Invoice</Button>

                    </>


                    ) : (

                    <Box
                      sx={{
                        my: 8,
                        mx: 30,
                      
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Typography component="h1" variant="h5">
                        Register User
                      </Typography>
                      <Box component="form" noValidate  onSubmit={saveInvoice}>

                      <TextField
                          margin="normal"
                          
                          required
                          fullWidth
                          id="customerName"
                          label="Customer name"
                          name="customerName"
                          type="text"
                          InputProps={{
                            endAdornment: <InputAdornment position="end"><AccountCircle /></InputAdornment>,
                        }}
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                          variant="standard"
                        />


                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="itemName"
                          label="Item name"
                          name="itemName"
                          type="text"
                          value={itemName}
                          onChange={(e) => setItemName(e.target.value)}
                          variant="standard"
                        />

                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="itemCost"
                          label="Cost"
                          name="itemCost"
                          type="number"
                          InputProps={{
                            endAdornment: <InputAdornment position="end">TRY</InputAdornment>,
                        }}
                        value={itemCost}
                        onChange={(e) => setItemCost(e.target.value)}
                          variant="standard"
                        />

                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="itemSold"
                          label="Sell price"
                          name="itemSold"
                          InputProps={{
                            endAdornment: <InputAdornment position="end">Rial</InputAdornment>,
                        }}
                          type="number"
                          variant="standard"
                          value={itemSold}
                          onChange={(e) => setItemSold(e.target.value)}
                        />

                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="itemRate"
                          label="Exchange rate"
                          name="itemRate"
                          InputProps={{
                            endAdornment: <InputAdornment position="end">Rial</InputAdornment>,
                        }}
                          type="number"
                          variant="standard"
                          value={itemRate}
                          onChange={(e) => setItemRate(e.target.value)}
                        />
                        
                      
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="itemQuantity"
                          label="Quantity"
                          name="itemQuantity"
                          type="number"
                          variant="standard"
                          value={itemQuantity}
                          onChange={(e) => setItemQuantity(e.target.value)}
                        />

                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="itemPaid"
                          label="Customer paid"
                          name="itemPaid"
                          InputProps={{
                            endAdornment: <InputAdornment position="end">Rial</InputAdornment>,
                        }}
                          type="number"
                          variant="standard"
                          value={itemPaid}
                          onChange={(e) => setItemPaid(e.target.value)}
                        />
                      
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          onClick={handleSubmit}
                          
                        >
                          Create
                        </Button>

                      
                        {itemList[0] && <CreateInvoiceTable itemList={itemList} /> }
                      
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          
                        >  
                          submit
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
        
    
        )}
      </>
  );
}

export default InvoiceList;