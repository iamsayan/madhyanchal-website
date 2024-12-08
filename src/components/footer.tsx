import Link from 'next/link';
import { FaYoutube, FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import ScrollTop from "@/components/scroll-top";

interface NavItem {
    name: string;
    path: string;
    target?: '_blank' | '_self';
}

export default function Footer() {
    const items: NavItem[] = [
        {
            name: 'About Us',
            path: '/about-us'
        },
        {
            name: 'Contact',
            path: '/contact-us'
        },
        {
            name: 'Terms & Conditions',
            path: '/terms'
        },
        {
            name: 'Privacy Policy',
            path: '/privacy-policy'
        },
    ];

    return (
        <footer className="p-10 bg-neutral text-neutral-content">
            <div className="footer footer-center container mx-auto">
                <nav className="grid grid-flow-row md:grid-flow-col gap-2 md:gap-4">
                    {items.map((item, index) => (
                        <div key={index} className="text-xs md:text-sm">
                            <Link href={item.path} target={item.target ?? '_self'}
                                className="link link-hover">{item.name}</Link>
                        </div>
                    ))}
                </nav>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <a href="https://www.facebook.com/madhyanchalsarbajanin/" target="_blank" rel="noopener">
                            <FaFacebookF className="size-4 sm:size-5 md:size-6" />
                        </a>
                        <a href="https://www.youtube.com/@madhyanchalsarbajanin?sub_confirmation=1" target="_blank"
                            rel="noopener">
                            <FaYoutube className="size-4 sm:size-5 md:size-6" />
                        </a>
                        <a href="https://www.instagram.com/madhyanchal_sarbajanin" target="_blank" rel="noopener">
                            <FaInstagram className="size-4 sm:size-5 md:size-6" />
                        </a>
                        <a href="https://whatsapp.com/channel/0029Va9oDu0C6ZvcosFumh0Y" target="_blank" rel="noopener">
                            <FaWhatsapp className="size-4 sm:size-5 md:size-6" />
                        </a>
                    </div>
                </nav>
                <aside className="text-slate-400 text-xs">
                    <p>Copyright © {new Date().getFullYear()} Madhyanchal Sarbajanin Jagadhatri Puja Samity. All Rights Reserved.</p>
                    <p>Handcrafted with ❤️ by <a href="https://sayandatta.co.in" target="_blank" rel="noopener">Sayan Datta</a>.</p>
                    <p>Unauthorized copying or representation of any content / photograph / illustration / artwork
                        from this website is strictly prohibited.</p>
                </aside>
            </div>
            <ScrollTop />
        </footer>
    )
}