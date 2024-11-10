
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import Customer from "@/models/customers";


export async function PUT(req, context) {

    await dbConnect()

    const body = await req.json();
    try {

       // console.log("xx", body);
       // console.log("xx", context.params.id);
        const { _id, ...updateBody } = body;
        const updatingCustomer = await Customer.findByIdAndUpdate(
            context.params.id,
            updateBody,
            { new: true }
        )
        return NextResponse.json(updatingCustomer)

    } catch (err) {

        return NextResponse.json({ err: err.message }, { status: 500 })
    }



}






export async function DELETE(req, context) {

    await dbConnect()

    try {

        const deletingCustomer = await Customer.findByIdAndDelete(
            context.params.id
        )

        return NextResponse.json(deletingCustomer)

    } catch (err) {

        return NextResponse.json({ err: err.message }, { status: 500 })

    }
}


