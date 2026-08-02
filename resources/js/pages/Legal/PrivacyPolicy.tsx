import React from 'react';
import { Head } from '@inertiajs/react';
import { PublicLayout } from '../../layouts/PublicLayout';

export default function PrivacyPolicy() {
    return (
        <PublicLayout>
            <Head title="Privacy Policy - Lombok Auto Rent" />

            <div className="flex flex-col w-full">
                {/* Hero Section */}
                <section className="relative w-full bg-[#f8f9fa] py-16 px-4 sm:px-8 overflow-hidden border-b border-slate-200">
                    <div className="max-w-[1280px] mx-auto relative z-10">
                        <div className="max-w-2xl space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="w-8 h-[2px] bg-[#003c90]" />
                                <span className="font-['Hanken_Grotesk',sans-serif] font-bold text-xs text-[#003c90] uppercase tracking-widest">
                                    Data Protection
                                </span>
                            </div>
                            <h1 className="font-['Manrope',sans-serif] text-4xl sm:text-5xl font-extrabold text-[#191c1d]">
                                Privacy Policy
                            </h1>
                            <p className="text-base text-[#434653] leading-relaxed">
                                How we collect, safeguard, and process your personal information during your car rental experience in Lombok.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="max-w-[1280px] mx-auto px-4 sm:px-8 py-16 w-full text-slate-700 font-['Hanken_Grotesk',sans-serif] space-y-10">
                    <div className="space-y-4">
                        <h2 className="font-['Manrope',sans-serif] font-bold text-2xl text-[#191c1d]">1. Information We Collect</h2>
                        <p className="text-sm leading-relaxed">
                            When you make a reservation with Lombok Auto Rent, we collect personal details necessary to fulfill your booking: full legal name, contact email, WhatsApp phone number, driver license details, and pick-up location preferences.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="font-['Manrope',sans-serif] font-bold text-2xl text-[#191c1d]">2. How We Use Your Information</h2>
                        <p className="text-sm leading-relaxed">
                            Your information is exclusively used for booking verification, vehicle delivery concierge coordination, and sending trip updates. We do not sell or lease customer data to third-party advertisers.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="font-['Manrope',sans-serif] font-bold text-2xl text-[#191c1d]">3. Data Security &amp; Encryption</h2>
                        <p className="text-sm leading-relaxed">
                            All transaction data and customer identity credentials are encrypted using industry-standard SSL security protocols and stored on secure cloud servers.
                        </p>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
