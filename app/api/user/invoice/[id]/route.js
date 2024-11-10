import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Customer from "@/models/customers";
import Category from "@/models/category";
import User from "@/models/user";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/utils/authOptions";

import Invoice from "@/models/invoice";
import Invoicedetails from "@/models/invoicedetails";
import Payment from "@/models/payment";
import PaymentDetails from "@/models/paymentdetails";



export async function DELETE(req, context) {

  await dbConnect()

  try {

    const invoice= await Invoice.findByIdAndDelete(context.params.id )


   const  invoicedetails= await Invoicedetails.deleteMany({ invoice_id: invoice?._id });
   const payment= await Payment.deleteMany({ invoice_id: invoice?._id });
    const paymentdetails= await PaymentDetails.deleteMany({ invoice_id: invoice?._id });



    console.log("DELETE", {
      invoice,
      invoicedetails,
      payment,
      paymentdetails

    })


    return NextResponse.json(invoice)



  } catch (err) {

    return NextResponse.json({ err: err.message }, { status: 500 })

  }



}


