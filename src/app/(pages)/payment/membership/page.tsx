import type { Metadata } from 'next'
import RazorPayMembership from '@/components/razorpay-membership';
import Script from 'next/script'
import { FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/new-logo.png';

export const metadata: Metadata = {
    title: 'Membership',
    description: 'Membership Payment for Madhyanchal Sarbajanin Jagadhatri Puja Samity',
    alternates: {
        canonical: '/payment/membership',
    },
    openGraph: null,
    twitter: null,
    robots: {
        index: false,
        follow: false,
    },
}

export default function Page({ searchParams }: {
    searchParams: {
        status?: string,
        name?: string,
        email?: string,
        whatsapp?: string,
        paymentId?: string
    }
}) {
    const status = searchParams.status ?? 'incomplete';
    if (status === 'success') {
        return (
            <div className="p-6 md:py-10 bg-gray-100 min-h-screen">
                <div className="min-h-[70vh] flex items-center justify-center">
                    <div className="text-center space-y-6 p-6 md:p-8 max-w-md w-full bg-white rounded-lg shadow-lg">
                        <div className="flex justify-center">
                            <FaCheckCircle className="w-20 h-20 text-green-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Payment Successful!
                        </h1>
                        <div className="space-y-3 text-left border rounded-lg p-4 bg-gray-50">
                            {searchParams.name && <p className="text-gray-700"><span className="font-semibold">Name:</span> {searchParams.name}</p>}
                            {searchParams.email && <p className="text-gray-700"><span className="font-semibold">Email:</span> {searchParams.email}</p>}
                            {searchParams.whatsapp && <p className="text-gray-700"><span className="font-semibold">WhatsApp:</span> {searchParams.whatsapp}</p>}
                            {searchParams.paymentId && <p className="text-gray-700"><span className="font-semibold">Payment ID:</span> {searchParams.paymentId}</p>}
                        </div>
                        <p className="text-gray-600">
                            Thank you for your payment. Your transaction has been completed successfully.
                        </p>
                        <div className="pt-4">
                            <Link
                                href="/payment/membership"
                                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md font-medium
                            hover:bg-blue-700 transition-colors"
                            >
                                Return Back
                            </Link>
                        </div>
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
                            <Image
                                src={logo}
                                alt="Organization Logo"
                                className="w-[150px] md:w-[200px]"
                            />
                        </div>
                        <RazorPayMembership />
                    </div>
                </div>
            </div>
        </>
    )
}