import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';
import { Booking } from '../../../types/lombok';

interface BookingsProps {
    bookings: Booking[];
}

export default function BookingsIndex({ bookings }: BookingsProps) {
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleStatusChange = (bookingId: number, status: string) => {
        router.patch(`/admin/bookings/${bookingId}`, { status }, {
            onSuccess: () => {
                if (selectedBooking && selectedBooking.id === bookingId) {
                    setSelectedBooking((prev) => prev ? { ...prev, status: status as any } : null);
                }
            }
        });
    };

    const formatRupiah = (number: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(number);
    };

    const filteredBookings = bookings.filter((b) => {
        const matchesStatus = statusFilter === 'all' || b.status.toLowerCase() === statusFilter.toLowerCase();
        const matchesSearch =
            b.booking_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.customer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (b.car?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const activeCount = bookings.filter((b) => b.status === 'confirmed' || b.status === 'active').length;
    const pendingCount = bookings.filter((b) => b.status === 'pending').length;

    return (
        <AdminLayout>
            <Head title="Booking Management - Lombok Auto Rent" />

            <div className="flex flex-col w-full gap-8">
                {/* Header & Stats Overview */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[#003c90] font-bold text-xs uppercase tracking-widest">
                            <span className="w-8 h-[2px] bg-[#003c90]" />
                            Operations Hub
                        </div>
                        <h1 className="font-['Manrope',sans-serif] font-extrabold text-3xl sm:text-4xl text-slate-900">
                            Booking Management
                        </h1>
                        <p className="text-sm text-slate-500 max-w-xl">
                            Oversee your fleet's schedule, manage client reservations, and optimize your high-season availability in one centralized console.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 min-w-[160px] flex flex-col gap-1">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Today</span>
                            <span className="font-['Manrope',sans-serif] font-extrabold text-2xl text-[#003c90]">{activeCount}</span>
                            <div className="w-full h-1 bg-slate-100 rounded-full mt-2 overflow-hidden">
                                <div className="bg-[#003c90] h-full w-[70%] rounded-full" />
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 min-w-[160px] flex flex-col gap-1">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">New Requests</span>
                            <span className="font-['Manrope',sans-serif] font-extrabold text-2xl text-[#954a00]">{pendingCount}</span>
                            <div className="flex items-center gap-1 text-[#954a00] text-[10px] font-bold bg-amber-50 px-2 py-0.5 rounded-full mt-2 w-fit">
                                <span className="material-symbols-outlined text-[12px]">trending_up</span> +12%
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters & Actions Bar */}
                <div className="bg-[#f3f4f5] p-3 rounded-2xl flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3 flex-1">
                        <div className="relative min-w-[240px]">
                            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base">
                                search
                            </span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by ID, customer, car..."
                                className="w-full bg-white font-semibold text-xs text-slate-800 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#003c90]"
                            />
                        </div>

                        <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-base pointer-events-none">
                                filter_list
                            </span>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="bg-white font-bold text-xs text-slate-700 pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 outline-none cursor-pointer"
                            >
                                <option value="all">All Statuses</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="pending">Pending</option>
                                <option value="active">In Progress / Active</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Booking Table Section */}
                <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-200/80">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f3f4f5] border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                    <th className="px-6 py-4">Booking ID</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Vehicle</th>
                                    <th className="px-6 py-4">Schedule</th>
                                    <th className="px-6 py-4">Total</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs">
                                {filteredBookings.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-10 text-center text-slate-400 font-semibold">
                                            No reservations found matching your criteria.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredBookings.map((b) => (
                                        <tr key={b.id} className="hover:bg-slate-50/80 transition-colors group">
                                            <td className="px-6 py-5 font-mono text-xs text-[#003c90] font-bold">
                                                #{b.booking_code}
                                            </td>

                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-[#003c90]/10 text-[#003c90] flex items-center justify-center font-bold text-xs shrink-0">
                                                        {b.customer_name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                                                    </div>
                                                    <div className="flex flex-col overflow-hidden">
                                                        <span className="font-bold text-slate-900 text-xs">{b.customer_name}</span>
                                                        <span className="text-[11px] text-slate-400 truncate">{b.customer_email}</span>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-900 text-xs">{b.car?.name}</span>
                                                    <span className="text-[11px] text-slate-400">{b.car?.category} • {b.car?.transmission}</span>
                                                </div>
                                            </td>

                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] uppercase text-slate-400 font-bold">Pick-up</span>
                                                        <span className="text-xs font-bold text-slate-800">
                                                            {new Date(b.pickup_datetime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                        </span>
                                                    </div>
                                                    <span className="material-symbols-outlined text-slate-300 text-sm">arrow_forward</span>
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] uppercase text-slate-400 font-bold">Return</span>
                                                        <span className="text-xs font-bold text-slate-800">
                                                            {new Date(b.dropoff_datetime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-5 font-['Manrope',sans-serif] font-bold text-sm text-[#954a00]">
                                                {formatRupiah(b.total_price)}
                                            </td>

                                            <td className="px-6 py-5">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                        b.status === 'confirmed'
                                                            ? 'bg-emerald-100 text-emerald-800'
                                                            : b.status === 'pending'
                                                            ? 'bg-amber-100 text-amber-800'
                                                            : b.status === 'active'
                                                            ? 'bg-blue-100 text-[#003c90]'
                                                            : b.status === 'completed'
                                                            ? 'bg-slate-100 text-slate-700'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {b.status}
                                                </span>
                                            </td>

                                            <td className="px-6 py-5 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={() => setSelectedBooking(b)}
                                                        className="p-2 text-slate-400 hover:text-[#003c90] hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="View Reservation Details"
                                                    >
                                                        <span className="material-symbols-outlined text-lg">visibility</span>
                                                    </button>
                                                    {b.status === 'pending' && (
                                                        <button
                                                            onClick={() => handleStatusChange(b.id, 'confirmed')}
                                                            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                            title="Confirm Reservation"
                                                        >
                                                            <span className="material-symbols-outlined text-lg">check_circle</span>
                                                        </button>
                                                    )}
                                                    {b.status !== 'cancelled' && (
                                                        <button
                                                            onClick={() => handleStatusChange(b.id, 'cancelled')}
                                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Cancel Reservation"
                                                        >
                                                            <span className="material-symbols-outlined text-lg">cancel</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* View Reservation Details Modal */}
            {selectedBooking && (
                <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl space-y-6">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                            <div>
                                <span className="font-mono text-xs font-bold text-[#003c90]">#{selectedBooking.booking_code}</span>
                                <h3 className="font-['Manrope',sans-serif] font-bold text-xl text-slate-900">Reservation Details</h3>
                            </div>
                            <button onClick={() => setSelectedBooking(null)} className="text-slate-400 hover:text-slate-700">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="space-y-4 text-xs">
                            <div className="bg-slate-50 p-4 rounded-2xl space-y-2">
                                <p className="font-bold text-slate-700">Customer Info</p>
                                <div className="grid grid-cols-2 gap-2 text-slate-600">
                                    <div>Name: <span className="font-semibold text-slate-900">{selectedBooking.customer_name}</span></div>
                                    <div>Phone: <span className="font-semibold text-slate-900">{selectedBooking.customer_phone}</span></div>
                                    <div className="col-span-2">Email: <span className="font-semibold text-slate-900">{selectedBooking.customer_email}</span></div>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-2xl space-y-2">
                                <p className="font-bold text-slate-700">Vehicle Info</p>
                                <div className="grid grid-cols-2 gap-2 text-slate-600">
                                    <div>Vehicle: <span className="font-semibold text-slate-900">{selectedBooking.car?.name}</span></div>
                                    <div>Rate: <span className="font-semibold text-[#954a00]">{formatRupiah(selectedBooking.car?.price_per_day || 0)}/day</span></div>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-2xl space-y-2">
                                <p className="font-bold text-slate-700">Schedule &amp; Locations</p>
                                <div className="space-y-1 text-slate-600">
                                    <p>Pick-up: <span className="font-semibold text-slate-900">{selectedBooking.pickup_location}</span> ({new Date(selectedBooking.pickup_datetime).toLocaleString()})</p>
                                    <p>Drop-off: <span className="font-semibold text-slate-900">{selectedBooking.dropoff_location}</span> ({new Date(selectedBooking.dropoff_datetime).toLocaleString()})</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                <span className="font-bold text-slate-700">Total Price</span>
                                <span className="font-['Manrope',sans-serif] font-bold text-lg text-[#003c90]">{formatRupiah(selectedBooking.total_price)}</span>
                            </div>

                            <div className="pt-2 flex gap-3">
                                {selectedBooking.status === 'pending' && (
                                    <button
                                        onClick={() => handleStatusChange(selectedBooking.id, 'confirmed')}
                                        className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
                                    >
                                        Confirm Reservation
                                    </button>
                                )}
                                {selectedBooking.status !== 'cancelled' && (
                                    <button
                                        onClick={() => handleStatusChange(selectedBooking.id, 'cancelled')}
                                        className="flex-1 py-3 bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-xl"
                                    >
                                        Cancel Reservation
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
