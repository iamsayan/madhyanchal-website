import type { Metadata } from 'next'
import MainLayout from "@/components/main-layout";
import Section from "@/components/section";
import schema from "@/utils/schema";
import { metadata as rootMetadata } from '@/app/layout';

export const metadata: Metadata = {
    title: 'Terms & Conditions',
    description: 'Explore the terms and conditions for Madhyanchal Sarbajanin Jagadhatri Puja Samity. Understand our website policies, user guidelines, and event rules to ensure a seamless experience with our services.',
    openGraph: {
        ...rootMetadata.openGraph,
        url: '/terms',
    },
    alternates: {
        canonical: '/terms',
    },
}

export default async function Page() {
    const jsonLd = schema({
        slug: 'terms',
        title: 'Terms & Conditions',
    })

    return (
        <MainLayout title="Terms & Conditions" jsonLd={jsonLd}>
            <Section title="Read Our" description="Terms & Conditions">
                <div className="flex flex-col gap-6 text-justify">
                    <div>
                        <h2 className="text-lg font-semibold">1. Acceptance of Terms</h2>
                        <p>By accessing this website, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions.</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">2. Website Content</h2>
                        <p>All content on this website, including but not limited to text, images, videos, graphics, and designs, is the property of <strong>Madhyanchal Sarbajanin Jagadhatri Puja Samity</strong>. Unauthorized use, reproduction, or distribution of any content is strictly prohibited unless prior written permission is obtained.</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">3. Use of Website</h2>
                        <p>You may use this website solely for lawful purposes. You agree not to engage in any activity that could harm or disrupt the functionality of this website. Any unauthorized access, hacking, or misuse of our website will result in legal action.</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">4. Event Participation</h2>
                        <p>Participation in events or activities organized by <strong>Madhyanchal Sarbajanin Jagadhatri Puja Samity</strong> is subject to the rules and regulations of the respective event. The Samity holds the right to modify or cancel events without prior notice.</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">5. Third-Party Links</h2>
                        <p>Our website may contain links to external websites for informational purposes. We are not responsible for the content, accuracy, or privacy practices of third-party websites. Accessing these links is at your own risk.</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">6. Sponsorships and Advertisements</h2>
                        <p>Sponsorship and advertisement opportunities are subject to availability and approval by the Samity. The content of advertisements must comply with ethical and legal standards.</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">7. Liability Disclaimer</h2>
                        <p>The information provided on this website is for general purposes only. While we strive to ensure accuracy, <strong>Madhyanchal Sarbajanin Jagadhatri Puja Samity</strong> does not guarantee the completeness, reliability, or timeliness of the content. We are not liable for any direct or indirect damages arising from the use of this website.</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">8. Privacy Policy</h2>
                        <p>Please refer to our <a href="#" title="Privacy Policy">Privacy Policy</a> for details on how we collect, use, and protect your personal information.</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">9. Intellectual Property</h2>
                        <p>All intellectual property rights on this website, including trademarks, logos, and service marks, are owned by <strong>Madhyanchal Sarbajanin Jagadhatri Puja Samity</strong>. Any unauthorized use will result in legal action.</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">10. Governing Law</h2>
                        <p>These Terms and Conditions are governed by the laws of <strong>India</strong>. Any disputes arising in relation to these terms shall be subject to the jurisdiction of the courts in <strong>Chandannagar, West Bengal</strong>.</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">11. Changes to Terms</h2>
                        <p><strong>Madhyanchal Sarbajanin Jagadhatri Puja Samity</strong> reserves the right to modify these Terms and Conditions at any time without prior notice. Please review this page periodically for updates.</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">12. Contact Us</h2>
                        <address>
                            <strong>Madhyanchal Sarbajanin Jagadhatri Puja Samity</strong><br />
                            Address: Madhyanchal, Station Road, Chandannagar, Hooghly – 712136<br />
                            E-mail: <a href="mailto:jagatdhatri.madhyanchal@gmail.com">jagatdhatri.madhyanchal@gmail.com</a><br />
                            Phone: +91-9831360465
                        </address>
                    </div>
                </div>
            </Section>
        </MainLayout>
    )
}