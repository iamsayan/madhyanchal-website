'use client';

import React from "react";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { usePathname } from 'next/navigation';

const Loader: React.FC = () => {
    const pathname = usePathname();
    if (pathname.includes('/payment')) {
        return null;
    }
    return (
        <ProgressBar
            height="2px"
            color="#eab308"
            options={{ showSpinner: false }}
            shallowRouting
        />
    );
};

export default Loader;