"use client"

import { useSearchParams } from 'next/navigation'


import CreditPdf from "@/components/creditdetails/CreditDetails"



export default function PrintCredit() {

  const searchParams = useSearchParams()

  const search = searchParams.get('detail')


  return (
    <>
   
      <CreditPdf  search={search} />
    </>
  )


}