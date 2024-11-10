
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import Supplier from "@/models/supplier";
import Category from "@/models/category";

export async function GET() {

  await dbConnect();

  try {

    const supplier = await Supplier.find({}).sort({ createdAt: -1 })
    const category = await Category.find({}).sort({ createdAt: -1 })
    console.log("allcat", supplier, category)

    return NextResponse.json({ supplier, category })




  } catch (err) {

    return NextResponse.json({ err: err.message }, { status: 500 })


  }

}


