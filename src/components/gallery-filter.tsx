'use client';

import React from 'react';
import { useState } from 'react';
import { cn } from '@/utils/functions';
import Image from "next/image";
import Gallery from "@/components/gallery";

interface GalleryFilterProps {
    className?: string;
    images: any;
}

export default function GalleryFilter({ className, images }: GalleryFilterProps) {
    const classes = cn('gallery-filter mt-4', className);
    const [selectedYear, setSelectedYear] = useState('all');

    const imgStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        pointerEvents: 'none'
    };

    let years = Object.keys(images).filter(year => images[year]?.length > 0).toReversed();
    years = ['all', ...years];

    const getFilteredImages = () => {
        if (selectedYear === 'all') {
            return Object.values(images).flat();
        }
        return images[selectedYear] || [];
    };

    return (
        <div className={classes}>
            <div className="flex gap-2 mb-4 justify-center">
                {years.map((year) => (
                    <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`text-sm px-4 py-2 rounded-lg ${selectedYear === year
                            ? 'bg-yellow-500 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                    >
                        {year.toUpperCase()}
                    </button>
                ))}
            </div>

            <Gallery elementClassNames="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2 mt-2" speed={500} slideShowAutoplay={true} fullScreen={true} getCaptionFromTitleOrAlt={false}>
                {getFilteredImages().toReversed().map((item: any, index: number) => (
                    <a data-disable-nprogress={true} key={index} className="h-52 md:h-72 relative" href={item}>
                        <Image
                            src={item}
                            width={500}
                            height={300}
                            style={imgStyle}
                            priority={false}
                            loading="lazy"
                            alt={index + 1 + ' image'}
                        />
                    </a>
                ))}
            </Gallery>
        </div>
    );
}
