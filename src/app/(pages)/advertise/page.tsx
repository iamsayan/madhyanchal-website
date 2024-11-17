import type { Metadata } from 'next'
import Image from 'next/image';
import MainLayout from '@/components/main-layout';
import Section from '@/components/section';
import Gallery from '@/components/gallery';
import schema from "@/utils/schema";
import { FaCircleCheck, FaCheck, FaLocationDot, FaEnvelope, FaPhone, FaArrowRight } from "react-icons/fa6";
import { FaFileDownload } from 'react-icons/fa';

import image1 from '@/public/assets/advertisements/1.jpg';
import image2 from '@/public/assets/advertisements/2.jpg';
import image3 from '@/public/assets/advertisements/3.jpg';
import image4 from '@/public/assets/advertisements/4.jpg';
import image5 from '@/public/assets/advertisements/5.jpg';
import image6 from '@/public/assets/advertisements/6.jpg';
import image7 from '@/public/assets/advertisements/7.jpg';

export const metadata: Metadata = {
    title: 'Advertise with Us',
    description: 'Since 1971, Madhyanchal Sarbajanin Jagadhatri Puja Samity has been at the heart of Chandannagar’s cultural heritage, drawing massive crowds during its annual festivities. Partner with us to elevate your brand’s presence among a diverse and engaged audience during this highly anticipated event.',
    openGraph: {
        url: '/advertise',
    },
    alternates: {
        canonical: '/advertise',
    },
}

interface Feature {
    title: string;
    description: string;
}

