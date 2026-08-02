import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PublicLayout } from '../../layouts/PublicLayout';
import { BlogPost } from '../../types/lombok';

interface BlogShowProps {
    post: BlogPost;
    relatedPosts: BlogPost[];
}

export default function BlogShow({ post, relatedPosts }: BlogShowProps) {
    return (
        <PublicLayout>
            <Head title={`${post.title} - Lombok Auto Rent Blog`} />

            <div className="flex flex-col w-full">
                {/* Immersive Article Hero */}
                <section className="relative w-full h-[600px] lg:h-[700px] -mt-20 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src={post.image_url}
                            alt={post.title}
                            className="w-full h-full object-cover scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#191c1d] via-[#191c1d]/40 to-transparent" />
                    </div>

                    <div className="relative z-10 h-full max-w-[1280px] mx-auto px-4 sm:px-8 flex flex-col justify-end pb-16 text-white">
                        <nav className="flex items-center gap-2 text-slate-300 text-xs font-semibold mb-4">
                            <Link href="/" className="hover:text-white transition-colors">
                                Home
                            </Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <Link href="/blog" className="hover:text-white transition-colors">
                                Blog
                            </Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-white font-bold truncate max-w-xs">{post.title}</span>
                        </nav>

                        <div className="flex flex-wrap gap-4 mb-4 items-center">
                            <span className="bg-[#fc9342] text-white px-4 py-1 rounded-full font-bold text-xs uppercase tracking-widest">
                                {post.category}
                            </span>
                            <div className="flex items-center gap-3 text-slate-200 text-xs font-semibold">
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-base">calendar_today</span>
                                    {new Date(post.published_at).toLocaleDateString()}
                                </span>
                                <span>•</span>
                                <span>Author: {post.author}</span>
                            </div>
                        </div>

                        <h1 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-extrabold max-w-4xl leading-tight">
                            {post.title}
                        </h1>
                    </div>
                </section>

                {/* Article Layout Grid */}
                <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-16 w-full">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Main Content Column */}
                        <article className="flex-1 min-w-0">
                            <div className="prose prose-lg max-w-none space-y-6 text-[#434653] font-['Hanken_Grotesk',sans-serif]">
                                <p className="font-['Manrope',sans-serif] text-lg text-[#191c1d] leading-relaxed italic border-l-4 border-[#003c90] pl-6 py-2 bg-slate-50 rounded-r-xl">
                                    {post.excerpt}
                                </p>

                                <div
                                    className="leading-relaxed space-y-6 text-base text-slate-700"
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                />
                            </div>

                            {/* Social Share & Tags */}
                            <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-6">
                                <div className="flex items-center gap-3 text-xs">
                                    <span className="font-bold text-slate-700 uppercase tracking-wider">Share this article:</span>
                                    <a
                                        href={`https://wa.me/?text=${encodeURIComponent(post.title)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm"
                                    >
                                        <span className="material-symbols-outlined text-sm">chat</span>
                                    </a>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
                                        #LombokRental
                                    </span>
                                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
                                        #{post.category}
                                    </span>
                                </div>
                            </div>
                        </article>

                        {/* Sidebar Column */}
                        <aside className="w-full lg:w-80 shrink-0 space-y-8">
                            {/* Author Profile */}
                            <div className="bg-[#edeeef] rounded-3xl p-6 text-center space-y-3 border border-slate-200">
                                <div className="w-20 h-20 mx-auto rounded-full bg-[#003c90] text-white flex items-center justify-center text-2xl font-bold shadow-md">
                                    {post.author.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-['Manrope',sans-serif] font-bold text-base text-[#191c1d]">{post.author}</h4>
                                    <p className="text-[#003c90] font-bold text-xs uppercase tracking-wider">Lombok Travel Guide</p>
                                </div>
                                <p className="text-xs text-[#434653] leading-relaxed">
                                    Local destination expert helping travelers explore Lombok safely and comfortably.
                                </p>
                            </div>

                            {/* Related Posts Widget */}
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4">
                                <h4 className="font-['Hanken_Grotesk',sans-serif] font-bold text-xs text-[#003c90] uppercase tracking-widest">
                                    Related Articles
                                </h4>
                                <div className="space-y-4">
                                    {relatedPosts.map((rel) => (
                                        <Link
                                            key={rel.id}
                                            href={`/blog/${rel.slug}`}
                                            className="group flex gap-3 items-center"
                                        >
                                            <img
                                                src={rel.image_url}
                                                alt={rel.title}
                                                className="w-16 h-12 rounded-lg object-cover shrink-0"
                                            />
                                            <div>
                                                <h5 className="font-['Manrope',sans-serif] font-bold text-xs text-slate-900 group-hover:text-[#003c90] line-clamp-2 transition-colors">
                                                    {rel.title}
                                                </h5>
                                                <span className="text-[10px] text-slate-400">
                                                    {new Date(rel.published_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
