import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: Request) {
    try {
        const { amount, formData, type } = await request.json();

        const order = await razorpay.orders.create({
            amount: amount,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: {
                email: formData.email,
                name: formData.name,
                phone: formData.phone,
                type,
            },
        });

        return NextResponse.json({
            orderId: order.id,
        });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json(
            { error: 'Error creating order' },
            { status: 500 }
        );
    }
} 