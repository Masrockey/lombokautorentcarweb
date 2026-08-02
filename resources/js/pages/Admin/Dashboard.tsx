import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../layouts/AdminLayout';
import { Car, Booking } from '../../types/lombok';

interface DashboardProps {
    stats?: {
        total_cars?: number;
        available_cars?: number;
        rented_cars?: number;
        total_bookings?: number;
        pending_bookings?: number;
        confirmed_bookings?: number;
        total_revenue?: number;
        totalCars?: number;
        availableCars?: number;
        rentedCars?: number;
        totalBookings?: number;
        pendingBookings?: number;
        confirmedBookings?: number;
        totalRevenue?: number;
    };
    recent_bookings?: Booking[];
    recentBookings?: Booking[];
    featured_cars?: Car[];
    carsList?: Car[];
}

export default function Dashboard(props: DashboardProps) {
    const stats = props.stats || {};
    const totalCars = stats.total_cars ?? stats.totalCars ?? 0;
    const availableCars = stats.available_cars ?? stats.availableCars ?? 0;
    const rentedCars = stats.rented_cars ?? stats.rentedCars ?? 0;
    const totalBookings = stats.total_bookings ?? stats.totalBookings ?? 0;
    const pendingBookings = stats.pending_bookings ?? stats.pendingBookings ?? 0;
    const totalRevenue = stats.total_revenue ?? stats.totalRevenue ?? 0;

    const recentBookingsList = props.recent_bookings || props.recentBookings || [];

    const formatRupiah = (number: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(number);
    };

    const fleetCapacityPercent = totalCars > 0 ? Math.round((availableCars / totalCars) * 100) : 100;

    return (
        <AdminLayout>
            <Head title="Admin Dashboard - Lombok Auto Rent" />

            <div className="flex flex-col w-full gap-8">
                {/* Header & Performance Summary Cards */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Revenue Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-6xl text-[#003c90]">payments</span>
                        </div>
                        <p className="font-['Hanken_Grotesk',sans-serif] font-bold text-xs text-slate-400 uppercase tracking-widest mb-1">
                            Total Revenue
                        </p>
                        <h3 className="font-['Manrope',sans-serif] font-extrabold text-2xl sm:text-3xl text-[#003c90] mb-2">
                            {formatRupiah(totalRevenue)}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                            <span className="material-symbols-outlined text-sm">trending_up</span>
                            <span>+12.4% <span className="text-slate-400 font-normal">vs last month</span></span>
                        </div>
                    </div>

                    {/* Active Bookings Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-6xl text-[#954a00]">calendar_today</span>
                        </div>
                        <p className="font-['Hanken_Grotesk',sans-serif] font-bold text-xs text-slate-400 uppercase tracking-widest mb-1">
                            Active Bookings
                        </p>
                        <h3 className="font-['Manrope',sans-serif] font-extrabold text-3xl text-slate-900 mb-2">
                            {totalBookings}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <div className="h-1.5 w-20 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[#fc9342] w-3/4 rounded-full" />
                            </div>
                            <span className="font-bold text-[#954a00]">{pendingBookings} Pending</span>
                        </div>
                    </div>

                    {/* Fleet Capacity Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-6xl text-[#003c90]">directions_car</span>
                        </div>
                        <p className="font-['Hanken_Grotesk',sans-serif] font-bold text-xs text-slate-400 uppercase tracking-widest mb-1">
                            Fleet Capacity
                        </p>
                        <h3 className="font-['Manrope',sans-serif] font-extrabold text-3xl text-slate-900 mb-2">
                            {totalCars} Units
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-[#003c90] font-bold">
                            <span className="material-symbols-outlined text-sm">verified</span>
                            <span>{availableCars} Ready for Rent</span>
                        </div>
                    </div>

                    {/* Rented Units Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-6xl text-slate-400">person_add</span>
                        </div>
                        <p className="font-['Hanken_Grotesk',sans-serif] font-bold text-xs text-slate-400 uppercase tracking-widest mb-1">
                            Rented Units
                        </p>
                        <h3 className="font-['Manrope',sans-serif] font-extrabold text-3xl text-slate-900 mb-2">
                            {rentedCars} Units
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
                            <span className="material-symbols-outlined text-sm text-emerald-600">arrow_upward</span>
                            <span>On the road</span>
                        </div>
                    </div>
                </section>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Bookings Table */}
                    <section className="lg:col-span-2 flex flex-col gap-4">
                        <div className="flex items-end justify-between px-1">
                            <div>
                                <span className="font-bold text-xs text-[#003c90] uppercase tracking-widest">
                                    Operational Overview
                                </span>
                                <h2 className="font-['Manrope',sans-serif] font-bold text-xl text-slate-900 mt-0.5">
                                    Recent Bookings
                                </h2>
                            </div>
                            <Link
                                href="/admin/bookings"
                                className="flex items-center gap-1 text-xs font-bold text-[#003c90] hover:underline"
                            >
                                <span>View all transactions</span>
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </Link>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#f3f4f5] border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        <th className="px-6 py-3.5">Customer</th>
                                        <th className="px-6 py-3.5">Vehicle</th>
                                        <th className="px-6 py-3.5">Pickup Location</th>
                                        <th className="px-6 py-3.5">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-xs">
                                    {recentBookingsList.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-slate-400 font-semibold">
                                                No recent bookings registered yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        recentBookingsList.map((b) => (
                                            <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-full bg-[#003c90]/10 text-[#003c90] flex items-center justify-center font-bold">
                                                            {b.customer_name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-900">{b.customer_name}</p>
                                                            <p className="text-[10px] text-slate-400">#{b.booking_code}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-slate-800">
                                                    {b.car?.name}
                                                </td>
                                                <td className="px-6 py-4 text-slate-600 truncate max-w-xs">
                                                    {b.pickup_location}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                            b.status === 'confirmed'
                                                                ? 'bg-emerald-100 text-emerald-800'
                                                                : b.status === 'pending'
                                                                ? 'bg-amber-100 text-amber-800'
                                                                : 'bg-slate-100 text-slate-700'
                                                        }`}
                                                    >
                                                        {b.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Fleet Status Section */}
                    <section className="flex flex-col gap-4">
                        <div className="px-1">
                            <span className="font-bold text-xs text-[#954a00] uppercase tracking-widest">
                                Inventory Watch
                            </span>
                            <h2 className="font-['Manrope',sans-serif] font-bold text-xl text-slate-900 mt-0.5">
                                Fleet Availability
                            </h2>
                        </div>

                        <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200/80 space-y-6">
                            {/* Semi-circular Progress Chart (Inline SVG) */}
                            <div className="relative w-48 h-24 overflow-hidden mx-auto">
                                <svg className="w-full h-full transform" viewBox="0 0 100 50">
                                    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#edeeef" strokeWidth="8" strokeLinecap="round" />
                                    <path d="M 10 50 A 40 40 0 0 1 80 15" fill="none" stroke="#003c90" strokeWidth="8" strokeLinecap="round" style={{ strokeDasharray: 126, strokeDashoffset: 20 }} />
                                </svg>
                                <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end h-full">
                                    <p className="font-['Manrope',sans-serif] font-extrabold text-2xl text-slate-900">{fleetCapacityPercent}%</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Available</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-xs">
                                    <div className="flex items-center gap-3">
                                        <span className="w-3 h-3 rounded-full bg-[#003c90]" />
                                        <span className="font-semibold text-slate-800">Available Now</span>
                                    </div>
                                    <span className="font-bold text-[#003c90] text-sm">{availableCars}</span>
                                </div>

                                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-xs">
                                    <div className="flex items-center gap-3">
                                        <span className="w-3 h-3 rounded-full bg-[#fc9342]" />
                                        <span className="font-semibold text-slate-800">Currently Rented</span>
                                    </div>
                                    <span className="font-bold text-[#954a00] text-sm">{rentedCars}</span>
                                </div>

                                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-xs">
                                    <div className="flex items-center gap-3">
                                        <span className="w-3 h-3 rounded-full bg-slate-400" />
                                        <span className="font-semibold text-slate-800">Total Garage Fleet</span>
                                    </div>
                                    <span className="font-bold text-slate-900 text-sm">{totalCars}</span>
                                </div>
                            </div>

                            <Link
                                href="/admin/fleet"
                                className="w-full bg-[#003c90] hover:bg-[#0f52ba] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                            >
                                <span className="material-symbols-outlined text-base">directions_car</span>
                                <span>Manage Fleet Vehicles</span>
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </AdminLayout>
    );
}
