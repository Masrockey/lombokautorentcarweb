import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AdminLayout } from '../../../layouts/AdminLayout';
import { CustomerUser } from '../../../types/lombok';

interface AdminCustomerShowProps {
    customer: CustomerUser;
}

export default function AdminCustomerShow({ customer }: AdminCustomerShowProps) {
    const formatRupiah = (number: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(number);
    };

    return (
        <AdminLayout title={`Customer Profile - ${customer.name}`}>
            <Head title={`Profile - ${customer.name}`} />

            <div className="space-y-8 max-w-5xl">
                <Link href="/admin/customers" className="inline-flex items-center space-x-1 text-xs font-bold text-[#0f52ba] hover:underline">
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    <span>Back to Customer Directory</span>
                </Link>

                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
                    <img
                        src={customer.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                        alt={customer.name}
                        className="w-24 h-24 rounded-full object-cover border-2 border-[#0f52ba] shrink-0"
                    />
                    <div className="flex-1">
                        <div className="flex items-center space-x-3">
                            <h2 className="font-['Manrope',sans-serif] font-extrabold text-2xl text-slate-900">{customer.name}</h2>
                            <span className="bg-blue-50 text-[#0f52ba] px-2.5 py-0.5 rounded text-[10px] font-bold uppercase">
                                Verified Customer
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs text-slate-600">
                            <div>
                                <span className="block text-slate-400 font-bold">Email Address</span>
                                <span className="font-semibold text-slate-800">{customer.email}</span>
                            </div>
                            <div>
                                <span className="block text-slate-400 font-bold">Phone Number</span>
                                <span className="font-semibold text-slate-800">{customer.phone || 'N/A'}</span>
                            </div>
                            <div>
                                <span className="block text-slate-400 font-bold">Driver License (SIM/IDP)</span>
                                <span className="font-semibold text-slate-800">{customer.driver_license_number || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking History Table */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <h3 className="font-['Manrope',sans-serif] font-bold text-lg text-slate-900 mb-4">Rental Booking History</h3>

                    {customer.bookings && customer.bookings.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
                                        <th className="p-3">Code</th>
                                        <th className="p-3">Vehicle</th>
                                        <th className="p-3">Pick Up</th>
                                        <th className="p-3">Drop Off</th>
                                        <th className="p-3">Amount</th>
                                        <th className="p-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 font-medium">
                                    {customer.bookings.map((b) => (
                                        <tr key={b.id}>
                                            <td className="p-3 font-bold text-slate-900">{b.booking_code}</td>
                                            <td className="p-3 text-slate-800">{b.car?.name}</td>
                                            <td className="p-3 text-slate-600">{b.pickup_location}</td>
                                            <td className="p-3 text-slate-600">{b.dropoff_location}</td>
                                            <td className="p-3 font-bold text-[#003c90]">{formatRupiah(b.total_price)}</td>
                                            <td className="p-3">
                                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                                                    {b.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-slate-500 text-xs">No booking records found for this customer.</p>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
