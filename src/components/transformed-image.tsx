'use client';

import Image, { ImageLoaderProps, ImageProps } from 'next/image';

type TransformParams = {
    src: string;
    blur?: number;
    grayscale?: boolean;
    fit?: 'cover' | 'contain';
    format?: 'jpeg' | 'png' | 'webp' | 'gif' | 'auto';
    lazy?: boolean;
};

type TransformedImageProps = Omit<ImageProps, 'loader' | 'src' | 'unoptimized'> & TransformParams;

export default function TransformedImage({
    blur,
    grayscale,
    fit,
    format,
    ...rest
}: TransformedImageProps) {
    const loader = ({ src, width, quality }: ImageLoaderProps) => {
        const url = new URL(process.env.NEXT_PUBLIC_IMAGE_TRANSFORM_SERVICE_URL!);

        url.searchParams.set('src', src);
        if (width) url.searchParams.set('width', String(width));
        if (blur) url.searchParams.set('blur', String(blur));
        if (grayscale) url.searchParams.set('grayscale', '1');
        if (fit) url.searchParams.set('fit', fit);
        if (quality) url.searchParams.set('quality', String(quality));
        if (format) url.searchParams.set('format', format);

        return url.toString();
    };

    return (
        <Image
            {...rest}
            loader={loader}
        />
    );
}