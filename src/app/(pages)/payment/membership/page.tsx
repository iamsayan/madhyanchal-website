import type { Metadata } from 'next'
import MembershipForm from '@/components/membership-form';
import { getModel } from '@/utils/fetch';
import RazorPayForm from '@/components/razorpay-form';

export const metadata: Metadata = {
    title: 'Membership',
    description: 'Membership Payment for Madhyanchal Sarbajanin Jagadhatri Puja Samity',
    alternates: {
        canonical: '/payment/membership',
    },
}

export default async function Page( { searchParams }: { searchParams: { v: string } } ) {
    const { v } = await searchParams;
    const membersData = await getModel('members', { populate: 1 });
    const data = membersData?.data ?? [];

    return (
        <>
            <div className="relative text-center mb-8">
                <div className="flex justify-center gap-2 mb-2">
                    <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    <div className="w-3 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Membership
                </h1>
                <div className="flex items-center justify-center gap-3 mt-2">
                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gray-300"></div>
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    <div className="w-20 h-[1px] bg-gradient-to-r from-gray-300 to-transparent"></div>
                </div>
            </div>
            {v === 'new' ? <MembershipForm membersData={data} /> : <RazorPayForm type="membership" />}
        </>
    )
}