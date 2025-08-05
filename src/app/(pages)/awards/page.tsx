import type { Metadata } from 'next'
import { Fragment } from 'react';
import MainLayout from '@/components/main-layout';
import Section from '@/components/section';
import GallerySlider from '@/components/gallery-slider';
import schema from "@/utils/schema";
import { awards, type Award } from '@/data/awards';
import { FaTrophy, FaPalette, FaLandmark, FaHandsHelping, FaLeaf, FaHeart, FaCertificate, FaStar, FaAward, FaMedal } from 'react-icons/fa';
import { metadata as rootMetadata } from '@/app/layout';

export const metadata: Metadata = {
    title: 'Our Awards',
    description: 'Explore the prestigious awards and accolades received by Madhyanchal Sarbajanin Jagadhatri Puja Samity. Recognized for excellence in creativity, cultural heritage, and community impact, our awards highlight milestones from road lighting to idol decoration.',
    openGraph: {
        ...rootMetadata.openGraph,
        url: '/awards',
    },
    alternates: {
        canonical: '/awards',
    },
}

export default function Page() {
    const imgStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        pointerEvents: 'none'
    };

    const jsonLd = schema({
        slug: 'awards',
        title: 'Our Awards',
    })

    return (
        <MainLayout title="Our Awards" jsonLd={jsonLd}>
            <Section title="Know More About" description="Our Awards">
                <div className="flex flex-col gap-4 text-justify">
                    <p>
                        Explore the prestigious awards and accolades received by Madhyanchal Sarbajanin Jagadhatri Puja Samity. Recognized for excellence in creativity, cultural heritage, and community impact, our awards highlight milestones from road lighting to idol decoration. Discover how our dedication to tradition and innovation has earned recognition from top organizations across Bengal. Celebrate our journey of artistic and cultural excellence. Since its inception, <strong>Madhyanchal Sarbajanin Jagadhatri Puja Samity</strong> has been a beacon of excellence in Chandannagar's cultural and festive landscape. Over the years, our dedication to preserving tradition while embracing innovation has earned us widespread acclaim. We are proud to share that, since 2016, we have received over <strong>45 prestigious awards</strong> across various categories. These accolades recognize our achievements in:
                    </p>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <FaPalette className="text-2xl text-blue-600 mt-1 flex-shrink-0" />
                            <div>
                                <strong className="text-blue-700">Artistic Excellence:</strong>
                                <p className="mt-1">Celebrating our creative and innovative pandals, intricate decorations, and unique idol craftsmanship.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                            <FaLandmark className="text-2xl text-red-600 mt-1 flex-shrink-0" />
                            <div>
                                <strong className="text-red-700">Cultural Impact:</strong>
                                <p className="mt-1">Honoring our commitment to promoting and preserving the rich heritage of Jagadhatri Puja in Chandannagar.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                            <FaHandsHelping className="text-2xl text-orange-600 mt-1 flex-shrink-0" />
                            <div>
                                <strong className="text-orange-700">Social Initiatives:</strong>
                                <p className="mt-1">Recognizing our efforts in fostering inclusivity and harmony in the community.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                            <FaLeaf className="text-2xl text-green-600 mt-1 flex-shrink-0" />
                            <div>
                                <strong className="text-green-700">Environmental Responsibility:</strong>
                                <p className="mt-1">Commending our eco-friendly practices during the festivities.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="overflow-x-auto my-6">
                    <div className="mb-4 text-center">
                        <h3 className="text-xl font-bold mb-2">Year-wise Awards & Recognitions</h3>
                        <p className="text-gray-600">Browse through our achievements over the years using the tabs below.</p>
                    </div>
                    <div role="tablist" className="tabs tabs-lifted">
                        {Object.keys(awards)?.toReversed().map((year: string, index: number) => (
                            <Fragment key={index}>
                                <input type="radio" name="awards" role="tab" className="tab h-10 font-bold whitespace-nowrap checked:!bg-gray-50" aria-label={year} defaultChecked={index === 0} />
                                <div role="tabpanel" className="tab-content text-center bg-gray-50 border-base-300 p-2 pt-5 md:p-5">
                                    <p className="text-xl font-bold">Awards & Recognitions of {year}</p>
                                    <p className="font-bold">Total {awards[Number(year)]?.length} {awards[Number(year)]?.length === 1 ? 'Award' : 'Awards'}</p>
                                    <div className="overflow-x-auto mt-5">
                                        <table className="table text-center table-zebra">
                                            <thead className="bg-yellow-50">
                                                <tr>
                                                    <th>Sl. No.</th>
                                                    <th>Position</th>
                                                    <th>Category</th>
                                                    <th>Event Name</th>
                                                    <th>Presented by</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {awards[Number(year)]?.map((item: Award, index: number) => {
                                                    // Helper function to render position icon
                                                    const getPositionIcon = (position: string) => {
                                                        if (position.toLowerCase().includes('1st') || position.toLowerCase().includes('first'))
                                                            return <FaTrophy className="text-yellow-500 inline mx-1" />;
                                                        if (position.toLowerCase().includes('2nd') || position.toLowerCase().includes('second'))
                                                            return <FaMedal className="text-gray-400 inline mx-1" />;
                                                        if (position.toLowerCase().includes('3rd') || position.toLowerCase().includes('third'))
                                                            return <FaMedal className="text-amber-600 inline mx-1" />;
                                                        return <FaAward className="text-blue-500 inline mx-1" />;
                                                    };

                                                    return (
                                                        <tr key={index} className="hover:bg-gray-50">
                                                            <td>{index + 1}</td>
                                                            <td className="font-medium">
                                                                {getPositionIcon(item?.position)}
                                                                {item?.position}
                                                            </td>
                                                            <td>
                                                                <FaStar className="text-purple-500 inline mr-1" />
                                                                {item?.category}
                                                            </td>
                                                            <td>{item?.event}</td>
                                                            <td>
                                                                <FaCertificate className="text-green-500 inline mr-1" />
                                                                {item?.presentedBy}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Fragment>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-center my-4">
                    <h2 className="text-xl md:text-2xl font-bold text-center">Previous Year's Awards</h2>
                    <GallerySlider
                        speed={500} 
                        thumbnail={true} 
                        slideShowAutoplay={true} 
                        fullScreen={true} 
                        slides={Array.from({ length: 6 }, (_, i) => ({
                            src: `static/awards/${i+1}.jpg`,
                            alt: `Slider Image ${i + 1}`,
                        }))}
                        sliderOptions={{
                            lazyLoad: 'nearby',
                            perPage: 4,
                            gap: '0.5rem',
                            perMove: 1,
                            drag: 'free',
                            focus: 'center',
                            autoScroll: {
                                speed: 1,
                            },
                            height: 400,
                            pagination: false,
                            breakpoints: {
                                640: {
                                    perPage: 1,
                                },
                                1024: {
                                    perPage: 2,
                                    height: 300,
                                },
                            },
                        }}
                    />
                </div>
                <div className="flex flex-col gap-4 text-justify">
                    <div className="flex items-center gap-4 p-4 bg-teal-50 rounded-lg border border-teal-200">
                        <FaHeart className="text-4xl text-teal-600 flex-shrink-0" />
                        <p>
                            These awards reflect the hard work, passion, and dedication of our team, artisans, and the entire community of Madhyanchal. Each recognition inspires us to continue striving for excellence and making the festival a memorable experience for all. We thank all our supporters, visitors, and well-wishers for being an integral part of our journey. Together, we celebrate not just the festival but also the spirit of unity and cultural pride that defines <strong>Madhyanchal Sarbajanin Jagadhatri Puja Samity</strong>.
                        </p>
                    </div>
                </div>
            </Section>
        </MainLayout>
    )
}