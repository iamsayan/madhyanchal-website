import type { Metadata } from 'next'
import RazorPayTShirt from '@/components/razorpay-t-shirt';
import Slider from '@/components/slider';

import image1 from '@/public/assets/t-shirt/1.jpg';
import image2 from '@/public/assets/t-shirt/2.jpg';
import image3 from '@/public/assets/t-shirt/3.jpg';

export const metadata: Metadata = {
    title: 'Madhyanchal T-Shirt',
    description: 'Order for Madhyanchal T-Shirt',
    alternates: {
        canonical: '/payment/t-shirt',
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
        <>
            <div className="relative text-center mb-4">
                <div className="flex justify-center gap-2 mb-2">
                    <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    <div className="w-3 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Madhyanchal T-Shirt
                </h1>
                <div className="flex items-center justify-center gap-3 mt-2">
                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gray-300"></div>
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    <div className="w-20 h-[1px] bg-gradient-to-r from-gray-300 to-transparent"></div>
                </div>
            </div>
            <div className="mb-4">
                <Slider
                    slides={[
                        { imageUrl: image1.src },
                        { imageUrl: image2.src },
                        { imageUrl: image3.src },
                    ]}
                    options={{
                        height: 500,
                        breakpoints: {
                            640: {
                                height: 300,
                            },
                        },
                    }}
                />
            </div>
            <RazorPayTShirt />
        </>
    )
}