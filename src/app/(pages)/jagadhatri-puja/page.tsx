import MainLayout from '@/components/main-layout';
import Section from '@/components/section';
import { getCollectionData, getSingletonData } from "@/utils/fetch";
import schema from "@/utils/schema";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { formatDate, getYear, generateUrlSearchParams, jubilees, getDateByIndex, getCelebrating } from '@/utils/functions';
import Image from 'next/image';

export async function generateMetadata() {
    const siteDataRes = await getSingletonData('information');
    const siteData = siteDataRes ?? null;
    const displayDate = getDateByIndex(siteData, 0);
    const uptoYear = displayDate.getFullYear();

    return {
        title: `Jagadhatri Puja ${uptoYear} Schedule, Jubilee List`,
        description: `Join us in celebrating the grandeur of Jagadhatri Puja in ${uptoYear} with Madhyanchal Sarbajanin Jagadhatri Puja Samity. Discover event details, rituals, schedules, and how we bring together the community to honor the Goddess Jagadhatri. Be part of this auspicious occasion with us.`,
        openGraph: {
            url: '/jagadhatri-puja',
        },
        alternates: {
            canonical: '/jagadhatri-puja',
        },
    }
}

interface SchemaOptions {
    slug: string;
    title: string;
    description?: string;
    start?: Date;
    end?: Date;
}

export default async function Page() {
    const siteDataRes = getSingletonData('information');
    const pujasDataRes = getCollectionData(generateUrlSearchParams('pujas', {
        sort: { estd: 1 }
    }));

    const [siteData, pujasData] = await Promise.all([siteDataRes, pujasDataRes]);

    const data = siteData ?? null
    const pujas = pujasData ?? null

    const currentYear = new Date().getFullYear();
    const uptoYear = data?.dates[0]?.date ? new Date(data?.dates[0]?.date).getFullYear() : currentYear;
    const displayDate = getDateByIndex(data, 0);
    const dateIsCurrent = uptoYear === displayDate.getFullYear();
    const jubilee = pujas?.filter((data: any) => jubilees.includes(Number(getYear(data?.estd, uptoYear))));

    let schemaData: SchemaOptions = {
        slug: 'jagadhatri-puja',
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
                    <div className="flex flex-col gap-4">
                        <p className="text-xl font-bold text-center mt-4">🎉 Jubilee Celebrations 🎉</p>
                        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl shadow-md mb-4">
                            <p className="text-center text-md md:text-lg">
                                Congratulations to <span className="font-bold text-yellow-600">{jubilee?.length} Puja Committees</span> on achieving this remarkable milestone!
                                Your dedication to preserving our cultural heritage is truly commendable.
                            </p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table text-center table-zebra w-full bg-white rounded-xl overflow-hidden">
                                <thead className="bg-yellow-500 text-white">
                                    <tr>
                                        <th className="py-4">Sl. No.</th>
                                        <th className="py-4">Puja Name</th>
                                        <th className="py-4">Under P. S.</th>
                                        <th className="py-4">Years</th>
                                        <th className="py-4">{dateIsCurrent ? 'Celebrating' : 'Celebrated'}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jubilee?.map((item: any, index: number) => {
                                        const y = getYear(item?.estd, uptoYear);
                                        const cel = getCelebrating(y);
                                        return (
                                            <tr key={index} className='hover:bg-yellow-50 transition-colors duration-150'>
                                                <td className="py-3">{index + 1}</td>
                                                <td className="py-3 font-medium">{item?.puja_name}</td>
                                                <td className="py-3">{item?.puja_zone === 'bhr' ? 'Bhadreswar' : 'Chandannagar'}</td>
                                                <td className="py-3 font-medium">{y}</td>
                                                <td className="py-3 text-yellow-600 font-medium">{cel}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Section>
        </MainLayout>
    );
}
