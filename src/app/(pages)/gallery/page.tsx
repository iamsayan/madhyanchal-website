import React from "react";
import MainLayout from "@/components/main-layout";
import Section from "@/components/section";
import schema from "@/utils/schema";
import { getImagesData } from "@/utils/fetch";
import GalleryFilter from "@/components/gallery-filter";

export const metadata = {
    title: 'Photo Gallery',
    description: 'View the collection of photos of Madhyanchal Sarbajanin Jagadhatri Puja Samity.',
    openGraph: {
        url: '/gallery',
    },
    alternates: {
        canonical: '/gallery',
    },
}

export default async function Page() {
    const imagesData = await getImagesData()
    let images = imagesData ?? []

    const jsonLd = schema({
        slug: 'gallery',
        title: 'Photo Gallery',
    })

    return (
        <MainLayout title="Photo Gallery" jsonLd={jsonLd}>
            <Section title="Explore Our" description="Photo Gallery">
                <GalleryFilter images={images} />
            </Section>
        </MainLayout>
    )
}