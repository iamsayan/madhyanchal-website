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
        <div className="p-6 md:py-10 bg-gray-100 min-h-screen">
            <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 md:p-8">
                    <div className="flex justify-center mb-6">
                        <Image
                            src={logo}
                            alt="Organization Logo"
                            className="w-[180px] md:w-[220px]"
                        />
                    </div>
                    <RazorPayForm type="monthly-subscription" />
                </div>
            </div>
        </div>
    )
}