import MainLayout from '@/components/main-layout';
import Section from '@/components/section';
import { getSingletonData } from "@/utils/fetch";
import schema from "@/utils/schema";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { formatDate, getDateByIndex } from '@/utils/functions';
import Image from 'next/image';
import { metadata as rootMetadata } from '@/app/layout';

export async function generateMetadata() {
    const siteDataRes = await getSingletonData('information');
    const siteData = siteDataRes ?? null;
    const displayDate = getDateByIndex(siteData, 0);
    const uptoYear = displayDate.getFullYear();

    return {
        title: `Jagadhatri Puja ${uptoYear} Schedule, Jubilee List`,
        description: `Join us in celebrating the grandeur of Jagadhatri Puja in ${uptoYear} with Madhyanchal Sarbajanin Jagadhatri Puja Samity. Discover event details, rituals, schedules, and how we bring together the community to honor the Goddess Jagadhatri. Be part of this auspicious occasion with us.`,
        openGraph: {
            ...rootMetadata.openGraph,
            url: '/jagadhatri-puja',
        },
        alternates: {
            canonical: '/jagadhatri-puja',
        },
    }
}

interface SchemaOptions {
    path: string;
    title: string;
    description?: string;
    start?: Date;
    end?: Date;
}

export default async function Page() {
    const siteData = await getSingletonData('information');
    const data = siteData ?? null

    const currentYear = new Date().getFullYear();
    const uptoYear = data?.dates[0]?.date ? new Date(data?.dates[0]?.date).getFullYear() : currentYear;
    const displayDate = getDateByIndex(data, 0);
    const dateIsCurrent = uptoYear === displayDate.getFullYear();

    let schemaData: SchemaOptions = {
        path: 'jagadhatri-puja',
        title: `Jagadhatri Puja ${uptoYear} Schedule, Jubilee List`,
    };

    if (dateIsCurrent) {
        schemaData = {
            ...schemaData,
            description: `Join us in celebrating the grandeur of Jagadhatri Puja in ${uptoYear} with Madhyanchal Sarbajanin Jagadhatri Puja Samity. Discover event details, rituals, schedules, and how we bring together the community to honor the Goddess Jagadhatri. Be part of this auspicious occasion with us.`,
            start: getDateByIndex(data, 0),
            end: getDateByIndex(data, 4)
        };
    }
    const jsonLd = schema(schemaData);

    return (
        <MainLayout title={`Jagadhatri Puja ${uptoYear}`} jsonLd={jsonLd}>
            <Section title="Know More About" description={`Jagadhatri Puja ${uptoYear}`}>
                <div className="flex flex-col gap-6 text-justify">
                    <p>Jagadhatri Puja, an esteemed festival in certain regions, extends across five joyous days,
                        commencing from Sasthi and culminating on Dashami. The main observance traditionally takes place
                        on the seventh day of the festivities. Much akin to the grandeur of Kolkata's revered Durga Puja
                        and Barasat's revered Kali Puja, Chandannagar stands out for its opulent celebrations and
                        cultural exuberance during the Jagadhatri Puja. The city comes alive with vibrant decorations,
                        illuminations, and fervent devotional activities, attracting both locals and visitors alike,
                        creating an atmosphere of religious significance and communal harmony.</p>
                    <p>In Chandannagar, Jagadhatri puja is celebrated as the annual festival of its own, surpassing the
                        grandeur of Durga Puja. Acclaimed for its show of lights, during the four days of the Puja the
                        entire town decks up beautifully as food stalls dot its streets and people throng to the
                        pandals. On the last day of Dashami, all the effigies are paraded throughout the town in a
                        night-long procession as the town showcases its skillful craftsmanship of lights and boasts its
                        age-old tradition. The entire town celebrates for five days as monotonous every day routine
                        comes to a halt. As birds turn to their nests when darkness kisses the ground, similarly the
                        town beckons to all who have grown up in its nooks and crannies and migrated to different parts
                        of the country or outside. During these four days as people return to their hometown to
                        celebrate with their loved ones, the entire town state lights up in the warmth and glow of
                        shared joy.</p>
                    <div className="grid gap-6 grid-cols-2 md:grid-cols-6">
                        {data?.dates?.slice(-5)?.map((item: any, index: number) => (
                            <div
                                key={index}
                                className={`flex gap-4 col-span-2 p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300${index === 3 ? ' md:col-start-2' : ''}`}
                            >
                                <Image
                                    width={55}
                                    height={55}
                                    src={`/dates/${index}.png`}
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
                </div>
            </Section>
        </MainLayout>
    );
}
