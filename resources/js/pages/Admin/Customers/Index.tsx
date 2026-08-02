import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';
import { User } from '../../../types/lombok';

interface CustomersProps {
    customers: User[];
}

export default function CustomersIndex({ customers }: CustomersProps) {
    return (
        <AdminLayout>
            <Head title="Customer Directory - Lombok Auto Rent" />

            <div className="flex flex-col w-full gap-8">
                {/* Header Bar */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[#003c90] font-bold text-xs uppercase tracking-widest">
                            <span className="w-6 h-[2px] bg-[#003c90]" />
                            Global Relations
                        </div>
                        <h1 className="font-['Manrope',sans-serif] font-extrabold text-3xl sm:text-4xl text-slate-900">
                            Customer Directory
                        </h1>
                        <p className="text-sm text-slate-500">
                            Manage your client base and track driver license credentials for Lombok Auto Rent.
                        </p>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f3f4f5] border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                    <th className="px-6 py-4">Customer Name</th>
                                    <th className="px-6 py-4">Contact Info</th>
                                    <th className="px-6 py-4">Driver License (SIM A)</th>
                                    <th className="px-6 py-4">Role / Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs">
                                {customers.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
                                            No customers found.
                                        </td>
                                    </tr>
                                ) : (
                                    customers.map((c) => (
                                        <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-[#003c90] text-white flex items-center justify-center font-bold text-sm">
                                                        {c.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900 text-sm">{c.name}</p>
                                                        <p className="text-[10px] text-slate-400">ID: USR-{c.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-semibold text-slate-800">{c.email}</p>
                                                <p className="text-slate-500 text-[11px]">{c.phone || '-'}</p>
                                            </td>
                                            <td className="px-6 py-4 font-mono text-slate-700">
                                                {c.driver_license_number || 'Not verified'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                        c.role === 'admin'
                                                            ? 'bg-blue-100 text-[#003c90]'
                                                            : 'bg-emerald-100 text-emerald-800'
                                                    }`}
                                                >
                                                    {c.role}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
