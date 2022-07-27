import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './title';
import { doc ,query, collection, where, onSnapshot, serverTimestamp, addDoc} from '@firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {db} from '../firebase/firebase';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];

export default function Chart({clients, businessDetails}) {

const auth = getAuth();
const user = auth.currentUser;
const theme = useTheme();
const [Invoices, setInvoices] = useState([]);
const ids = clients.filter(x => x.id).map(x => x.id)

useEffect(() => {


  onAuthStateChanged(auth, (user) => {

    const uid = user.uid;

    try {
      
      const docRef = doc(db, "clients", ids);
      const q = query(
        collection(docRef, 'invoices')
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const firebaseInvoices = [];
        querySnapshot.forEach((doc) => {
          firebaseInvoices.push({ data: doc.data(), id: doc.id });
        });
        setInvoices(firebaseInvoices);
        return () => unsubscribe();
      });
    } catch (error) {
      console.log(error);
    }

  });
 
}, []);


  return (
    <React.Fragment>
      <Title>Today</Title>
      { console.log(Invoices)}
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}