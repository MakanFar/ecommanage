export const findLength = ( { itemList } ) => {

  let len = 0;

  if (itemList){

      len = itemList.length
    }

  return len;
      

};




export const findGrandTotal = ( { itemList } ) => {

    let total = 0;
    if (itemList){

      for (let i = 0; i < itemList.length; i++) {
        const amount = itemList[i].itemSold * itemList[i].itemQuantity;
        total += amount;
      }
      
    }
    
    return `${total.toLocaleString('en-US')}`;
  };


  export const findGrossInvoice = ( { itemList } ) => {

    let total = 0;

    if (itemList){

      for (let i = 0; i < itemList.length; i++) {
        const amount = (itemList[i].itemSold * itemList[i].itemQuantity) - ((itemList[i].itemCost * itemList[i].itemRate) * itemList[i].itemQuantity);
        total += amount;
      }

    }

    
    return `${total.toLocaleString('en-US')}`;
  };


  export const findDebtTotal = ( { itemList } ) => {
    
    let debt = 0;

    if (itemList){

      for (let i = 0; i < itemList.length; i++) {

        const amount = (itemList[i].itemSold * itemList[i].itemQuantity) - (itemList[i].itemPaid * itemList[i].itemQuantity);
  
        debt += amount;
      }
    }

   
    return `${debt.toLocaleString('en-US')}`;
  };


  export const findDebt = ( item ) => {

    let debt = 0;

    if (item){

      debt = (item.itemSold * item.itemQuantity) - item.itemPaid

    }

    

    return `${debt.toLocaleString('en-US')}`;
  };


  export const findProfit = ( item ) => {

    let profit = 0;

    if (item){

      profit = (item.itemSold * item.itemQuantity) - ((item.itemCost * item.itemRate) * item.itemQuantity)

    }


    return `${profit.toLocaleString('en-US')}`;
  };