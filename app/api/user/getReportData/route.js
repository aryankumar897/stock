
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import Supplier from "@/models/supplier";
import Product from "@/models/product";

export async function POST(req) {

  await dbConnect();
 const body=  await  req.json();

  const { reportType, name } = body;


  console.log({ reportType, name })


  if (!reportType || !name) {
    return NextResponse.json({ error: 'Invalid data provided' });
  }
  try {

    // const supplier = await Supplier.find({}).sort({ createdAt: -1 })
    // const product = await Product.find({}).sort({ createdAt: -1 })
    // console.log("allcat", supplier, product)


    const data = reportType === 'supplier' ? await Product.find({ supplierNameId: name }).populate("supplierNameId").populate("categoryNameId") : await Product.find({ categoryNameId: name }).populate("supplierNameId").populate("categoryNameId");

    // const query = reportType === 'supplier' ? { supplierName: name } : { productName: name };
    
    
    // const data = await collection.find(query).toArray();



    return NextResponse.json(data)




  } catch (err) {
 console.log(err)
    return NextResponse.json({ err: err.message }, { status: 500 })


  }

}


