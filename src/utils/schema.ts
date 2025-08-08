interface Parent {
    title: string;
    slug: string;
}

interface SchemaOptions {
    path: string;
    title: string;
    parents?: Parent[];
    dates?: {
        published?: string;
        modified?: string; 
    }
    type?: {
        collection?: boolean;
    }
}

interface SchemaItem {
    "@type": string;
    "@id": string;
    [key: string]: any;
}

interface BreadcrumbItem {
    "@type": "ListItem";
    position: string;
    item: {
        "@id": string;
        name: string;
    };
}

function generateBreadcrumbs(path: string, title: string, parents?: Parent[]): Array<BreadcrumbItem> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
    
    const homeBreadcrumb = {
        "@type": "ListItem" as const,
        position: "1",
        item: {
            "@id": baseUrl,
            "@type": "Thing",
            name: "Home"
        }
    };

    const parentsBreadcrumbs = parents?.map((parent, index) => {
        return {
            "@type": "ListItem" as const,
            position: String(index + 2),
            item: {
                "@id": `${baseUrl}/${parents.slice(0, index + 1).map(p => p.slug).join('/')}`,
                "@type": "Thing",
                name: parent.title
            }
        };
    }) || [];

    const currentBreadcrumb = {
        "@type": "ListItem" as const,
        position: String(parentsBreadcrumbs.length + 2),
        item: {
            "@id": `${baseUrl}/${path}`,
            "@type": "Thing",
            name: title
        }
    };

    return [homeBreadcrumb, ...parentsBreadcrumbs, currentBreadcrumb];
}

export default function schema({ path, title, parents, type, dates }: SchemaOptions) {
    const curYear = new Date().getFullYear();
    const siteSchema: { "@context": string; "@graph": SchemaItem[] } = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL}#organization`,
                "name": "Madhyanchal Sarbajanin Jagadhatri Puja Samity",
                "url": process.env.NEXT_PUBLIC_SITE_URL,
                "email": "madhyanchalsarbajanin@gmail.com",
                "sameAs": [
                    "https://www.facebook.com/madhyanchalsarbajanin/",
                    "https://www.instagram.com/madhyanchal_sarbajanin",
                    "https://www.youtube.com/@madhyanchalsarbajanin?sub_confirmation=1"
                ]
            },
            {
                "@type": "WebSite",
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL}#website`,
                "url": process.env.NEXT_PUBLIC_SITE_URL,
                "name": "Madhyanchal Sarbajanin Jagadhatri Puja Samity",
                "publisher": {
                    "@id": `${process.env.NEXT_PUBLIC_SITE_URL}#organization`
                },
                "inLanguage": "en-IN"
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/${path}#breadcrumb`,
                "name": `Navigate to ${title}`,
                "itemListElement": generateBreadcrumbs(path, title, parents)
            },
            {
                "@type": "WebPage",
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/${path}#webpage`,
                "url": `${process.env.NEXT_PUBLIC_SITE_URL}/${path}`,
                "name": `${title} - Madhyanchal Sarbajanin | ${curYear - 1971 + 1} Years of Tradition, Unity, and Celebration since 1971!`,
                "datePublished": dates?.published ?? "2018-02-03T00:00:00+05:30",
                "dateModified": dates?.modified ?? "2028-05-08T22:26:00+05:30",
                "isPartOf": {
                    "@id": `${process.env.NEXT_PUBLIC_SITE_URL}#website`
                },
                "inLanguage": "en-IN",
                "breadcrumb": {
                    "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/${path}#breadcrumb`
                }
            }
        ]
    };


    if (type?.collection) {
        siteSchema['@graph'].push({
            "@type": "CollectionPage",
            "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/${path}#webpage`,
            "url": `${process.env.NEXT_PUBLIC_SITE_URL}/${path}`,
            "name": title,
            "isPartOf": {
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL}#website`
            },
            "inLanguage": "en-IN",
            "breadcrumb": {
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/${path}#breadcrumb`
            }
        })
    }

    return siteSchema;
}