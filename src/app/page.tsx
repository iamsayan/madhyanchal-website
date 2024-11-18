import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import Main from '@/components/main';
import Section from "@/components/section";
import Slider from "@/components/slider";
import CountdownTimer from "@/components/countdown-timer";
import { FaHistory, FaImages, FaYoutube, FaLocationArrow, FaAward, FaGlobe, FaVideo, FaFacebook, FaMapMarkerAlt, FaPhotoVideo } from "react-icons/fa";
import { cn, formatDate, getDateByIndex } from "@/utils/functions";
import { paytoneOne } from "@/fonts";
import { getSingletonData } from "@/utils/fetch";
import Videos from "@/components/videos";
import HeroSlider from "@/components/hero-slider";

import slider1 from '@/public/assets/sliders/1.jpg';
import slider2 from '@/public/assets/sliders/2.jpg';
import slider3 from '@/public/assets/sliders/3.jpg';
import slider4 from '@/public/assets/sliders/4.jpg';
import slider5 from '@/public/assets/sliders/5.jpg';
import slider6 from '@/public/assets/sliders/6.jpg';
import slider7 from '@/public/assets/sliders/7.jpg';
import slider8 from '@/public/assets/sliders/8.jpg';
import slider9 from '@/public/assets/sliders/9.jpg';
import slider10 from '@/public/assets/sliders/10.jpg';
import slider11 from '@/public/assets/sliders/11.jpg';
import slider12 from '@/public/assets/sliders/12.jpg';
import slider13 from '@/public/assets/sliders/13.jpg';

interface StatsItem {
    title: string;
    stat: string;
    icon: React.ReactNode;
    description: string;
    class?: string;
}

interface MenuItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    link: string;
}

