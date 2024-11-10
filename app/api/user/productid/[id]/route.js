
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";


export async function GET(req, context) {
   
    await dbConnect();

    // console.log("GET",  context)
   
    try {
        const products = await Product.find({ categoryNameId: context.params.id }) 
            .sort({ createdAt: -1 }); 
      
        //    console.log(products)

        return NextResponse.json(products);

    } catch (err) {
        return NextResponse.json({ err: err.message }, { status: 500 })
    }



}

