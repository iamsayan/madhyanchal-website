'use client';

import { useState, useCallback, useRef } from 'react';
import { cn } from '@/utils/functions';
import Gallery from "@/components/gallery";
import TransformedImage from "@/components/transformed-image";

interface GalleryFilterProps {
    className?: string;
    images: any;
}

export default function GalleryFilter({ className, images }: GalleryFilterProps) {
    const lightGallery = useRef<any>(null);

    const classes = cn('gallery-filter mt-4', className);
    const [selectedYear, setSelectedYear] = useState('all');

    let years = Object.keys(images).filter(year => images[year]?.length > 0).toReversed();
    years = ['all', ...years];

    const getFilteredImages = selectedYear === 'all' ? Object.values(images).flat() : images[selectedYear] || [];

    const onInit = useCallback((detail: any) => {
        if (detail) {
            lightGallery.current = detail.instance;
        }
    }, []);

    const dynamicEl = getFilteredImages.map((item: any, index: number) => {
        return {
            src: `https://assets.madhyanchalsarbajanin.co.in/images/${item}`,
            thumb: `https://assets.madhyanchalsarbajanin.co.in/images/${item}`,
            alt: `${index + 1} image`,
        }
    });

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

            <Gallery elementClassNames="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2 mt-2" speed={500} thumbnail={true} slideShowAutoplay={true} onInit={onInit} fullScreen={true} dynamicEl={dynamicEl} dynamic={true}>
                {getFilteredImages.map((item: any, index: number) => (
                    <div key={index} className="relative aspect-[4/5] overflow-hidden rounded-2xl group cursor-pointer" onClick={() => lightGallery.current.openGallery(index)}>
                        <TransformedImage
                            src={item}
                            width={500}
                            height={800}
                            className="object-cover w-full h-full pointer-events-none text-transparent transform transition-all duration-700 group-hover:scale-110"
                            loading="lazy"
                            priority={false}
                            alt={`${index + 1} image`}
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAt8B9zvLyE8AAAAASUVORK5CYII="
                        />
                    </div>
                ))}
            </Gallery>
        </div>
    );
}
