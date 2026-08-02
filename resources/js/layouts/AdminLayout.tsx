import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
    const { auth } = usePage().props as any;
    const currentPath = usePage().url;

    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
        { name: 'Fleet Management', path: '/admin/fleet', icon: 'directions_car' },
        { name: 'Bookings', path: '/admin/bookings', icon: 'calendar_month' },
        { name: 'Customers', path: '/admin/customers', icon: 'person' },
        { name: 'Blog', path: '/admin/blog', icon: 'newspaper' },
    ];

    const isActive = (path: string) => {
        return currentPath.startsWith(path);
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d] font-['Hanken_Grotesk',sans-serif]">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-72 bg-white z-50 flex flex-col shadow-[1px_0_8px_rgba(0,0,0,0.03)] border-r border-slate-200/80">
                {/* Brand */}
                <div className="p-7 flex items-center gap-3 border-b border-slate-100">
                    <img
                        alt="Lombok Auto Rent"
                        className="h-8 w-auto object-contain"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR0TN2IkHWXfHYFlqUflDmlCimNzy1CdX10keNdloMeMNyCocZZRyMjB6Bz8IB_fM5HPdbeapfxwYDkIoAV8pA3Bhkwx5WU95ibttVrAHvVxii5cwcDp4CzcRJkaJqKtwaXsCvg0knbuk5fXvnJJaIRuRQ2KqfN9EStvbFSq0UwuzKkH96tZ3PbLvLy6RRXAKs8LZ97j6u2Ur9WpubmS27soYqzyRYTdtRLBM9JL-wQBc3Abo2u3NZGMBCc4TgU11spA"
                    />
                    <span className="font-['Manrope',sans-serif] font-bold text-lg text-[#003c90]">
                        Lombok Auto
                    </span>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                    {navItems.map((item) => {
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                                    active
                                        ? 'bg-[#003c90] text-white shadow-md'
                                        : 'text-[#434653] hover:bg-[#f3f4f5] hover:text-[#191c1d]'
                                }`}
                            >
                                <span className="material-symbols-outlined mr-3 text-xl">{item.icon}</span>
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}

                    <div className="pt-6 mt-6 border-t border-slate-200/60">
                        <Link
                            href="/"
                            className="flex items-center px-4 py-3 rounded-xl text-xs font-bold text-slate-500 hover:bg-[#f3f4f5] hover:text-[#003c90] transition-all"
                        >
                            <span className="material-symbols-outlined mr-3 text-xl">open_in_new</span>
                            <span>View Main Website</span>
                        </Link>
                    </div>
                </nav>

                {/* User Footer Profile */}
                <div className="p-4 border-t border-slate-100 mt-auto bg-slate-50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-9 h-9 rounded-full bg-[#003c90] text-white flex items-center justify-center font-bold text-sm">
                                {auth?.user?.name ? auth.user.name.charAt(0) : 'A'}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-xs font-bold text-[#191c1d] truncate">
                                    {auth?.user?.name || 'Admin User'}
                                </p>
                                <p className="text-[10px] text-slate-400 truncate">
                                    {auth?.user?.email || 'admin@lombokautorent.com'}
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                            title="Log Out"
                        >
                            <span className="material-symbols-outlined text-lg">logout</span>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Section */}
            <div className="pl-72">
                {/* Header Navbar */}
                <header className="fixed top-0 left-72 right-0 h-20 bg-white/90 backdrop-blur-xl z-40 px-8 flex items-center justify-between border-b border-slate-200/80 shadow-[0_1px_8px_rgba(0,0,0,0.02)]">
                    <div className="flex-1 max-w-md">
                        <div className="relative flex items-center">
                            <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-lg">
                                search
                            </span>
                            <input
                                type="text"
                                placeholder="Search bookings, vehicles, customers..."
                                className="w-full bg-[#f3f4f5] border-none rounded-full py-2.5 pl-11 pr-4 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-[#003c90]/20 outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                            <span className="material-symbols-outlined text-xl">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                        </button>
                        <div className="h-6 w-[1px] bg-slate-200" />
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-[#003c90] bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                                Super Admin
                            </span>
                        </div>
                    </div>
                </header>

                {/* Content Body */}
                <main className="pt-24 p-8 min-h-screen">{children}</main>
            </div>
        </div>
    );
}

export default AdminLayout;
