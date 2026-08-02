import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';
import { BlogPost } from '../../../types/lombok';

interface BlogIndexProps {
    posts: BlogPost[];
}

export default function BlogIndex({ posts }: BlogIndexProps) {
    const handleDelete = (postId: number, title: string) => {
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
            router.delete(`/admin/blog/${postId}`);
        }
    };

    return (
        <AdminLayout>
            <Head title="Blog Management - Lombok Auto Rent" />

            <div className="flex flex-col w-full gap-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                    <div className="space-y-1">
                        <span className="font-bold text-xs text-[#003c90] uppercase tracking-widest">
                            Content Strategy
                        </span>
                        <h1 className="font-['Manrope',sans-serif] font-extrabold text-3xl sm:text-4xl text-slate-900">
                            Blog Management
                        </h1>
                        <p className="text-sm text-slate-500">
                            Publish articles, travel guides, and local news for Lombok Auto Rent visitors.
                        </p>
                    </div>

                    <Link
                        href="/admin/blog/create"
                        className="flex items-center gap-2 px-6 py-3 bg-[#003c90] hover:bg-[#0f52ba] text-white font-bold text-xs rounded-full shadow-lg transition-all uppercase tracking-wider"
                    >
                        <span className="material-symbols-outlined text-lg">add</span>
                        <span>Create New Post</span>
                    </Link>
                </div>

                {/* Blog Posts Table */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f3f4f5] border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                    <th className="px-6 py-4">Title &amp; Visual</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Author</th>
                                    <th className="px-6 py-4">Published Date</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs">
                                {posts.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                                            No blog posts created yet.
                                        </td>
                                    </tr>
                                ) : (
                                    posts.map((post) => (
                                        <tr key={post.id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <img
                                                        src={post.cover_image || post.image_url}
                                                        alt={post.title}
                                                        className="w-20 h-14 rounded-xl object-cover shrink-0 bg-slate-100 border border-slate-200"
                                                    />
                                                    <div>
                                                        <h4 className="font-['Manrope',sans-serif] font-bold text-sm text-slate-900 line-clamp-1">
                                                            {post.title}
                                                        </h4>
                                                        <p className="text-[11px] text-slate-400 line-clamp-1 max-w-sm">
                                                            {post.summary || post.excerpt}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-blue-50 text-[#003c90] rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                    {post.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-slate-800">
                                                {post.author_name || post.author || 'Admin Team'}
                                            </td>
                                            <td className="px-6 py-4 text-slate-500">
                                                {new Date(post.published_at).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                })}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <Link
                                                        href={`/admin/blog/${post.id}/edit`}
                                                        className="p-2 text-slate-500 hover:text-[#003c90] hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit Article"
                                                    >
                                                        <span className="material-symbols-outlined text-lg">edit</span>
                                                    </Link>
                                                    <Link
                                                        href={`/blog/${post.slug}`}
                                                        target="_blank"
                                                        className="p-2 text-slate-500 hover:text-[#003c90] hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Preview Article"
                                                    >
                                                        <span className="material-symbols-outlined text-lg">visibility</span>
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(post.id, post.title)}
                                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete Article"
                                                    >
                                                        <span className="material-symbols-outlined text-lg">delete</span>
                                                    </button>
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
        </AdminLayout>
    );
}
