'use client';

import { useState, FormEvent } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import Script from 'next/script'

declare global {
    interface Window {
        Razorpay: any;
    }
}

const T_SHIRT_DATA = {
    kid: {
        name: 'Kid',
        price: 250,
        description: 'Round Neck Pure Cotton (7-9 years)',
    },
    small: {
        name: 'Small',
        price: 360,
        description: 'Size 36',
    },
    medium: {
        name: 'Medium',
        price: 420,
        description: 'Size 42',
    },
    large: {
        name: 'Large',
        price: 480,
        description: 'Size 48',
    },
    xl: {
        name: 'XL',
        price: 540,
        description: 'Size 54',
    },
    xxl: {
        name: 'XXL',
        price: 600,
        description: 'Size 60',
    }
} as const;

interface FormData {
    name: string;
    email: string;
    phone: string;
    kid: number;
    small: number;
    medium: number;
    large: number;
    xl: number;
    xxl: number;
}

export default function RazorPayTShirt() {
    const [success, setSuccess] = useState<{ paymentId: string } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: 'Sayan Datta',
        email: 'sdfgdfsg@gmail.com',
        phone: '9831617009',
        kid: 0,
        small: 0,
        medium: 0,
        large: 0,
        xl: 0,
        xxl: 0,
    });
    const closeError = () => setError(null);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const adjustQuantity = (field: keyof FormData, change: number) => {
        setFormData(prev => ({
            ...prev,
            [field]: Math.max(0, Number(prev[field]) + change)
        }));
    };

    const calculateTotalAmount = () => {
        return Object.entries(formData)
            .filter(([key]) => key in T_SHIRT_DATA)
            .reduce((total, [key, quantity]) => {
                return total + (T_SHIRT_DATA[key as keyof typeof T_SHIRT_DATA].price * quantity);
            }, 0);
    };

    const handlePayment = async (e: FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone) {
            setError('Please fill in all required fields');
            return;
        }

        const totalAmount = calculateTotalAmount();
        if (totalAmount === 0) {
            setError('Please select at least one item');
            return;
        }

        try {
            setProcessing(true);
            const amountInPaise = totalAmount * 100;

            const orderResponse = await fetch('/api/razorpay/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amountInPaise,
                    type: 't-shirt',
                    formData
                }),
            });
            const { orderId } = await orderResponse.json();

            const options = {
                key: process.env.RAZORPAY_KEY_ID!,
                amount: amountInPaise.toString(),
                currency: "INR",
                name: "Madhyanchal Sarbajanin Jagadhatri Puja Samity",
                description: "Payment of T-Shirt Order of ₹" + totalAmount + " for " + formData.name,
                order_id: orderId,
                notes: {
                    ...formData,
                    type: 't-shirt',
                },
                handler: function (response: any) {
                    console.log(response);
                    setSuccess({ paymentId: response.razorpay_payment_id });
                    setProcessing(false);
                },
                modal: {
                    ondismiss: function () {
                        setProcessing(false);
                    }
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
                send_sms_hash: true,
            };

            const razorpay = new window.Razorpay(options);
            razorpay.on('payment.failed', function (response: any) {
                const errorMessage = `
                    Error Code: ${response.error.code}
                    Reason: ${response.error.reason}
                    Description: ${response.error.description}
                    Step: ${response.error.step}
                    Source: ${response.error.source}
                    Order ID: ${response.error.metadata.order_id}
                    Payment ID: ${response.error.metadata.payment_id}
                `.trim();

                setError(errorMessage);
                setProcessing(false);
            });

            razorpay.open();
        } catch (err) {
            setProcessing(false);
            console.error('Payment failed!', err);
            setError(`${err}`);
        }
    };

    return (
        <>
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="beforeInteractive"
            />
            {success && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-green-600 mb-2">Payment Successful!</h3>
                            <p className="text-gray-600 mb-4">Thank you for your order.</p>
                            <p className="text-sm text-gray-500 mb-4">Payment ID: {success.paymentId}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                                Make Another Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {error && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                        <h3 className="text-xl font-bold text-red-600 mb-4">Payment Failed</h3>
                        <pre className="whitespace-pre-wrap text-sm text-gray-700 mb-4">
                            {error}
                        </pre>
                        <button
                            onClick={closeError}
                            className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            <form onSubmit={handlePayment} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
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
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        minLength={10}
                        maxLength={10}
                        value={formData.phone}
                        pattern="[0-9]{10}"
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
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
                <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium">Select Quantities <span className="text-red-500">*</span></h3>

                    <div className="grid gap-4">
                        {Object.entries(T_SHIRT_DATA).map(([size, data]) => (
                            <div key={size} className="flex items-center justify-between p-3 border rounded-md">
                                <div>
                                    <p className="font-medium">{data.name} - ₹{data.price.toFixed(2)}</p>
                                    <p className="text-xs text-gray-500">{data.description}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button type="button" onClick={() => adjustQuantity(size as keyof FormData, -1)} className="px-2 py-1 border rounded">-</button>
                                    <span className="w-6 text-center">{formData[size as keyof FormData]}</span>
                                    <button type="button" onClick={() => adjustQuantity(size as keyof FormData, 1)} className="px-2 py-1 border rounded">+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total Amount:</span>
                    <span className="text-lg font-bold">₹{calculateTotalAmount().toFixed(2)}</span>
                </div>

                <button
                    type="submit"
                    disabled={processing || calculateTotalAmount() === 0}
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
                        `Pay ₹${calculateTotalAmount().toFixed(2)}`
                    )}
                </button>
            </form>
        </>
    );
}