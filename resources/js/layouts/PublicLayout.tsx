import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

interface PublicLayoutProps {
    children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { auth } = usePage().props as any;

    return (
        <div className="min-h-screen flex flex-col bg-[#f8f9fa] text-[#191c1d] font-['Hanken_Grotesk',sans-serif]">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-[#f8f9fa]/80 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
                <div className="h-20 max-w-[1280px] mx-auto px-4 sm:px-8 flex items-center justify-between">
                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <img
                            alt="Lombok Auto Rent"
                            className="h-9 w-auto object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR0TN2IkHWXfHYFlqUflDmlCimNzy1CdX10keNdloMeMNyCocZZRyMjB6Bz8IB_fM5HPdbeapfxwYDkIoAV8pA3Bhkwx5WU95ibttVrAHvVxii5cwcDp4CzcRJkaJqKtwaXsCvg0knbuk5fXvnJJaIRuRQ2KqfN9EStvbFSq0UwuzKkH96tZ3PbLvLy6RRXAKs8LZ97j6u2Ur9WpubmS27soYqzyRYTdtRLBM9JL-wQBc3Abo2u3NZGMBCc4TgU11spA"
                        />
                        <span className="font-['Manrope',sans-serif] text-xl font-bold text-[#003c90] tracking-tight">
                            Lombok Auto Rent
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden lg:flex items-center gap-10 text-sm font-semibold">
                        <Link href="/" className="text-[#003c90] font-bold">
                            Home
                        </Link>
                        <Link href="/cars" className="text-[#434653] hover:text-[#003c90] transition-colors">
                            Car List
                        </Link>
                        <Link href="/blog" className="text-[#434653] hover:text-[#003c90] transition-colors">
                            Blog
                        </Link>
                        <Link href="/contact" className="text-[#434653] hover:text-[#003c90] transition-colors">
                            Contact Us
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/cars"
                            className="hidden sm:inline-flex bg-[#fc9342] text-white px-6 py-2.5 rounded-lg font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-sm"
                        >
                            Book Now
                        </Link>

                        {/* Login / User Profile Button */}
                        <Link
                            href={auth?.user ? '/admin/dashboard' : '/login'}
                            className="w-10 h-10 rounded-full bg-[#003c90] flex items-center justify-center text-white hover:bg-[#0f52ba] transition-colors shadow-sm"
                            title={auth?.user ? 'Go to Admin Dashboard' : 'Login'}
                        >
                            <span className="material-symbols-outlined text-[20px]">person</span>
                        </Link>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 text-slate-700 hover:text-slate-900"
                        >
                            <span className="material-symbols-outlined text-2xl">
                                {mobileMenuOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg">
                        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-bold text-[#003c90]">
                            Home
                        </Link>
                        <Link href="/cars" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-semibold text-slate-700">
                            Car List
                        </Link>
                        <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-semibold text-slate-700">
                            Blog
                        </Link>
                        <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-semibold text-slate-700">
                            Contact Us
                        </Link>
                        <Link href={auth?.user ? '/admin/dashboard' : '/login'} onClick={() => setMobileMenuOpen(false)} className="block py-2 font-semibold text-[#003c90]">
                            {auth?.user ? 'Admin Dashboard' : 'Login / Masuk'}
                        </Link>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="w-full pt-20 flex-grow">{children}</main>

            {/* Footer */}
            <footer className="w-full bg-[#edeeef] text-[#191c1d] py-16 mt-20 border-t border-slate-300/60">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <img
                                alt="Lombok Auto Rent"
                                className="h-7 w-auto"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCayQONInKIBRchgngkphOyADv2D94DQeBHp09HexjPGKZIVKNfFKYhT7t9B2_CiH9BuJOd3HawdiN2vjnqiE0-SoCbMU0tAFASamfWLx9SYpIK4Mann-A8yW2thbFGBXKN0MXAIVMyQdSMXUhXpvN0qcJmz0KpW9O8Hju0ErLFR_9dYKw7Kaxif7E7BKyiFtuJYXhBgLTmvQs90wXyWk1HsG6htOoMz__CprWf1ajysF7vqMnt4rkzbdVmBIqE6QqAQ"
                            />
                            <span className="font-['Manrope',sans-serif] font-bold text-[#003c90] text-lg">
                                Lombok Auto Rent
                            </span>
                        </div>
                        <p className="text-sm text-[#434653] leading-relaxed">
                            Providing premium mobility solutions across Lombok with a focus on luxury, safety, and local expertise.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-[#003c90] hover:text-white transition-all shadow-sm">
                                <span className="material-symbols-outlined text-[18px]">share</span>
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-[#003c90] hover:text-white transition-all shadow-sm">
                                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-[#003c90] hover:text-white transition-all shadow-sm">
                                <span className="material-symbols-outlined text-[18px]">language</span>
                            </a>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-['Manrope',sans-serif] font-bold text-xs text-[#003c90] uppercase tracking-wider">Services</h4>
                        <nav className="flex flex-col gap-2 text-sm text-[#434653]">
                            <Link href="/cars" className="hover:text-[#003c90] transition-colors">Airport Transfer</Link>
                            <Link href="/cars" className="hover:text-[#003c90] transition-colors">Self Drive Rentals</Link>
                            <Link href="/cars" className="hover:text-[#003c90] transition-colors">Luxury Fleet</Link>
                            <Link href="/cars" className="hover:text-[#003c90] transition-colors">Corporate Rental</Link>
                        </nav>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-['Manrope',sans-serif] font-bold text-xs text-[#003c90] uppercase tracking-wider">Locations</h4>
                        <nav className="flex flex-col gap-2 text-sm text-[#434653]">
                            <span className="hover:text-[#003c90] transition-colors cursor-pointer">Mataram City</span>
                            <span className="hover:text-[#003c90] transition-colors cursor-pointer">Senggigi Beach</span>
                            <span className="hover:text-[#003c90] transition-colors cursor-pointer">Kuta Lombok</span>
                            <span className="hover:text-[#003c90] transition-colors cursor-pointer">Lombok Airport (LOP)</span>
                        </nav>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-['Manrope',sans-serif] font-bold text-xs text-[#003c90] uppercase tracking-wider">Contact</h4>
                        <div className="space-y-2.5 text-sm text-[#434653]">
                            <div className="flex items-center gap-2.5">
                                <span className="material-symbols-outlined text-[#003c90] text-base">mail</span>
                                <span>hello@lombokautorent.com</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <span className="material-symbols-outlined text-[#003c90] text-base">call</span>
                                <span>+62 812-3456-7890</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <span className="material-symbols-outlined text-[#003c90] text-base mt-0.5">pin_drop</span>
                                <span>Jl. Raya Tanak Awu, Lombok Airport (LOP), NTB</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-[1280px] mx-auto px-4 sm:px-8 mt-12 pt-6 border-t border-slate-300 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} Lombok Auto Rent Car. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy-policy" className="hover:text-[#003c90]">Privacy Policy</Link>
                        <Link href="/terms-of-service" className="hover:text-[#003c90]">Terms of Service</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};
