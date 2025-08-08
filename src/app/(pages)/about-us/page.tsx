import type { Metadata } from 'next'
import MainLayout from "@/components/main-layout";
import Section from "@/components/section";
import schema from "@/utils/schema";
import { metadata as rootMetadata } from '@/app/layout';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Discover the heart of Madhyanchal Sarbajanin Jagadhatri Puja Samity, a beacon of cultural and social heritage since 1971.',
    openGraph: {
        ...rootMetadata.openGraph,
        url: '/about-us',
    },
    alternates: {
        canonical: '/about-us',
    },
};

interface Person {
    name: string;
    designation: string;
}

export default function Page() {
    const members: Person[] = [
        { name: 'Shri Swapan Kumar Bayen', designation: 'President' },
        { name: 'Shri Debjit Banerjee, Pransanta Dutta, Rajib Ray', designation: 'Vice President' },
        { name: 'Dr. Shantanu Mukherjee', designation: 'General Secretary' },
        { name: 'Shri Asish Datta, Sankar Ghosh, Utpal Dutta, Subhodip Ghosh, Raja Dutta, Saikat Chakraborty, Trisan Ganguly', designation: 'Working Secretary' },
        { name: 'Shri Pijush Narayan Das & Somnath Nandi', designation: 'Joint Treasurer' },
        { name: 'Shri Saurav Biswas & Pradyut Guha', designation: 'Assistant Treasurer' },
        { name: 'Abhisek Mukherjee, Abhishek Modok, Abhishek Singh, Adipata Biswas, Amarnath Dhara, Aman Gupta, Amit Das, Amit Kumar Neogi, Anamika Ghosh, Ananda, Anirban Dey, Anushka Saha, Anannya Das, Arijit Dutta, Arijit Majhi, Arindam Mukherjee, Arnendu Ghosh, Ashish Chatterjee, Ashok Mama, Avik Sarkar, Avijit Chakraborty, Bikram Basu, Brojo gopal chattopadhyay, Chabi Das, Chaiti Mallick, Chaitali Das, Deb Kumar Das, Debabrata Ghara, Debroop Datta, Debolina Sarkar, Dibboshree Banerjee, Deep Swarnakar, Dhiman Saha, Indrani Dey, Jeet Singha Roy, Joyita Mitra Dutta, Kajol Ghosh, Kakoli Das, Kallol Mukherjee, Kartik Bhattacharya, Kuramjit Bhattacharya, Kushal Bose, Lalu Swarnakar, Lisa Dutta, Mohul Guha, Moupiya Chakraborty, Mithun Singh, Mukesh Paswan, Munmum Karmakar, Nabamita Sarkar, Nabomita Mallik, Nebadan Sikdar, Neel Bhattacharya, Nirmala Mukherjee, Oyendrila Basak, Pankaj Das, Parikshit Sur, Paromita Ganguly, Pinaki Ghosh, Piyali Chakraborty, Pradip Biswas, Pranjali Chakraborty, Raja Bhowmick, Reshmi Das, Rimo, Rumela Chakraborty, Rumsu Mukherjee, Rupam Banerjee, Sagar Patra, Saikat Das, Sajal Ghosh, Samrat Ghosh, Sandip Paul, Sanchita Roy, Sanjay Langal, Santu Ghosh, Saurav Das, Sayan Chatterjee, Sayan Datta, Sayan Pal, Sayantan Bhattacharya, Shampa Ghosh, Shampa Kundu, Shantanu Mukherjee, Sharanya Dutta, Sharvani Ghosh, Shubhodeep Hazra, Shuvankar Shadukhan, Soham Bhattacharya, Sougata Ghosh, Soumitra Dutta, Soumodeep Goswami, Soumick Mazumdar, Soumya Sankha Pal, Sourav Banerjee, Sourav Das (Boro), Sreeparna Ganguly, Sudipta Datta, Sudipta Ghosh, Sujan Ganguly, Sujata Banerjee, Sujit Dutta, Sumanta Neogi, Suman Banerjee, Suman Panda, Suman Swarnakar, Sumit Paramanick, Sunil Das, Swapan Banerjee, Tamal Ghosh, Tamal Kanti Dhar, Tarun Nandy, Tathagata Ghosh, Tushar Kanti Ghosh, Udita Singha, Uttam Dutta and all the citizens of Madhyanchal.', designation: 'Members' },
    ];

    const jsonLd = schema({
        path: 'about-us',
        title: 'About Us',
    });

    const curYear = new Date().getFullYear();

    return (
        <MainLayout title="About Us" jsonLd={jsonLd}>
            <Section title="Know More" description="Who We Are">
                <div className="flex flex-col gap-6 text-justify">
                    <p><strong>Jagadhatri Puja</strong>, the festival of Chandannagar, is as famous as Kolkata’s Durga Puja. Situated with all its glory and pride amidst West Bengal’s densely populated district of Hooghly and the recognized French Colony of Chandannagar, just one kilometer away from the railway station, is the renowned <strong>Madhyanchal Sarbajanin Jagadhatri Puja Samity</strong>. Since its inception in 1971, a remarkable {curYear - 1971 + 1} years ago, the committee’s benevolent presence has been ever-expanding. It has continued to spread its tender wings, strengthening the bond of the present generation and leaving a lasting impact on future generations.</p>

                    <p>Thousands and thousands of spectators from all over India and abroad flock to this grand festival, drawn by its unique arts, culture, decorations, pandals, idols, and more. The Madhyanchal Jagadhatri Puja has become a major attraction for people from various walks of life, and the vibrant celebrations offer a beautiful display of the region's cultural heritage.</p>

                    <p>Today, this grand festival is especially celebrated in Kolkata, often in a competitive manner, under the <strong>patronage and sponsorship of multinational corporations</strong>, with the goal of attracting more and more people. However, the Madhyanchal Puja remains distinct in its approach, emphasizing the cultural richness and spiritual essence of the festival, far beyond the commercial aspect.</p>

                    <p><strong>Madhyanchal</strong>, a renowned sports and cultural club located in Chandannagar, Hooghly – 712136, boasts its own playground and an array of modern facilities. Established in 1971, the organization was founded with the vision of promoting sports, culture, and community welfare in the region. Over the past {curYear - 1971 + 1} years, Madhyanchal Sporting Club has become a cornerstone of the community, fostering a spirit of camaraderie, peace, and unity.</p>

                    <p>One of the club’s most significant contributions is its longstanding tradition of organizing the <strong>Jagadhatri Puja</strong>, an event celebrated with grandeur and elegance since its inception. The club’s Jagadhatri Puja is renowned for its opulence and cultural richness, making it one of the most awaited festivals in the region. The celebrations are marked by magnificent decorations, vibrant processions, and an atmosphere of joyous devotion.</p>

                    <p>What sets the Jagadhatri Puja organized by Madhyanchal Sporting Club apart is the sense of inclusivity and harmony it brings to the community. The festival is a symbol of unity, attracting people from all walks of life, irrespective of their faiths and beliefs. It is a true reflection of Chandannagar’s cosmopolitan spirit, where people live in peace and mutual respect. This tradition of celebrating Maa Jagadhatri, the goddess who symbolizes the protection and well-being of the universe, has been passed down through generations and continues to inspire devotion and reverence in the hearts of the residents.</p>

                    <p>The Madhyanchal Jagadhatri Puja is not just a religious event but a cultural celebration that showcases the region's rich heritage and the strong bonds shared by the people. The event is an embodiment of the values of peace, unity, and respect, and continues to play a pivotal role in bringing together the diverse communities of Chandannagar, ensuring that the festival remains an enduring symbol of the town’s rich cultural tapestry.</p>

                </div>
            </Section>
            <Section className="bg-gray-100" title="MEET OUR" description="Member's Team">
                <div className="flex flex-col gap-6 justify-center items-center">
                    <p className="text-center md:text-[18px] md:w-[1200px] m-auto md:leading-relaxed">
                        Madhyanchal Sarbajanin Jagadhatri Puja Samity celebrates the grandeur of Jagadhatri Puja in Chandannagar. For those unable to experience the festival in person, we've created this website to share our pride and the beauty of the celebration with the world. Our dedicated team works hard to make the event unforgettable, and here you can learn more about the efforts behind this magnificent festival.
                    </p>
                    <div className="overflow-x-auto bg-white border border-gray-200">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th className="md:w-64">Designation</th>
                                    <th>Member's Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="font-bold">{item?.designation}</td>
                                            <td className="text-justify">{item?.name}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Section>
        </MainLayout>
    );
}