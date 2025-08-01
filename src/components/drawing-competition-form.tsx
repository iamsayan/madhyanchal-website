'use client';

import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import Image from 'next/image';
import logo from '@/public/logo.png';
import { anekBangla } from '@/fonts';

interface DrawingCompetitionFormData {
    participantName: string;
    gender: string;
    dateOfBirth: string;
    age: string;
    category: string;
    guardianName: string;
    email: string;
    phone: string;
    address: string;
    agreeToTerms: boolean;
    agreeToRules: boolean;
}

interface FormErrors {
    participantName?: string;
    gender?: string;
    dateOfBirth?: string;
    age?: string;
    category?: string;
    guardianName?: string;
    email?: string;
    phone?: string;
    address?: string;
    agreeToTerms?: string;
    agreeToRules?: string;
}

const competitionDate = new Date('2025-09-21');

const translations = {
    en: {
        title: "Drawing Competition",
        organizedBy: "Organized by",
        date: "Date",
        time: "Time",
        eventDate: competitionDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
        eventTime: "9.00 am",
        venue: "Venue",
        place: "Madhyanchal Puja Premises",
        viewOnMaps: "View on Google Maps",
        participantInfo: "Participant Information",
        fullName: "Participant's Name",
        gender: "Gender",
        selectGender: "Select Gender",
        male: "Male",
        female: "Female",
        other: "Other",
        dateOfBirth: "Date of Birth",
        age: "Age",
        autoCalculated: "Auto-calculated",
        category: "Category",
        autoDetermined: "Auto-determined",
        guardianName: "Guardian Name",
        enterGuardianName: "Enter guardian name",
        email: "Email",
        enterEmail: "Enter your email",
        phone: "Phone Number",
        enterPhone: "Enter your phone number",
        address: "Address",
        enterAddress: "Enter your complete address with pincode",
        termsConditions: "Terms & Conditions",
        agreeToTerms: "I agree to the Terms and Conditions",
        agreeToRules: "I agree to follow all competition rules and guidelines",
        submitRegistration: "Submit Registration",
        submitting: "Submitting...",
        rules: "Rules & Guidelines:",
        rulesList: [
            "No entry fee required.",
            "Participants must arrive 1 hour before the competition starts.",
            "Drawing paper will be provided by the organizers only.",
            "The decision of the judges will be final.",
            "Age proof certificate photocopy must be brought on the competition day.",
            "Any type of color can be used for drawing, but sketch pen or scale cannot be used.",
            "Our seating capacity is limited, so it will be accepted on a priority basis.",
            "No applications will be accepted after the seating capacity is full before the specified date."
        ]
    },
    bn: {
        title: "অঙ্কন প্রতিযোগিতা",
        organizedBy: "আয়োজক",
        date: "তারিখ",
        eventDate: competitionDate.toLocaleDateString('bn-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        eventTime: "সকাল ৯টা",
        time: "সময়",
        venue: "স্থান",
        place: "মধ্যাঞ্চল পূজা প্রাঙ্গণ",
        viewOnMaps: "গুগল ম্যাপে দেখুন",
        participantInfo: "প্রতিযোগীর তথ্য",
        fullName: "প্রতিযোগীর নাম",
        gender: "লিঙ্গ",
        selectGender: "লিঙ্গ নির্বাচন করুন",
        male: "পুরুষ",
        female: "মহিলা",
        other: "অন্যান্য",
        dateOfBirth: "জন্ম তারিখ",
        age: "বয়স",
        autoCalculated: "স্বয়ংক্রিয় গণনা",
        category: "বিভাগ",
        autoDetermined: "স্বয়ংক্রিয় নির্ধারণ",
        guardianName: "অভিভাবকের নাম",
        enterGuardianName: "অভিভাবকের নাম লিখুন",
        email: "ইমেইল",
        enterEmail: "আপনার ইমেইল লিখুন",
        phone: "ফোন নম্বর",
        enterPhone: "আপনার ফোন নম্বর লিখুন",
        address: "ঠিকানা",
        enterAddress: "পূর্ণ ঠিকানা পিনকোড সহ লিখুন",
        termsConditions: "শর্তাবলী",
        agreeToTerms: "আমি শর্তাবলীতে সম্মত",
        agreeToRules: "আমি সকল প্রতিযোগিতার নিয়মাবলী মেনে চলতে সম্মত",
        submitRegistration: "নিবন্ধন জমা দিন",
        submitting: "জমা হচ্ছে...",
        rules: "নিয়মাবলী:",
        rulesList: [
            "কোনো প্রবেশ মূল্য নেই।",
            "প্রতিযোগিতা শুরু হওয়ার ১ ঘণ্টা পূর্বে উপস্থিত হতে হবে।",
            "অঙ্কন প্রতিযোগীদের, আয়োজক দের পক্ষ থেকে শুধুমাত্র আঁকার কাগজ দেওয়া হবে।",
            "বিচারকমণ্ডলীর সিদ্ধান্ত চূড়ান্ত বলে গণ্য হবে।",
            "প্রতিযোগিতার দিন, প্রতিযোগীদের বয়সের প্রমানপত্রের ফটোকপি আনতে হবে।",
            "অঙ্কন এর জন্য যে কোনো ধরনের রং ব্যবহার করা যাবে, কিন্তু স্কেচ পেন বা স্কেল ব্যবহার করা যাবে না।",
            "আমাদের আসন সংখ্যা সীমিত, তাই অগ্রাধিকারের ভিত্তিতেই তা গৃহীত হবে।",
            "নির্দিষ্ট তারিখের আগে আসন সংখ্যা পরিপূর্ণ হয়ে গেলে আর কোনো আবেদন গ্রহণ করা হবে না।"
        ]
    }
};

export default function DrawingCompetitionForm() {
    const [language, setLanguage] = useState<'en' | 'bn'>('en');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<DrawingCompetitionFormData>({
        participantName: '',
        gender: '',
        dateOfBirth: '',
        age: '',
        category: '',
        guardianName: '',
        email: '',
        phone: '',
        address: '',
        agreeToTerms: false,
        agreeToRules: false
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const t = translations[language];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }

        // Auto-calculate age when date of birth changes
        if (name === 'dateOfBirth' && value) {
            const birthDate = new Date(value);
            const diffMs = competitionDate.getTime() - birthDate.getTime();

            // Calculate years and months
            let years = competitionDate.getFullYear() - birthDate.getFullYear();
            let months = competitionDate.getMonth() - birthDate.getMonth();
            let days = competitionDate.getDate() - birthDate.getDate();

            if (days < 0) {
                months -= 1;
                // Get days in previous month
                const prevMonth = new Date(competitionDate.getFullYear(), competitionDate.getMonth(), 0);
                days += prevMonth.getDate();
            }
            if (months < 0) {
                years -= 1;
                months += 12;
            }

            // Compose age string
            let ageString = '';
            if (years > 0) {
                ageString += years + (language === 'en' ? ' yr' : ' বছর');
            }
            if (months > 0 || years === 0) {
                if (ageString) ageString += ' ';
                ageString += months + (language === 'en' ? ' mo' : ' মাস');
            }

            // For category, use only years
            let category = '';
            if (years <= 8) category = language === 'en' ? 'A' : 'ক';
            else if (years >= 9 && years <= 12) category = language === 'en' ? 'B' : 'খ';
            else if (years >= 13 && years <= 17) category = language === 'en' ? 'C' : 'গ';

            setFormData(prev => ({
                ...prev,
                age: ageString,
                category: category
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.participantName.trim()) {
            newErrors.participantName = language === 'en' ? 'Full name is required' : 'প্রতিযোগীর নাম প্রয়োজন';
        }

        if (!formData.gender) {
            newErrors.gender = language === 'en' ? 'Please select gender' : 'লিঙ্গ নির্বাচন করুন';
        }

        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth = language === 'en' ? 'Date of birth is required' : 'জন্ম তারিখ প্রয়োজন';
        }

        if (!formData.guardianName.trim()) {
            newErrors.guardianName = language === 'en' ? 'Guardian name is required' : 'অভিভাবকের নাম প্রয়োজন';
        }

        if (!formData.email.trim()) {
            newErrors.email = language === 'en' ? 'Email is required' : 'ইমেইল প্রয়োজন';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = language === 'en' ? 'Please enter a valid email' : 'সঠিক ইমেইল লিখুন';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = language === 'en' ? 'Phone number is required' : 'ফোন নম্বর প্রয়োজন';
        }

        if (!formData.address.trim()) {
            newErrors.address = language === 'en' ? 'Address is required' : 'ঠিকানা প্রয়োজন';
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = language === 'en' ? 'You must agree to terms and conditions' : 'শর্তাবলীতে সম্মত হতে হবে';
        }

        if (!formData.agreeToRules) {
            newErrors.agreeToRules = language === 'en' ? 'You must agree to competition rules' : 'নিয়মাবলী মেনে চলতে সম্মত হতে হবে';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Handle successful submission
            alert(language === 'en' ? 'Registration submitted successfully!' : 'নিবন্ধন সফলভাবে জমা হয়েছে!');
            
            // Reset form
            setFormData({
                participantName: '',
                gender: '',
                dateOfBirth: '',
                age: '',
                category: '',
                guardianName: '',
                email: '',
                phone: '',
                address: '',
                agreeToTerms: false,
                agreeToRules: false
            });
        } catch (error) {
            alert(language === 'en' ? 'Error submitting registration. Please try again.' : 'নিবন্ধন জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`${language === 'bn' && anekBangla.className} max-w-4xl mx-auto p-4 sm:p-6 md:p-8`}>
            <div className="bg-white rounded-lg shadow-lg">
                <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-lg"></div>
                <div className="p-4 sm:p-6 md:p-8">
                    <div className="flex justify-center mb-3">
                        <Image
                            src={logo}
                            alt="Organization Logo"
                            className="w-[130px] sm:w-[160px] md:w-[200px]"
                            priority={true}
                        />
                    </div>
                    <div className="text-center mb-8">
                        <h1 className="sm:py-1 text-xl sm:text-2xl md:text-4xl md:leading-16 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 mb-4 drop-shadow-sm animate-fade-in">
                            <span className="inline-block align-middle mr-3">
                                <svg className="size-6 md:size-10 text-pink-400 inline-block animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-7-7 7-7-9 2-2 9z" />
                                </svg>
                            </span>
                            {t.title}
                            <span className="inline-block align-middle ml-3">
                                <svg className="size-6 md:size-10 text-blue-400 inline-block animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5l-9 2 7 7-7 7 9-2 2-9z" />
                                </svg>
                            </span>
                        </h1>
                        <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 text-gray-600 mt-2 mb-1 text-xs sm:text-sm">
                            {[
                                [
                                    { label: t.date, value: t.eventDate },
                                    { label: t.time, value: t.eventTime },
                                    { label: t.venue, value: t.place }
                                ]
                            ].map((row, rowIdx) => (
                                <div key={rowIdx} className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-2">
                                    {row.map((item, idx) => (
                                        <React.Fragment key={item.label}>
                                            <span>
                                                <span className="font-semibold text-blue-800">{item.label}:</span>
                                                &nbsp;<span className="font-medium">{item.value}</span>
                                            </span>
                                            {idx < row.length - 1 && (
                                                <span
                                                    className="hidden md:inline text-gray-400"
                                                    aria-hidden="true"
                                                    role="presentation"
                                                >
                                                    <span className="mx-1 select-none">|</span>
                                                </span>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="mt-2">
                            <a
                                href="https://maps.app.goo.gl/RBeufNNJXigCxvMeA"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-blue-600 hover:underline text-xs sm:text-sm"
                            >
                                <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                {t.viewOnMaps}
                            </a>
                        </div>

                        {/* Language Switcher */}
                        <div className="flex justify-center mb-3 mt-2">
                            <div className="flex bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setLanguage('en')}
                                    className={`px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                                        language === 'en' 
                                            ? 'bg-white text-blue-600 shadow-sm' 
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    English
                                </button>
                                <button
                                    onClick={() => setLanguage('bn')}
                                    className={`px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                                        language === 'bn' 
                                            ? 'bg-white text-blue-600 shadow-sm' 
                                            : `${anekBangla.className} text-gray-600 hover:text-gray-900`
                                    }`}
                                >
                                    বাংলা
                                </button>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm">
                        {/* Participant Information */}
                        <div className="bg-gray-50 p-4 sm:p-6 md:p-8 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        {t.fullName} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="participantName"
                                        value={formData.participantName}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.participantName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder={language === 'en' ? "Enter your full name" : "প্রতিযোগীর নাম লিখুন"}
                                    />
                                    {errors.participantName && (
                                        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.participantName}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        {t.dateOfBirth} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        max={(() => {
                                            const maxDate = new Date(competitionDate);
                                            maxDate.setFullYear(maxDate.getFullYear() - 1);
                                            return maxDate.toISOString().split('T')[0];
                                        })()}
                                        min={(() => {
                                            const minDate = new Date(competitionDate);
                                            minDate.setDate(minDate.getDate() + 1);
                                            minDate.setFullYear(minDate.getFullYear() - 17);
                                            return minDate.toISOString().split('T')[0];
                                        })()}
                                        tabIndex={-1}
                                        onFocus={e => e.target.blur()}
                                        placeholder={language === 'en' ? "Enter your date of birth" : "প্রতিযোগীর জন্ম তারিখ লিখুন"}
                                    />
                                    {errors.dateOfBirth && (
                                        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.dateOfBirth}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        {language === 'en'
                                            ? `${t.age} (As on ${t.eventDate})`
                                            : `${t.age} (${t.eventDate} তারিখ অনুযায়ী)`} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="age"
                                        value={formData.age}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                                        placeholder={t.autoCalculated}
                                        tabIndex={-1}
                                    />
                                    {errors.age && (
                                        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.age}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        {t.category} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                                        placeholder={t.autoDetermined}
                                        tabIndex={-1}
                                    />
                                    {errors.category && (
                                        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.category}</p>
                                    )}
                                </div>

                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        {t.guardianName} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="guardianName"
                                        value={formData.guardianName}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.guardianName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder={t.enterGuardianName}
                                    />
                                    {errors.guardianName && (
                                        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.guardianName}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        {t.email} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder={t.enterEmail}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        {t.phone} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.phone ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder={t.enterPhone}
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone}</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                    {t.address} <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        errors.address ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder={t.enterAddress}
                                />
                                {errors.address && (
                                    <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.address}</p>
                                )}
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="bg-gray-50 p-4 sm:p-6 md:p-8 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{t.rules}</h3>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 text-xs sm:text-sm">
                                {t.rulesList.map((rule, index) => (
                                    <li key={index}>{rule}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center mx-auto"
                            >
                                {isSubmitting ? (
                                    <>
                                        <FaSpinner className="animate-spin mr-2" />
                                        {t.submitting}
                                    </>
                                ) : (
                                    t.submitRegistration
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 