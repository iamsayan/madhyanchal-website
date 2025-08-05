import type { Metadata } from 'next'
import RazorPayButton from '@/components/razorpay-button';

export const metadata: Metadata = {
    title: 'Payment',
    description: 'Pay to Madhyanchal Sarbajanin Jagadhatri Puja Samity',
    alternates: {
        canonical: '/payment',
    },
}

export default function Page() {
    return (
        <div className="pt-1 flex items-center flex-col">
            <RazorPayButton buttonId="pl_OTiYvFwYJBvsHN" />
        </div>
    )
}