"use client"

import { useSearchParams } from 'next/navigation'


import Print from "@/components/PrintInvoiceList/Print"



export default function PrintInvoice() {

  const searchParams = useSearchParams()

  const search = searchParams.get('invoiceid')


  return (
    <>
      <Print search={search} />
    </>
  )


}