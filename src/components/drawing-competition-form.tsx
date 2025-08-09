'use client';

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaEnvelope, FaSpinner, FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';
import logo from '@/public/logo.png';
import { anekBangla } from '@/fonts';
import { submitModel } from '@/app/actions/model';
import { sendMail } from '@/app/actions/email';

interface DrawingCompetitionFormData {
    participantName: string;
    dateOfBirth: string;
    age: string;
    category: string;
    guardianName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    pinCode: string;
}

const competitionDate = new Date('2025-09-21 10:00:00');

const translations = {
    en: {
        title: "Drawing Competition",
        organizedBy: "Organized by",
        date: "Date",
        time: "Time",
        eventDate: competitionDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
        eventTime: competitionDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        venue: "Venue",
        place: "Madhyanchal Puja Premises",
        viewOnMaps: "Locate on Google Maps",
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
        city: "City",
        pinCode: "Pin Code",
        enterCity: "Enter your city",
        enterPinCode: "Enter your pin code",
        enterAddress: "Enter your complete address",
        termsConditions: "Terms & Conditions",
        submitRegistration: "Register",
        submitting: "Submitting...",
        rules: "Rules & Guidelines:",
        rulesList: [
            "No entry fee required.",
            //"Participants must arrive 1 hour before the competition starts.",
            "Drawing paper will be provided by the organizers only.",
            "Participants must bring their own colors and other required materials.",
            "The decision of the judges will be final.",
            "Age proof certificate photocopy must be brought on the competition day.",
            "Any type of color can be used for drawing, but sketch pen or scale cannot be used.",
            "Wrong information will lead to disqualification.",
            "An email with the registration ID will be sent, to be shown on registration day.",
            "Our seating capacity is limited, so it will be accepted on a priority basis.",
            "No applications will be accepted after the seating capacity is full before the specified date."
        ],
        errorMessages: {
            participantName: "Full name is required",
            gender: "Please select gender",
            dateOfBirth: "Date of birth is required",
            guardianName: "Guardian name is required",
            email: "Email is required",
            phone: "Phone number is required",
            address: "Address is required",
            city: "City is required",
            pinCode: "Pin code is required",
        }
    },
    bn: {
        title: "অঙ্কন প্রতিযোগিতা",
        organizedBy: "আয়োজক",
        date: "তারিখ",
        eventDate: competitionDate.toLocaleDateString('bn-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        eventTime: competitionDate.toLocaleTimeString('bn-IN', { hour: '2-digit', minute: '2-digit', hour12: true }),
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
        enterAddress: "পূর্ণ ঠিকানা লিখুন",
        city: "শহর",
        pinCode: "পিনকোড",
        enterCity: "আপনার শহর লিখুন",
        enterPinCode: "আপনার পিনকোড লিখুন",
        termsConditions: "শর্তাবলী",
        submitRegistration: "রেজিস্টার",
        submitting: "জমা হচ্ছে...",
        rules: "নিয়মাবলী:",
        rulesList: [
            "কোনো প্রবেশ মূল্য নেই।",
            //"প্রতিযোগিতা শুরু হওয়ার ১ ঘণ্টা পূর্বে উপস্থিত হতে হবে।",
            "অঙ্কন প্রতিযোগীদের, আয়োজকদের পক্ষ থেকে শুধুমাত্র আঁকার কাগজ দেওয়া হবে।",
            "রং ও অন্যান্য প্রয়োজনীয় সামগ্রী প্রতিযোগীদের নিজস্বভাবে আনতে হবে।",
            "বিচারকমণ্ডলীর সিদ্ধান্ত চূড়ান্ত বলে গণ্য হবে।",
            "প্রতিযোগিতার দিন, প্রতিযোগীদের বয়সের প্রমানপত্রের ফটোকপি আনতে হবে।",
            "ভুল তথ্য দিলে প্রতিযোগিতা থেকে বাদ দেওয়া হবে।",
            "অঙ্কন এর জন্য যে কোনো ধরনের রং ব্যবহার করা যাবে, কিন্তু স্কেচ পেন বা স্কেল ব্যবহার করা যাবে না।",
            "রেজিস্ট্রেশন আইডি সহ একটি ইমেল পাঠানো হবে, যা রেজিস্ট্রেশনের দিনে দেখাতে হবে।",
            "আমাদের আসন সংখ্যা সীমিত, তাই অগ্রাধিকারের ভিত্তিতেই তা গৃহীত হবে।",
            "নির্দিষ্ট তারিখের আগে আসন সংখ্যা পরিপূর্ণ হয়ে গেলে আর কোনো আবেদন গ্রহণ করা হবে না।"
        ],
        errorMessages: {
            participantName: "প্রতিযোগীর নাম প্রয়োজন",
            gender: "লিঙ্গ নির্বাচন করুন",
            dateOfBirth: "জন্ম তারিখ প্রয়োজন",
            guardianName: "অভিভাবকের নাম প্রয়োজন",
            email: "ইমেইল প্রয়োজন",
            phone: "ফোন নম্বর প্রয়োজন",
            address: "ঠিকানা প্রয়োজন",
            city: "শহর প্রয়োজন",
            pinCode: "পিনকোড প্রয়োজন",
        }
    }
};

export default function DrawingCompetitionForm() {
    const [language, setLanguage] = useState<'en' | 'bn'>('en');
    const [success, setSuccess] = useState<{ registrationId: string } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const t = translations[language];

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
        reset
    } = useForm<DrawingCompetitionFormData>({
        defaultValues: {
            participantName: '',
            dateOfBirth: '',
            age: '',
            category: '',
            guardianName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            pinCode: '',
        }
    });

    const watchedDateOfBirth = watch('dateOfBirth');

    // Auto-calculate age when date of birth changes
    useEffect(() => {
        if (watchedDateOfBirth) {
            // Ensure the date is properly formatted (YYYY-MM-DD)
            if (!/^\d{4}-\d{2}-\d{2}$/.test(watchedDateOfBirth)) {
                console.warn('Invalid date format:', watchedDateOfBirth);
                setValue('age', '');
                setValue('category', '');
                return;
            }
            
            const birthDate = new Date(watchedDateOfBirth);
            
            // Check if the date is valid
            if (isNaN(birthDate.getTime())) {
                console.warn('Invalid date object created from:', watchedDateOfBirth);
                setValue('age', '');
                setValue('category', '');
                return;
            }
            
            // Validate birth date is reasonable (not too old or in the future)
            const currentYear = new Date().getFullYear();
            const birthYear = birthDate.getFullYear();
            
            if (birthYear < 1900 || birthYear > currentYear) {
                console.warn('Invalid birth year:', birthYear, '- Date may be incorrectly formatted');
                setValue('age', '');
                setValue('category', '');
                return;
            }
            
            if (birthDate > competitionDate) {
                console.warn('Birth date is after competition date');
                setValue('age', '');
                setValue('category', '');
                return;
            }

            // Calculate age in total days for precise comparison
            const timeDiff = competitionDate.getTime() - birthDate.getTime();
            const totalDays = Math.floor(timeDiff / (1000 * 3600 * 24));
            
            // Precise calculation of years, months, and days considering month boundaries
            let years = competitionDate.getFullYear() - birthDate.getFullYear();
            let months = competitionDate.getMonth() - birthDate.getMonth();
            let days = competitionDate.getDate() - birthDate.getDate();
            
            // Adjust for negative months or days
            if (days < 0) {
                // Get the last day of the previous month
                const lastMonth = new Date(competitionDate.getFullYear(), competitionDate.getMonth(), 0);
                days += lastMonth.getDate();
                months--;
            }
            
            if (months < 0) {
                months += 12;
                years--;
            }
            
            // Compose age string with years, months, and days
            let ageString = '';
            if (years > 0) {
                ageString += years + (language === 'en' ? ' yr' : ' বছর');
            }
            if (months > 0 || years === 0) {
                if (ageString) ageString += ' ';
                ageString += months + (language === 'en' ? ' mo' : ' মাস');
            }
            if (days > 0 || (years === 0 && months === 0)) {
                if (ageString) ageString += ' ';
                ageString += days + (language === 'en' ? ' d' : ' দিন');
            }

            // Category determination based on EXACT day specifications
            // Competition date: 2025-09-21
            // Group A: 0-8 years 0m 0d = 0 to 2922 days (8 years exactly)
            // Group B: 8y 1d to 12y 0m 0d = 2923 to 4383 days (8y 1d to 12y exactly)
            // Group C: 12y 1d to 16y 0m 0d = 4384 to 5844 days (12y 1d to 16y exactly)
            let category = '';
            if (totalDays <= 2922) { // 0-8 years exactly
                category = language === 'en' ? 'A' : 'ক';
            } else if (totalDays >= 2923 && totalDays <= 4383) { // 8y 1d to 12y exactly
                category = language === 'en' ? 'B' : 'খ';
            } else if (totalDays >= 4384 && totalDays <= 5844) { // 12y 1d to 16y exactly
                category = language === 'en' ? 'C' : 'গ';
            }

            setValue('age', ageString);
            setValue('category', category);
        }
    }, [watchedDateOfBirth, language, setValue]);

    const onSubmit = async (data: DrawingCompetitionFormData) => {
        try {
            const res = await submitModel(`drawingcompetition${new Date().getFullYear()}`, {
                registration_id: `DC/${Date.now().toString().slice(-8)}`,
                mode: 'online',
                name: data.participantName,
                dob: data.dateOfBirth,
                age: data.age,
                category: data.category,
                guardian_name: data.guardianName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                city: data.city,
                pincode: data.pinCode,
            });

            if (!res.success) {
                throw new Error(res.error ?? 'Error submitting registration');
            }

            await sendMail({
                from: `"Madhyanchal Sarbajanin Durga Puja Samity" <${process.env.SMTP_USER}>`,
                to: data.email,
                subject: `Drawing Competition Registration ${new Date().getFullYear()}`,
                html: `
                  <!--[if mso]>
                  <style type="text/css">
                    .mobile-padding { padding: 16px !important; }
                  </style>
                  <![endif]-->
                  <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f4f8fb; padding: 16px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px; width:100%; margin:auto; background:#fff; border-radius:12px; box-shadow:0 2px 12px rgba(0,0,0,0.07); overflow:hidden;">
                      <tr>
                        <td style="background:linear-gradient(90deg,#4f8ef7 0%,#6c63ff 100%); padding:20px 0; text-align:center;">
                          <img src="https://www.madhyanchalsarbajanin.co.in/logo.png" alt="Madhyanchal Logo" width="55" style="margin-bottom:8px; max-width:90vw; height:auto;" />
                          <h2 style="color:#fff; margin:0; font-size:1.2rem;">Drawing Competition</h2>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:24px 10px 18px 10px;" class="mobile-padding">
                          <p style="font-size:1rem; color:#222; margin-bottom:14px; margin-top:0;">
                            Dear Participant,
                          </p>
                          <p style="font-size:0.95rem; color:#444; margin-bottom:14px; margin-top:0;">
                            Thank you for registering for the <strong>Drawing Competition ${new Date().getFullYear()}</strong> organized by <strong>Madhyanchal Sarbajanin Jagadhatri Puja Samity</strong>.
                          </p>
                          <div style="background:#f0f7ff; border-radius:8px; padding:12px; margin-bottom:14px; text-align:center;">
                            <span style="display:block; color:#6c63ff; font-size:0.92rem; margin-bottom:4px;">Your Registration ID</span>
                            <span style="font-size:1.1rem; font-weight:bold; color:#4f8ef7; letter-spacing:1px;">${res.response.registration_id}</span>
                          </div>
                          <p style="font-size:0.95rem; color:#444; margin-bottom:14px; margin-top:0;">
                            Please keep this email safe and show it at the registration desk on the day of the competition.
                          </p>
                          <table width="100%" cellpadding="0" cellspacing="0" style="margin:14px 0 14px 0; background:#f8fafc; border-radius:8px;">
                            <tr>
                              <td colspan="2" style="padding:8px 0 0 0;">
                                <h3 style="font-size:0.98rem; color:#4f8ef7; margin:0 0 8px 0; text-align:center;">Registration Details</h3>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding:5px 8px; color:#555; font-weight:500; width:45%;">Participant Name:</td>
                              <td style="padding:5px 8px; color:#222;">${data.participantName}</td>
                            </tr>
                            <tr>
                              <td style="padding:5px 8px; color:#555; font-weight:500;">Date of Birth:</td>
                              <td style="padding:5px 8px; color:#222;">${data.dateOfBirth}</td>
                            </tr>
                            <tr>
                              <td style="padding:5px 8px; color:#555; font-weight:500;">Age:</td>
                              <td style="padding:5px 8px; color:#222;">${data.age}</td>
                            </tr>
                            <tr>
                              <td style="padding:5px 8px; color:#555; font-weight:500;">Category:</td>
                              <td style="padding:5px 8px; color:#222;">${data.category}</td>
                            </tr>
                            <tr>
                              <td style="padding:5px 8px; color:#555; font-weight:500;">Guardian Name:</td>
                              <td style="padding:5px 8px; color:#222;">${data.guardianName}</td>
                            </tr>
                            <tr>
                              <td style="padding:5px 8px; color:#555; font-weight:500;">Email:</td>
                              <td style="padding:5px 8px; color:#222;">${data.email}</td>
                            </tr>
                            <tr>
                              <td style="padding:5px 8px; color:#555; font-weight:500;">Phone:</td>
                              <td style="padding:5px 8px; color:#222;">${data.phone}</td>
                            </tr>
                            <tr>
                              <td style="padding:5px 8px; color:#555; font-weight:500;">Address:</td>
                              <td style="padding:5px 8px; color:#222;">${data.address}, ${data.city}, ${data.pinCode}</td>
                            </tr>
                          </table>
                          <p style="font-size:0.93rem; color:#666; margin-bottom:0; margin-top:10px;">
                            <strong>Date:</strong> <span style="color:#222;">${competitionDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span><br/>
                            <strong>Time:</strong> <span style="color:#222;">${competitionDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span><br/>
                            <strong>Venue:</strong> <span style="color:#222;">Madhyanchal Puja Premises, Madhyanchal, Station Road, Chandannagar, Hooghly - 712136</span><br/>
                            <strong>Address:</strong>
                            <span style="color:#222; display:inline-block; margin-top:2px;">
                              <span style="color:#4f8ef7; font-size:0.95em;">
                                <a href="https://maps.app.goo.gl/RBeufNNJXigCxvMeA" target="_blank" rel="noopener noreferrer" style="color:#4f8ef7; text-decoration:underline;">
                                  View on Google Maps
                                </a>
                              </span>
                            </span>
                            <br/>
                            <strong>Required:</strong> <span style="color:#222;">Photocopy of Valid Date of Birth Certificate</span><br/>
                          </p>
                          <hr style="border:none; border-top:1px solid #e3e8ee; margin:18px 0 10px 0;" />
                          <p style="font-size:0.92rem; color:#888; text-align:center; margin:0;">
                            For any queries, reply to this email or contact us at <a href="mailto:${process.env.SMTP_USER}" style="color:#4f8ef7; text-decoration:none;">${process.env.SMTP_USER}</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                    <p style="text-align:center; color:#b0b8c1; font-size:0.85rem; margin-top:18px;">
                      &copy; ${new Date().getFullYear()} Madhyanchal Sarbajanin Durga Puja Samity
                    </p>
                  </div>
                `,
            });

            setSuccess({ registrationId: res.response.registration_id });
            reset();
        } catch (error) {
            setError(error instanceof Error ? error.message : "Something went wrong. Please try later.");
            console.error(error);
        }
    };

    return (
        <>
            {success && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-green-600 mb-2">Registration Successful!</h3>
                            <p className="text-sm text-gray-500 mb-2">Registration ID: <span className="font-bold">{success.registrationId}</span></p>
                            <p className="text-sm text-gray-500 mb-4">A confirmation email has been sent to your email address. Please show it on competition day.</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                                Make Another Registration
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {error && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                        <h3 className="text-xl font-bold text-red-600 mb-4">Failed</h3>
                        <pre className="whitespace-pre-wrap text-sm text-gray-700 mb-4">
                            {error}
                        </pre>
                        <button
                            onClick={() => setError(null)}
                            className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                            {language === 'en' ? 'Close' : 'বন্ধ করুন'}
                        </button>
                    </div>
                </div>
            )}
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

                            {/* Drawing Topic */}
                            <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
                                <div className="text-center">
                                    <h3 className="text-lg sm:text-xl font-bold text-orange-800 mb-2">
                                        {language === 'en' ? 'Drawing Topic' : 'অঙ্কনের বিষয়'}
                                    </h3>
                                    <p className="text-sm sm:text-base text-orange-700 font-medium">
                                        {language === 'en' ? 'Draw as you like' : 'যেমন খুশি আঁকো'}
                                    </p>
                                    <p className="text-xs sm:text-sm text-orange-600 mt-1">
                                        {language === 'en' ? 'All categories will have the same topic' : 'সকল বিভাগের জন্য একই বিষয়'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit as SubmitHandler<DrawingCompetitionFormData>)} className="space-y-6 text-xs sm:text-sm">
                            {/* Participant Information */}
                            <div className="bg-gray-50 p-4 sm:p-6 md:p-8 rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                            {t.fullName} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            {...register('participantName', { 
                                                required: t.errorMessages.participantName 
                                            })}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                errors.participantName ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            placeholder={language === 'en' ? "Enter your full name" : "প্রতিযোগীর নাম লিখুন"}
                                        />
                                        {errors.participantName && (
                                            <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.participantName.message}</p>
                                        )}
                                    </div>

                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                            {t.dateOfBirth} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            {...register('dateOfBirth', { 
                                                required: t.errorMessages.dateOfBirth 
                                            })}
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
                                                minDate.setFullYear(minDate.getFullYear() - 16);
                                                return minDate.toISOString().split('T')[0];
                                            })()}
                                            tabIndex={-1}
                                        />
                                        {errors.dateOfBirth && (
                                            <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.dateOfBirth.message}</p>
                                        )}
                                    </div>

                                    { watchedDateOfBirth && 
                                        <>
                                            <div>
                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                                    {language === 'en'
                                                        ? `${t.age} (As on ${t.eventDate})`
                                                        : `${t.age} (${t.eventDate} তারিখ অনুযায়ী)`} <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    {...register('age')}
                                                    readOnly
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                                                    placeholder={t.autoCalculated}
                                                    tabIndex={-1}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                                    {t.category} <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    {...register('category')}
                                                    readOnly
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                                                    placeholder={t.autoDetermined}
                                                    tabIndex={-1}
                                                />
                                            </div>
                                        </>
                                    }

                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                            {t.guardianName} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            {...register('guardianName', { 
                                                required: t.errorMessages.guardianName 
                                            })}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                errors.guardianName ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            placeholder={t.enterGuardianName}
                                        />
                                        {errors.guardianName && (
                                            <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.guardianName.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                            {t.email} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            {...register('email', { 
                                                required: t.errorMessages.email,
                                                pattern: {
                                                    value: /\S+@\S+\.\S+/,
                                                    message: t.errorMessages.email
                                                }
                                            })}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                errors.email ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            placeholder={t.enterEmail}
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                            {t.phone} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            {...register('phone', { 
                                                required: t.errorMessages.phone,
                                                pattern: {
                                                    value: /^\d{10}$/,
                                                    message: t.errorMessages.phone
                                                }
                                            })}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                errors.phone ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            placeholder={t.enterPhone}
                                            maxLength={10}
                                        />
                                        {errors.phone && (
                                            <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone.message}</p>
                                        )}
                                    </div>

                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                            {t.address} <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            {...register('address', { 
                                                required: t.errorMessages.address 
                                            })}
                                            rows={3}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                errors.address ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            placeholder={t.enterAddress}
                                        />
                                        {errors.address && (
                                            <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.address.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                            {t.city} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            {...register('city', { 
                                                required: t.errorMessages.city 
                                            })}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                errors.city ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            placeholder={t.enterCity}
                                        />
                                        {errors.city && (
                                            <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.city.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                            {t.pinCode} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            {...register('pinCode', { 
                                                required: t.errorMessages.pinCode,
                                                pattern: {
                                                    value: /^\d{6}$/,
                                                    message: t.errorMessages.pinCode
                                                }
                                            })}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                errors.pinCode ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            maxLength={6}
                                            placeholder={t.enterPinCode}
                                        />
                                        {errors.pinCode && (
                                            <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.pinCode.message}</p>
                                        )}
                                    </div>
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
                            
                            {/* Contact Information */}
                            <div className="bg-gray-50 p-4 sm:p-6 md:p-8 rounded-lg text-center">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">{language === 'en' ? 'Contact Information' : 'যোগাযোগের তথ্য'}</h3>
                                <p className="text-xs sm:text-sm text-gray-600 mb-4">
                                    {language === 'en' 
                                        ? 'For any queries about the drawing competition, please contact us:'
                                        : 'অঙ্কন প্রতিযোগিতা সম্পর্কে কোনো প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করুন:'
                                    }
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-1 justify-center text-center">
                                        <span className="text-blue-600"><FaEnvelope /></span>
                                        <span className="text-xs sm:text-sm text-gray-700">{language === 'en' ? 'Email:' : 'ইমেইল:'}</span>
                                        <a 
                                            href="mailto:madhyanchalsarbajanin@gmail.com"
                                            className="text-xs sm:text-sm text-blue-600 hover:text-blue-700"
                                        >
                                            madhyanchalsarbajanin@gmail.com
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-1 justify-center">
                                        <span className="text-green-600"><FaWhatsapp /></span>
                                        <span className="text-xs sm:text-sm text-gray-700">{language === 'en' ? 'WhatsApp:' : 'হোয়াটসঅ্যাপ:'}</span>
                                        <a 
                                            href="https://wa.me/917686943894" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-xs sm:text-sm text-green-600 hover:text-green-700"
                                        >
                                            +91-7686943894
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}