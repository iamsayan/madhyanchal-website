'use client';

import { useState, FormEvent } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import Script from 'next/script'

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

export default function RazorPayForm({ type }: { type: string }) {
    const [success, setSuccess] = useState<{ paymentId: string } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        amount: '',
    });
    const closeError = () => setError(null);
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
            setError('Please fill in all fields');
            return;
        }

        try {
            setProcessing(true);
            const amountInPaise = Math.round(parseFloat(formData.amount) * 100);

            const orderResponse = await fetch('/api/razorpay/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amountInPaise,
                    type,
                    formData
                }),
            });
            const { orderId } = await orderResponse.json();

            const options = {
                key: process.env.RAZORPAY_KEY_ID!,
                amount: amountInPaise.toString(),
                currency: "INR",
                name: "Madhyanchal Sarbajanin Jagadhatri Puja Samity",
                description: "Payment of ₹" + formData.amount + " for " + formData.name,
                order_id: orderId,
                notes: {
                    email: formData.email,
                    name: formData.name,
                    phone: formData.phone,
                    type,
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
                            <p className="text-gray-600 mb-4">Thank you for your contribution.</p>
                            <p className="text-sm text-gray-500 mb-4">Payment ID: {success.paymentId}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                                Make Another Payment
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
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                        Amount (₹) <span className="text-red-500">*</span>
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
        </>
    );
}