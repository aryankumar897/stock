"use client"

import { useSearchParams } from 'next/navigation'


import PrintPdf from "@/components/invoicelistpdf/InvoiceListPdf"



export default function PrintInvoice() {

  const searchParams = useSearchParams()

  const search = searchParams.get('invoiceid')


  return (
    <>
  
     <PrintPdf search={search} /> 
    </>
  )


}