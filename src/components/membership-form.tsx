'use client';

import { useState, FormEvent, useId, useCallback, useMemo } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { createRazorpayOrder } from '@/app/actions/razorpay';
import { loadRazorpayScript } from '@/utils/load-razorpay';
import Select from 'react-select';

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface Member {
    _id: string;
    name: string;
    email: string;
    phone: string;
    amount: number; // Total amount due
}

interface FormData {
    member_id: string;
    name: string;
    email: string;
    phone: string;
    amount: string;
}

interface SuccessModalProps {
    paymentId: string;
    onReset: () => void;
}

interface ErrorModalProps {
    error: string;
    onClose: () => void;
}

const SuccessModal = ({ paymentId, onReset }: SuccessModalProps) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-green-600 mb-2">Payment Successful!</h3>
                <p className="text-gray-600 mb-4">Thank you for your contribution.</p>
                <p className="text-sm text-gray-500 mb-4">Payment ID: {paymentId}</p>
                <button
                    onClick={onReset}
                    className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                    Make Another Payment
                </button>
            </div>
        </div>
    </div>
);

const ErrorModal = ({ error, onClose }: ErrorModalProps) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-red-600 mb-4">Payment Failed</h3>
            <pre className="whitespace-pre-wrap text-sm text-gray-700 mb-4">
                {error}
            </pre>
            <button
                onClick={onClose}
                className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
                Close
            </button>
        </div>
    </div>
);

const selectStyles = {
    control: (base: any, state: any) => ({
        ...base,
        backgroundColor: 'white',
        borderColor: state.isFocused ? '#f59e42' : '#d1d5db',
        boxShadow: state.isFocused ? '0 0 0 1px #f59e42' : undefined,
        '&:hover': { borderColor: '#f59e42' },
        minHeight: '2.5rem',
        borderRadius: '0.375rem',
    }),
    valueContainer: (base: any) => ({
        ...base,
        color: '#374151',
        fontSize: '0.95rem',
        paddingLeft: '0.75rem',
        paddingRight: '0.75rem',
    }),
    placeholder: (base: any) => ({
        ...base,
        color: '#9ca3af',
    }),
    menu: (base: any) => ({
        ...base,
        zIndex: 50,
    }),
    option: (base: any, state: any) => ({
        ...base,
        backgroundColor: state.isSelected
            ? '#f59e42'
            : state.isFocused
            ? '#fef3c7'
            : 'white',
        color: state.isSelected
            ? 'white'
            : '#374151',
        fontSize: '0.95rem',
        cursor: 'pointer',
    }),
};

const inputClassName = "w-full px-3 py-2 border border-gray-300 rounded-md focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500";