export default async function Home() {
    const siteData = await getSingletonData('information');
    const data = siteData ?? null;
    const year = getDateByIndex(data, 0).getFullYear();
    const curYear = new Date().getFullYear();
    const btnYear = curYear > year ? curYear : year;

    const items: MenuItem[] = [
        {
            title: 'History',
            description: 'When the entire Bengal, nay India, was under the British rule, inspite of being under the French',
            icon: <FaHistory className="size-6 sm:size-8 md:size-10 text-yellow-500" />,
            link: '/puja-history'
        },
        {
            title: 'Gallery',
            description: 'Latest Online Photo Gallery of Madhyanchal Sarbajanin Jagadhatri Puja Samity',
            icon: <FaImages className="size-6 sm:size-8 md:size-10 text-yellow-500" />,
            link: '/gallery'
        },
        {
            title: 'Videos',
            description: 'Latest Online Video Gallery of Madhyanchal Sarbajanin Jagadhatri Puja Samity',
            icon: <FaYoutube className="size-6 sm:size-8 md:size-10 text-yellow-500" />,
            link: 'https://www.youtube.com/@madhyanchalsarbajanin'
        },
        {
            title: 'Location',
            description: 'Find the location of the Madhyanchal Sarbajanin Jagadhatri Puja Samity in Chandannagar',
            icon: <FaLocationArrow className="size-6 sm:size-8 md:size-10 text-yellow-500" />,
            link: 'https://maps.app.goo.gl/xY6cx8Arcy6ayLYq9',
        }
    ];

    const stats: StatsItem[] = [
        {
            title: 'Footfalls',
            stat: '1.2M',
            icon: <FaGlobe className="inline-block size-8 stroke-current" />,
            description: 'Highest footfall in 2024 on Astami',
            class: 'text-pink-500'
        },
        {
            title: 'Prestigious Awards',
            stat: '45',
            icon: <FaAward className="inline-block size-8 stroke-current" />,
            description: 'Won 10+ awards in just 2024',
            class: 'text-green-600'
        },
        {
            title: 'Followers',
            stat: '7.8K',
            icon: <FaFacebook className="inline-block size-8 stroke-current" />,
            description: '100+ new followers in last 30 days'
        },
        {
            title: 'Post Reach',
            stat: '424.6K',
            icon: <FaHistory className="inline-block size-8 stroke-current" />,
            description: '85% more than last month',
            class: 'text-secondary'
        },
        {
            title: 'Post Engagement',
            stat: '206K',
            icon: <FaVideo className="inline-block size-8 stroke-current" />,
            description: '38% more than last month',
            class: 'text-blue-500'
        },
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${process.env.SITE_URL}/#organization`,
                "name": "Madhyanchal Sarbajanin Jagadhatri Puja Samity",
                "sameAs": [
                    "https://www.facebook.com/JagadhatriOnlineOfficial/",
                    "https://twitter.com/JagadhatriLive"
                ]
            },
            {
                "@type": "WebSite",
                "@id": `${process.env.SITE_URL}/#website`,
                "url": process.env.SITE_URL,
                "name": "Madhyanchal Sarbajanin Jagadhatri Puja Samity",
                "publisher": {
                    "@id": `${process.env.SITE_URL}/#organization`
                },
                "inLanguage": "en-US"
            },
            {
                "@type": "WebPage",
                "@id": `${process.env.SITE_URL}#webpage`,
                "url": process.env.SITE_URL,
                "name": `Madhyanchal Sarbajanin | ${curYear - 1971 + 1} Years of Tradition, Unity, and Celebration since 1971!`,
                "isPartOf": {
                    "@id": `${process.env.SITE_URL}/#website`
                },
                "inLanguage": "en-US"
            }
        ]
    };

    return (
        <Main jsonLd={jsonLd}>
            <HeroSlider>
                <div className="hero-content text-center text-white-content text-white p-0 z-2">
                    <div className="pt-36 pb-28">
                        <h1 className={`mb-3 text-2xl md:text-4xl lg:text-6xl ${paytoneOne.className}`}>
                            MADHYANCHAL <br /> SARBAJANIN JAGADHATRI PUJA
                        </h1>
                        <p className="mb-8">{curYear - 1971 + 1} Years of Tradition, Unity, and Celebration!</p>
                        <Link
                            href="/jagadhatri-puja"
                            className="btn bg-yellow-500 border-2 border-yellow-500 uppercase py-3.5 px-6 h-auto min-h-full rounded-md hover:bg-transparent hover:border-yellow-500 hover:text-yellow-500"
                        >
                            Jagadhatri Puja {btnYear}
                        </Link>
                    </div>
                </div>
            </HeroSlider>
            <Section
                className="bg-gray-100"
                title="Welcome to the Official Website of"
                description={
                    <span className="bg-gradient-to-r from-yellow-500 to-amber-500 text-transparent bg-clip-text">
                        Madhyanchal
                    </span>
                }
                subtitle="Sarbajanin Jagadhatri Puja Samity"
            >
                <div className="flex flex-col gap-6 text-center">
                    <p className="md:text-xl text-center m-auto md:leading-relaxed">
                        In {curYear}, we proudly celebrate {curYear - 1971 + 1} years of devotion, tradition, and togetherness. As a cornerstone of Chandannagar’s iconic Jagadhatri Puja, our Samity has been a beacon of unity, blending heritage with innovation and fostering love, harmony, and shared prosperity. More than just a festival, our celebration strengthens community bonds while honoring the divine power of Jagadhatri as a symbol of peace and triumph over evil. Join us in marking this milestone and continuing our legacy of cultural and social excellence!
                    </p>
                    <div>
                        <Link
                            href="/awards"
                            className="btn bg-yellow-500 border-0 uppercase py-4 px-6 h-auto min-h-full rounded-md hover:text-white hover:bg-blue-700"
                        >
                            <FaAward /> Awards
                        </Link>
                    </div>
                    <div className="stats stats-vertical lg:stats-horizontal text-left shadow container">
                        {stats?.map((item, index) => (
                            <div className="stat" key={index}>
                                <div className={`${cn('stat-figure text-primary', item?.class)}`}>{item?.icon}</div>
                                <div className="stat-title">{item?.title}</div>
                                <div className={`${cn('stat-value text-primary', item?.class)}`}>{item?.stat}</div>
                                <div className="stat-desc">{item?.description}</div>
                            </div>
                        ))}
                    </div>
                    <Slider
                        slides={[
                            { imageUrl: slider1.src },
                            { imageUrl: slider2.src },
                            { imageUrl: slider3.src },
                            { imageUrl: slider4.src },
                            { imageUrl: slider5.src },
                            { imageUrl: slider6.src },
                            { imageUrl: slider7.src },
                            { imageUrl: slider8.src },
                            { imageUrl: slider9.src },
                            { imageUrl: slider10.src },
                            { imageUrl: slider11.src },
                            { imageUrl: slider12.src },
                            { imageUrl: slider13.src },
                        ]}
                        options={{
                            height: 800,
                            breakpoints: {
                                640: {
                                    height: 300,
                                },
                            },
                        }}
                    />
                    <div className="grid gap-2 grid-cols-2 xl:grid-cols-4 mt-5">
                        {items?.map((item, index) => (
                            <Link
                                key={index}
                                href={item?.link}
                                target={item?.link?.includes('https') ? '_blank' : '_self'}
                                className="flex flex-col gap-2 items-center"
                            >
                                <span className="p-5 border rounded-full">{item?.icon}</span>
                                <span className="text-xl font-bold uppercase">{item?.title}</span>
                                <span className="">{item?.description}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </Section>
            <Section
                title="Jagadhatri Puja"
                description={
                    <div className="flex items-center justify-center gap-2">
                        <span>Countdown <span className="text-yellow-500 font-bold">{year}</span></span>
                    </div>
                }
                className="bg-gradient-to-b from-white to-gray-50"
            >
                <div className="flex flex-col gap-8 text-center">
                    <CountdownTimer className="mt-3" targetDate={data?.dates[0]?.date} />
                    <div className="grid gap-6 grid-cols-2 md:grid-cols-6">
                        {data?.dates?.slice(-5)?.map((item: any, index: number) => (
                            <div
                                key={index}
                                className={`flex gap-4 col-span-2 p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300${index === 3 ? ' md:col-start-2' : ''}`}
                            >
                                <Image
                                    width={55}
                                    height={55}
                                    src={`/assets/dates/${index}.png`}
                                    alt={item?.event}
                                    quality={100}
                                    className="h-fit rounded-lg"
                                />
                                <div className="flex flex-col gap-2 text-left">
                                    <span className="font-bold text-gray-800">{item?.information}</span>
                                    <span className="text-gray-600 flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-yellow-500" />
                                        {item?.event}: {formatDate(item?.date)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <p className="font-bold text-base sm:text-xl md:text-2xl xl:text-3xl mb-6 flex items-center justify-center gap-2">
                            <FaPhotoVideo className="text-yellow-500" />
                            Glimpses of <span className="text-yellow-500">Jagadhatri Puja</span>
                        </p>
                        <Videos />
                    </div>
                </div>
            </Section>
        </Main>
    );
}
