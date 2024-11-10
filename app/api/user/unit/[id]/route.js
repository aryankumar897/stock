
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import Unit from "@/models/units";


export async function PUT(req, context) {

    await dbConnect()

    const body = await req.json();
    try {

        console.log("xx", body);
        console.log("xx", context.params.id);
        const { _id, ...updateBody } = body;
        const updatingUnits = await Unit.findByIdAndUpdate(

            context.params.id,
            updateBody,
            { new: true }

        )


        return NextResponse.json(updatingUnits)


    } catch (err) {

        return NextResponse.json({ err: err.message }, { status: 500 })
    }



}






export async function DELETE(req, context) {

    await dbConnect()

    try {

        const deletingUnits = await Unit.findByIdAndDelete(
            context.params.id

        )


        return NextResponse.json(deletingUnits)




    } catch (err) {


        return NextResponse.json({ err: err.message }, { status: 500 })




    }



}