export default function MembershipForm({ membersData }: { membersData: Member[] }) {
    const [success, setSuccess] = useState<{ paymentId: string } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [formData, setFormData] = useState<FormData>({
        member_id: '',
        name: '',
        email: '',
        phone: '',
        amount: '',
    });

    // Memoize select options to prevent unnecessary re-renders
    const selectOptions = useMemo(() => 
        membersData.map((member) => ({
            value: member._id,
            label: member.name,
        })), [membersData]
    );

    // Memoize member lookup function
    const findMemberById = useCallback((id: string) => 
        membersData.find((member) => member._id === id), [membersData]
    );

    // Calculate monthly amount for selected member
    const monthlyAmount = useMemo(() => {
        if (!selectedMember) return 0;
        return Math.round(selectedMember.amount / 12);
    }, [selectedMember]);

    // Check if amount is valid (multiple of monthly amount)
    const isAmountValid = useMemo(() => {
        if (!formData.amount || !monthlyAmount) return false;
        const amount = parseFloat(formData.amount);
        return amount % monthlyAmount === 0;
    }, [formData.amount, monthlyAmount]);

    const resetForm = useCallback(() => {
        setFormData({
            member_id: '',
            name: '',
            email: '',
            phone: '',
            amount: '',
        });
        setInputValue('');
        setSelectedMember(null);
        setSuccess(null);
        setError(null);
    }, []);

    const closeError = useCallback(() => setError(null), []);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const handleMemberSelect = useCallback((value: any) => {
        if (!value) {
            setSelectedMember(null);
            return;
        }
        
        const member = findMemberById(value.value);
        if (member) {
            setSelectedMember(member);
            setFormData(prev => ({
                ...prev,
                member_id: member._id,
                name: member.name,
                email: member.email,
                phone: member.phone,
                amount: '', // Reset amount when member changes
            }));
        }
    }, [findMemberById]);

    const handlePayment = useCallback(async (e: FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.email || !formData.phone || !formData.amount) {
            setError('Please fill in all fields');
            return;
        }

        // Validate amount is multiple of monthly amount
        if (monthlyAmount > 0) {
            const amount = parseFloat(formData.amount);
            if (amount % monthlyAmount !== 0) {
                setError(`Amount must be a multiple of ₹${monthlyAmount} (monthly payment)`);
                return;
            }
        }

        try {
            setProcessing(true);
            const amountInPaise = Math.round(parseFloat(formData.amount) * 100);

            const orderResponse = await createRazorpayOrder({
                ...formData,
                amount: amountInPaise,
                type: 'membership',
            });

            if (!orderResponse.success) {
                throw new Error(orderResponse.error ?? 'Error creating order');
            }

            const loaded = await loadRazorpayScript();
            if (!loaded || !window.Razorpay) {
                throw new Error('Failed to load Razorpay SDK');
            }

            const options = {
                key: process.env.RAZORPAY_KEY_ID!,
                amount: amountInPaise.toString(),
                currency: "INR",
                name: "Madhyanchal Sarbajanin Jagadhatri Puja Samity",
                description: `Payment of ₹${formData.amount} for ${formData.name}`,
                order_id: orderResponse.orderId,
                notes: {
                    email: formData.email,
                    name: formData.name,
                    phone: formData.phone,
                    type: 'membership',
                },
                handler: function (response: any) {
                    setSuccess({ paymentId: response.razorpay_payment_id });
                    setProcessing(false);
                },
                modal: {
                    ondismiss: function () {
                        setProcessing(false);
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone
                },
                readonly: {
                    email: true,
                    contact: true
                },
                send_sms_hash: true,
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (err) {
            setProcessing(false);
            console.error('Payment failed!', err);
            setError(`${err}`);
        }
    }, [formData, monthlyAmount]);

    return (
        <>
            {success && <SuccessModal paymentId={success.paymentId} onReset={resetForm} />}
            {error && <ErrorModal error={error} onClose={closeError} />}
            
            <form onSubmit={handlePayment} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <Select
                        instanceId={useId()}
                        options={selectOptions}
                        placeholder="Type at least 3 letters..."
                        onChange={handleMemberSelect}
                        inputValue={inputValue}
                        onInputChange={setInputValue}
                        menuIsOpen={inputValue.length >= 3}
                        filterOption={(option, rawInput) =>
                            rawInput.length >= 3 && option.label.toLowerCase().includes(rawInput.toLowerCase())
                        }
                        noOptionsMessage={() =>
                            inputValue.length < 3 ? "Type 3 or more letters" : "No results found"
                        }
                        className='w-full'
                        styles={selectStyles}
                    /> 
                </div>
                
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        minLength={10}
                        maxLength={10}
                        value={formData.phone}
                        pattern="[0-9]{10}"
                        onChange={handleInputChange}
                        className={inputClassName}
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={inputClassName}
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                        Amount (₹) <span className="text-red-500">*</span>
                        {selectedMember && (
                            <span className="text-xs text-gray-500 ml-2">
                                (Total Due: ₹{selectedMember.amount}, Monthly: ₹{monthlyAmount})
                            </span>
                        )}
                    </label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        min={monthlyAmount || 1}
                        step={monthlyAmount || 1}
                        placeholder={monthlyAmount > 0 ? `Enter multiple of ₹${monthlyAmount}` : "Enter amount"}
                        className={inputClassName}
                        required
                    />
                    {monthlyAmount > 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                            Only multiples of ₹{monthlyAmount} are allowed
                        </p>
                    )}
                </div>
                
                <button
                    type="submit"
                    disabled={processing || !isAmountValid}
                    className={`w-full py-3 px-4 bg-blue-600 text-white rounded-md font-medium
                                hover:bg-blue-700 transition-colors
                                disabled:bg-blue-300 disabled:cursor-not-allowed
                                flex items-center justify-center gap-2`}
                >
                    {processing ? (
                        <>
                            <BiLoaderAlt className="animate-spin h-5 w-5" />
                            Processing...
                        </>
                    ) : (
                        'Proceed to Pay'
                    )}
                </button>
            </form>
        </>
    );
}