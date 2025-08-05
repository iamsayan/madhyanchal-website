import type { Metadata } from 'next'
import MainLayout from '@/components/main-layout';
import Section from '@/components/section';
import GallerySlider from '@/components/gallery-slider';
import schema from "@/utils/schema";
import { FaPalette, FaHandsHelping, FaLeaf, FaHeart, FaCertificate, FaStar } from 'react-icons/fa';
import { metadata as rootMetadata } from '@/app/layout';

export const metadata: Metadata = {
    title: 'Social Activities',
    description: 'Social Activities of Madhyanchal Sarbajanin Jagadhatri Puja Samity',
    openGraph: {
        ...rootMetadata.openGraph,
        url: '/activities',
    },
    alternates: {
        canonical: '/activities',
    },
}

export default function Page() {
    const jsonLd = schema({
        slug: 'activities',
        title: 'Social Activities of Madhyanchal Sarbajanin Jagadhatri Puja Samity',
    })

    return (
        <MainLayout title="Social Activities" jsonLd={jsonLd}>
            <Section title="Know More About" description="Social Activities">
                <div className="flex flex-col gap-12 text-justify">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-primary-600 flex items-center justify-center gap-3">
                            <FaHandsHelping className="text-yellow-500" />
                            Our Year-Round Social Initiatives
                        </h2>
                        <p className="mt-4 text-gray-600">At Madhyanchal Sarbajanin Jagadhatri Puja Samity, we believe in contributing to society throughout the year. Our efforts are centered on supporting those in need, spreading joy, and encouraging community participation in various social activities.</p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <FaHeart className="text-3xl text-red-500" />
                                <h3 className="text-xl font-semibold text-primary-700">Kali Puja Celebration with Orphanage Children</h3>
                            </div>
                            <p>Every year, during the auspicious occasion of Kali Puja, we celebrate with the children of the <strong>Prabartak Seba Niketan</strong> orphanage. Our members come together to share the festive joy, offering the children a memorable night full of warmth, love, and fun.</p>
                            <div className="mt-4">
                                <GallerySlider
                                    slides={Array.from({ length: 7 }, (_, i) => ({
                                        src: `static/activities/${i+1}.jpg`,
                                        alt: `Slider Image ${i + 1}`,
                                    }))}
                                    sliderOptions={{
                                        autoScroll: false,
                                        type: 'slide',
                                        height: 400,
                                        breakpoints: {
                                            640: {
                                                height: 300,
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <FaCertificate className="text-3xl text-blue-500" />
                                <h3 className="text-xl font-semibold text-primary-700">Health Camps and Medical Assistance</h3>
                            </div>
                            <p>We organize regular <strong>health camps</strong> to provide free checkups and distribute medicines to the poor and needy. During the COVID-19 pandemic, we set up a <strong>Covid Vaccination Camp</strong> with <strong>R. N. Tagore Hospital</strong>, helping over 520 individuals.</p>
                            <div className="mt-4">
                                <GallerySlider
                                    slides={Array.from({ length: 7 }, (_, i) => ({
                                        src: `static/activities/${i+5}.jpg`,
                                        alt: `Slider Image ${i + 5}`,
                                    }))}
                                    sliderOptions={{
                                        autoScroll: false,
                                        type: 'slide',
                                        height: 400,
                                        breakpoints: {
                                            640: {
                                                height: 300,
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <FaLeaf className="text-3xl text-green-500" />
                                <h3 className="text-xl font-semibold text-primary-700">Blood & Eye Donation Camps</h3>
                            </div>
                            <p>Our commitment to social responsibility shows through our <strong>Blood Donation Camps</strong> and <strong>Eye Donation Camps</strong>. These life-saving initiatives, running since 2016, have made a significant impact thanks to community support.</p>
                            <div className="mt-4">
                                <GallerySlider
                                    slides={Array.from({ length: 7 }, (_, i) => ({
                                        src: `static/activities/${i+9}.jpg`,
                                        alt: `Slider Image ${i + 9}`,
                                    }))}
                                    sliderOptions={{
                                        autoScroll: false,
                                        type: 'slide',
                                        height: 400,
                                        breakpoints: {
                                            640: {
                                                height: 300,
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <FaPalette className="text-3xl text-purple-500" />
                                <h3 className="text-xl font-semibold text-primary-700">Drawing Competitions</h3>
                            </div>
                            <p>We foster creativity through <strong>Drawing Competitions</strong> for children, providing a platform to showcase their artistic talents while building community unity and excitement.</p>
                            <div className="mt-4">
                                <GallerySlider
                                    slides={Array.from({ length: 7 }, (_, i) => ({
                                        src: `static/activities/${i+14}.jpg`,
                                        alt: `Slider Image ${i + 14}`,
                                    }))}
                                    sliderOptions={{
                                        autoScroll: false,
                                        type: 'slide',
                                        height: 400,
                                        breakpoints: {
                                            640: {
                                                height: 300,
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="text-center bg-gradient-to-r from-primary-50 to-primary-100 p-8 rounded-xl">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <FaStar className="text-3xl text-yellow-500" />
                            <h3 className="text-2xl font-bold text-primary-700">Looking Ahead</h3>
                        </div>
                        <p className="mb-4">With the support of our community, we continue to strive for the betterment of society. Every year, we aim to expand and enhance our initiatives, ensuring that we touch more lives with our positive impact.</p>
                        <p className="text-xl font-bold text-primary-600">Together, we can create a better tomorrow for all!</p>
                    </div>
                </div>
            </Section>
        </MainLayout>
    )
}