import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PublicLayout } from '../layouts/PublicLayout';
import { Car, BlogPost } from '../types/lombok';

interface HomeProps {
    featuredCars: Car[];
    latestPosts: BlogPost[];
}

export default function Home({ featuredCars, latestPosts }: HomeProps) {
    const [pickupLocation, setPickupLocation] = useState('Lombok International Airport (LOP)');
    const [startDate, setStartDate] = useState('');
    const [pickupTime, setPickupTime] = useState('09:00');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/cars', {
            search: '',
        });
    };

    const formatRupiah = (number: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(number);
    };

    return (
        <PublicLayout>
            <Head title="Lombok Auto Rent - Premium Island Mobility" />

            <div className="flex flex-col w-full">
                {/* Hero Section with Immersive Scrim */}
                <section className="relative w-full min-h-[750px] lg:min-h-[850px] flex items-center overflow-hidden -mt-20">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#191c1d]/85 via-[#191c1d]/50 to-transparent z-10" />
                        <div
                            className="w-full h-full bg-cover bg-center scale-105"
                            style={{
                                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAcxM3zEX8QZWuDb-3IxZ5zmAT-I1azdCtcKNc4GR-m829GH8ZPabwDRhMPJgs5mcrsTjcoruslSO9MVoe-_0ap1c3s2hj91WVpPPiphCXYxYDGGZ3YSJ6Ufu2QR8_YeWl5KtlycSnsIW8jHD5BMx78U_toMm5Ho98qLUhmV_OA2OiTRnddr9jr6LAEVqJ7c2bqnFM-Fy0Bx42KaEjp5aqojQal93P9OmJGvaI4fHonnElzD8OZba-s')`,
                            }}
                        />
                    </div>

                    <div className="relative z-20 max-w-[1280px] mx-auto px-4 sm:px-8 w-full pt-28 pb-20">
                        <div className="max-w-2xl space-y-6 text-white">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#fc9342] animate-pulse" />
                                <span className="font-['Hanken_Grotesk',sans-serif] font-bold text-xs text-white tracking-[0.2em] uppercase">
                                    Premium Island Mobility
                                </span>
                            </div>

                            <h1 className="font-['Manrope',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                                Explore Lombok <br />
                                <span className="text-[#fc9342]">With Ease &amp; Comfort</span>
                            </h1>

                            <p className="font-['Hanken_Grotesk',sans-serif] text-base sm:text-lg text-slate-200 max-w-xl leading-relaxed">
                                Experience the ultimate island adventure with our curated fleet of premium vehicles. From rugged SUVs for mountain trails to sleek sedans for city drives.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link
                                    href="/cars"
                                    className="bg-[#003c90] hover:bg-[#0f52ba] text-white px-8 py-4 rounded-full font-['Hanken_Grotesk',sans-serif] font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 group shadow-xl"
                                >
                                    <span>VIEW FULL FLEET</span>
                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </Link>

                                <a
                                    href="https://wa.me/6281234567890"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-['Hanken_Grotesk',sans-serif] font-bold text-xs uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-base">chat</span>
                                    <span>WHATSAPP SUPPORT</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Search Widget: Elevated Floating Component */}
                <section className="relative z-30 max-w-[1100px] mx-auto w-full -mt-16 sm:-mt-20 px-4">
                    <form onSubmit={handleSearch} className="bg-white p-6 sm:p-8 lg:p-10 shadow-2xl rounded-2xl border border-slate-100 flex flex-col lg:flex-row items-end gap-6">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
                            <div className="space-y-2">
                                <label className="font-['Hanken_Grotesk',sans-serif] font-bold text-xs text-[#003c90] uppercase tracking-wider flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                                    Pick-up Location
                                </label>
                                <select
                                    value={pickupLocation}
                                    onChange={(e) => setPickupLocation(e.target.value)}
                                    className="w-full bg-[#f3f4f5] py-3 px-4 rounded-xl font-semibold text-sm text-[#191c1d] border-none focus:ring-2 focus:ring-[#003c90] outline-none"
                                >
                                    <option value="Lombok International Airport (LOP)">Lombok Airport (LOP)</option>
                                    <option value="Mataram City Center">Mataram City Center</option>
                                    <option value="Senggigi Beach Area">Senggigi Beach Area</option>
                                    <option value="Kuta Lombok Office">Kuta Lombok Office</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="font-['Hanken_Grotesk',sans-serif] font-bold text-xs text-[#003c90] uppercase tracking-wider flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full bg-[#f3f4f5] py-3 px-4 rounded-xl font-semibold text-sm text-[#191c1d] border-none focus:ring-2 focus:ring-[#003c90] outline-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="font-['Hanken_Grotesk',sans-serif] font-bold text-xs text-[#003c90] uppercase tracking-wider flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">schedule</span>
                                    Pick-up Time
                                </label>
                                <input
                                    type="time"
                                    value={pickupTime}
                                    onChange={(e) => setPickupTime(e.target.value)}
                                    className="w-full bg-[#f3f4f5] py-3 px-4 rounded-xl font-semibold text-sm text-[#191c1d] border-none focus:ring-2 focus:ring-[#003c90] outline-none"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full lg:w-auto h-[52px] px-10 bg-[#fc9342] hover:bg-[#e07d30] text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-xl transition-all uppercase tracking-widest flex items-center justify-center gap-2"
                        >
                            <span>Find Car</span>
                            <span className="material-symbols-outlined">search</span>
                        </button>
                    </form>
                </section>

                {/* Featured Fleet Section */}
                <section className="py-24 bg-[#f8f9fa]">
                    <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                            <div>
                                <span className="text-[#003c90] font-bold text-xs uppercase tracking-widest block mb-1">
                                    OUR FLEET
                                </span>
                                <h2 className="font-['Manrope',sans-serif] font-extrabold text-3xl sm:text-4xl text-[#191c1d]">
                                    Curated for Excellence
                                </h2>
                            </div>
                            <Link
                                href="/cars"
                                className="text-[#003c90] hover:underline font-bold text-xs uppercase tracking-wider flex items-center gap-1"
                            >
                                <span>Browse All Vehicles</span>
                                <span className="material-symbols-outlined text-base">arrow_forward</span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredCars.map((car) => (
                                <div
                                    key={car.id}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col border border-slate-200/80"
                                >
                                    <div className="relative h-64 overflow-hidden bg-slate-100">
                                        <img
                                            src={car.image_url}
                                            alt={car.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 bg-[#003c90]/90 text-white px-3 py-1 rounded text-[11px] font-bold uppercase backdrop-blur-sm shadow-sm">
                                            {car.category}
                                        </div>
                                    </div>

                                    <div className="p-7 space-y-6 flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-['Manrope',sans-serif] font-bold text-xl text-[#191c1d]">
                                                        {car.name}
                                                    </h3>
                                                    <p className="font-['Hanken_Grotesk',sans-serif] text-xs text-[#434653] uppercase font-semibold mt-0.5">
                                                        {car.transmission} • {car.fuel_type} • {car.capacity_passengers} Seats
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-200/80 text-xs text-[#434653] my-4">
                                                <div className="flex flex-col items-center gap-1">
                                                    <span className="material-symbols-outlined text-[#003c90]">person</span>
                                                    <span>{car.capacity_passengers} People</span>
                                                </div>
                                                <div className="flex flex-col items-center gap-1 border-x border-slate-200/80">
                                                    <span className="material-symbols-outlined text-[#003c90]">luggage</span>
                                                    <span>{car.capacity_luggage} Bags</span>
                                                </div>
                                                <div className="flex flex-col items-center gap-1">
                                                    <span className="material-symbols-outlined text-[#003c90]">ac_unit</span>
                                                    <span>Full AC</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-2">
                                            <div>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase">Rate per day</p>
                                                <p className="font-['Manrope',sans-serif] font-extrabold text-xl text-[#954a00]">
                                                    {formatRupiah(car.price_per_day)}
                                                </p>
                                            </div>
                                            <Link
                                                href={`/cars/${car.id}`}
                                                className="bg-[#003c90] hover:bg-[#0f52ba] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
                                            >
                                                Book Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="py-24 bg-[#edeeef] overflow-hidden">
                    <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            <div className="lg:col-span-5 space-y-8">
                                <div className="space-y-3">
                                    <span className="text-[#003c90] font-bold text-xs tracking-widest uppercase">
                                        The LAR Difference
                                    </span>
                                    <h2 className="font-['Manrope',sans-serif] font-extrabold text-3xl sm:text-4xl text-[#191c1d]">
                                        Why Travelers Trust Us
                                    </h2>
                                </div>
                                <p className="text-base text-[#434653] leading-relaxed">
                                    We don't just provide cars; we provide the freedom to discover Lombok on your own terms with the safety of a corporate professional service.
                                </p>
                                <div className="flex flex-col gap-6">
                                    <div className="flex gap-4 group">
                                        <div className="w-14 h-14 shrink-0 bg-[#003c90]/10 text-[#003c90] rounded-2xl flex items-center justify-center group-hover:bg-[#003c90] group-hover:text-white transition-colors">
                                            <span className="material-symbols-outlined text-[32px]">verified</span>
                                        </div>
                                        <div>
                                            <h4 className="font-['Manrope',sans-serif] font-bold text-lg text-[#191c1d] mb-1">
                                                Newest Fleet Only
                                            </h4>
                                            <p className="text-xs text-[#434653] leading-relaxed">
                                                Every car in our garage is under 3 years old and maintained to manufacturer standards.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 group">
                                        <div className="w-14 h-14 shrink-0 bg-[#003c90]/10 text-[#003c90] rounded-2xl flex items-center justify-center group-hover:bg-[#003c90] group-hover:text-white transition-colors">
                                            <span className="material-symbols-outlined text-[32px]">support_agent</span>
                                        </div>
                                        <div>
                                            <h4 className="font-['Manrope',sans-serif] font-bold text-lg text-[#191c1d] mb-1">
                                                24/7 Roadside Support
                                            </h4>
                                            <p className="text-xs text-[#434653] leading-relaxed">
                                                Peace of mind guaranteed. Our support team and mobile mechanics are always on standby.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 group">
                                        <div className="w-14 h-14 shrink-0 bg-[#003c90]/10 text-[#003c90] rounded-2xl flex items-center justify-center group-hover:bg-[#003c90] group-hover:text-white transition-colors">
                                            <span className="material-symbols-outlined text-[32px]">monetization_on</span>
                                        </div>
                                        <div>
                                            <h4 className="font-['Manrope',sans-serif] font-bold text-lg text-[#191c1d] mb-1">
                                                Transparent Pricing
                                            </h4>
                                            <p className="text-xs text-[#434653] leading-relaxed">
                                                No hidden fees, no credit card surcharges. What you see is exactly what you pay.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-7 grid grid-cols-2 gap-6 relative">
                                <div className="space-y-6 pt-8">
                                    <div className="aspect-square rounded-3xl overflow-hidden shadow-xl">
                                        <div
                                            className="w-full h-full bg-cover bg-center"
                                            style={{
                                                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDToqmvBtIido-Vq6unYNfp8j_kXDiEewNU8WacRL8iz0Rc70ds_Oo40j6m4oNcCmeLTZrW9_Y8Benffw-x6usboVmxHZVLV9bajPqMb1eFsX9U9Ks0vYZ99DX2Jop8oGoiYIVOBIqh09ZsNM9HUXeMuAHTFCKgks617rTBXVKOYcZ9zFx4fDWV-G-jCv5W56vIiCmc6HnIjEHbJ5D0VLiZhQC5ht58PNY-95aFHeuz43-p377vORGk')`,
                                            }}
                                        />
                                    </div>
                                    <div className="bg-[#003c90] p-8 rounded-3xl text-white shadow-xl">
                                        <span className="material-symbols-outlined text-[44px] mb-2 text-[#fc9342]">stars</span>
                                        <p className="font-['Manrope',sans-serif] font-extrabold text-4xl mb-1">4.9/5</p>
                                        <p className="text-xs opacity-80 uppercase tracking-widest font-semibold">Average Customer Rating</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-[#954a00] p-8 rounded-3xl text-white shadow-xl">
                                        <p className="font-['Manrope',sans-serif] font-extrabold text-4xl mb-1">12k+</p>
                                        <p className="text-xs opacity-80 uppercase tracking-widest font-semibold">Successful Trips</p>
                                    </div>
                                    <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-xl">
                                        <div
                                            className="w-full h-full bg-cover bg-center"
                                            style={{
                                                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDx11mayb6WHwafQs2I7Y4EYL4k0PaRe6UZkO8ub0zwYcGHqqB3bKLfVuX0ukCrLaNA_sw0ErnLyIMSRd6qd3eWddmsglAtxkyx0IQhEktOpIXgv44bvgDM6GvXhHueEHMduAkBVf8otVZtPSu9LITsUQDkKupZzjXYPtkxobT_zZNU4Rzy3w0yUSqSaFkqxKth2ZTIGX6lDgPPc8ucYcx6S9jAZYpV14v6f6sW_mqS80o1Y34Sn8D_')`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 max-w-[1280px] mx-auto px-4 sm:px-8">
                    <div className="relative rounded-[2rem] overflow-hidden bg-[#191c1d] min-h-[380px] flex items-center justify-center text-center px-6">
                        <div className="absolute inset-0 z-0">
                            <div
                                className="w-full h-full bg-cover bg-center opacity-40"
                                style={{
                                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCiSoqFl0RZWdjuwsMK0wBDL5gpjTTV9lyWXidOoiGNt4FY61cGWNnqmqw4_wuqeSj9S_xlbOCel9Ig_FDobZhSURt05nXS3Gvh0qswxo2iVWRS1iZ7FHIyistQ50Om6_Yuzm6wxTi8nyq4DnQG2QI-cHGz-Vybulbp5v0eHnVtvtdw5j3geTv9LzOp-KWeo1yUIvL6H60RwcBNPrT2IsLlB2dxI-5FRbgAQ1VVURd6xHKOVrb5Yzpf')`,
                                }}
                            />
                            <div className="absolute inset-0 bg-[#003c90]/30 mix-blend-multiply" />
                        </div>
                        <div className="relative z-10 space-y-6 max-w-2xl text-white">
                            <h2 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                                Ready to start your journey?
                            </h2>
                            <p className="text-base text-slate-200">
                                Book your premium vehicle today and enjoy special online-only discounts for stays over 3 days.
                            </p>
                            <div className="flex justify-center pt-2">
                                <Link
                                    href="/cars"
                                    className="bg-[#fc9342] hover:bg-[#e07d30] text-white px-10 py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] shadow-2xl transition-all"
                                >
                                    Reserve Your Car Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
