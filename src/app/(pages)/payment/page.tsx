import type { Metadata } from 'next'
import RazorPayButton from '@/components/razorpay-button';
import Image from 'next/image';
import logo from '@/public/new-logo.png';

export const metadata: Metadata = {
    title: 'Payment',
    description: 'Pay to Madhyanchal Sarbajanin Jagadhatri Puja Samity',
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

export default function Page() {
    return (
        <div className="p-6 md:py-10 bg-gray-100 min-h-screen">
            <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-3 md:p-6 flex items-center flex-col gap-6">
                    <Image src={logo} alt="logo" className="w-[150px] md:w-[250px]" />
                    <RazorPayButton buttonId="pl_OTiYvFwYJBvsHN" />
                </div>
            </div>
        </div>
    )
}