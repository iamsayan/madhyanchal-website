import type { Metadata } from 'next'
import RazorPay from '@/components/razorpay';
import Script from 'next/script'
import { FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Payment Gateway',
    description: 'Payment Gateway for Madhyanchal Sarbajanin Jagadhatri Puja Samity',
    alternates: {
        canonical: '/payment',
    },
    openGraph: null,
    twitter: null,
    robots: {
        index: false,
        follow: false,
    },
}

export default function Page({ searchParams }: { searchParams: { status?: string } }) {
    const status = searchParams.status ?? 'incomplete';
    if (status === 'success') {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="text-center space-y-6 p-8 max-w-md w-full bg-white rounded-lg shadow-lg">
                    <div className="flex justify-center">
                        <FaCheckCircle className="w-20 h-20 text-green-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Payment Successful!
                    </h1>
                    <p className="text-gray-600">
                        Thank you for your payment. Your transaction has been completed successfully.
                    </p>
                    <div className="pt-4">
                        <Link
                            href="/payment"
                            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md font-medium
                            hover:bg-blue-700 transition-colors"
                        >
                            Return Home
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="beforeInteractive"
            />
            <div className="p-6 md:py-10 bg-gray-100 min-h-screen">
                <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6 md:p-8">
                        <div className="flex justify-center mb-6">
                            <img
                                src="new-logo.png"
                                alt="Organization Logo"
                                className="w-[150px] md:w-[200px]"
                            />
                        </div>
                        <RazorPay />
                    </div>
                </div>
            </div>
        </>
    )

    // return (
    //     <div className="p-6 md:py-10 bg-gray-100 min-h-screen">
    //         <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">
    //             <div className="p-3 md:p-6 flex items-center flex-col gap-6">
    //                 <img src="new-logo.png" className="w-[150px] md:w-[250px]" />
    //                 <RazorPayButton buttonId="pl_OTiYvFwYJBvsHN" />
    //             </div>
    //         </div>
    //     </div>
    // )
}