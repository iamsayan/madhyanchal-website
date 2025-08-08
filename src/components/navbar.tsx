'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import { usePathname, useSearchParams } from 'next/navigation';
import logo from '@/public/logo.png';
import { FaGlobe } from 'react-icons/fa';
import { sendGTMEvent } from '@next/third-parties/google';

interface MenuItem {
    name: string;
    path: string | object;
    target?: '_blank' | '_self';
    subMenu?: MenuItem[];
}

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        sendGTMEvent({ event: 'page_view', value: pathname + searchParams.toString() });

        const controller = new AbortController();
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 5);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { signal: controller.signal });

        return () => controller.abort();
    }, [pathname, searchParams]);

    const items: MenuItem[] = [
        { name: 'Home', path: '/' },
        { name: 'History', path: '/puja-history' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Advertise', path: '/advertise' },
        { name: 'Activities', path: '/activities' },
        { name: 'Awards', path: '/awards' },
        {
            name: 'Links',
            path: '#',
            subMenu: [
                { name: 'About Us', path: '/about-us' },
                { name: 'Contact Us', path: '/contact-us' },
            ],
        },
    ];

    return (
        <header className="bg-transparent relative z-10">
            <div
                className={`navbar-container fixed w-full top-0 left-0 z-50 transition-colors ${isScrolled ? 'animate-top-to-bottom bg-white border-b-[1px] border-gray-300' : 'bg-transparent border-b-[1px] border-[#ffffff14]'}`}
            >
                <div className="navbar container mx-auto px-0">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className={`btn btn-ghost ${!isScrolled && 'text-white'} lg:hidden`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                {items.map((item, index) => (
                                    <li key={index}>
                                        {item.subMenu ? (
                                            <details>
                                                <summary className="font-bold">{item.name}</summary>
                                                <ul className="p-2">
                                                    {item.subMenu.map((subItem, subIndex) => (
                                                        <li key={subIndex}>
                                                            <Link href={subItem.path} target={subItem.target ?? '_self'} className="font-bold">
                                                                {subItem.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </details>
                                        ) : (
                                            <Link href={item.path} className="font-bold">
                                                {item.name}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="hidden lg:block">
                            <Link href="/">
                                <Image
                                    src={logo}
                                    alt="Madhyanchal Sarbajanin Logo"
                                    className={isScrolled ? 'h-10 w-auto' : 'h-12 w-auto'}
                                    priority={true}
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="navbar-center">
                        <div className="lg:hidden">
                            <Link href="/">
                                <Image
                                    src={logo}
                                    alt="Madhyanchal Sarbajanin Logo"
                                    className={isScrolled ? 'h-10 w-auto' : 'h-12 w-auto'}
                                    priority={true}
                                />
                            </Link>
                        </div>
                        <ul className="menu menu-horizontal px-1 gap-2 uppercase font-bold hidden lg:flex">
                            {items.map((item, index) => {
                                const classes = classNames({
                                    'text-slate-300 focus:!text-white focus:!bg-transparent focus:!text-yellow-500 active:!bg-transparent': !isScrolled,
                                    'text-slate-600': isScrolled,
                                    '!text-yellow-500': pathname === item.path,
                                });
                                return (
                                    <li key={index}>
                                        {item.subMenu ? (
                                            <details>
                                                <summary className={classes}>{item.name}</summary>
                                                <ul className="p-2 w-52">
                                                    {item.subMenu.map((subItem, subIndex) => {
                                                        const innerClasses = classNames('text-slate-600', {
                                                            '!text-yellow-500': pathname === subItem.path,
                                                        });
                                                        return (
                                                            <li key={subIndex}>
                                                                <Link href={subItem.path} target={subItem.target ?? '_self'} className={innerClasses}>
                                                                    {subItem.name}
                                                                </Link>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </details>
                                        ) : (
                                            <Link href={item.path} target={item.target ?? '_self'} className={classes}>
                                                {item.name}
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <a className="btn bg-yellow-500 border-0 uppercase py-2 px-3 md:py-3 md:px-5 h-auto min-h-full rounded-md hover:bg-yellow-400 mr-3 md:mr-0" href="https://www.youtube.com/watch?v=RqcynxeuyZM" target="_blank">
                            <FaGlobe className="size-4 md:hidden" /> <span className="hidden md:inline">360° Virtual Tour</span>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;