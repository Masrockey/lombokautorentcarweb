<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LegalController;
use Illuminate\Support\Facades\Route;

// Public Routes
Route::get('/', [HomeController::class, 'index'])->name('home');

// Car Catalog & Booking Details
Route::get('/cars', [CarController::class, 'index'])->name('cars.index');
Route::get('/cars/{car}', [CarController::class, 'show'])->name('cars.show');

// Reservation Engine
Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');
Route::get('/bookings/{booking}/confirmation', [BookingController::class, 'confirmation'])->name('bookings.confirmation');

// Blog & Travel Guides
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

// Contact Us
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');

// Legal Pages
Route::get('/terms-of-service', [LegalController::class, 'terms'])->name('legal.terms');
Route::get('/privacy-policy', [LegalController::class, 'privacy'])->name('legal.privacy');
Route::get('/terms-and-conditions', [LegalController::class, 'conditions'])->name('legal.conditions');

// Dashboard Redirect / Alias for Fortify / Auth
Route::get('/dashboard', function () {
    return redirect()->route('admin.dashboard');
})->name('dashboard');

// Admin Dashboard & Management Routes
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');

    // Fleet Management
    Route::get('/fleet', [AdminController::class, 'fleet'])->name('fleet.index');
    Route::post('/fleet', [AdminController::class, 'storeCar'])->name('fleet.store');
    Route::match(['put', 'post'], '/fleet/{car}', [AdminController::class, 'updateCar'])->name('fleet.update');
    Route::patch('/fleet/{car}/toggle', [AdminController::class, 'updateCarStatus'])->name('fleet.toggle');
    Route::delete('/fleet/{car}', [AdminController::class, 'deleteCar'])->name('fleet.destroy');

    // Booking Management
    Route::get('/bookings', [AdminController::class, 'bookings'])->name('bookings.index');
    Route::patch('/bookings/{booking}', [AdminController::class, 'updateBookingStatus'])->name('bookings.update');

    // Customer Directory
    Route::get('/customers', [AdminController::class, 'customers'])->name('customers.index');
    Route::get('/customers/{customer}', [AdminController::class, 'showCustomer'])->name('customers.show');

    // Blog Management
    Route::get('/blog', [AdminController::class, 'blog'])->name('blog.index');
    Route::get('/blog/create', [AdminController::class, 'createBlogPost'])->name('blog.create');
    Route::post('/blog', [AdminController::class, 'storeBlogPost'])->name('blog.store');
    Route::get('/blog/{post}/edit', [AdminController::class, 'editBlogPost'])->name('blog.edit');
    Route::match(['put', 'post'], '/blog/{post}', [AdminController::class, 'updateBlogPost'])->name('blog.update');
    Route::delete('/blog/{post}', [AdminController::class, 'deleteBlogPost'])->name('blog.destroy');
});

require __DIR__.'/settings.php';
