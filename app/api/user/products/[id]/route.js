
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";


export async function PUT(req, context) {

    await dbConnect()

    const body = await req.json();
    try {

       // console.log("xx", body);
      //  console.log("xx", context.params.id);
        const { _id, ...updateBody } = body;
        const updatingProduct = await Product.findByIdAndUpdate(

            context.params.id,
            updateBody,
            { new: true }

        )


        return NextResponse.json(updatingProduct)


    } catch (err) {

        return NextResponse.json({ err: err.message }, { status: 500 })
    }



}






export async function DELETE(req, context) {

    await dbConnect()

    try {

        const deletingProduct = await Product.findByIdAndDelete(
            context.params.id
        )

        return NextResponse.json(deletingProduct)

    } catch (err) {

        return NextResponse.json({ err: err.message }, { status: 500 })

    }
}


