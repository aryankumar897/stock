
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";


import Payment from "@/models/payment";
export async function GET(req) {

  await dbConnect();


  try {


    const allData = await Payment.find({ paid_status: { $ne: 'full_due' } })
      .populate("invoice_id")
      .populate("customer_id")


    console.log("alldata", allData);
    return NextResponse.json(allData)




  } catch (err) {

    return NextResponse.json({ err: err.message }, { status: 500 })


  }

}

