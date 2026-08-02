import React, { useState, useRef } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';
import { BlogPost } from '../../../types/lombok';

interface EditProps {
    post: BlogPost;
}

export default function Edit({ post }: EditProps) {
    const [slug, setSlug] = useState(post.slug);
    const [tags, setTags] = useState<string[]>(['Lombok Travel', 'Car Rental']);
    const [tagInput, setTagInput] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(post.cover_image || post.image_url);
    const [uploadMode, setUploadMode] = useState<'file' | 'url'>('url');
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const contentRef = useRef<HTMLTextAreaElement | null>(null);

    const { data, setData, post: submitPost, processing, errors } = useForm<{
        title: string;
        category: string;
        excerpt: string;
        content: string;
        image: File | null;
        image_url: string;
        meta_title: string;
        meta_description: string;
        author: string;
    }>({
        title: post.title,
        category: post.category,
        excerpt: post.summary || post.excerpt || '',
        content: post.content,
        image: null,
        image_url: post.cover_image || post.image_url || '',
        meta_title: `${post.title} | Lombok Auto Rent`,
        meta_description: post.summary || post.excerpt || '',
        author: post.author_name || post.author || 'Admin User',
    });

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setData((prev) => ({
            ...prev,
            title: val,
            meta_title: prev.meta_title ? prev.meta_title : val ? `${val} | Lombok Auto Rent` : '',
        }));
        setSlug(
            val
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
        );
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            setData('image', file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const applyFormat = (prefix: string, suffix: string = '', defaultText: string = '') => {
        const textarea = contentRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const currentText = data.content;
        const selectedText = currentText.substring(start, end) || defaultText;

        const formattedText = `${prefix}${selectedText}${suffix}`;
        const newContent = currentText.substring(0, start) + formattedText + currentText.substring(end);

        setData('content', newContent);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
        }, 0);
    };

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim() !== '') {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter((t) => t !== tagToRemove));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitPost(`/admin/blog/${post.id}`, {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title={`Edit Post: ${post.title} - Lombok Auto Rent Admin`} />

            <form onSubmit={handleSubmit} className="flex flex-col w-full gap-8">
                {/* Top Navigation & Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <nav className="flex items-center gap-2 text-[#434653] text-xs font-semibold">
                            <Link href="/admin/blog" className="hover:text-[#003c90] transition-colors">
                                Blog
                            </Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-[#191c1d] font-bold">Edit Post</span>
                        </nav>
                        <h1 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl font-extrabold text-[#191c1d] tracking-tight">
                            Edit Article Post
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin/blog"
                            className="px-6 py-3 rounded-full font-bold text-xs text-[#003c90] bg-[#e7e8e9] hover:bg-slate-200 transition-all uppercase tracking-wider"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-8 py-3 rounded-full font-bold text-xs text-white bg-[#003c90] hover:bg-[#0f52ba] shadow-lg shadow-[#003c90]/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-wider"
                        >
                            Update Post
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content Editor */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {/* Title Section */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200/80 space-y-4">
                            <div className="space-y-1">
                                <label className="font-bold text-[10px] text-[#434653] uppercase tracking-widest">
                                    Article Headline
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.title}
                                    onChange={handleTitleChange}
                                    placeholder="Enter post title here..."
                                    className="w-full font-['Manrope',sans-serif] font-bold text-2xl text-[#191c1d] bg-transparent border-none outline-none focus:ring-0 p-0 placeholder:text-slate-300"
                                />
                                {errors.title && <p className="text-red-500 text-xs font-semibold">{errors.title}</p>}
                            </div>
                            <div className="flex items-center gap-2 px-3.5 py-2 bg-[#f3f4f5] rounded-xl w-fit text-xs text-slate-500">
                                <span className="material-symbols-outlined text-[18px]">link</span>
                                <span>lombokrent.com/blog/</span>
                                <span className="font-bold text-[#003c90]">{slug || 'your-post-slug'}</span>
                            </div>
                        </div>

                        {/* Rich Text Editor Toolbar */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 flex flex-col min-h-[500px] overflow-hidden">
                            <div className="border-b border-slate-200 p-3 flex flex-wrap items-center gap-2 bg-[#f3f4f5]/60 text-slate-600">
                                <div className="flex items-center gap-1 pr-3 border-r border-slate-200">
                                    <button
                                        type="button"
                                        onClick={() => applyFormat('<b>', '</b>', 'Bold text')}
                                        title="Bold (<b>)"
                                        className="p-2 rounded hover:bg-slate-200 text-slate-700 hover:text-[#003c90] transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-xl">format_bold</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => applyFormat('<i>', '</i>', 'Italic text')}
                                        title="Italic (<i>)"
                                        className="p-2 rounded hover:bg-slate-200 text-slate-700 hover:text-[#003c90] transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-xl">format_italic</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => applyFormat('<u>', '</u>', 'Underlined text')}
                                        title="Underline (<u>)"
                                        className="p-2 rounded hover:bg-slate-200 text-slate-700 hover:text-[#003c90] transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-xl">format_underlined</span>
                                    </button>
                                </div>
                                <div className="flex items-center gap-1 px-3 border-r border-slate-200">
                                    <button
                                        type="button"
                                        onClick={() => applyFormat('<h1>', '</h1>', 'Heading 1')}
                                        title="Heading 1 (<h1>)"
                                        className="p-2 rounded hover:bg-slate-200 font-bold text-xs text-slate-700 hover:text-[#003c90] transition-colors"
                                    >
                                        H1
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => applyFormat('<h2>', '</h2>', 'Heading 2')}
                                        title="Heading 2 (<h2>)"
                                        className="p-2 rounded hover:bg-slate-200 font-bold text-xs text-slate-700 hover:text-[#003c90] transition-colors"
                                    >
                                        H2
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => applyFormat('<ul>\n  <li>', '</li>\n  <li>Item 2</li>\n</ul>', 'List Item 1')}
                                        title="Bulleted List (<ul>)"
                                        className="p-2 rounded hover:bg-slate-200 text-slate-700 hover:text-[#003c90] transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-xl">format_list_bulleted</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => applyFormat('<ol>\n  <li>', '</li>\n  <li>Item 2</li>\n</ol>', 'List Item 1')}
                                        title="Numbered List (<ol>)"
                                        className="p-2 rounded hover:bg-slate-200 text-slate-700 hover:text-[#003c90] transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-xl">format_list_numbered</span>
                                    </button>
                                </div>
                                <div className="flex items-center gap-1 px-3 border-r border-slate-200">
                                    <button
                                        type="button"
                                        onClick={() => applyFormat('<a href="https://example.com" target="_blank">', '</a>', 'Link text')}
                                        title="Insert Link (<a>)"
                                        className="p-2 rounded hover:bg-slate-200 text-slate-700 hover:text-[#003c90] transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-xl">link</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => applyFormat('<img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" alt="', '" className="w-full rounded-2xl my-4" />', 'Image description')}
                                        title="Insert Image (<img>)"
                                        className="p-2 rounded hover:bg-slate-200 text-slate-700 hover:text-[#003c90] transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-xl">image</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => applyFormat('<blockquote className="border-l-4 border-[#003c90] pl-4 italic text-slate-600 my-4">\n  ', '\n</blockquote>', 'Quote text')}
                                        title="Quote (<blockquote>)"
                                        className="p-2 rounded hover:bg-slate-200 text-slate-700 hover:text-[#003c90] transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-xl">format_quote</span>
                                    </button>
                                </div>
                            </div>
                            <textarea
                                ref={contentRef}
                                required
                                rows={16}
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                placeholder="Start writing your story about Lombok's hidden gems..."
                                className="flex-1 p-8 text-base text-[#191c1d] bg-transparent border-none outline-none focus:ring-0 resize-none placeholder:text-slate-300"
                            />
                        </div>
                    </div>

                    {/* Sidebar Settings */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        {/* Featured Image */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-['Manrope',sans-serif] font-bold text-base text-[#191c1d] flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[#003c90]">image</span>
                                    Featured Image
                                </h3>
                                <div className="flex gap-1 text-[11px] font-bold bg-slate-100 p-1 rounded-lg">
                                    <button
                                        type="button"
                                        onClick={() => setUploadMode('file')}
                                        className={`px-2 py-1 rounded-md transition-all ${
                                            uploadMode === 'file' ? 'bg-white text-[#003c90] shadow-sm' : 'text-slate-500'
                                        }`}
                                    >
                                        Upload File
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setUploadMode('url')}
                                        className={`px-2 py-1 rounded-md transition-all ${
                                            uploadMode === 'url' ? 'bg-white text-[#003c90] shadow-sm' : 'text-slate-500'
                                        }`}
                                    >
                                        Image URL
                                    </button>
                                </div>
                            </div>

                            {uploadMode === 'file' ? (
                                <div className="space-y-3">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={handleDrop}
                                        className="relative group cursor-pointer border-2 border-dashed border-slate-300 rounded-2xl aspect-video flex flex-col items-center justify-center gap-2 hover:border-[#003c90] hover:bg-blue-50/50 transition-all overflow-hidden p-4"
                                    >
                                        {imagePreview ? (
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-full object-cover rounded-xl"
                                            />
                                        ) : (
                                            <>
                                                <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-[#003c90] transition-colors">
                                                    cloud_upload
                                                </span>
                                                <div className="text-center space-y-0.5">
                                                    <p className="font-bold text-xs text-[#191c1d]">
                                                        Drag and drop or click to browse
                                                    </p>
                                                    <p className="text-[11px] text-slate-400">
                                                        Supports JPG, PNG, WEBP (Max 5MB)
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    {imagePreview && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImagePreview(null);
                                                setData('image', null);
                                                setData('image_url', '');
                                                if (fileInputRef.current) fileInputRef.current.value = '';
                                            }}
                                            className="w-full py-2 bg-red-50 text-red-600 font-bold text-xs rounded-xl hover:bg-red-100 transition-colors"
                                        >
                                            Remove Selected Image
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="relative rounded-xl aspect-video overflow-hidden bg-slate-100 border border-slate-200">
                                        {data.image_url ? (
                                            <img src={data.image_url} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                                                <span className="material-symbols-outlined text-4xl">link</span>
                                                <span className="text-xs">Paste URL below to preview</span>
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        type="url"
                                        value={data.image_url}
                                        onChange={(e) => {
                                            setData('image_url', e.target.value);
                                            setImagePreview(e.target.value);
                                        }}
                                        placeholder="https://example.com/image.jpg"
                                        className="w-full bg-[#f3f4f5] border border-slate-200 rounded-xl p-3 text-xs text-[#191c1d] outline-none focus:border-[#003c90]"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Taxonomy */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-5">
                            <div className="space-y-2">
                                <h3 className="font-['Manrope',sans-serif] font-bold text-base text-[#191c1d]">Category</h3>
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full p-3 bg-[#f3f4f5] rounded-xl border border-slate-200 text-xs font-semibold text-[#191c1d] outline-none focus:ring-2 focus:ring-[#003c90]/20"
                                >
                                    <option value="Travel Guide">Travel Guide</option>
                                    <option value="Car Rental Tips">Car Rental Tips</option>
                                    <option value="Local Events">Local Events</option>
                                    <option value="Lombok News">Lombok News</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-['Manrope',sans-serif] font-bold text-base text-[#191c1d]">Tags</h3>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-[#003c90]/10 text-[#003c90] font-bold text-xs rounded-full flex items-center gap-1.5"
                                        >
                                            <span>{tag}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTag(tag)}
                                                className="hover:text-red-500 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-[14px]">close</span>
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleAddTag}
                                        placeholder="Add tag and press Enter..."
                                        className="w-full p-3 bg-[#f3f4f5] rounded-xl border border-slate-200 text-xs text-[#191c1d] outline-none focus:border-[#003c90]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* SEO Settings */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-5">
                            <h3 className="font-['Manrope',sans-serif] font-bold text-base text-[#191c1d] flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#003c90]">find_in_page</span>
                                SEO Metadata
                            </h3>
                            <div className="space-y-4 text-xs">
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <label className="font-bold text-slate-700">Meta Title</label>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase">
                                            {data.meta_title.length} / 60
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        value={data.meta_title}
                                        onChange={(e) => setData('meta_title', e.target.value)}
                                        placeholder="Discover the Best Hidden Beaches in Lombok | Lombok Auto Rent"
                                        className="w-full p-3 bg-[#f3f4f5] rounded-xl border border-slate-200 text-xs text-[#191c1d] outline-none focus:border-[#003c90]"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <label className="font-bold text-slate-700">Meta Description</label>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase">
                                            {data.meta_description.length} / 160
                                        </span>
                                    </div>
                                    <textarea
                                        rows={3}
                                        value={data.meta_description}
                                        onChange={(e) => setData('meta_description', e.target.value)}
                                        placeholder="Explore the untouched beauty of Lombok's coastline with a premium SUV from Lombok Auto Rent..."
                                        className="w-full p-3 bg-[#f3f4f5] rounded-xl border border-slate-200 text-xs text-[#191c1d] outline-none focus:border-[#003c90] resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Excerpt */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-3">
                            <h3 className="font-['Manrope',sans-serif] font-bold text-base text-[#191c1d]">Excerpt Summary</h3>
                            <textarea
                                rows={4}
                                required
                                value={data.excerpt}
                                onChange={(e) => setData('excerpt', e.target.value)}
                                placeholder="Brief summary for archive &amp; listing pages..."
                                className="w-full p-3 bg-[#f3f4f5] rounded-xl border border-slate-200 text-xs text-[#191c1d] outline-none focus:border-[#003c90] resize-none"
                            />
                            <p className="text-[11px] text-slate-400 italic">
                                This summary appears on the blog listing pages to attract readers.
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