export default function Page() {
    const jsonLd = schema({
        slug: 'advertise',
        title: 'Advertise with Us',
    })

    const imgStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        pointerEvents: 'none'
    };

    const features: Feature[] = [
        {
            title: 'High Footfall',
            description: 'Over 5 lakh visitors attend our pandal each year, creating unmatched visibility for your brand.',
        },
        {
            title: 'Prime Location',
            description: 'Situated on Chandannagar’s bustling Station Road, our pandal guarantees consistent foot traffic and a vibrant marketing environment.',
        },
        {
            title: 'Increased Brand Visibility',
            description: 'By collaborating, partners can expanding their reach to new and engaged audiences.',
        },
        {
            title: 'Enhanced Credibility',
            description: 'Associating with reputable brands or organizations can boost credibility and trust among followers.',
        },
        {
            title: 'Cost-Effective Marketing',
            description: 'It can reduce costs while maximizing the impact of reaching higher perks.',
        },
        {
            title: 'Real-Time Interaction',
            description: 'Partners can engage with their audience in real-time, interacting with their followers in real-time.',
        }
    ];

    const features1: Feature[] = [
        {
            title: 'Prominent Placement',
            description: 'Your banners, hoardings, and gates will be displayed in prime locations throughout the event.',
        },
        {
            title: 'Pre-Event Exposure',
            description: 'Get noticed before the event with pandal wrapper advertising, available two months before the festival begins.',
        },
        {
            title: 'Interactive Spaces',
            description: 'Dedicated stalls and marketing zones allow for direct engagement with a diverse audience.',
        },
        {
            title: 'Branding Opportunities',
            description: 'Distribute special gifts, offers, or branded merchandise, creating lasting impressions on visitors.',
        },
    ];

    return (
        <MainLayout title="Advertise with Us" jsonLd={jsonLd}>
            <Section title="Advertise with" description={<>Madhyanchal <span className="text-yellow-500">Sarbajanin</span></>}>
                <div className="flex flex-col gap-6 text-justify">
                    <p>
                        Since 1971, <strong>Madhyanchal Sarbajanin Jagadhatri Puja Samity</strong> has been at the heart of Chandannagar’s cultural heritage, drawing massive crowds during its annual festivities. Partner with us to elevate your brand’s presence among a diverse and engaged audience during this highly anticipated event.
                    </p>
                    <div className="flex flex-col gap-3">
                        <h2 className="text-xl md:text-2xl font-bold text-center">Why Choose Us?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {features.map((feature, index) => (
                                <div
                                    className="group hover:scale-105 transition-all duration-300 hover:shadow-lg border rounded-xl border-neutral-200 bg-gradient-to-br from-white to-neutral-50 px-6 py-5 flex gap-5"
                                    key={index}
                                >
                                    <div className="pt-1">
                                        <div className="p-2 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors">
                                            <FaCircleCheck className="size-5 text-green-600" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2.5 text-left">
                                        <h2 className="text-xl font-semibold text-neutral-800 group-hover:text-green-700 transition-colors">
                                            {feature.title}
                                        </h2>
                                        <p className="text-neutral-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h2 className="text-xl md:text-2xl font-bold text-center">Exclusive Sponsorship Benefits</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {features1.map((feature, index) => (
                                <div
                                    className="group hover:scale-105 transition-all duration-300 hover:shadow-lg border rounded-xl border-neutral-200 bg-gradient-to-br from-white to-neutral-50 px-6 py-5 flex gap-5"
                                    key={index}
                                >
                                    <div className="pt-1">
                                        <div className="p-2 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors">
                                            <FaCheck className="size-5 text-green-600" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2.5 text-left">
                                        <h2 className="text-xl font-semibold text-neutral-800 group-hover:text-green-700 transition-colors">
                                            {feature.title}
                                        </h2>
                                        <p className="text-neutral-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <h2 className="text-xl md:text-2xl font-bold text-center">Audience Insights</h2>
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            {/* Pie Chart */}
                            <div className="w-48 h-48">
                                {/* Pie Chart using conic gradient */}
                                <div className="w-full h-full rounded-full mb-8"
                                    style={{
                                        background: 'conic-gradient(#EAB308 0% 58%, #3B82F6 58% 100%)'
                                    }}>
                                </div>
                                {/* Labels */}
                                <div className="flex flex-col gap-2 mt-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-sm bg-yellow-500"></div>
                                        <span className="whitespace-nowrap text-sm font-medium">Youth (58%)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-sm bg-blue-500"></div>
                                        <span className="whitespace-nowrap text-sm font-medium">Family Groups (42%)</span>
                                    </div>
                                </div>
                            </div>
                            {/* Text Content */}
                            <div className="flex-1 flex flex-col gap-2 mt-20 md:mt-0">
                                <p><strong>42% Family Groups:</strong> A significant portion of attendees includes families, ideal for promoting household products.</p>
                                <p><strong>58% Youth:</strong> Young individuals, a prime target for modern brands, dominate the demographic.</p>
                                <p>Extensive online engagement ensures your brand reaches tech-savvy consumers through social media and other platforms.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 md:mt-20 items-center">
                        <h2 className="text-xl md:text-2xl font-bold mb-4">Advertising Opportunities</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 p-6 rounded-lg border border-neutral-200 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-yellow-100 rounded-full">
                                        <FaCircleCheck className="size-5 text-yellow-600" />
                                    </div>
                                    <h3 className="font-semibold">Sponsorship & Hoardings</h3>
                                </div>
                                <p className="text-neutral-600">Sponsor thematic gates, illuminated displays, and prominent hoardings across the venue.</p>
                            </div>

                            <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 p-6 rounded-lg border border-neutral-200 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-blue-100 rounded-full">
                                        <FaCircleCheck className="size-5 text-blue-600" />
                                    </div>
                                    <h3 className="font-semibold">Stalls & Brand Zones</h3>
                                </div>
                                <p className="text-neutral-600">Reserve spaces for exclusive brand zones or stalls to engage visitors directly.</p>
                            </div>

                            <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 p-6 rounded-lg border border-neutral-200 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-green-100 rounded-full">
                                        <FaCircleCheck className="size-5 text-green-600" />
                                    </div>
                                    <h3 className="font-semibold">Campaigns & Promotions</h3>
                                </div>
                                <p className="text-neutral-600">Run tailored campaigns or promotional activities to captivate the audience and enhance brand recall.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <h2 className="text-xl md:text-2xl font-bold text-center">Previous Advertisers</h2>
                        <Gallery elementClassNames="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2 mt-2" speed={500} slideShowAutoplay={true} fullScreen={true} getCaptionFromTitleOrAlt={false}>
                            {[image1.src, image2.src, image3.src, image4.src, image5.src, image6.src, image7.src].map((item: any, index: number) => (
                                <a data-disable-nprogress={true} key={index} className="h-52 md:h-72 relative" href={item}>
                                    <Image
                                        src={item}
                                        width={500}
                                        height={300}
                                        style={imgStyle}
                                        priority={false}
                                        loading="lazy"
                                        alt={index + 1 + ' image'}
                                    />
                                </a>
                            ))}
                        </Gallery>
                    </div>
                    <div className="flex flex-col gap-6 mt-6">
                        <div className="bg-gradient-to-br from-yellow-50 to-neutral-50 border border-yellow-100 rounded-2xl p-8 shadow-lg">
                            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-neutral-800">
                                Let's Create Something <span className="text-yellow-600">Extraordinary</span> Together
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Contact Information */}
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 group">
                                        <div className="p-3 bg-yellow-100 rounded-lg group-hover:bg-yellow-200 transition-colors">
                                            <FaLocationDot className="w-6 h-6 text-yellow-700" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1">Address</h3>
                                            <p className="text-neutral-600">Station Road, Chandannagar, Hooghly – 712136</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group">
                                        <div className="p-3 bg-yellow-100 rounded-lg group-hover:bg-yellow-200 transition-colors">
                                            <FaEnvelope className="w-6 h-6 text-yellow-700" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1">Email</h3>
                                            <a href="mailto:jagatdhatri.madhyanchal@gmail.com"
                                                className="text-yellow-600 hover:text-yellow-700 transition-colors">
                                                jagatdhatri.madhyanchal@gmail.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group">
                                        <div className="p-3 bg-yellow-100 rounded-lg group-hover:bg-yellow-200 transition-colors">
                                            <FaPhone className="w-6 h-6 text-yellow-700" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1">Phone</h3>
                                            <p className="text-neutral-600">Raja Dutta: <a href="tel:+919051300020" className="text-yellow-600 hover:text-yellow-700">+91-9051300020</a></p>
                                            <p className="text-neutral-600">Avik Sarkar: <a href="tel:+918599918394" className="text-yellow-600 hover:text-yellow-700">+91-8599918394</a></p>
                                        </div>
                                    </div>
                                </div>

                                {/* Brochure Request */}
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
                                    <h3 className="text-xl font-bold mb-4">Request a Brochure</h3>
                                    <p className="text-neutral-600 mb-6">
                                        Download our comprehensive sponsorship brochure to explore various packages and opportunities available for {new Date().getFullYear()}.
                                    </p>
                                    <div className="flex gap-3">
                                        <a
                                            href="https://madhyanchalsarbajanin.co.in/contact-us/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-6 py-3.5 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-yellow-200"
                                        >
                                            <FaFileDownload className="size-5 group-hover:-translate-y-1 transition-transform" />
                                            Download Brochure
                                            <FaArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </MainLayout>
    )
}