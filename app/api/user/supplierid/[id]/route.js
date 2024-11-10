
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import Category from "@/models/category";

import Product from "@/models/product";



export async function GET(req,context) {

    await dbConnect();

    try {

        const categories = await Product.find({ supplierNameId: context.params.id })
            .select("categoryNameId") // Select only the categoryNameId field
            .populate("categoryNameId") // Populate the categoryNameId with actual category data
            .sort({ createdAt: -1 }); // Sort by createdAt in descending order
           console.log(categories)

        return NextResponse.json(categories);



    } catch (err) {

        return NextResponse.json({ err: err.message }, { status: 500 })


    }

}

