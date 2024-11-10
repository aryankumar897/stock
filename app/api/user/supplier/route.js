
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import Supplier from "@/models/supplier";



export async function GET() {

    await dbConnect();

    try {

        const supplier = await Supplier.find({}).sort({ createdAt: -1 })
        return NextResponse.json(supplier)




    } catch (err) {

        return NextResponse.json({ err: err.message }, { status: 500 })


    }

}




export async function POST(req) {

    await dbConnect();

   // console.log("hello")

    const body = await req.json();
  //  console.log(body)



    const { name, email, phone, address } = body

    try {


        const supplier = await Supplier.create({ name, email, phone, address })


        return NextResponse.json(supplier)

    } catch (err) {
        console.log(err)
        return NextResponse.json({ err: err.message }, { status: 500 })

    }






}