import React, { useState, useRef } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';
import { Car } from '../../../types/lombok';

interface FleetProps {
    cars: Car[];
}

export default function FleetIndex({ cars }: FleetProps) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingCar, setEditingCar] = useState<Car | null>(null);

    // Upload mode for modals: 'file' or 'url'
    const [createUploadMode, setCreateUploadMode] = useState<'file' | 'url'>('file');
    const [createImagePreview, setCreateImagePreview] = useState<string | null>(null);
    const createFileInputRef = useRef<HTMLInputElement | null>(null);

    const [editUploadMode, setEditUploadMode] = useState<'file' | 'url'>('file');
    const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
    const editFileInputRef = useRef<HTMLInputElement | null>(null);

    const createForm = useForm<{
        name: string;
        brand: string;
        category: string;
        service_type: string;
        price_per_day: number;
        custom_driver_price: number | '';
        capacity_passengers: number;
        capacity_luggage: number;
        transmission: string;
        fuel_type: string;
        image: File | null;
        image_url: string;
    }>({
        name: '',
        brand: '',
        category: 'Luxury',
        service_type: 'both',
        price_per_day: 500000,
        custom_driver_price: 150000,
        capacity_passengers: 5,
        capacity_luggage: 2,
        transmission: 'Automatic',
        fuel_type: 'Petrol',
        image: null,
        image_url: '',
    });

    const editForm = useForm<{
        name: string;
        brand: string;
        category: string;
        service_type: string;
        price_per_day: number;
        custom_driver_price: number | '';
        capacity_passengers: number;
        capacity_luggage: number;
        transmission: string;
        fuel_type: string;
        image: File | null;
        image_url: string;
    }>({
        name: '',
        brand: '',
        category: 'Luxury',
        service_type: 'both',
        price_per_day: 500000,
        custom_driver_price: 150000,
        capacity_passengers: 5,
        capacity_luggage: 2,
        transmission: 'Automatic',
        fuel_type: 'Petrol',
        image: null,
        image_url: '',
    });

    const handleCreateFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            createForm.setData('image', file);
            setCreateImagePreview(URL.createObjectURL(file));
        }
    };

    const handleCreateDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            createForm.setData('image', file);
            setCreateImagePreview(URL.createObjectURL(file));
        }
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post('/admin/fleet', {
            forceFormData: true,
            onSuccess: () => {
                setShowCreateModal(false);
                createForm.reset();
                setCreateImagePreview(null);
            },
        });
    };

    const handleOpenEdit = (car: Car) => {
        setEditingCar(car);
        setEditImagePreview(car.image_url);
        editForm.setData({
            name: car.name,
            brand: car.brand,
            category: car.category,
            service_type: car.service_type || 'both',
            price_per_day: car.price_per_day,
            custom_driver_price: car.driver_price_per_day || 150000,
            capacity_passengers: car.capacity_passengers,
            capacity_luggage: car.capacity_luggage || 2,
            transmission: car.transmission,
            fuel_type: car.fuel_type,
            image: null,
            image_url: car.image_url,
        });
    };

    const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            editForm.setData('image', file);
            setEditImagePreview(URL.createObjectURL(file));
        }
    };

    const handleEditDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            editForm.setData('image', file);
            setEditImagePreview(URL.createObjectURL(file));
        }
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCar) return;
        router.post(`/admin/fleet/${editingCar.id}`, {
            ...editForm.data,
            _method: 'PUT',
        }, {
            forceFormData: true,
            onSuccess: () => {
                setEditingCar(null);
                setEditImagePreview(null);
            },
        });
    };

    const handleToggleStatus = (carId: number) => {
        router.patch(`/admin/fleet/${carId}/toggle`);
    };

    const handleDelete = (carId: number, carName: string) => {
        if (confirm(`Are you sure you want to remove "${carName}" from the fleet?`)) {
            router.delete(`/admin/fleet/${carId}`);
        }
    };

    const formatRupiah = (number: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(number);
    };

    const availableCount = cars.filter((c) => c.is_available).length;
    const rentedCount = cars.length - availableCount;

    return (
        <AdminLayout>
            <Head title="Fleet Management - Lombok Auto Rent" />

            <div className="flex flex-col w-full gap-8">
                {/* Header Section: Stat Cards & Actions */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
                    <div className="space-y-1">
                        <p className="font-bold text-xs text-[#003c90] tracking-widest uppercase">
                            Operational Overview
                        </p>
                        <h1 className="font-['Manrope',sans-serif] font-extrabold text-3xl sm:text-4xl text-slate-900">
                            Fleet Management
                        </h1>
                        <p className="text-sm text-slate-500">
                            Monitor and manage your premium vehicle collection across Lombok.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-[#003c90] hover:bg-[#0f52ba] text-white font-bold text-xs rounded-full shadow-lg transition-all uppercase tracking-wider"
                        >
                            <span className="material-symbols-outlined text-lg">add_circle</span>
                            <span>Add New Vehicle</span>
                        </button>
                    </div>
                </div>

                {/* Analytics Quick-View */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-2">
                        <div className="flex justify-between items-start">
                            <span className="material-symbols-outlined text-[#003c90] text-3xl">directions_car</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-100 px-2 py-1 rounded">Total</span>
                        </div>
                        <p className="font-['Manrope',sans-serif] text-3xl font-extrabold text-slate-900">{cars.length}</p>
                        <p className="text-xs text-slate-500 font-semibold">Active Fleet Units</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-2">
                        <div className="flex justify-between items-start">
                            <span className="material-symbols-outlined text-emerald-600 text-3xl">check_circle</span>
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 font-bold uppercase tracking-wider px-2 py-1 rounded">Ready</span>
                        </div>
                        <p className="font-['Manrope',sans-serif] text-3xl font-extrabold text-slate-900">{availableCount}</p>
                        <p className="text-xs text-slate-500 font-semibold">Available for Rent</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-2">
                        <div className="flex justify-between items-start">
                            <span className="material-symbols-outlined text-[#954a00] text-3xl">key</span>
                            <span className="text-[10px] text-amber-800 bg-amber-50 font-bold uppercase tracking-wider px-2 py-1 rounded">Active</span>
                        </div>
                        <p className="font-['Manrope',sans-serif] text-3xl font-extrabold text-slate-900">{rentedCount}</p>
                        <p className="text-xs text-slate-500 font-semibold">Currently On the Road</p>
                    </div>
                </div>

                {/* Fleet Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cars.map((car) => (
                        <div
                            key={car.id}
                            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-200/80 flex flex-col justify-between"
                        >
                            <div className="relative h-60 overflow-hidden bg-slate-100">
                                <img
                                    src={car.image_url}
                                    alt={car.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#003c90] shadow-sm uppercase tracking-wider">
                                    {car.is_available ? 'AVAILABLE' : 'RENTED'}
                                </div>
                                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-lg text-white text-[11px] font-semibold flex items-center gap-1.5">
                                    <span>{car.category}</span>
                                    <span>•</span>
                                    <span>{car.service_type === 'with_driver' ? 'With Driver' : car.service_type === 'self_drive' ? 'Lepas Kunci' : 'Lepas Kunci & Driver'}</span>
                                </div>
                            </div>

                            <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-['Manrope',sans-serif] font-bold text-lg text-slate-900">
                                                {car.name}
                                            </h3>
                                            <p className="text-xs text-slate-400 font-semibold">{car.brand} • {car.transmission}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">Rate per day</p>
                                            <p className="font-['Manrope',sans-serif] font-bold text-base text-[#954a00]">
                                                {formatRupiah(car.price_per_day)}
                                            </p>
                                            {car.driver_price_per_day && (
                                                <p className="text-[10px] text-[#003c90] font-bold">
                                                    Driver: +{formatRupiah(car.driver_price_per_day)}/day
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-xs text-slate-600 my-3">
                                        <div className="flex items-center justify-center gap-1">
                                            <span className="material-symbols-outlined text-sm text-[#003c90]">person</span>
                                            <span>{car.capacity_passengers} Seats</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-1 border-x border-slate-100">
                                            <span className="material-symbols-outlined text-sm text-[#003c90]">settings</span>
                                            <span>{car.transmission}</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-1">
                                            <span className="material-symbols-outlined text-sm text-[#003c90]">local_gas_station</span>
                                            <span>{car.fuel_type}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 pt-2">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleOpenEdit(car)}
                                            className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1"
                                        >
                                            <span className="material-symbols-outlined text-base">edit</span>
                                            <span>Edit Details</span>
                                        </button>
                                        <button
                                            onClick={() => handleToggleStatus(car.id)}
                                            className={`px-3 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1 ${
                                                car.is_available
                                                    ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                                    : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                                            }`}
                                            title="Toggle Availability Status"
                                        >
                                            <span className="material-symbols-outlined text-base">sync</span>
                                            <span>{car.is_available ? 'Ready' : 'Rented'}</span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(car.id, car.name)}
                                            className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors"
                                            title="Delete Vehicle"
                                        >
                                            <span className="material-symbols-outlined text-base">delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Create Vehicle Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                            <h3 className="font-['Manrope',sans-serif] font-bold text-xl text-slate-900">Add New Vehicle</h3>
                            <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-700">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleCreate} className="space-y-4 text-xs">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">Vehicle Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={createForm.data.name}
                                        onChange={(e) => createForm.setData('name', e.target.value)}
                                        placeholder="Toyota Fortuner VRZ"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                                    />
                                </div>
                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">Brand</label>
                                    <input
                                        type="text"
                                        required
                                        value={createForm.data.brand}
                                        onChange={(e) => createForm.setData('brand', e.target.value)}
                                        placeholder="Toyota"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">Category</label>
                                    <select
                                        value={createForm.data.category}
                                        onChange={(e) => createForm.setData('category', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                                    >
                                        <option value="Luxury">Luxury</option>
                                        <option value="SUV">SUV</option>
                                        <option value="MPV">MPV</option>
                                        <option value="Compact">Compact</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">Rate / Day (IDR)</label>
                                    <input
                                        type="number"
                                        required
                                        value={createForm.data.price_per_day}
                                        onChange={(e) => createForm.setData('price_per_day', parseInt(e.target.value) || 0)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                                    />
                                </div>
                            </div>

                            {/* Service Type Selection & Optional Daily Driver Rate */}
                            <div className="space-y-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                                <div>
                                    <label className="font-bold text-slate-800 block mb-1">Service Type</label>
                                    <select
                                        value={createForm.data.service_type}
                                        onChange={(e) => createForm.setData('service_type', e.target.value)}
                                        className="w-full bg-white border border-slate-200 rounded-xl p-2.5 font-bold text-slate-800"
                                    >
                                        <option value="both">Keduanya (Lepas Kunci &amp; With Driver)</option>
                                        <option value="self_drive">Lepas Kunci (Self-Drive)</option>
                                        <option value="with_driver">Dengan Driver (With Driver)</option>
                                    </select>
                                </div>

                                {(createForm.data.service_type === 'with_driver' || createForm.data.service_type === 'both') && (
                                    <div>
                                        <label className="font-bold text-[#003c90] block mb-1">Daily Driver Fee / Day (IDR)</label>
                                        <input
                                            type="number"
                                            value={createForm.data.custom_driver_price}
                                            onChange={(e) => createForm.setData('custom_driver_price', parseInt(e.target.value) || '')}
                                            placeholder="150000"
                                            className="w-full bg-white border border-blue-200 rounded-xl p-2.5 font-bold text-[#003c90]"
                                        />
                                        <p className="text-[10px] text-slate-500 mt-1">Biaya harian untuk pengemudi profesional.</p>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">Transmission</label>
                                    <select
                                        value={createForm.data.transmission}
                                        onChange={(e) => createForm.setData('transmission', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                                    >
                                        <option value="Automatic">Automatic</option>
                                        <option value="Manual">Manual</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">Fuel Type</label>
                                    <select
                                        value={createForm.data.fuel_type}
                                        onChange={(e) => createForm.setData('fuel_type', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                                    >
                                        <option value="Petrol">Petrol</option>
                                        <option value="Gasoline">Gasoline</option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </select>
                                </div>
                            </div>

                            {/* Vehicle Image Upload / URL Selector */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="font-bold text-slate-700 block">Vehicle Image</label>
                                    <div className="flex gap-1 text-[10px] font-bold bg-slate-100 p-0.5 rounded-lg">
                                        <button
                                            type="button"
                                            onClick={() => setCreateUploadMode('file')}
                                            className={`px-2 py-0.5 rounded transition-all ${
                                                createUploadMode === 'file' ? 'bg-white text-[#003c90] shadow-sm' : 'text-slate-500'
                                            }`}
                                        >
                                            Upload File
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setCreateUploadMode('url')}
                                            className={`px-2 py-0.5 rounded transition-all ${
                                                createUploadMode === 'url' ? 'bg-white text-[#003c90] shadow-sm' : 'text-slate-500'
                                            }`}
                                        >
                                            Image URL
                                        </button>
                                    </div>
                                </div>

                                {createUploadMode === 'file' ? (
                                    <div className="space-y-2">
                                        <input
                                            type="file"
                                            ref={createFileInputRef}
                                            accept="image/*"
                                            onChange={handleCreateFileChange}
                                            className="hidden"
                                        />
                                        <div
                                            onClick={() => createFileInputRef.current?.click()}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={handleCreateDrop}
                                            className="relative group cursor-pointer border-2 border-dashed border-slate-300 rounded-xl aspect-video flex flex-col items-center justify-center gap-1.5 hover:border-[#003c90] hover:bg-blue-50/50 transition-all overflow-hidden p-3"
                                        >
                                            {createImagePreview ? (
                                                <img
                                                    src={createImagePreview}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            ) : (
                                                <>
                                                    <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-[#003c90] transition-colors">
                                                        cloud_upload
                                                    </span>
                                                    <div className="text-center">
                                                        <p className="font-bold text-[11px] text-slate-800">
                                                            Drag &amp; drop or click to upload
                                                        </p>
                                                        <p className="text-[10px] text-slate-400">
                                                            JPG, PNG, WEBP (Max 5MB)
                                                        </p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <input
                                        type="url"
                                        value={createForm.data.image_url}
                                        onChange={(e) => createForm.setData('image_url', e.target.value)}
                                        placeholder="https://example.com/vehicle-photo.jpg"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                                    />
                                )}
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={createForm.processing}
                                    className="flex-1 py-3 bg-[#003c90] text-white font-bold rounded-xl shadow-md"
                                >
                                    Save Vehicle
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Vehicle Modal */}
            {editingCar && (
                <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                            <h3 className="font-['Manrope',sans-serif] font-bold text-xl text-slate-900">
                                Edit Vehicle: {editingCar.name}
                            </h3>
                            <button onClick={() => setEditingCar(null)} className="text-slate-400 hover:text-slate-700">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-4 text-xs">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">Vehicle Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={editForm.data.name}
                                        onChange={(e) => editForm.setData('name', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                                    />
                                </div>
                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">Brand</label>
                                    <input
                                        type="text"
                                        required
                                        value={editForm.data.brand}
                                        onChange={(e) => editForm.setData('brand', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">Category</label>
                                    <select
                                        value={editForm.data.category}
                                        onChange={(e) => editForm.setData('category', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                                    >
                                        <option value="Luxury">Luxury</option>
                                        <option value="SUV">SUV</option>
                                        <option value="MPV">MPV</option>
                                        <option value="Compact">Compact</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">Rate / Day (IDR)</label>
                                    <input
                                        type="number"
                                        required
                                        value={editForm.data.price_per_day}
                                        onChange={(e) => editForm.setData('price_per_day', parseInt(e.target.value) || 0)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                                    />
                                </div>
                            </div>

                            {/* Service Type Selection & Optional Daily Driver Rate for Edit */}
                            <div className="space-y-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                                <div>
                                    <label className="font-bold text-slate-800 block mb-1">Service Type</label>
                                    <select
                                        value={editForm.data.service_type}
                                        onChange={(e) => editForm.setData('service_type', e.target.value)}
                                        className="w-full bg-white border border-slate-200 rounded-xl p-2.5 font-bold text-slate-800"
                                    >
                                        <option value="both">Keduanya (Lepas Kunci &amp; With Driver)</option>
                                        <option value="self_drive">Lepas Kunci (Self-Drive)</option>
                                        <option value="with_driver">Dengan Driver (With Driver)</option>
                                    </select>
                                </div>

                                {(editForm.data.service_type === 'with_driver' || editForm.data.service_type === 'both') && (
                                    <div>
                                        <label className="font-bold text-[#003c90] block mb-1">Daily Driver Fee / Day (IDR)</label>
                                        <input
                                            type="number"
                                            value={editForm.data.custom_driver_price}
                                            onChange={(e) => editForm.setData('custom_driver_price', parseInt(e.target.value) || '')}
                                            placeholder="150000"
                                            className="w-full bg-white border border-blue-200 rounded-xl p-2.5 font-bold text-[#003c90]"
                                        />
                                        <p className="text-[10px] text-slate-500 mt-1">Biaya harian untuk pengemudi profesional.</p>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">Transmission</label>
                                    <select
                                        value={editForm.data.transmission}
                                        onChange={(e) => editForm.setData('transmission', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                                    >
                                        <option value="Automatic">Automatic</option>
                                        <option value="Manual">Manual</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">Fuel Type</label>
                                    <select
                                        value={editForm.data.fuel_type}
                                        onChange={(e) => editForm.setData('fuel_type', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                                    >
                                        <option value="Petrol">Petrol</option>
                                        <option value="Gasoline">Gasoline</option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </select>
                                </div>
                            </div>

                            {/* Vehicle Image Upload / URL Selector for Edit */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="font-bold text-slate-700 block">Vehicle Image</label>
                                    <div className="flex gap-1 text-[10px] font-bold bg-slate-100 p-0.5 rounded-lg">
                                        <button
                                            type="button"
                                            onClick={() => setEditUploadMode('file')}
                                            className={`px-2 py-0.5 rounded transition-all ${
                                                editUploadMode === 'file' ? 'bg-white text-[#003c90] shadow-sm' : 'text-slate-500'
                                            }`}
                                        >
                                            Upload File
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setEditUploadMode('url')}
                                            className={`px-2 py-0.5 rounded transition-all ${
                                                editUploadMode === 'url' ? 'bg-white text-[#003c90] shadow-sm' : 'text-slate-500'
                                            }`}
                                        >
                                            Image URL
                                        </button>
                                    </div>
                                </div>

                                {editUploadMode === 'file' ? (
                                    <div className="space-y-2">
                                        <input
                                            type="file"
                                            ref={editFileInputRef}
                                            accept="image/*"
                                            onChange={handleEditFileChange}
                                            className="hidden"
                                        />
                                        <div
                                            onClick={() => editFileInputRef.current?.click()}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={handleEditDrop}
                                            className="relative group cursor-pointer border-2 border-dashed border-slate-300 rounded-xl aspect-video flex flex-col items-center justify-center gap-1.5 hover:border-[#003c90] hover:bg-blue-50/50 transition-all overflow-hidden p-3"
                                        >
                                            {editImagePreview ? (
                                                <img
                                                    src={editImagePreview}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            ) : (
                                                <>
                                                    <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-[#003c90] transition-colors">
                                                        cloud_upload
                                                    </span>
                                                    <div className="text-center">
                                                        <p className="font-bold text-[11px] text-slate-800">
                                                            Drag &amp; drop or click to upload
                                                        </p>
                                                        <p className="text-[10px] text-slate-400">
                                                            JPG, PNG, WEBP (Max 5MB)
                                                        </p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <input
                                        type="url"
                                        value={editForm.data.image_url}
                                        onChange={(e) => {
                                            editForm.setData('image_url', e.target.value);
                                            setEditImagePreview(e.target.value);
                                        }}
                                        placeholder="https://example.com/vehicle-photo.jpg"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                                    />
                                )}
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingCar(null)}
                                    className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={editForm.processing}
                                    className="flex-1 py-3 bg-[#003c90] text-white font-bold rounded-xl shadow-md"
                                >
                                    Update Details
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
