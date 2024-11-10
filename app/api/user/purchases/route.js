
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Purchases from "@/models/purchases";

export async function GET() {

    await dbConnect();

    try {

        const purchases = await Purchases.find({})
            .populate("supplier_id")
            .populate("category_id")
            .populate("product_id")
            .sort({ createdAt: -1 })



      //  console.log("purchases", purchases)



        return NextResponse.json(purchases)




    } catch (err) {

        return NextResponse.json({ err: err.message }, { status: 500 })


    }

}



export async function POST(req) {
    await dbConnect();

    const body = await req.json();
    // console.log(body)

    try {
      

 console.log("bodyxxxxxx",body)


        const errors = validatePurchaseData(body);

        if (errors.length > 0) {
             console.log(errors)
            return NextResponse.json({ err:   errors }, { status: 400 });
        }

        const savedPurchases = await Promise.all(
            body.map(async purchase => {
                const product = await Purchases.create({
                    product_id: purchase.selectedProduct,
                    supplier_id: purchase.supplierName,
                 
                    category_id: purchase.selectedCategory,
                    date: purchase.startDate,
                    buying_qty: purchase.quantity,
                    unit_price: purchase.unitPrice,
                    description: purchase.description,
                    buying_price: purchase.totalPrice,
                    purchase_no : purchase.purchaseNo,
                    status:false
                   // created_by:


                });
                return product;
            })
        );

      //  console.log( "save",  savedPurchases)

        return NextResponse.json(savedPurchases, { status: 201 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ err: err.message }, { status: 500 });
    }
}

const validatePurchaseData = (purchaseData) => {
    const errors = [];

    if (!Array.isArray(purchaseData) || purchaseData.length === 0) {
        errors.push('Purchase data cannot be empty.');
        return errors;
    }


    purchaseData.forEach(purchase => {
      
        if (typeof purchase.purchaseNo !== 'string' || purchase.purchaseNo.trim() === '') {
            errors.push(`Invalid purchaseNo: ${purchase.purchaseNo}`);
        }
        if (!isValidObjectId(purchase.supplierName)) {
            errors.push(`Invalid supplierNameId: ${purchase.supplierName}`);
        }
        if (!isValidObjectId(purchase.selectedCategory)) {
            errors.push(`Invalid categoryNameId: ${purchase.selectedCategory}`);
        }
        if (!isValidObjectId(purchase.selectedProduct)) {
            errors.push(`Invalid productName: ${purchase.selectedProduct}`);
        }
        if (!isValidDate(purchase.startDate)) {
            errors.push(`Invalid startDate: ${purchase.startDate}`);
        }
        if (isNaN(parseInt(purchase.quantity))) {
            errors.push(`Invalid quantity: ${purchase.quantity}`);
        }
        if (isNaN(parseFloat(purchase.unitPrice))) {
            errors.push(`Invalid unitPrice: ${purchase.unitPrice}`);
        }
        if (typeof purchase.description !== 'string') {
            errors.push(`Invalid description: ${purchase.description}`);
        }
        if (isNaN(parseFloat(purchase.totalPrice))) {
            errors.push(`Invalid totalPrice: ${purchase.totalPrice}`);
        }
    });

    return errors;
};

const isValidObjectId = (id) => {
    return /^[a-fA-F0-9]{24}$/.test(id);
};

const isValidDate = (date) => {
    return !isNaN(Date.parse(date));
};