import type { Metadata } from 'next'
import Section from "@/components/section";
import CountdownTimer from "@/components/countdown-timer";
import schema from "@/utils/schema";
import { paytoneOne } from "@/fonts";

export const metadata: Metadata = {
    title: `Durga Puja ${new Date().getFullYear()} - Madhyanchal Sarbajanin Durga Puja Samity`,
    description: `Experience the divine celebration of Durga Puja ${new Date().getFullYear()} at Madhyanchal, Chandannagar. Join us for traditional rituals, cultural programs, and spiritual festivities.`,
    openGraph: {
        url: '/durgapuja',
    },
    alternates: {
        canonical: '/durgapuja',
    },
}

export default async function Page() {
    return (
        <div className="pt-1 flex items-center flex-col">
            <h1>Coming Soon</h1>
        </div>
    )
    const curYear = new Date().getFullYear();
    const jsonLd = schema({
        slug: 'durgapuja',
        title: `Durga Puja ${curYear}`,
    })

    // Durga Puja 2024 dates (example dates - adjust as needed)
    const durgaPujaStart = new Date('2024-10-10T00:00:00');
    const durgaPujaEnd = new Date('2024-10-15T00:00:00');

    return (
        <div className="pt-1 flex items-center flex-col">
            {/* Hero Section with Countdown */}
            <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 text-center px-4">
                    <h1 className={`${paytoneOne.className} text-4xl md:text-6xl lg:text-7xl text-white mb-6 drop-shadow-2xl`}>
                        <span className="bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 bg-clip-text text-transparent">
                            Durga Puja 2024
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-lg">
                        Celebrating the Divine Mother at Madhyanchal
                    </p>
                    <div className="mb-8">
                        <CountdownTimer 
                            targetDate={durgaPujaStart}
                            className="text-white"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105">
                            View Schedule
                        </button>
                        <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30">
                            Join Events
                        </button>
                    </div>
                </div>
            </div>

            {/* About Durga Puja Section */}
            <Section 
                title="About Our Celebration"
                description="Divine Festivities at Madhyanchal"
                subtitle="Experience the grandeur of Durga Puja with traditional rituals and cultural programs"
            >
                <div className="grid md:grid-cols-2 gap-8 mt-12">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-semibold text-gray-800">Traditional Celebrations</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Durga Puja is the most significant festival celebrated at Madhyanchal Sarbajanin Durga Puja Samity. 
                            This five-day festival marks the victory of Goddess Durga over the demon Mahishasura, symbolizing the triumph 
                            of good over evil. Our celebrations include traditional rituals, cultural programs, and community gatherings.
                        </p>
                        <div className="flex items-center space-x-4 mt-6">
                            <div className="flex flex-col items-center">
                                <span className="text-3xl font-bold text-orange-500">29</span>
                                <span className="text-sm text-gray-600">Years of Tradition</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-3xl font-bold text-red-500">5000+</span>
                                <span className="text-sm text-gray-600">Devotees</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-3xl font-bold text-yellow-500">50+</span>
                                <span className="text-sm text-gray-600">Cultural Events</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-100 to-red-100 p-6 rounded-lg">
                        <h4 className="text-xl font-semibold mb-4 text-gray-800">Festival Highlights</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-3">
                                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                <span>Traditional Durga Puja rituals</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                <span>Cultural performances and music</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                                <span>Community feast and prasad distribution</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                <span>Children's drawing competition</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                <span>Evening aarti and bhajan programs</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </Section>

            {/* Schedule Section */}
            <Section 
                title="Festival Schedule"
                description="Durga Puja 2024 Program"
                subtitle="Join us for five days of divine celebrations"
                className="bg-gray-50"
            >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {[
                        {
                            day: "Day 1 - Shashthi",
                            date: "October 10, 2024",
                            events: ["Kalparambha", "Akhanda Jyoti", "Evening Aarti"]
                        },
                        {
                            day: "Day 2 - Saptami",
                            date: "October 11, 2024",
                            events: ["Nabapatrika", "Kolabou Snan", "Cultural Program"]
                        },
                        {
                            day: "Day 3 - Ashtami",
                            date: "October 12, 2024",
                            events: ["Sandhi Puja", "Kumari Puja", "Evening Bhajan"]
                        },
                        {
                            day: "Day 4 - Navami",
                            date: "October 13, 2024",
                            events: ["Mahasnan", "Homa", "Cultural Night"]
                        },
                        {
                            day: "Day 5 - Dashami",
                            date: "October 14, 2024",
                            events: ["Sindoor Khela", "Visarjan", "Community Feast"]
                        },
                        {
                            day: "Special Events",
                            date: "Throughout Festival",
                            events: ["Drawing Competition", "Music Programs", "Prasad Distribution"]
                        }
                    ].map((schedule, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{schedule.day}</h3>
                            <p className="text-orange-600 font-medium mb-4">{schedule.date}</p>
                            <ul className="space-y-2">
                                {schedule.events.map((event, eventIndex) => (
                                    <li key={eventIndex} className="flex items-center space-x-2 text-gray-600">
                                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                                        <span>{event}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Location & Contact Section */}
            <Section 
                title="Visit Us"
                description="Madhyanchal Durga Puja Venue"
                subtitle="Join us at our traditional venue in Chandannagar"
            >
                <div className="grid md:grid-cols-2 gap-8 mt-12">
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Venue Details</h3>
                            <div className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <span className="text-orange-500 mt-1">📍</span>
                                    <div>
                                        <p className="font-medium">Madhyanchal Sarbajanin Durga Puja Samity</p>
                                        <p className="text-gray-600">Station Road, Chandannagar, Hooghly – 712136</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-red-500 mt-1">📞</span>
                                    <div>
                                        <p className="font-medium">Contact</p>
                                        <p className="text-gray-600">+91-9831360465</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-yellow-500 mt-1">✉️</span>
                                    <div>
                                        <p className="font-medium">Email</p>
                                        <p className="text-gray-600">jagatdhatri.madhyanchal@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">How to Reach</h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <span className="text-green-500">🚂</span>
                                    <span>Chandannagar Railway Station (5 min walk)</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-blue-500">🚌</span>
                                    <span>Bus Stand (10 min walk)</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-purple-500">🚗</span>
                                    <span>Parking available on premises</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-gray-100 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Festival Guidelines</h3>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <span className="text-green-500 mt-1">✅</span>
                                <div>
                                    <p className="font-medium">Dress Code</p>
                                    <p className="text-gray-600">Traditional Indian attire preferred</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-blue-500 mt-1">⏰</span>
                                <div>
                                    <p className="font-medium">Timings</p>
                                    <p className="text-gray-600">6:00 AM - 10:00 PM daily</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-orange-500 mt-1">🎁</span>
                                <div>
                                    <p className="font-medium">Prasad</p>
                                    <p className="text-gray-600">Free prasad distribution daily</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-red-500 mt-1">📸</span>
                                <div>
                                    <p className="font-medium">Photography</p>
                                    <p className="text-gray-600">Photography allowed in designated areas</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className={`${paytoneOne.className} text-3xl md:text-4xl text-white mb-6`}>
                        Join Us for Divine Celebrations
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Experience the spiritual atmosphere and cultural richness of Durga Puja 2024 at Madhyanchal. 
                        All are welcome to participate in our traditional celebrations.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300">
                            Register for Events
                        </button>
                        <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-600 transition-all duration-300">
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}