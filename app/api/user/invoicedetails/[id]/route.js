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



export async function GET(req, context) {

  await dbConnect()

  try {


    const invoice = await Invoice.find({ _id: context.params.id })

   

    const invoicedetails = await Invoicedetails.find({ invoice_id: invoice[0]?._id }).populate("category_id").populate("product_id")

    const payment = await Payment.find({ invoice_id: invoice[0]?._id }).populate("customer_id")

    const paymentDetails = await PaymentDetails.find({ invoice_id: invoice[0]?._id })

//     console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
    
    
//     console.log("invoice" ,  invoice)
    
    

  console.log("7777777777777 invoicedetails", invoicedetails)


//     //console.log("payment", payment)
//  //console.log("paymentDetails" , paymentDetails)
//     console.log("xyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")

    return NextResponse.json({  
      invoice, invoicedetails, payment, paymentDetails 

     })



  } catch (err) {
 console.log(err)
    return NextResponse.json({ err: err.message }, { status: 500 })

  }



}

