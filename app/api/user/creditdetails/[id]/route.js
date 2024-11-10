import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/utils/authOptions";

import Payment from "@/models/payment";

export async function GET(req, context) {

  await dbConnect()

  try {

    const payment = await Payment.find({ _id: context.params.id })
      .populate("invoice_id")
      .populate("customer_id")


    console.log("payment", payment)
       //console.log("paymentDetails" , paymentDetails)
      //     console.log("xyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")

    return NextResponse.json(

{
    payment
}

    )



  } catch (err) {
    console.log(err)
    return NextResponse.json({ err: err.message }, { status: 500 })

  }



}

