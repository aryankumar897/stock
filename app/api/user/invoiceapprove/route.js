import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Customer from "@/models/customers";
import Category from "@/models/category";
import User from "@/models/user";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/utils/authOptions";
import Product from  "@/models/product"
import Invoice from "@/models/invoice";
import Invoicedetails from "@/models/invoicedetails";
import Payment from "@/models/payment";
import PaymentDetails from "@/models/paymentdetails";





export async function POST(req) {
  await dbConnect();

  const body = await req.json();

  const { invoiceDetails }=body
  console.log("yyyyyyyyyyyyyyyyyyyyyyy")
  console.log("invoicedetails",   invoiceDetails)
 console.log('xxxxxxxxxxxxxxx')
 
  try {



    // Loop through each product in invoice details to check stock
    for (let details of invoiceDetails) {
      const { product_id, selling_qty, invoice_id } = details;

      // Fetch current stock from DB
      const product = await Product.findById(product_id?._id);

      if (product.quantity < selling_qty) {
        return NextResponse.json({ success: false, message: `Not enough stock for ${product.productName}.` });
      }
    }

    // All products have enough stock, proceed to update stock and invoice status
    for (let details of invoiceDetails) {
      const { product_id, selling_qty, invoice_id } = details;

      // Decrement stock for each product
      await Product.findByIdAndUpdate(product_id?._id, { $inc: { quantity: -selling_qty } });

      // Update invoice status
      await Invoice.findByIdAndUpdate(invoice_id, { status: true });
    }

    return NextResponse.json({ success: true, message: 'Invoice approved and stock updated successfully.' });


   



  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}






