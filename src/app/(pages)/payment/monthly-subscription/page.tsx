import type { Metadata } from 'next'
import RazorPayForm from '@/components/razorpay-form';
import Script from 'next/script'
import Image from 'next/image';
import logo from '@/public/new-logo.png';

export const metadata: Metadata = {
    title: 'Monthly Subscription',
    description: 'Monthly Subscription Payment for Madhyanchal Sarbajanin Jagadhatri Puja Samity',
    alternates: {
        canonical: '/payment/monthly-subscription',
    },
    openGraph: null,
    twitter: null,
    robots: {
        index: false,
        follow: false,
    },
}

export default function Page() {
    return (
        <div className="p-6 md:py-10 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
            <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 transform hover:scale-[1.02] transition-transform duration-300">
                <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                <div className="p-6 md:p-8">
                    <div className="flex justify-center mb-6 hover:rotate-2 transition-transform duration-300">
                        <Image
                            src={logo}
                            alt="Organization Logo"
                            className="w-[180px] md:w-[220px] drop-shadow-sm"
                        />
                    </div>
                    <div className="relative text-center mb-8">
                        <div className="flex justify-center gap-2 mb-2">
                            <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                            <div className="w-3 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                        </div>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Monthly Subscription
                        </h1>
                        <div className="flex items-center justify-center gap-3 mt-2">
                            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gray-300"></div>
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                            <div className="w-20 h-[1px] bg-gradient-to-r from-gray-300 to-transparent"></div>
                        </div>
                    </div>
                    <RazorPayForm type="monthly-subscription" />
                </div>
            </div>
        </div>
    )
}