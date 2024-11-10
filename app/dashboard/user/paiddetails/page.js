"use client"

import { useSearchParams } from 'next/navigation'


import PaidPdf from "@/components/paiddetails/PaidDetails"



export default function PrintCredit() {

  const searchParams = useSearchParams()

  const search = searchParams.get('detail')


  return (
    <>

      <PaidPdf search={search} />
    </>
  )


}