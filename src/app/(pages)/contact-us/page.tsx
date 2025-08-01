import type { Metadata } from 'next'
import { GoogleMapsEmbed } from '@next/third-parties/google'
import Contact from "@/components/contact";
import MainLayout from "@/components/main-layout";
import Section from "@/components/section";
import schema from "@/utils/schema";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Get in touch with Madhyanchal Sarbajanin Jagadhatri Puja Samity for inquiries, sponsorships, and collaborations. Located at Station Road, Chandannagar, our dedicated team is here to assist with your questions about our cultural and community initiatives. Reach out via email, phone, or our online contact form. Explore how you can be part of our journey blending tradition, art, and social responsibility.',
    openGraph: {
        url: '/contact-us',
    },
    alternates: {
        canonical: '/contact-us',
    },
}

export default function Page() {
    const jsonLd = schema({
        slug: 'contact-us',
        title: 'Contact Us',
    })

    return (
        <MainLayout title="Contact Us" jsonLd={jsonLd}>
            <Section
                title="Need any help?"
                description="Contact Us"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-12">
                    <div className="bg-white/5 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/10">
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
                        <div className="bg-white/5 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/10">
                            <h3 className="text-xl font-semibold text-yellow-500 mb-2 flex items-center gap-2">
                                <FaMapMarkerAlt className="text-xl" />
                                Visit Us
                            </h3>
                            <p className="text-gray-400 text-sm mb-4">Find us at our location in Chandannagar</p>
                            <div className="overflow-hidden rounded-xl shadow-xl">
                                <GoogleMapsEmbed
                                    apiKey={process.env.GOOGLE_MAP_API_KEY!}
                                    height={300}
                                    width="100%"
                                    mode="place"
                                    zoom="18"
                                    q="Madhyanchal+Sarbajanin+Jagadhatri+Puja+Samity,Chandannagar,Hooghly,West+Bengal,712136"
                                />
                            </div>
                        </div>

                        <div className="bg-white/5 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/10">
                            <h3 className="text-xl font-semibold text-yellow-500 mb-4 flex items-center gap-2">
                                <FaPhone className="text-xl" />
                                Quick Contact
                            </h3>
                            <div className="space-y-4 text-gray-300">
                                <p className="flex items-center gap-3 hover:text-yellow-500 transition-colors duration-300">
                                    <FaEnvelope className="text-xl text-yellow-500" />
                                    <a href="mailto:jagadhatri@madhyanchalsarbajanin.co.in" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">
                                        jagadhatri@madhyanchalsarbajanin.co.in
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