import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PublicLayout } from '../../layouts/PublicLayout';
import { Car } from '../../types/lombok';

interface CarsIndexProps {
    cars: Car[];
    filters: {
        search: string;
        category: string;
        transmission: string;
    };
}

export default function CarsIndex({ cars, filters }: CarsIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || 'All');
    const [transmission, setTransmission] = useState(filters.transmission || 'All');

    const handleFilter = (newCategory?: string, newTransmission?: string) => {
        const cat = newCategory !== undefined ? newCategory : category;
        const trans = newTransmission !== undefined ? newTransmission : transmission;

        setCategory(cat);
        setTransmission(trans);

        router.get(
            '/cars',
            {
                search,
                category: cat,
                transmission: trans,
            },
            { preserveState: true }
        );
    };

    const formatRupiah = (number: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(number);
    };

    const categories = ['All', 'Luxury', 'SUV', 'MPV', 'Compact'];

    return (
        <PublicLayout>
            <Head title="Our Premium Fleet - Lombok Auto Rent" />

            <div className="flex flex-col w-full">
                {/* Hero Section with Breadcrumbs */}
                <section className="relative bg-[#f8f9fa] py-12 lg:py-16 border-b border-slate-200/80 overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-[#003c90]/5 -skew-x-12 transform translate-x-1/4" />
                    <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
                        <nav className="flex items-center gap-2 mb-4 font-['Hanken_Grotesk',sans-serif] text-xs uppercase tracking-widest text-slate-400">
                            <Link href="/" className="hover:text-[#003c90] transition-colors">
                                Home
                            </Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-[#003c90] font-bold">Our Fleet</span>
                        </nav>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="space-y-3 max-w-2xl">
                                <h1 className="font-['Manrope',sans-serif] text-4xl sm:text-5xl font-extrabold text-[#191c1d]">
                                    Our Premium Fleet
                                </h1>
                                <p className="text-base text-[#434653] leading-relaxed">
                                    Experience Lombok in unparalleled comfort. From rugged SUVs for mountain adventures to luxury MPVs for coastal cruising, discover the perfect companion for your journey.
                                </p>
                            </div>
                            <div className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200">
                                <div className="pr-4 border-r border-slate-200">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Results</p>
                                    <p className="font-['Manrope',sans-serif] font-bold text-base text-[#003c90]">{cars.length} Vehicles</p>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs font-bold text-[#003c90]">
                                    <span className="material-symbols-outlined text-lg">sort</span>
                                    <span>Sorted by: Featured</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content Area */}
                <div className="max-w-[1280px] mx-auto px-4 sm:px-8 w-full py-12 lg:py-16">
                    <div className="flex flex-col lg:flex-row gap-10">
                        {/* Sidebar Filters */}
                        <aside className="w-full lg:w-72 shrink-0 space-y-8">
                            {/* Search Filter */}
                            <div className="space-y-3">
                                <h4 className="font-['Hanken_Grotesk',sans-serif] font-bold text-xs text-[#003c90] uppercase tracking-widest flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">search</span>
                                    Search Vehicle
                                </h4>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
                                        placeholder="Search model or brand..."
                                        className="w-full bg-[#f3f4f5] border-b-2 border-slate-300 focus:border-[#003c90] outline-none py-2.5 px-3 font-semibold text-sm text-[#191c1d] transition-all rounded-t-lg"
                                    />
                                </div>
                            </div>

                            {/* Car Category Filter */}
                            <div className="space-y-3">
                                <h4 className="font-['Hanken_Grotesk',sans-serif] font-bold text-xs text-[#003c90] uppercase tracking-widest">
                                    Car Category
                                </h4>
                                <div className="flex flex-col gap-2.5">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => handleFilter(cat, transmission)}
                                            className={`flex items-center justify-between py-2 px-3 rounded-xl text-xs font-bold transition-all text-left ${
                                                category === cat
                                                    ? 'bg-[#003c90] text-white shadow-sm'
                                                    : 'bg-[#f3f4f5] text-[#434653] hover:bg-slate-200'
                                            }`}
                                        >
                                            <span>{cat === 'All' ? 'All Categories' : cat}</span>
                                            <span className="opacity-60">→</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Transmission Filter */}
                            <div className="space-y-3">
                                <h4 className="font-['Hanken_Grotesk',sans-serif] font-bold text-xs text-[#003c90] uppercase tracking-widest">
                                    Transmission
                                </h4>
                                <div className="flex gap-2 text-xs">
                                    {['All', 'Automatic', 'Manual'].map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => handleFilter(category, t)}
                                            className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                                                transmission === t
                                                    ? 'bg-[#003c90] text-white shadow-sm'
                                                    : 'bg-[#f3f4f5] text-[#434653] hover:bg-slate-200'
                                            }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Promotional Driver Offer Card */}
                            <div className="bg-[#0f52ba] text-white p-7 rounded-3xl relative overflow-hidden group shadow-lg">
                                <div className="relative z-10 space-y-3">
                                    <span className="bg-[#fc9342] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                        Special Offer
                                    </span>
                                    <h3 className="font-['Manrope',sans-serif] font-bold text-lg leading-tight">
                                        Need a professional driver for your trip?
                                    </h3>
                                    <p className="text-xs text-blue-100 leading-relaxed">
                                        Add an experienced local guide driver for just Rp150k/day during checkout.
                                    </p>
                                    <a
                                        href="https://wa.me/6281234567890"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 font-bold text-xs underline pt-1"
                                    >
                                        <span>Inquire via WhatsApp</span>
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </a>
                                </div>
                            </div>
                        </aside>

                        {/* Car Grid */}
                        <div className="flex-1">
                            {cars.length === 0 ? (
                                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                                    <span className="material-symbols-outlined text-5xl text-slate-300 mb-3">directions_car</span>
                                    <h3 className="font-['Manrope',sans-serif] font-bold text-lg text-slate-800">No vehicles match your search</h3>
                                    <p className="text-slate-500 text-xs mt-1">Try resetting your filters or search term.</p>
                                    <button
                                        onClick={() => {
                                            setSearch('');
                                            handleFilter('All', 'All');
                                        }}
                                        className="mt-4 bg-[#003c90] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {cars.map((car) => (
                                        <div
                                            key={car.id}
                                            className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-200/80"
                                        >
                                            <div className="relative h-64 overflow-hidden bg-slate-100">
                                                <img
                                                    src={car.image_url}
                                                    alt={car.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute top-5 left-5 flex flex-col gap-2">
                                                    <span className="bg-white/90 backdrop-blur-md text-[#003c90] px-3 py-1 rounded-full text-[11px] font-bold shadow-sm">
                                                        {car.category}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-7 flex flex-col flex-1 justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div>
                                                            <h3 className="font-['Manrope',sans-serif] font-bold text-xl text-[#191c1d] group-hover:text-[#003c90] transition-colors">
                                                                {car.name}
                                                            </h3>
                                                            <p className="font-['Hanken_Grotesk',sans-serif] text-xs text-[#434653] uppercase font-semibold mt-0.5">
                                                                {car.brand} • {car.transmission}
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-['Manrope',sans-serif] font-extrabold text-xl text-[#003c90]">
                                                                {formatRupiah(car.price_per_day)}
                                                                <span className="text-xs text-slate-400 font-normal">/day</span>
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-3 gap-3 mb-6">
                                                        <div className="flex flex-col items-center gap-1 p-2.5 rounded-2xl bg-[#f3f4f5] text-xs">
                                                            <span className="material-symbols-outlined text-[#003c90] text-lg">groups</span>
                                                            <span className="text-[#434653]">{car.capacity_passengers} Seats</span>
                                                        </div>
                                                        <div className="flex flex-col items-center gap-1 p-2.5 rounded-2xl bg-[#f3f4f5] text-xs">
                                                            <span className="material-symbols-outlined text-[#003c90] text-lg">settings</span>
                                                            <span className="text-[#434653]">{car.transmission}</span>
                                                        </div>
                                                        <div className="flex flex-col items-center gap-1 p-2.5 rounded-2xl bg-[#f3f4f5] text-xs">
                                                            <span className="material-symbols-outlined text-[#003c90] text-lg">local_gas_station</span>
                                                            <span className="text-[#434653]">{car.fuel_type}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-auto flex gap-3">
                                                    <Link
                                                        href={`/cars/${car.id}`}
                                                        className="flex-1 bg-[#003c90] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-center hover:bg-[#0f52ba] transition-all shadow-md"
                                                    >
                                                        Book Now
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Why Choose Us Banner */}
                <section className="bg-[#2e3132] text-white py-16 relative overflow-hidden">
                    <div className="max-w-[1280px] mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
                        <div className="flex items-start gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-[#003c90]/30 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[#bcceff] text-[32px]">verified_user</span>
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-['Manrope',sans-serif] font-bold text-lg">Premium Insurance</h4>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                    Complete peace of mind with our comprehensive full-coverage insurance plans.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-[#003c90]/30 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[#bcceff] text-[32px]">support_agent</span>
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-['Manrope',sans-serif] font-bold text-lg">24/7 Roadside Assist</h4>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                    Wherever you are in Lombok, our support team is just a phone call away.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-[#003c90]/30 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[#bcceff] text-[32px]">location_on</span>
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-['Manrope',sans-serif] font-bold text-lg">Easy Airport Pick-up</h4>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                    Zero waiting time. Your car will be ready exactly when you land at LOP.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
