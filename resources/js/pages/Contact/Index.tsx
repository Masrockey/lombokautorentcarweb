import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { PublicLayout } from '../../layouts/PublicLayout';

export default function ContactIndex() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <PublicLayout>
            <Head title="Contact Us - Lombok Auto Rent" />

            <div className="flex flex-col w-full">
                {/* Immersive Hero Background */}
                <section className="relative w-full overflow-hidden bg-[#003c90] min-h-[400px] lg:min-h-[480px] -mt-20 flex items-end pb-16">
                    <div className="absolute inset-0 z-0">
                        <div
                            className="w-full h-full bg-cover bg-center opacity-40 mix-blend-luminosity"
                            style={{
                                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC5J_c9DxnELcxp26KNxGNpKgkhFOwPrslPPLtobw_n4T5Bm2qNivSHmrmxGR89ZBzyK90QyVnLJBQNysFI616pTmuepE__qxAGnXRroxf9ryV05dvUSCHwdF7JO00dmVuz86Q1jSGCxuNlVPdxLZHA6L2jo75M4GXmTX3p42LG-8cMQ2nrtfMYYZLWP7ED7YIS--IdRMAjLKlqBPO1J0LBZ4jIVjCq_UdKZQEVYU8QSB4_1LVb1USQ')`,
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#003c90]/80 via-[#003c90]/40 to-[#f8f9fa]" />
                    </div>

                    <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-8 w-full text-white">
                        <div className="max-w-2xl">
                            <span className="font-['Hanken_Grotesk',sans-serif] font-bold text-xs text-[#fc9342] tracking-[0.2em] uppercase mb-2 block">
                                Connect with our team
                            </span>
                            <h1 className="font-['Manrope',sans-serif] text-4xl sm:text-5xl font-extrabold mb-4">
                                Get in Touch
                            </h1>
                            <p className="text-base text-blue-100 max-w-lg leading-relaxed">
                                Experience the gold standard of mobility in Lombok. Whether you need a luxury airport transfer or a multi-day fleet, we're here to assist you 24/7.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Split Content Layout */}
                <section className="max-w-[1280px] mx-auto px-4 sm:px-8 -mt-12 relative z-20 pb-20 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Contact Form Card */}
                        <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-slate-200">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-[3px] w-10 bg-[#954a00]" />
                                <h2 className="font-['Manrope',sans-serif] font-bold text-2xl text-[#191c1d]">
                                    Send a Message
                                </h2>
                            </div>

                            {submitted ? (
                                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center space-y-2">
                                    <span className="material-symbols-outlined text-4xl text-emerald-600">check_circle</span>
                                    <h3 className="font-['Manrope',sans-serif] font-bold text-lg">Thank You!</h3>
                                    <p className="text-xs">Your message has been sent. Our team will contact you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1 text-xs">
                                            <label className="font-bold text-slate-700">Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="John Doe"
                                                className="w-full bg-[#f3f4f5] border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#003c90]"
                                            />
                                        </div>

                                        <div className="space-y-1 text-xs">
                                            <label className="font-bold text-slate-700">Email Address</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="john@example.com"
                                                className="w-full bg-[#f3f4f5] border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#003c90]"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1 text-xs">
                                        <label className="font-bold text-slate-700">Subject</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            placeholder="Booking inquiry / Special Request"
                                            className="w-full bg-[#f3f4f5] border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#003c90]"
                                        />
                                    </div>

                                    <div className="space-y-1 text-xs">
                                        <label className="font-bold text-slate-700">Message</label>
                                        <textarea
                                            rows={4}
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="How can we help you explore Lombok?"
                                            className="w-full bg-[#f3f4f5] border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#003c90]"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-[#003c90] hover:bg-[#0f52ba] text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
                                    >
                                        <span>Submit Request</span>
                                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Contact Info Sidebar */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            <div className="bg-[#edeeef] p-8 rounded-3xl space-y-6 border border-slate-200">
                                <h3 className="font-['Manrope',sans-serif] font-bold text-xl text-[#191c1d]">Direct Channels</h3>
                                <div className="space-y-4 text-sm text-[#434653]">
                                    <a href="tel:+6281234567890" className="flex items-center gap-4 group">
                                        <div className="w-11 h-11 bg-[#003c90]/10 rounded-2xl flex items-center justify-center text-[#003c90] group-hover:bg-[#003c90] group-hover:text-white transition-colors">
                                            <span className="material-symbols-outlined">call</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">Phone Inquiry</p>
                                            <p className="font-bold text-slate-900">+62 812-3456-7890</p>
                                        </div>
                                    </a>

                                    <a
                                        href="https://wa.me/6281234567890"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 group"
                                    >
                                        <div className="w-11 h-11 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                            <span className="material-symbols-outlined">chat</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">WhatsApp Concierge</p>
                                            <p className="font-bold text-slate-900">+62 812-3456-7890</p>
                                        </div>
                                    </a>

                                    <a href="mailto:hello@lombokautorent.com" className="flex items-center gap-4 group">
                                        <div className="w-11 h-11 bg-amber-100 rounded-2xl flex items-center justify-center text-[#954a00] group-hover:bg-[#954a00] group-hover:text-white transition-colors">
                                            <span className="material-symbols-outlined">mail</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">Email Support</p>
                                            <p className="font-bold text-slate-900">hello@lombokautorent.com</p>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div className="bg-[#f3f4f5] p-8 rounded-3xl space-y-4 border border-slate-200">
                                <span className="material-symbols-outlined text-[#003c90] text-3xl">location_on</span>
                                <h4 className="font-['Manrope',sans-serif] font-bold text-base text-[#191c1d]">Hub Airport &amp; HQ</h4>
                                <p className="text-xs text-[#434653] leading-relaxed">
                                    Jl. Raya Tanak Awu, Lombok International Airport (LOP), Central Lombok, West Nusa Tenggara 83573, Indonesia.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
