'use client'

import React, { useState, useEffect, ReactNode } from 'react';
import TransformedImage from '@/components/transformed-image';

const images = Array.from({ length: 4 }, (_, i) => ({
    src: `static/${i+1}.jpg`,
    alt: `Slider Image ${i + 1}`,
}));

interface ImageSliderProps {
    children?: ReactNode;
}

const HeroSlider: React.FC<ImageSliderProps> = ({ children }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="hero relative w-full overflow-hidden min-h-full lg:min-h-screen">
            <div className="slider-container">
                {images.map((item, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out bg-cover bg-center ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <TransformedImage
                            src={item.src}
                            alt={item.alt}
                            height={800}
                            width={1000}
                            priority={index === 0}
                            quality={95}
                            className="object-cover h-full w-full"
                        />
                        <div className="absolute inset-0 bg-black/60"></div>
                    </div>
                ))}
            </div>
            {children}
        </div>
    );
};

export default HeroSlider;
