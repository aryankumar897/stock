
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Purchases from "@/models/purchases";


import Product from "@/models/product";




export async function PUT(req, context) {
  await dbConnect();

  try {

     console.log("purchase hello" , context.params.id)
    const purchase = await Purchases.findById({ _id: context?.params?.id });
    if (!purchase) return NextResponse.json({ message: 'Purchase not found' }, { status: 404 });
    // Check if purchase status is already true (approved)
    if (purchase.status === true) {
      return NextResponse.json({ message: 'Purchase already approved, no update needed' },   { status: 400});
    }

    // Find the associated product
    const product = await Product.findById({ _id: purchase?.product_id });
    if (!product) return NextResponse.json({ message: 'Product not found' }, { status: 404 });

    // Update the product quantity
    const purchaseQty = parseFloat(purchase?.buying_qty) + parseFloat(product?.quantity);
    product.quantity = purchaseQty;

    // Save the updated product quantity
    await product.save();

    // Update purchase status to '1' (approved)



    purchase.status = true;
    await purchase.save();

    console.log({ purchase, product })

    return NextResponse.json({ purchase, product }, { status: 200 });

  } catch (err) {

    console.log(err)
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}











export async function DELETE(req, context) {

  await dbConnect()

  try {

    const deletingPurchases = await Purchases.findByIdAndDelete(
      context.params.id
    )

    return NextResponse.json(deletingPurchases)

  } catch (err) {

    return NextResponse.json({ err: err.message }, { status: 500 })

  }
}


