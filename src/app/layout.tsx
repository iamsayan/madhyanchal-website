import type { Metadata } from 'next'
import React from "react";
import Script from "next/script"
import { outfit } from "@/fonts"
import Loader from "@/components/loader";
import './globals.sass'

const curYear = new Date().getFullYear();

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
    alternates: {
        canonical: '/',
    },
    title: {
        template: `%s - Madhyanchal Sarbajanin | ${curYear - 1971 + 1} Years of Tradition, Unity, and Celebration since 1971!`,
        default: `Madhyanchal Sarbajanin | ${curYear - 1971 + 1} Years of Tradition, Unity, and Celebration since 1971!`,
    },
    description: `Welcome to the official website of Madhyanchal Sarbajanin Jagadhatri Puja Samity! In ${curYear}, we proudly celebrate ${curYear - 1971 + 1} years of devotion, tradition, and togetherness.`,
    keywords: ['jagadhatri puja', 'jagadhatri', 'chandannagar', 'madhyanchal'],
    authors: [{ name: 'Sayan Datta', url: 'https://sayandatta.co.in' }],
    creator: 'Sayan Datta',
    publisher: 'Madhyanchal Sarbajanin Jagadhatri Puja Samity',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        siteName: 'Madhyanchal Sarbajanin Jagadhatri Puja Samity',
        locale: 'en_US',
        type: 'website',
        url: '/'
    },
    verification: {
        google: 'SYZt9rv7_qvB3hl-_KzC5lcd-yrB4C2hr4tb2q6RyBA',
    },
    other: {
        'facebook-domain-verification': '0zt2e0ie65lmgs9vgwe2j434t5cboq',
        'fb:app_id': process.env.NEXT_PUBLIC_FB_APP_ID!,
        'fb:admins': '100009403062755',
    },
}

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" data-theme="light">
            {process.env.NODE_ENV === 'production' &&
                <>
                    <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`} />
                    <Script id="google-analytics">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}', {"cookie_prefix":"JoGtag","cookie_domain":"${process.env.NEXT_PUBLIC_SITE_URL}","cookie_flags":"samesite=none;secure","allow_google_signals":true});
                        `}
                    </Script>
                </>
            }
            <body className={`${outfit.className} overflow-x-hidden text-sm md:text-base ${outfit.variable}`}>
                {children}
                <Loader />
                {process.env.NODE_ENV === 'production' &&
                    <>
                        <Script id="statcounter">
                            {`
                                var sc_project=11173869; 
                                var sc_invisible=1; 
                                var sc_security="87f092e7"; 
                            `}
                        </Script>
                        <Script src="https://www.statcounter.com/counter/counter.js" async={true} />
                    </>
                }
            </body>
        </html>
    )
}