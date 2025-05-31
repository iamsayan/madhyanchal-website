import type { Metadata } from 'next'
import MainLayout from "@/components/main-layout";
import Section from "@/components/section";
import schema from "@/utils/schema";

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Explore the privacy policy of Madhyanchal Sarbajanin Jagadhatri Puja Samity. Learn how we protect your personal information, ensure your privacy, and comply with data security regulations. Our commitment to safeguarding your data and transparency in how we collect, use, and protect your information is outlined clearly in this policy.',
    openGraph: {
        url: '/privacy-policy',
    },
    alternates: {
        canonical: '/privacy-policy',
    },
}

export default async function Page() {
    const jsonLd = schema({
        slug: 'privacy-policy',
        title: 'Privacy Policy',
    })

    return (
        <MainLayout title="Privacy Policy" jsonLd={jsonLd}>
            <Section title="Read Our" description="Privacy Policy">
                <div className="flex flex-col gap-6 text-justify">
                    <p>At Madhyanchal Sarbajanin Jagadhatri Puja Samity, we are committed to safeguarding the privacy and security of our visitors and users. This policy explains how we collect, use, and protect your personal information when you interact with our website or services.</p>
                    <div>
                        <h2 className="text-lg font-semibold">Information We Collect</h2>
                        <p>We may collect personal information such as your name, email address, phone number, and any details you provide when contacting us or registering for events. Additionally, we collect non-personal information like browser type, IP address, and pages visited to improve our website's functionality and user experience.</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">How We Use Your Information</h2>
                        <p>Your personal information is used to provide better services, respond to inquiries, and share updates about our events, activities, or community initiatives. Non-personal data helps us analyze trends, manage the website, and enhance user interactions.</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">Sharing Your Information</h2>
                        <p>We respect your privacy and do not sell, trade, or rent your personal information to third parties. However, we may share your information with trusted partners or service providers who assist in managing our operations, provided they agree to keep your information confidential. We may also disclose information if required by law or to protect our rights and safety.</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">Cookies and Tracking</h2>
                        <p>Our website uses cookies to enhance your browsing experience. Cookies help us track user behavior, remember preferences, and deliver personalized content. You can modify your browser settings to reject cookies, though this may affect certain functionalities on our site.</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">Data Security</h2>
                        <p>We implement robust security measures to protect your data from unauthorized access, alteration, or disclosure. While we strive to ensure the safety of your information, no method of transmission over the Internet is entirely secure, and we cannot guarantee absolute security.</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">Third-Party Links</h2>
                        <p>Our website may include links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing personal information.</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">Children's Privacy</h2>
                        <p>Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children. If we become aware of such data being collected, we will take steps to delete it promptly.</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">Your Rights</h2>
                        <p>You have the right to access, update, or delete your personal information. If you wish to exercise these rights or have concerns about our data practices, please contact us using the information below.</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">Policy Updates</h2>
                        <p>We may update this privacy policy periodically to reflect changes in our practices or legal requirements. Any updates will be posted on this page with a revised date, so please review it regularly to stay informed.</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">Contact Us</h2>
                        <p>If you have any questions or concerns about our privacy policy, please reach out to us:</p>
                        <p><strong>Madhyanchal Sarbajanin Jagadhatri Puja Samity</strong></p>
                        <p>Address: Madhyanchal, Station Road, Chandannagar, Hooghly – 712136</p>
                        <p>Email: <a href="mailto:jagatdhatri.madhyanchal@gmail.com">jagatdhatri.madhyanchal@gmail.com</a></p>
                        <p>Phone: +91-9831360465</p>
                    </div>
                </div>
            </Section>
        </MainLayout>
    )
}