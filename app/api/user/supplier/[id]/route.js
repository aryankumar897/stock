
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import Supplier from "@/models/supplier";
export async function PUT(req, context) {

    await dbConnect()

    const body = await req.json();
    try {

        console.log("xx", body);
       
        const updatingSupplier = await Supplier.findByIdAndUpdate(

            context.params.id,
            {...body},
            { new: true }

        )

        return NextResponse.json(updatingSupplier)
    } catch (err) {

        return NextResponse.json({ err: err.message }, { status: 500 })
    }
}

export async function DELETE(req, context) {

    await dbConnect()

    try {

        const deletingSupplier = await Supplier.findByIdAndDelete(
            context.params.id

        )


        return NextResponse.json(deletingSupplier)




    } catch (err) {

 console.log("errx",  err)
        return NextResponse.json({ err: err.message }, { status: 500 })




    }



}


