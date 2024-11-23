'use client';

import { useState, FormEvent } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    amount: string;
}

export default function Page() {
    const [processing, setProcessing] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        amount: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePayment = async (e: FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone || !formData.amount) {
            alert('Please fill in all fields');
            return;
        }

        try {
            setProcessing(true);
            const amountInPaise = Math.round(parseFloat(formData.amount) * 100);

            const orderResponse = await fetch('/api/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amountInPaise,
                    formData
                }),
            });
            const { orderId } = await orderResponse.json();

            const options = {
                key: process.env.RAZORPAY_KEY_ID!,
                amount: amountInPaise.toString(),
                currency: "INR",
                name: "Madhyanchal Sarbajanin Jagadhatri Puja Samity",
                description: "Membership Payment of ₹" + formData.amount + " for " + formData.name,
                order_id: orderId,
                notes: {
                    email: formData.email,
                    name: formData.name,
                    phone: formData.phone,
                    type: 'membership',
                },
                handler: function (response: any) {
                    console.log(response);
                    window.location.href = `/payment?status=success`;
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone
                },
                readonly: {
                    email: true,
                    contact: true
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (err) {
            console.error('Payment failed:', err);
            alert('Payment failed. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handlePayment} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    WhatsApp Number
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (₹)
                </label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    min="1"
                    step="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={processing}
                className={`w-full py-3 px-4 bg-blue-600 text-white rounded-md font-medium
                                hover:bg-blue-700 transition-colors
                                disabled:bg-blue-300 disabled:cursor-not-allowed
                                flex items-center justify-center gap-2`}
            >
                {processing ? (
                    <>
                        <BiLoaderAlt className="animate-spin h-5 w-5" />
                        Processing...
                    </>
                ) : (
                    'Proceed to Pay'
                )}
            </button>
        </form>
    );
}