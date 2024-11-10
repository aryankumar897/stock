
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Payment from "@/models/payment";








export async function GET() {

  await dbConnect();

  try {

  

    const payment = await Payment.find({}).populate("customer_id")
 return NextResponse.json(payment)


  } catch (err) {
    console.log(err)
    return NextResponse.json({ err: err.message }, { status: 500 })

  }

}

