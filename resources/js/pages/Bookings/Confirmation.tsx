import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PublicLayout } from '../../layouts/PublicLayout';
import { Booking } from '../../types/lombok';

interface ConfirmationProps {
    booking: Booking;
}

export default function Confirmation({ booking }: ConfirmationProps) {
    const formatRupiah = (number: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(number);
    };

    return (
        <PublicLayout>
            <Head title={`Booking Confirmed - #${booking.booking_code}`} />

            <div className="flex flex-col w-full">
                {/* Celebration Header Section */}
                <section className="relative w-full overflow-hidden bg-white border-b border-slate-200">
                    <div className="relative max-w-[1280px] mx-auto px-4 sm:px-8 py-16 lg:py-24 flex flex-col items-center text-center">
                        {/* Success Icon with Pulse */}
                        <div className="relative mb-6">
                            <div className="absolute inset-0 animate-ping rounded-full bg-[#003c90]/20" />
                            <div className="relative w-20 h-20 bg-[#003c90] rounded-full flex items-center justify-center shadow-xl text-white">
                                <span className="material-symbols-outlined text-4xl">check_circle</span>
                            </div>
                        </div>

                        <h1 className="font-['Manrope',sans-serif] text-4xl sm:text-5xl font-extrabold text-[#003c90] mb-3">
                            Booking Confirmed!
                        </h1>

                        <p className="text-base text-[#434653] max-w-xl leading-relaxed">
                            Your premium travel experience in Lombok is all set. We've received your reservation for <strong className="text-slate-900">{booking.customer_name}</strong> and our concierge team is already preparing your vehicle for a seamless arrival.
                        </p>

                        {/* Booking Reference Badge */}
                        <div className="mt-8 inline-flex items-center gap-3 bg-[#f3f4f5] px-6 py-2.5 rounded-full border border-slate-200">
                            <span className="font-['Hanken_Grotesk',sans-serif] font-bold text-xs text-slate-500 uppercase tracking-widest">
                                Booking Reference
                            </span>
                            <span className="font-['Manrope',sans-serif] text-base text-[#003c90] font-extrabold">
                                #{booking.booking_code}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Content Grid */}
                <section className="max-w-[1280px] mx-auto px-4 sm:px-8 -mt-10 pb-20 relative z-10 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Summary Card & Bento Next Steps */}
                        <div className="lg:col-span-8 space-y-8">
                            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                                <div className="p-6 sm:p-8 border-b border-slate-100 flex justify-between items-center">
                                    <h2 className="font-['Manrope',sans-serif] font-bold text-xl text-[#191c1d]">
                                        Reservation Summary
                                    </h2>
                                    <div className="bg-amber-50 text-[#954a00] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                        Instant Confirmation
                                    </div>
                                </div>

                                <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Left: Vehicle Info */}
                                    <div className="space-y-4">
                                        <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
                                            {booking.car?.image_url && (
                                                <img src={booking.car.image_url} alt={booking.car.name} className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-['Manrope',sans-serif] font-bold text-xl text-[#003c90]">
                                                {booking.car?.name}
                                            </h3>
                                            <p className="text-xs text-[#434653] font-semibold mt-1">
                                                {booking.car?.transmission} • {booking.car?.capacity_passengers} Seats • {booking.car?.fuel_type}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right: Logistics Timeline */}
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4 text-xs">
                                            <div>
                                                <p className="text-slate-400 font-bold uppercase tracking-wider">Service Type</p>
                                                <p className="font-bold text-slate-900 mt-0.5 uppercase">
                                                    {booking.driver_option.replace('_', ' ')}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-slate-400 font-bold uppercase tracking-wider">Total Paid</p>
                                                <p className="font-extrabold text-[#003c90] text-sm mt-0.5">
                                                    {formatRupiah(booking.total_price)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-4 text-xs border-t border-slate-100 pt-4">
                                            <div className="flex gap-3 items-start">
                                                <span className="material-symbols-outlined text-[#003c90] text-base mt-0.5">location_on</span>
                                                <div>
                                                    <p className="text-slate-400 font-bold uppercase">Pick-Up Location</p>
                                                    <p className="font-bold text-slate-900">{booking.pickup_location}</p>
                                                    <p className="text-slate-500">{new Date(booking.pickup_datetime).toLocaleString()}</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-3 items-start">
                                                <span className="material-symbols-outlined text-[#fc9342] text-base mt-0.5">flag</span>
                                                <div>
                                                    <p className="text-slate-400 font-bold uppercase">Drop-Off Location</p>
                                                    <p className="font-bold text-slate-900">{booking.dropoff_location}</p>
                                                    <p className="text-slate-500">{new Date(booking.dropoff_datetime).toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-blue-50/80 rounded-2xl border-l-4 border-[#003c90] text-xs">
                                            <p className="font-bold text-[#003c90] uppercase mb-0.5">Pick-up Instruction</p>
                                            <p className="text-slate-700 italic">
                                                "Our driver will be waiting at Arrivals Gate with a 'Lombok Auto Rent' signboard."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bento Grid Next Steps */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-[#003c90] text-white p-6 rounded-3xl flex flex-col justify-between space-y-4">
                                    <div>
                                        <h4 className="font-['Manrope',sans-serif] font-bold text-lg mb-1">Check your Inbox</h4>
                                        <p className="text-xs text-white/80">
                                            A detailed confirmation email and rental agreement have been sent to {booking.customer_email}.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1 font-bold text-xs uppercase tracking-wider">
                                        <span>Resend Email</span>
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </div>
                                </div>

                                <div className="bg-[#954a00] text-white p-6 rounded-3xl flex flex-col justify-between space-y-4">
                                    <div>
                                        <h4 className="font-['Manrope',sans-serif] font-bold text-lg mb-1">24/7 Concierge Support</h4>
                                        <p className="text-xs text-white/80">
                                            Need to change your arrival time? Our WhatsApp concierge is standing by to assist you.
                                        </p>
                                    </div>
                                    <a
                                        href={`https://wa.me/6281234567890?text=Halo%20Lombok%20Auto,%20konfirmasi%20booking%20kode%20${booking.booking_code}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 font-bold text-xs uppercase tracking-wider text-amber-200 hover:text-white"
                                    >
                                        <span>Chat on WhatsApp</span>
                                        <span className="material-symbols-outlined text-sm">chat</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Actions & Verification Sidebar */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-[#f3f4f5] p-7 rounded-3xl space-y-5 border border-slate-200">
                                <h3 className="font-['Manrope',sans-serif] font-bold text-lg text-[#003c90]">Manage Booking</h3>

                                <div className="space-y-3">
                                    <button
                                        onClick={() => window.print()}
                                        className="w-full bg-[#003c90] hover:bg-[#0f52ba] text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                                    >
                                        <span className="material-symbols-outlined text-lg">download</span>
                                        <span>Download Receipt (PDF)</span>
                                    </button>

                                    <Link
                                        href="/"
                                        className="w-full bg-white hover:bg-slate-100 text-slate-800 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                                    >
                                        <span className="material-symbols-outlined text-lg">home</span>
                                        <span>Return to Home</span>
                                    </Link>
                                </div>

                                <div className="pt-5 border-t border-slate-200/80 space-y-3 text-xs">
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-[#954a00] shrink-0">verified</span>
                                        <div>
                                            <p className="font-bold text-slate-900">Verified Identity Required</p>
                                            <p className="text-slate-500 text-[11px]">Please bring your original driver's license and passport/KTP.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-[#954a00] shrink-0">shield</span>
                                        <div>
                                            <p className="font-bold text-slate-900">Standard Insurance Included</p>
                                            <p className="text-slate-500 text-[11px]">Your booking includes basic third-party liability coverage.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
