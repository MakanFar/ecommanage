import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './title';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {findGrossProfit, getCurrentDate} from '../utils/functions';
import { query, collection, where, onSnapshot } from '@firebase/firestore';
import {db} from '../firebase/firebase';

function preventDefault(event) {
  event.preventDefault();
}

const Deposits = ({clients, businessDetails}) => {




  return (
    <React.Fragment>
      <Title>Total Profits</Title>
      <Typography component="p" variant="h4">
        {findGrossProfit(clients,businessDetails[0].data.currency )}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
      {getCurrentDate()}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}

export default Deposits;