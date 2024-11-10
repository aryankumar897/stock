
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import Unit from "@/models/units";


export async function GET() {

    await dbConnect();

    try {

        const unit = await Unit.find({}).sort({ createdAt: -1 })
        return NextResponse.json(unit)




    } catch (err) {

        return NextResponse.json({ err: err.message }, { status: 500 })


    }

}




export async function POST(req) {

    await dbConnect();

    console.log("hello")

    const body = await req.json();

    const { name } = body

    try {


        const unit = await Unit.create({ name })


        return NextResponse.json(unit)

    } catch (err) {
        return NextResponse.json({ err: err.message }, { status: 500 })

    }

}