import React from 'react';
import { Head } from '@inertiajs/react';
import { PublicLayout } from '../../layouts/PublicLayout';

export default function TermsOfService() {
    return (
        <PublicLayout>
            <Head title="Terms of Service - Lombok Auto Rent" />

            <div className="flex flex-col w-full">
                {/* Hero / Introduction Section */}
                <section className="relative w-full bg-[#f8f9fa] py-16 px-4 sm:px-8 overflow-hidden border-b border-slate-200">
                    <div className="max-w-[1280px] mx-auto relative z-10">
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                            <div className="max-w-2xl">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-8 h-[2px] bg-[#954a00]" />
                                    <span className="font-['Hanken_Grotesk',sans-serif] font-bold text-xs text-[#954a00] uppercase tracking-widest">
                                        Legal Agreement
                                    </span>
                                </div>
                                <h1 className="font-['Manrope',sans-serif] text-4xl sm:text-5xl font-extrabold text-[#191c1d] mb-4">
                                    Terms of Service
                                </h1>
                                <p className="text-base text-[#434653] leading-relaxed">
                                    Please read these terms carefully before using our services. This agreement governs your relationship with Lombok Auto Rent and outlines your rights and responsibilities.
                                </p>
                            </div>
                            <div className="bg-[#edeeef] p-5 rounded-2xl border border-slate-200">
                                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Last Updated</p>
                                <p className="font-['Manrope',sans-serif] font-bold text-lg text-[#003c90]">October 24, 2024</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="max-w-[1280px] mx-auto px-4 sm:px-8 py-16 w-full">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Sidebar */}
                        <aside className="lg:w-1/4 shrink-0">
                            <div className="sticky top-28 space-y-6">
                                <div className="bg-[#003c90] p-6 rounded-3xl text-white shadow-xl">
                                    <span className="material-symbols-outlined text-3xl mb-2 text-[#fc9342]">support_agent</span>
                                    <p className="font-['Manrope',sans-serif] font-bold text-lg mb-1">Need Clarification?</p>
                                    <p className="text-xs text-blue-100 mb-4 leading-relaxed">
                                        Our support concierge is available 24/7 for any legal or rental questions.
                                    </p>
                                    <a
                                        href="https://wa.me/6281234567890"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center w-full py-2.5 bg-white text-[#003c90] font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors shadow-sm"
                                    >
                                        WhatsApp Support
                                    </a>
                                </div>
                            </div>
                        </aside>

                        {/* Main Textual Content */}
                        <div className="lg:w-3/4 space-y-10 text-slate-700 leading-relaxed font-['Hanken_Grotesk',sans-serif]">
                            <div className="space-y-4">
                                <h2 className="font-['Manrope',sans-serif] font-bold text-2xl text-[#191c1d] flex items-center gap-3">
                                    <span className="text-[#003c90] opacity-40">01</span> Acceptance of Terms
                                </h2>
                                <p className="text-sm">
                                    By accessing or using the vehicle rental services provided by Lombok Auto Rent ("the Company"), including our website and physical depots, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h2 className="font-['Manrope',sans-serif] font-bold text-2xl text-[#191c1d] flex items-center gap-3">
                                    <span className="text-[#003c90] opacity-40">02</span> Driver Qualification &amp; Requirements
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                                    <div className="bg-[#f3f4f5] p-5 rounded-2xl border border-slate-200 space-y-2">
                                        <span className="material-symbols-outlined text-[#003c90] text-2xl">badge</span>
                                        <h4 className="font-['Manrope',sans-serif] font-bold text-sm text-slate-900">Valid Driving License</h4>
                                        <p className="text-slate-600">
                                            For self-drive rentals, a valid Indonesian SIM A or an official International Driving Permit (IDP) alongside a national license is strictly required.
                                        </p>
                                    </div>
                                    <div className="bg-[#f3f4f5] p-5 rounded-2xl border border-slate-200 space-y-2">
                                        <span className="material-symbols-outlined text-[#003c90] text-2xl">person</span>
                                        <h4 className="font-['Manrope',sans-serif] font-bold text-sm text-slate-900">Age Restrictions</h4>
                                        <p className="text-slate-600">
                                            The primary driver must be at least 21 years of age and possess a minimum of 1 year of driving experience.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="font-['Manrope',sans-serif] font-bold text-2xl text-[#191c1d] flex items-center gap-3">
                                    <span className="text-[#003c90] opacity-40">03</span> Vehicle Usage &amp; Geographical Limits
                                </h2>
                                <p className="text-sm">
                                    Vehicles are strictly permitted for use on the island of Lombok. Transporting rental vehicles via ferry to Bali or Sumbawa is not allowed without prior written consent from Lombok Auto Rent management. Off-road driving on non-gazetted trails is prohibited.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
