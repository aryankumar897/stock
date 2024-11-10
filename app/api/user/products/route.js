
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";


export async function GET() {

    await dbConnect();

    try {

        const product = await Product.find({})
            .populate("supplierNameId")
            .populate("unitNameId")
            .populate("categoryNameId")
        .sort({ createdAt: -1 })
        return NextResponse.json(product)




    } catch (err) {
console.log( "errxx",   err)
        return NextResponse.json({ err: err.message }, { status: 500 })


    }

}




export async function POST(req) {

    await dbConnect();

    console.log("hello")

    const body = await req.json();


    console.log(body)


    const { productName, supplierNameId, unitNameId, categoryNameId } = body

    try {


        const product = await Product.create({
            productName,
            supplierNameId,
            unitNameId,
            categoryNameId
        })


        return NextResponse.json(product)

    } catch (err) {
        console.log(err)
        return NextResponse.json({ err: err.message }, { status: 500 })

    }






}





// export async function POST(req) {
//     await dbConnect();

//     try {
//         const body = await req.json();

//         // Check if the body is an array and handle it accordingly
//         if (!Array.isArray(body)) {
//             return NextResponse.json({ err: "Expected an array of products" }, { status: 400 });
//         }

//         // Iterate over the array and save each product
//         const savedProducts = await Promise.all(body.map(async (productData) => {
//             const { selectedProduct, supplierName, selectedCategory, quantity, unitPrice, description, startDate } = productData;

//             // Save the product
//             const product = await Product.create({
//                 productName: selectedProduct,
//                 supplierNameId: supplierName,
//                 unitNameId: '', // Replace with appropriate unitId if applicable
//                 categoryNameId: selectedCategory,
//                 quantity,
//                 unitPrice,
//                 description,
//                 startDate
//             });

//             return product;
//         }));

//         return NextResponse.json(savedProducts);

//     } catch (err) {
//         console.log(err);
//         return NextResponse.json({ err: err.message }, { status: 500 });
//     }
// }



