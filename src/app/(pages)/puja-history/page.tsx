import type { Metadata } from 'next'
import MainLayout from '@/components/main-layout';
import Section from '@/components/section';
import schema from "@/utils/schema";
import { metadata as rootMetadata } from '@/app/layout';

export const metadata: Metadata = {
    title: 'History of Jagadhatri Puja',
    description: 'History of Chandannagar Jagadhatri Puja. It is heard that Indranarayan Chowdhury introduced the Jagadhatri Puja in the manner of King Krishnachandra.',
    openGraph: {
        ...rootMetadata.openGraph,
        url: '/puja-history',
    },
    alternates: {
        canonical: '/puja-history',
    },
}

export default function Page() {
    const jsonLd = schema({
        path: 'puja-history',
        title: 'History of Jagadhatri Puja',
    })

    return (
        <MainLayout title="Puja History" jsonLd={jsonLd}>
            <Section title="Know More About" description="Jagadhatri Puja">
                <div className="flex flex-col gap-6 text-justify">
                    <p>During the period of British colonial rule in India, even though Chandannagar was governed by the French, it developed its own unique traditions. One of the most significant cultural celebrations in this region is the Jagadhatri Puja, a prominent socio-cultural festival.</p>

                    <p>The exact origins of Jagadhatri Puja in Chandannagar remain uncertain. However, it is believed that Indranarayan Chowdhury introduced the Jagadhatri Puja in Chandannagar, inspired by the customs of King Krishnachandra of Krishnanagar. The Jagadhatri Puja began in Krishnanagar in 1762, but Indranarayan Chowdhury passed away in 1756, making it impossible for him to have initiated the celebration there. It's likely that Jagadhatri Puja in Chandannagar predates 1750, with Indranarayan Chowdhury performing the ritual at his home while Krishnachandra visited him for financial help. This may have sparked Krishnachandra's interest in the goddess Jagadhatri.</p>

                    <p>The distinction between Durga and Jagadhatri can be found in the ancient text 'Mayatantra', and Jagadhatri is mentioned alongside Durga in Krishnanda's 'Tantasaar'. A specific puja for the goddess on the ninth lunar day of the light fortnight in the month of Kartick is referenced in the 'Krityatattarnab' by Srinath Acharyachuramoni of the 15th-16th century. The idol of Jagadhatri is portrayed with four arms, holding a conch, discus, shaft, and bow, and riding a lion, which stands on an elephant. The face is long and striking, with large eyes extending to the ears. The idol is adorned with exquisite sola decorations and vibrant canvas mats behind the image.</p>

                    <p>The tradition of Jagadhatri Puja in Bengal began with Maharaja Krishnachandra of Krishnanagar, Nadia. It remains popular in regions such as Krishnanagar, Rishra, Chandannagar, Bhadreswar, Hooghly, and Boinchi.</p>

                    <p>Among these celebrations, the Jagadhatri Puja of the Bose family in Palpara is especially noteworthy. Initially held in their ancestral home in Murshidabad, this puja, believed to have started in 1788, was later moved to Chandannagar. The history of the deity remains unclear, but family records trace it back to 1640. The festival's vibrant atmosphere in Chandannagar is the result of a collaborative effort between the French and Bengali communities. A major highlight of the event is the grand procession, which is the second-largest in the world, just after the one in Rio de Janeiro, featuring stunning lighting displays.</p>

                    <p>Jagadhatri, the goddess who holds the universe, is also known by several other names such as Karindrasuranisudini (slayer of the elephant demon), Maheswari (the Great Goddess), Shaktacharpriya (the Goddess who loves to be worshipped according to Shaktism), and Adharabhuta (the Bearer of the World). She represents ‘Sattva Guna’, one of the three qualities in Sankhya philosophy. While Durga represents 'Rajas' (activity), and Kali represents 'Tamas' (inertia), Jagadhatri embodies calmness and purity, signifying creation. In Tantras and Puranas, Jagadhatri is depicted with three eyes and four arms, holding a conch, chakra, bow, and arrow. She rides a lion standing on an elephant, and is adorned with colorful clothes and bright jewels. The idol is uniquely decorated with sola and canvas mats, and the snake is her sacred thread. According to Sri Ramakrishnadev, Jagadhatri awakens in the hearts of those who can control their minds.</p>

                    <p>In literature, Jagadhatri appears in the semi-historical novel 'Anandamath' by Bankim Chandra Chatterjee, which inspired India's national song "Vande Mataram." In the novel, Kali, Durga, and Jagadhatri are presented as three forms of ‘Bharat Mata’ (Mother India) – Jagadhatri representing the past, Kali the present, and Durga the future. The trio of goddesses are worshipped by a group of ascetics who are the central characters in the story.</p>

                    <p>In Chandannagar, Bhadreswar, and Champdany, the number of community pujas has surpassed 190. Of these, 161 puja committees in different localities are affiliated with the Chandannagar Central Jagadhatri Puja Committee, which assists in obtaining permissions and clearances for the event. The immersion procession is a spectacular sight, attracting thousands of people from far and wide. Decorated tall images are paraded around the city, adding to the grandeur of the festival.</p>

                    <p>The phrase "Tamosa ma jyotirgamay" translates to "Oh Mother! take me from darkness to light," symbolizing the illumination of the mind and the world. Light is a universal symbol of hope and unity, present in every Indian festival.</p>

                    <p>The impact of technological advancements on lighting has been profound, evolving from traditional oil lamps to modern electric lights, chandeliers, and intricate designs. In Chandannagar, the lighting industry thrives, with over 5,000 artisans in the region, contributing to a dazzling array of lighting designs that depict moving bicycles, cars, trains, and even iconic figures like Nobel laureate Amartya Sen and cricketer Sourav Ganguly.</p>

                    <p>The popularity of lighting extends beyond festivals, influencing corporate events, weddings, and even sports. Prices for these artistic lighting displays range from Rs 2,000 to over five lakh rupees.</p>

                    <p>The origin of Chandannagar’s light industry is tied to the region’s unique festivals, where artisans compete to create the most extraordinary lighting designs. The floats and illuminated displays that precede the immersion procession are a testament to the region’s creativity and craftsmanship.</p>

                    <p>Notable lighting artists like Sridhar Das and Kashinath Neogie are celebrated for their exceptional contributions to this craft.</p>
                </div>
            </Section>
        </MainLayout>
    )
}