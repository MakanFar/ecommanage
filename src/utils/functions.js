import {getDocs, doc ,query, collection, where, onSnapshot, serverTimestamp, addDoc} from '@firebase/firestore';
import {db} from '../firebase/firebase';



export const findInvoiceNum = ( invoices ) => {

  console.log(invoices)
  let len = 0;
  if(invoices){
    len = invoices.length
  }
  return len
  
};



export const findGrandTotal = (  itemList  ) => {

    let total = 0;
    if (itemList){

      for (let i = 0; i < itemList.length; i++) {
        const amount = itemList[i].data.itemSold * itemList[i].data.itemQuantity;
        total += amount;
      }
      
    }
    
    return total;
  };


  export const findGrossInvoice = ( itemList ) => {

    let total = 0;

    if (itemList){

      for (let i = 0; i < itemList.length; i++) {
        total += itemList[i].data.itemProfit;
      }

    }

    
    return total;
  };


  export const findDebtTotal = (  itemList  ) => {
    
    let debt = 0;

    if (itemList){

      for (let i = 0; i < itemList.length; i++) {

        debt += itemList[i].data.itemDebt;
       

      }
    }

   
    return debt;
  };



  export const calculateDebt = ( itemSold,itemQuantity,itemPaid ) => {

    let debt = 0;


    debt = (itemSold * itemQuantity) - itemPaid

    

    return debt;
  };

  export const calculateProfit = ( itemSold,itemCost,itemRate, itemQuantity) => {

    let profit = 0;

    

    profit = ( (itemSold ) - (itemCost * itemRate) ) * itemQuantity

    

    

    return profit;
  };


