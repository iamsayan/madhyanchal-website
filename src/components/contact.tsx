'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { submitForm } from '@/app/actions/form';

interface IFormInput {
    botcheck: boolean;
    name: string;
    email: string;
    message: string;
}

const Contact: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful, isSubmitting },
    } = useForm<IFormInput>({
        mode: "onTouched",
    });

    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);

    const onSubmit = async (data: IFormInput) => {
        try {
            const response = await submitForm(data, '592d3ecf9f775e86edc2021e37483a721b92a7f0');
            if (!response.success) {
                throw new Error(response.error);
            }

            setIsSuccess(true);
            setMessage("Success. Message sent successfully");
            reset();
        } catch (error) {
            setIsSuccess(false);
            setMessage(error instanceof Error ? error.message : "Something went wrong. Please try later.");
            console.error(error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit as SubmitHandler<IFormInput>)} className="flex flex-col gap-5">
                <input
                    type="checkbox"
                    className="hidden"
                    style={{ display: "none" }}
                    {...register("botcheck")}
                />

                <div>
                    <input
                        type="text"
                        placeholder="Full Name"
                        autoComplete="false"
                        className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${errors.name
                                ? "border-red-600 focus:border-red-600"
                                : "border-gray-300 focus:border-gray-600"
                            }`}
                        {...register("name", {
                            required: "Full name is required",
                            maxLength: 80,
                        })}
                    />
                    {errors.name && (
                        <div className="mt-1 text-red-600">
                            <small>{errors.name.message}</small>
                        </div>
                    )}
                </div>

                <div>
                    <label htmlFor="email_address" className="sr-only">
                        Email Address
                    </label>
                    <input
                        id="email_address"
                        type="email"
                        placeholder="Email Address"
                        autoComplete="false"
                        className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${errors.email
                                ? "border-red-600 focus:border-red-600"
                                : "border-gray-300 focus:border-gray-600"
                            }`}
                        {...register("email", {
                            required: "Enter your email",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Please enter a valid email",
                            },
                        })}
                    />
                    {errors.email && (
                        <div className="mt-1 text-red-600">
                            <small>{errors.email.message}</small>
                        </div>
                    )}
                </div>

                <div>
                    <textarea
                        placeholder="Your Message"
                        className={`px-4 py-3 border mt-1 rounded w-full bg-gray-50 h-36 ${errors.message
                                ? "border-red-600 focus:border-red-600"
                                : "border-gray-300 focus:border-gray-600"
                            }`}
                        {...register("message", {
                            required: "Enter your Message",
                        })}
                    />
                    {errors.message && (
                        <div className="mt-1 text-red-600">
                            <small>{errors.message.message}</small>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full py-3 font-semibold text-white transition-colors bg-yellow-500 rounded-md hover:bg-gray-800 focus:outline-none hover:text-white px-6"
                >
                    {isSubmitting ? (
                        <svg
                            className="w-5 h-5 mx-auto text-white animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    ) : (
                        "Send Message"
                    )}
                </button>
            </form>

            {isSubmitSuccessful && isSuccess && (
                <div className="mt-3 text-sm text-center text-green-500">
                    {message || "Success. Message sent successfully"}
                </div>
            )}
            {isSubmitSuccessful && !isSuccess && (
                <div className="mt-3 text-sm text-center text-red-500">
                    {message || "Something went wrong. Please try later."}
                </div>
            )}
        </>
    );
}

export default Contact;