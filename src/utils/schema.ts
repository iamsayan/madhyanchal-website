interface SchemaOptions {
    slug: string;
    title: string;
    description?: string;
    start?: Date;
    end?: Date;
}

interface SchemaItem {
    "@type": string;
    "@id": string;
    [key: string]: any;
}

export default function schema({ slug, title, description, start, end }: SchemaOptions) {
    const curYear = new Date().getFullYear();
    const siteSchema: { "@context": string; "@graph": SchemaItem[] } = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${process.env.SITE_URL}/#organization`,
                "name": "Jagadhatri Online",
                "sameAs": [
                    "https://www.facebook.com/madhyanchalsarbajanin/",
                ]
            },
            {
                "@type": "WebSite",
                "@id": `${process.env.SITE_URL}/#website`,
                "url": `${process.env.SITE_URL}`,
                "name": "Jagadhatri Online",
                "publisher": {
                    "@id": `${process.env.SITE_URL}/#organization`
                },
                "inLanguage": "en-US"
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${process.env.SITE_URL}/${slug}#breadcrumb`,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": "1",
                        "item": {
                            "@id": `${process.env.SITE_URL}`,
                            "name": "Home"
                        }
                    },
                    {
                        "@type": "ListItem",
                        "position": "2",
                        "item": {
                            "@id": `${process.env.SITE_URL}/${slug}`,
                            "name": title
                        }
                    }
                ]
            },
            {
                "@type": "WebPage",
                "@id": `${process.env.SITE_URL}/${slug}#webpage`,
                "url": `${process.env.SITE_URL}/${slug}`,
                "name": `${title} - Madhyanchal Sarbajanin | ${curYear - 1971 + 1} Years of Tradition, Unity, and Celebration since 1971!`,
                "isPartOf": {
                    "@id": `${process.env.SITE_URL}/#website`
                },
                "inLanguage": "en-US",
                "breadcrumb": {
                    "@id": `${process.env.SITE_URL}/${slug}#breadcrumb`
                }
            }
        ]
    };

    if (typeof description !== 'undefined') {
        siteSchema["@graph"].push({
            "name": `${title} - Madhyanchal Sarbajanin | ${curYear - 1971 + 1} Years of Tradition, Unity, and Celebration since 1971!`,
            "description": description,
            "@type": "Event",
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
            "location": [
                {
                    "@type": "VirtualLocation",
                    "url": "https://www.facebook.com/madhyanchalsarbajanin/"
                },
                {
                    "@type": "Place",
                    "name": "Chandannagar",
                    "url": "https://en.wikipedia.org/wiki/Chandannagar",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Madhyanchal, Station Road",
                        "addressLocality": "Chandannagar",
                        "addressRegion": "West Bengal",
                        "postalCode": "712136",
                        "addressCountry": "India"
                    }
                }
            ],
            "performer": {
                "@type": "Organization",
                "name": "Madhyanchal Sarbajanin Jagadhatri Puja Samity",
                "sameAs": `${process.env.SITE_URL}`
            },
            "organizer": {
                "@type": "Organization",
                "name": "Madhyanchal Sarbajanin Jagadhatri Puja Samity",
                "url": `${process.env.SITE_URL}`
            },
            "startDate": start,
            "endDate": end,
            "@id": `${process.env.SITE_URL}/${slug}#schema-${Math.floor(Math.random() * 1000000)}`, // ensure unique ID
            "isPartOf": {
                "@id": `${process.env.SITE_URL}/${slug}#webpage`
            },
            "publisher": {
                "@id": `${process.env.SITE_URL}/#organization`
            },
            "inLanguage": "en-US",
            "mainEntityOfPage": {
                "@id": `${process.env.SITE_URL}/${slug}#webpage`
            }
        });
    }

    return siteSchema;
}