import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Table from '../Table/Table.jsx';
import LedgerTable from '../Table/LedgerTable.jsx';

function PurchaseLedger() {

  // for fetching Data
  const [fetchedData, setFetchedData] = useState(null);
  const headings=['name','balanceAmount','fatRate','snfRate'];

  function fetchData(){
    axios.get("https://gfo-erp-backend-api.vercel.app/GFOERP/PurchaseVendors")
    .then((res)=>{
      if(res.data){
         setFetchedData(res.data);
      }
    })
    .catch((err)=>{
      console.log(err);
      toast.error('Error While Fetching Data');
    })
  }
  
  useEffect(()=>{
    fetchData();
  },[])

  if(fetchedData==null){
    return <p className="text-center">Loading <span className="animate-pulse">. . .</span></p>
  }

  return (
    <div className="w-full space-y-2">
      <LedgerTable headings={headings} fetchedData={fetchedData}/>
    </div>
  )
}

export default PurchaseLedger;