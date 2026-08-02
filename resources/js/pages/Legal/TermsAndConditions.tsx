import React from 'react';
import { Head } from '@inertiajs/react';
import { PublicLayout } from '../../layouts/PublicLayout';

export default function TermsAndConditions() {
    return (
        <PublicLayout>
            <Head title="Terms &amp; Conditions - Lombok Auto Rent" />

            <div className="flex flex-col w-full">
                {/* Hero Section */}
                <section className="relative w-full bg-[#f8f9fa] py-16 px-4 sm:px-8 overflow-hidden border-b border-slate-200">
                    <div className="max-w-[1280px] mx-auto relative z-10">
                        <div className="max-w-2xl space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="w-8 h-[2px] bg-[#fc9342]" />
                                <span className="font-['Hanken_Grotesk',sans-serif] font-bold text-xs text-[#fc9342] uppercase tracking-widest">
                                    Rental Policy
                                </span>
                            </div>
                            <h1 className="font-['Manrope',sans-serif] text-4xl sm:text-5xl font-extrabold text-[#191c1d]">
                                Terms &amp; Conditions
                            </h1>
                            <p className="text-base text-[#434653] leading-relaxed">
                                Detailed terms governing insurance coverage, fuel policy, security deposit, and vehicle handover.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="max-w-[1280px] mx-auto px-4 sm:px-8 py-16 w-full text-slate-700 font-['Hanken_Grotesk',sans-serif] space-y-10">
                    <div className="space-y-4">
                        <h2 className="font-['Manrope',sans-serif] font-bold text-2xl text-[#191c1d]">1. Insurance &amp; Damage Protection</h2>
                        <p className="text-sm leading-relaxed">
                            All vehicles include basic third-party liability insurance. Comprehensive collision damage waiver (CDW) can be selected during booking with a maximum deductible per incident.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="font-['Manrope',sans-serif] font-bold text-2xl text-[#191c1d]">2. Fuel Policy (Same to Same)</h2>
                        <p className="text-sm leading-relaxed">
                            Vehicles are delivered with a specific fuel level (usually full) and should be returned with the same fuel level. Missing fuel will be charged according to standard local market rates.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="font-['Manrope',sans-serif] font-bold text-2xl text-[#191c1d]">3. Free Airport Delivery (LOP)</h2>
                        <p className="text-sm leading-relaxed">
                            Vehicle handovers at Lombok International Airport (LOP) are provided free of charge for rentals of 3 days or longer.
                        </p>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
