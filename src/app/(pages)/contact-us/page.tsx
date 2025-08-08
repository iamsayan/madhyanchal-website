import type { Metadata } from 'next'
import Contact from "@/components/contact";
import MainLayout from "@/components/main-layout";
import Section from "@/components/section";
import schema from "@/utils/schema";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { metadata as rootMetadata } from '@/app/layout';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Get in touch with Madhyanchal Sarbajanin Jagadhatri Puja Samity for inquiries, sponsorships, and collaborations. Located at Station Road, Chandannagar, our dedicated team is here to assist with your questions about our cultural and community initiatives. Reach out via email, phone, or our online contact form. Explore how you can be part of our journey blending tradition, art, and social responsibility.',
    openGraph: {
        ...rootMetadata.openGraph,
        url: '/contact-us',
    },
    alternates: {
        canonical: '/contact-us',
    },
}

export default function Page() {
    const jsonLd = schema({
        path: 'contact-us',
        title: 'Contact Us',
    })

    return (
        <MainLayout title="Contact Us" jsonLd={jsonLd}>
            <Section
                title="Need any help?"
                description="Contact Us"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-12">
                    <div className="bg-white/5 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-yellow-500 mb-2 flex items-center gap-2">
                                <FaEnvelope className="text-xl" />
                                Send us a Message
                            </h3>
                            <p className="text-gray-400 text-sm">Fill out the form and we'll get back to you shortly.</p>
                        </div>
                        <Contact />
                    </div>
                    <div className="space-y-6">
                        <div className="bg-white/5 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
                            <h3 className="text-xl font-semibold text-yellow-500 mb-2 flex items-center gap-2">
                                <FaMapMarkerAlt className="text-xl" />
                                Visit Us
                            </h3>
                            <p className="text-gray-400 text-sm mb-4">Find us at our location in Chandannagar</p>
                            <div className="overflow-hidden rounded-xl shadow-xl">
                                <div className="w-full h-[250px] flex flex-col items-center justify-center bg-gray-100 rounded-xl border border-gray-300">
                                    <FaMapMarkerAlt className="text-4xl text-yellow-500 mb-2" />
                                    <div className="text-center">
                                        <div className="font-semibold text-gray-700 mb-1">
                                            Madhyanchal Sarbajanin Jagadhatri Puja Samity
                                        </div>
                                        <div className="text-gray-500 text-sm mb-2">
                                            Madhyanchal, Station Road, Chandannagar, Hooghly, West Bengal, 712136
                                        </div>
                                        <a
                                            href="https://www.google.com/maps/search/?api=1&query=Madhyanchal+Sarbajanin+Jagadhatri+Puja+Samity,Chandannagar,Hooghly,West+Bengal,712136"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors duration-200"
                                        >
                                            View on Google Maps
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
                            <h3 className="text-xl font-semibold text-yellow-500 mb-4 flex items-center gap-2">
                                <FaPhone className="text-xl" />
                                Quick Contact
                            </h3>
                            <div className="space-y-4 text-gray-300">
                                <p className="flex items-center gap-3 hover:text-yellow-500 transition-colors duration-300">
                                    <FaEnvelope className="text-xl text-yellow-500" />
                                    <a href="mailto:jagatdhatri.madhyanchal@gmail.com" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">
                                        jagatdhatri.madhyanchal@gmail.com
                                    </a>
                                </p>
                                <p className="flex items-center gap-3 hover:text-yellow-500 transition-colors duration-300">
                                    <FaPhone className="text-xl text-yellow-500" />
                                    <a href="tel:+916291355010" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">
                                        +91 6291355010
                                    </a>
                                </p>
                                <p className="flex items-center gap-3">
                                    <FaMapMarkerAlt className="text-xl text-yellow-500 shrink-0" />
                                    <span className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">Madhyanchal, Station Road, Chandannagar, Hooghly, West Bengal, 712136</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </MainLayout>
    )
}