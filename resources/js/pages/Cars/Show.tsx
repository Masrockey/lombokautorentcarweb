import React, { useState, useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { PublicLayout } from '../../layouts/PublicLayout';
import { Car } from '../../types/lombok';

interface CarsShowProps {
    car: Car;
}

export default function CarsShow({ car }: CarsShowProps) {
    const today = new Date().toISOString().slice(0, 10);
    const threeDaysLater = new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10);

    const [idFilePreview, setIdFilePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        car_id: car.id,
        vehicle_category: car.category || 'Luxury',
        service_type: 'driver', // 'driver' or 'self'
        pickup_location: 'Lombok International Airport (LOP)',
        pickup_date: today,
        pickup_time: '09:00',
        dropoff_location: 'Kuta Lombok Center',
        dropoff_date: threeDaysLater,
        dropoff_time: '17:00',
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        country_of_origin: 'Indonesia',
        id_document: null as File | null,
        payment_method: 'bank', // 'cc', 'bank', 'ewallet'
        agree_terms: false,
    });

    const calculateDays = () => {
        const p = new Date(`${data.pickup_date}T${data.pickup_time}`);
        const d = new Date(`${data.dropoff_date}T${data.dropoff_time}`);
        const diffHours = Math.max(24, (d.getTime() - p.getTime()) / (1000 * 3600));
        return Math.ceil(diffHours / 24);
    };

    const days = calculateDays();
    const carTotal = car.price_per_day * days;

    const driverDailyFee = car.driver_price_per_day ?? (
        car.price_per_day >= 1000000 || ['luxury', 'premium'].includes((car.category || '').toLowerCase()) ? 250000 :
        car.price_per_day >= 500000 || ['suv', 'mpv', 'family'].includes((car.category || '').toLowerCase()) ? 200000 :
        150000
    );

    const driverFee = data.service_type === 'driver' ? driverDailyFee * days : 0;
    const grandTotal = carTotal + driverFee;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('id_document', file);
            setIdFilePreview(URL.createObjectURL(file));
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            setData('id_document', file);
            setIdFilePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/bookings', {
            forceFormData: true,
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
            <Head title={`Complete Booking: ${car.name} - Lombok Auto Rent`} />

            <div className="flex flex-col w-full">
                {/* Immersive Header Scrim Section */}
                <section className="relative w-full bg-[#f8f9fa] py-12 lg:py-16 border-b border-slate-200/80 overflow-hidden">
                    <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
                        <div className="flex flex-col gap-3">
                            <span className="font-['Hanken_Grotesk',sans-serif] font-bold text-xs text-[#003c90] uppercase tracking-[0.2em]">
                                Reservation Portal
                            </span>
                            <h1 className="font-['Manrope',sans-serif] text-4xl sm:text-5xl font-extrabold text-[#191c1d]">
                                Complete Your Booking
                            </h1>
                            <p className="text-base text-[#434653] max-w-xl">
                                Experience the freedom of Lombok with our premium fleet. Your journey to the island's hidden gems starts here.
                            </p>
                        </div>
                    </div>
                    {/* Decorative Background Icon */}
                    <div className="absolute top-0 right-0 w-1/3 h-full overflow-hidden pointer-events-none opacity-5">
                        <span className="material-symbols-outlined text-[350px] text-[#003c90] rotate-12 -mr-20 -mt-16">
                            directions_car
                        </span>
                    </div>
                </section>

                <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-12 lg:py-16 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        {/* Main Form Column */}
                        <div className="lg:col-span-8 flex flex-col gap-10">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-12" id="bookingForm">
                                {/* Step 1: Select Your Vehicle */}
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-4">
                                        <span className="w-10 h-10 rounded-full bg-[#d9e2ff] text-[#003c90] flex items-center justify-center font-bold text-base">
                                            1
                                        </span>
                                        <h2 className="font-['Manrope',sans-serif] font-bold text-2xl text-[#191c1d]">
                                            Select Your Vehicle
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <label
                                            onClick={() => setData('vehicle_category', 'Economy')}
                                            className={`p-6 rounded-2xl border cursor-pointer transition-all flex flex-col gap-3 ${
                                                data.vehicle_category === 'Economy' || data.vehicle_category === 'Compact'
                                                    ? 'bg-blue-50/80 border-[#003c90] shadow-sm'
                                                    : 'bg-white border-slate-200 hover:border-slate-300'
                                            }`}
                                        >
                                            <span className="material-symbols-outlined text-[#003c90] text-3xl">directions_car</span>
                                            <div>
                                                <p className="font-bold text-xs text-slate-400 uppercase tracking-wider">Economy</p>
                                                <p className="font-['Manrope',sans-serif] font-bold text-lg text-slate-900">Compact Hatchback</p>
                                            </div>
                                            <p className="text-xs text-slate-500">Agya / Brio / HR-V or similar</p>
                                        </label>

                                        <label
                                            onClick={() => setData('vehicle_category', car.category || 'Luxury')}
                                            className={`p-6 rounded-2xl border cursor-pointer transition-all flex flex-col gap-3 ${
                                                data.vehicle_category === car.category || data.vehicle_category === 'Luxury' || data.vehicle_category === 'SUV'
                                                    ? 'bg-blue-50/80 border-[#003c90] shadow-sm'
                                                    : 'bg-white border-slate-200 hover:border-slate-300'
                                            }`}
                                        >
                                            <span className="material-symbols-outlined text-[#003c90] text-3xl">airport_shuttle</span>
                                            <div>
                                                <p className="font-bold text-xs text-slate-400 uppercase tracking-wider">Premium</p>
                                                <p className="font-['Manrope',sans-serif] font-bold text-lg text-slate-900">{car.name}</p>
                                            </div>
                                            <p className="text-xs text-slate-500">{car.brand} • {car.category}</p>
                                        </label>

                                        <label
                                            onClick={() => setData('vehicle_category', 'Family')}
                                            className={`p-6 rounded-2xl border cursor-pointer transition-all flex flex-col gap-3 ${
                                                data.vehicle_category === 'Family' || data.vehicle_category === 'MPV'
                                                    ? 'bg-blue-50/80 border-[#003c90] shadow-sm'
                                                    : 'bg-white border-slate-200 hover:border-slate-300'
                                            }`}
                                        >
                                            <span className="material-symbols-outlined text-[#003c90] text-3xl">group</span>
                                            <div>
                                                <p className="font-bold text-xs text-slate-400 uppercase tracking-wider">Spacious</p>
                                                <p className="font-['Manrope',sans-serif] font-bold text-lg text-slate-900">Family Van / MPV</p>
                                            </div>
                                            <p className="text-xs text-slate-500">Innova Zenix / Alphard</p>
                                        </label>
                                    </div>
                                </div>

                                {/* Step 2: Service Type */}
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-4">
                                        <span className="w-10 h-10 rounded-full bg-[#d9e2ff] text-[#003c90] flex items-center justify-center font-bold text-base">
                                            2
                                        </span>
                                        <h2 className="font-['Manrope',sans-serif] font-bold text-2xl text-[#191c1d]">
                                            Service Type
                                        </h2>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <label
                                            onClick={() => setData('service_type', 'driver')}
                                            className={`flex-1 flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-all ${
                                                data.service_type === 'driver'
                                                    ? 'bg-blue-50/80 border-[#003c90] shadow-sm'
                                                    : 'bg-[#f3f4f5] border-transparent hover:bg-slate-200/60'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="service_type"
                                                checked={data.service_type === 'driver'}
                                                onChange={() => {}}
                                                className="w-5 h-5 text-[#003c90]"
                                            />
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm text-slate-900">
                                                    With Professional Driver (+{formatRupiah(driverDailyFee)}/day)
                                                </span>
                                                <span className="text-xs text-slate-500">Includes fuel and local expertise</span>
                                            </div>
                                        </label>

                                        <label
                                            onClick={() => setData('service_type', 'self')}
                                            className={`flex-1 flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-all ${
                                                data.service_type === 'self'
                                                    ? 'bg-blue-50/80 border-[#003c90] shadow-sm'
                                                    : 'bg-[#f3f4f5] border-transparent hover:bg-slate-200/60'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="service_type"
                                                checked={data.service_type === 'self'}
                                                onChange={() => {}}
                                                className="w-5 h-5 text-[#003c90]"
                                            />
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm text-slate-900">Self-Drive (Lepas Kunci)</span>
                                                <span className="text-xs text-slate-500">Complete freedom to explore (SIM A / IDP)</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {/* Step 3: Rental Details */}
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-4">
                                        <span className="w-10 h-10 rounded-full bg-[#d9e2ff] text-[#003c90] flex items-center justify-center font-bold text-base">
                                            3
                                        </span>
                                        <h2 className="font-['Manrope',sans-serif] font-bold text-2xl text-[#191c1d]">
                                            Rental Details
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 text-xs">
                                        {/* Pick up location */}
                                        <div className="flex flex-col gap-2">
                                            <label className="font-bold text-slate-700 uppercase tracking-wider">Pick-up Location</label>
                                            <div className="relative">
                                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#003c90]">
                                                    location_on
                                                </span>
                                                <select
                                                    value={data.pickup_location}
                                                    onChange={(e) => setData('pickup_location', e.target.value)}
                                                    className="w-full bg-[#f3f4f5] border-b-2 border-slate-300 p-4 pl-12 font-semibold text-slate-900 focus:outline-none focus:border-[#003c90] rounded-xl"
                                                >
                                                    <option>Lombok International Airport (LOP)</option>
                                                    <option>Mataram City Center</option>
                                                    <option>Senggigi Area</option>
                                                    <option>Kuta Lombok</option>
                                                    <option>Bangsal Harbor (Gili Access)</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Pick up datetime */}
                                        <div className="flex flex-col gap-2">
                                            <label className="font-bold text-slate-700 uppercase tracking-wider">Pick-up Date &amp; Time</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <input
                                                    type="date"
                                                    required
                                                    value={data.pickup_date}
                                                    onChange={(e) => setData('pickup_date', e.target.value)}
                                                    className="bg-[#f3f4f5] border-b-2 border-slate-300 p-4 font-semibold text-slate-900 focus:outline-none focus:border-[#003c90] rounded-xl"
                                                />
                                                <input
                                                    type="time"
                                                    required
                                                    value={data.pickup_time}
                                                    onChange={(e) => setData('pickup_time', e.target.value)}
                                                    className="bg-[#f3f4f5] border-b-2 border-slate-300 p-4 font-semibold text-slate-900 focus:outline-none focus:border-[#003c90] rounded-xl"
                                                />
                                            </div>
                                        </div>

                                        {/* Drop off location */}
                                        <div className="flex flex-col gap-2">
                                            <label className="font-bold text-slate-700 uppercase tracking-wider">Drop-off Location</label>
                                            <div className="relative">
                                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#954a00]">
                                                    fmd_bad
                                                </span>
                                                <select
                                                    value={data.dropoff_location}
                                                    onChange={(e) => setData('dropoff_location', e.target.value)}
                                                    className="w-full bg-[#f3f4f5] border-b-2 border-slate-300 p-4 pl-12 font-semibold text-slate-900 focus:outline-none focus:border-[#003c90] rounded-xl"
                                                >
                                                    <option>Lombok International Airport (LOP)</option>
                                                    <option>Mataram City Center</option>
                                                    <option>Senggigi Area</option>
                                                    <option>Kuta Lombok</option>
                                                    <option>Bangsal Harbor (Gili Access)</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Drop off datetime */}
                                        <div className="flex flex-col gap-2">
                                            <label className="font-bold text-slate-700 uppercase tracking-wider">Drop-off Date &amp; Time</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <input
                                                    type="date"
                                                    required
                                                    value={data.dropoff_date}
                                                    onChange={(e) => setData('dropoff_date', e.target.value)}
                                                    className="bg-[#f3f4f5] border-b-2 border-slate-300 p-4 font-semibold text-slate-900 focus:outline-none focus:border-[#003c90] rounded-xl"
                                                />
                                                <input
                                                    type="time"
                                                    required
                                                    value={data.dropoff_time}
                                                    onChange={(e) => setData('dropoff_time', e.target.value)}
                                                    className="bg-[#f3f4f5] border-b-2 border-slate-300 p-4 font-semibold text-slate-900 focus:outline-none focus:border-[#003c90] rounded-xl"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 4: Personal Information */}
                                <div className="flex flex-col gap-6 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <span className="w-10 h-10 rounded-full bg-[#d9e2ff] text-[#003c90] flex items-center justify-center font-bold text-base">
                                            4
                                        </span>
                                        <h2 className="font-['Manrope',sans-serif] font-bold text-2xl text-[#191c1d]">
                                            Personal Information
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-xs">
                                        <div className="flex flex-col gap-2">
                                            <label className="font-bold text-slate-700">Full Name (as in KTP / Passport)</label>
                                            <input
                                                type="text"
                                                required
                                                value={data.customer_name}
                                                onChange={(e) => setData('customer_name', e.target.value)}
                                                placeholder="John Doe"
                                                className="w-full bg-[#f8f9fa] border-b border-slate-300 p-3.5 text-slate-900 outline-none focus:border-[#003c90]"
                                            />
                                            {errors.customer_name && <p className="text-red-500 font-semibold">{errors.customer_name}</p>}
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="font-bold text-slate-700">Email Address</label>
                                            <input
                                                type="email"
                                                required
                                                value={data.customer_email}
                                                onChange={(e) => setData('customer_email', e.target.value)}
                                                placeholder="john@example.com"
                                                className="w-full bg-[#f8f9fa] border-b border-slate-300 p-3.5 text-slate-900 outline-none focus:border-[#003c90]"
                                            />
                                            {errors.customer_email && <p className="text-red-500 font-semibold">{errors.customer_email}</p>}
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="font-bold text-slate-700">Phone / WhatsApp Number</label>
                                            <div className="flex gap-2">
                                                <span className="bg-slate-200 px-3 flex items-center rounded-lg font-bold text-slate-700">
                                                    +62
                                                </span>
                                                <input
                                                    type="tel"
                                                    required
                                                    value={data.customer_phone}
                                                    onChange={(e) => setData('customer_phone', e.target.value)}
                                                    placeholder="812 3456 789"
                                                    className="w-full bg-[#f8f9fa] border-b border-slate-300 p-3.5 text-slate-900 outline-none focus:border-[#003c90]"
                                                />
                                            </div>
                                            {errors.customer_phone && <p className="text-red-500 font-semibold">{errors.customer_phone}</p>}
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="font-bold text-slate-700">Country of Origin</label>
                                            <input
                                                type="text"
                                                value={data.country_of_origin}
                                                onChange={(e) => setData('country_of_origin', e.target.value)}
                                                placeholder="Indonesia / Australia"
                                                className="w-full bg-[#f8f9fa] border-b border-slate-300 p-3.5 text-slate-900 outline-none focus:border-[#003c90]"
                                            />
                                        </div>
                                    </div>

                                    {/* Passport / ID Upload */}
                                    <div className="mt-4">
                                        <label className="font-bold text-slate-700 block mb-3 text-xs">
                                            Upload Passport Photo / SIM A / ID
                                        </label>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            accept="image/*,.pdf"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={handleDrop}
                                            className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-[#f8f9fa] hover:bg-blue-50/50 hover:border-[#003c90] transition-all cursor-pointer group"
                                        >
                                            {idFilePreview ? (
                                                <div className="flex flex-col items-center gap-2">
                                                    <img src={idFilePreview} alt="ID Preview" className="h-24 object-contain rounded-lg" />
                                                    <p className="font-bold text-xs text-[#003c90]">Document Attached</p>
                                                </div>
                                            ) : (
                                                <>
                                                    <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-[#003c90] transition-colors">
                                                        cloud_upload
                                                    </span>
                                                    <div className="text-center">
                                                        <p className="font-bold text-xs text-slate-900">Click to upload or drag and drop</p>
                                                        <p className="text-[11px] text-slate-400">PNG, JPG or PDF (max 5MB)</p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Step 5: Payment Method */}
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-4">
                                        <span className="w-10 h-10 rounded-full bg-[#d9e2ff] text-[#003c90] flex items-center justify-center font-bold text-base">
                                            5
                                        </span>
                                        <h2 className="font-['Manrope',sans-serif] font-bold text-2xl text-[#191c1d]">
                                            Payment Method
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                                        <label
                                            onClick={() => setData('payment_method', 'cc')}
                                            className={`p-6 rounded-2xl border cursor-pointer transition-all flex flex-col items-center gap-2 ${
                                                data.payment_method === 'cc'
                                                    ? 'bg-blue-50/80 border-[#003c90] shadow-sm'
                                                    : 'bg-white border-slate-200 hover:border-slate-300'
                                            }`}
                                        >
                                            <span className="material-symbols-outlined text-slate-700 text-2xl">credit_card</span>
                                            <span className="font-bold text-slate-900">Credit Card</span>
                                        </label>

                                        <label
                                            onClick={() => setData('payment_method', 'bank')}
                                            className={`p-6 rounded-2xl border cursor-pointer transition-all flex flex-col items-center gap-2 ${
                                                data.payment_method === 'bank'
                                                    ? 'bg-blue-50/80 border-[#003c90] shadow-sm'
                                                    : 'bg-white border-slate-200 hover:border-slate-300'
                                            }`}
                                        >
                                            <span className="material-symbols-outlined text-slate-700 text-2xl">account_balance</span>
                                            <span className="font-bold text-slate-900">Bank Transfer</span>
                                        </label>

                                        <label
                                            onClick={() => setData('payment_method', 'ewallet')}
                                            className={`p-6 rounded-2xl border cursor-pointer transition-all flex flex-col items-center gap-2 ${
                                                data.payment_method === 'ewallet'
                                                    ? 'bg-blue-50/80 border-[#003c90] shadow-sm'
                                                    : 'bg-white border-slate-200 hover:border-slate-300'
                                            }`}
                                        >
                                            <span className="material-symbols-outlined text-slate-700 text-2xl">account_balance_wallet</span>
                                            <span className="font-bold text-slate-900">GoPay / OVO / QRIS</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Finalize & Submit */}
                                <div className="flex flex-col gap-6 pt-6 border-t border-slate-200">
                                    <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-600">
                                        <input
                                            type="checkbox"
                                            required
                                            checked={data.agree_terms}
                                            onChange={(e) => setData('agree_terms', e.target.checked)}
                                            className="mt-0.5 w-4 h-4 text-[#003c90] rounded"
                                        />
                                        <span>
                                            I agree to the <a href="/terms-and-conditions" target="_blank" className="text-[#003c90] font-bold underline">Terms &amp; Conditions</a>, including insurance policies and local driving regulations of Lombok Auto Rent.
                                        </span>
                                    </label>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-[#003c90] hover:bg-[#0f52ba] text-white py-5 rounded-full font-['Manrope',sans-serif] font-bold text-lg shadow-lg shadow-[#003c90]/25 transition-all active:scale-[0.99] uppercase tracking-wider"
                                    >
                                        Confirm Booking Reservation
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Sidebar Column: Booking Summary */}
                        <aside className="lg:col-span-4 sticky top-24">
                            <div className="bg-[#edeeef] rounded-3xl p-8 flex flex-col gap-6 shadow-sm border border-slate-200/80">
                                <h3 className="font-['Manrope',sans-serif] font-bold text-2xl text-[#191c1d]">
                                    Booking Summary
                                </h3>

                                <div className="space-y-4">
                                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-200">
                                        <img src={car.image_url} alt={car.name} className="w-full h-full object-cover" />
                                    </div>

                                    <div>
                                        <h4 className="font-['Manrope',sans-serif] font-bold text-xl text-[#003c90]">
                                            {car.name}
                                        </h4>
                                        <p className="text-xs text-slate-500 font-semibold mt-0.5">
                                            {car.transmission} • {car.capacity_passengers} Seats • {car.fuel_type}
                                        </p>
                                    </div>

                                    <div className="border-t border-slate-300 pt-4 space-y-3 text-xs text-slate-600">
                                        <div className="flex justify-between">
                                            <span>Rental Duration</span>
                                            <span className="font-bold text-slate-900">{days} Days</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Daily Rate</span>
                                            <span className="font-bold text-slate-900">{formatRupiah(car.price_per_day)}</span>
                                        </div>
                                        {data.service_type === 'driver' && (
                                            <div className="flex justify-between text-[#003c90]">
                                                <span>Driver Allowance ({days} Days × {formatRupiah(driverDailyFee)})</span>
                                                <span className="font-bold">{formatRupiah(driverDailyFee * days)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-emerald-700 font-semibold">
                                            <span>Delivery Fee (Airport LOP)</span>
                                            <span className="font-bold">FREE</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-slate-300 pt-4 flex justify-between items-center">
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Estimated</p>
                                            <p className="font-['Manrope',sans-serif] font-extrabold text-3xl text-[#954a00]">
                                                {formatRupiah(grandTotal)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
