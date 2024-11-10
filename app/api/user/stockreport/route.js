
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";


export async function GET() {

  await dbConnect();

  try {

    const product = await Product.find({})
 
      .populate("categoryNameId")
    .sort({ createdAt: -1 })

    console.log("product", product)

    return NextResponse.json(product)




  } catch (err) {
console.log("error", err)
    return NextResponse.json({ err: err.message }, { status: 500 })


  }

}


