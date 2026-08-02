import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PublicLayout } from '../../layouts/PublicLayout';
import { BlogPost } from '../../types/lombok';

interface BlogIndexProps {
    posts: BlogPost[];
}

export default function BlogIndex({ posts }: BlogIndexProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const featuredPost = posts[0];
    const regularPosts = posts.slice(1);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/blog', { search: searchQuery }, { preserveState: true });
    };

    return (
        <PublicLayout>
            <Head title="Lombok Travel Guide &amp; News - Lombok Auto Rent" />

            <div className="flex flex-col w-full">
                {/* Hero Section with Overlap */}
                <section className="relative w-full min-h-[500px] flex items-center overflow-hidden -mt-20">
                    <div className="absolute inset-0 z-0">
                        <div
                            className="bg-cover bg-center w-full h-full transform scale-105"
                            style={{
                                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAPVJmB1NnE2Er1phqKdYH265JwU4zbAeKeyhgVLtS5x2G4RXeQ6C2-Sg_GWedv0pXTXGfIKUI2X68sJbMlpFbRwcgdgor4KRceoaawsNpjbmqcR4RSBJ5WIl0UvP79iJ95TMjKVHqgfwYzd2-SQV6YnPlRYG5qiTbFtlk5s_EjvUV_v5_1KkJsfjn_jWChkilmqbqZXAbGXXpvkF3Wa8vWQFbIFlXaJHs432Hx357vdlA5jKZzBH5Y')`,
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#191c1d]/85 via-[#191c1d]/50 to-transparent" />
                    </div>

                    <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-8 w-full pt-28 pb-16 text-white">
                        <div className="max-w-2xl space-y-4">
                            <span className="font-['Hanken_Grotesk',sans-serif] font-bold text-xs text-[#fc9342] bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full uppercase tracking-[0.2em] inline-block border border-white/20">
                                Explore Lombok
                            </span>
                            <h1 className="font-['Manrope',sans-serif] text-4xl sm:text-5xl font-extrabold leading-tight">
                                Lombok Travel Guide &amp; News
                            </h1>
                            <p className="text-base text-slate-200 max-w-lg leading-relaxed">
                                Discover hidden beaches, local driving secrets, and the latest travel tips from Indonesia's most enchanting island.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Main Content Area: Bento Grid Layout */}
                <section className="max-w-[1280px] mx-auto px-4 sm:px-8 -mt-12 relative z-20 pb-20 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Left Column: Blog Feed */}
                        <div className="lg:col-span-8 space-y-10">
                            {/* Featured Post */}
                            {featuredPost && (
                                <article className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 group cursor-pointer flex flex-col md:flex-row min-h-[380px]">
                                    <div className="md:w-1/2 overflow-hidden relative min-h-[240px]">
                                        <img
                                            src={featuredPost.image_url}
                                            alt={featuredPost.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 left-4 bg-[#003c90] text-white px-3 py-1 font-bold text-[11px] uppercase tracking-wider rounded-md">
                                            Featured
                                        </div>
                                    </div>
                                    <div className="md:w-1/2 p-8 flex flex-col justify-between space-y-4">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                                <span>{featuredPost.category}</span>
                                                <span className="w-1 h-1 bg-slate-400 rounded-full" />
                                                <span>{new Date(featuredPost.published_at).toLocaleDateString()}</span>
                                            </div>
                                            <h2 className="font-['Manrope',sans-serif] font-bold text-2xl text-[#191c1d] group-hover:text-[#003c90] transition-colors leading-snug">
                                                {featuredPost.title}
                                            </h2>
                                            <p className="text-xs text-[#434653] line-clamp-3 leading-relaxed">
                                                {featuredPost.excerpt}
                                            </p>
                                        </div>
                                        <Link
                                            href={`/blog/${featuredPost.slug}`}
                                            className="inline-flex items-center gap-2 text-[#003c90] font-bold text-xs uppercase tracking-wider group-hover:gap-4 transition-all pt-2"
                                        >
                                            <span>READ FULL STORY</span>
                                            <span className="material-symbols-outlined text-base">arrow_forward</span>
                                        </Link>
                                    </div>
                                </article>
                            )}

                            {/* Regular Posts Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {regularPosts.map((post) => (
                                    <article
                                        key={post.id}
                                        className="bg-white p-5 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 group flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="aspect-video rounded-2xl overflow-hidden mb-5 bg-slate-100">
                                                <img
                                                    src={post.image_url}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <span className="font-bold text-[11px] text-[#954a00] uppercase tracking-wider mb-2 block">
                                                {post.category}
                                            </span>
                                            <h3 className="font-['Manrope',sans-serif] font-bold text-lg text-[#191c1d] mb-2 group-hover:text-[#003c90] transition-colors leading-snug">
                                                {post.title}
                                            </h3>
                                            <p className="text-xs text-[#434653] mb-4 line-clamp-2 leading-relaxed">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-center pt-3 border-t border-slate-100 text-xs">
                                            <span className="text-slate-400 font-semibold">
                                                {new Date(post.published_at).toLocaleDateString()}
                                            </span>
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="text-[#003c90] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                                            >
                                                <span>Read</span>
                                                <span className="material-symbols-outlined text-base">arrow_forward</span>
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <aside className="lg:col-span-4 space-y-8">
                            {/* Search Widget */}
                            <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-200">
                                <h4 className="font-['Hanken_Grotesk',sans-serif] font-bold text-xs text-[#003c90] uppercase tracking-widest mb-4">
                                    Search Articles
                                </h4>
                                <form onSubmit={handleSearch} className="relative">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search travel tips..."
                                        className="w-full bg-[#f3f4f5] py-3 pl-10 pr-4 rounded-xl font-semibold text-xs text-slate-800 border-none outline-none focus:ring-2 focus:ring-[#003c90]"
                                    />
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                                        search
                                    </span>
                                </form>
                            </div>

                            {/* Newsletter Card */}
                            <div className="bg-[#003c90] p-8 rounded-3xl shadow-xl text-white relative overflow-hidden">
                                <h4 className="font-['Manrope',sans-serif] font-bold text-xl mb-2">Stay in the Loop</h4>
                                <p className="text-xs text-blue-100 mb-6 leading-relaxed">
                                    Get Lombok travel tips and exclusive car rental discounts delivered to your email.
                                </p>
                                <div className="space-y-3">
                                    <input
                                        type="email"
                                        placeholder="Your email address"
                                        className="w-full bg-white/10 border border-white/20 p-3 rounded-xl placeholder:text-blue-200 text-xs text-white outline-none focus:bg-white/20"
                                    />
                                    <button className="w-full bg-[#fc9342] hover:bg-[#e07d30] text-white font-bold text-xs py-3 rounded-xl uppercase tracking-wider shadow-md transition-all">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
