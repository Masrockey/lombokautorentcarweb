import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { PublicLayout } from '../../layouts/PublicLayout';

export default function Login({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <PublicLayout>
            <Head title="Admin &amp; Customer Portal Login - Lombok Auto Rent" />

            <div className="flex flex-col items-center justify-center min-h-[75vh] py-12 px-4 sm:px-8 bg-[#f8f9fa]">
                <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200/80">
                    {/* Header Logo */}
                    <div className="flex flex-col items-center text-center space-y-3 mb-8">
                        <img
                            alt="Lombok Auto Rent"
                            className="h-10 w-auto object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR0TN2IkHWXfHYFlqUflDmlCimNzy1CdX10keNdloMeMNyCocZZRyMjB6Bz8IB_fM5HPdbeapfxwYDkIoAV8pA3Bhkwx5WU95ibttVrAHvVxii5cwcDp4CzcRJkaJqKtwaXsCvg0knbuk5fXvnJJaIRuRQ2KqfN9EStvbFSq0UwuzKkH96tZ3PbLvLy6RRXAKs8LZ97j6u2Ur9WpubmS27soYqzyRYTdtRLBM9JL-wQBc3Abo2u3NZGMBCc4TgU11spA"
                        />
                        <h1 className="font-['Manrope',sans-serif] font-extrabold text-2xl text-[#003c90]">
                            Welcome Back
                        </h1>
                        <p className="text-xs text-[#434653]">
                            Sign in to access your Lombok Auto Rent portal &amp; reservations.
                        </p>
                    </div>

                    {status && (
                        <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs p-3.5 rounded-xl font-semibold text-center">
                            {status}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                        <div className="space-y-1.5">
                            <label htmlFor="email" className="font-bold text-[#191c1d]">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                autoFocus
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="name@example.com"
                                className="w-full bg-[#f3f4f5] border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#191c1d] focus:outline-none focus:border-[#003c90] focus:ring-1 focus:ring-[#003c90] font-semibold"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-[11px] font-semibold pt-0.5">{errors.email}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                                <label htmlFor="password" className="font-bold text-[#191c1d]">
                                    Password
                                </label>
                                <Link href="/forgot-password" className="text-[11px] text-[#003c90] font-bold hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <input
                                id="password"
                                type="password"
                                required
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-[#f3f4f5] border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#191c1d] focus:outline-none focus:border-[#003c90] focus:ring-1 focus:ring-[#003c90] font-semibold"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-[11px] font-semibold pt-0.5">{errors.password}</p>
                            )}
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="w-4 h-4 rounded text-[#003c90] border-slate-300 focus:ring-[#003c90]"
                            />
                            <label htmlFor="remember" className="text-slate-600 font-semibold cursor-pointer">
                                Remember me for 30 days
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#003c90] hover:bg-[#0f52ba] text-white py-3.5 rounded-full font-['Manrope',sans-serif] font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
                        >
                            {processing ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
                        Need quick assistance?{' '}
                        <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="text-[#003c90] font-bold hover:underline">
                            Contact Customer Support
                        </a>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
