<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\Booking;
use App\Models\Car;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function dashboard(): Response
    {
        $totalCars = Car::count();
        $availableCars = Car::where('is_available', true)->count();
        $rentedCars = Car::where('is_available', false)->count();
        $totalBookings = Booking::count();
        $pendingBookings = Booking::where('status', 'pending')->count();
        $confirmedBookings = Booking::where('status', 'confirmed')->count();
        $totalRevenue = Booking::where('payment_status', 'paid')->sum('total_price');
        if ($totalRevenue == 0) {
            $totalRevenue = Booking::sum('total_price');
        }

        $recentBookings = Booking::with('car')->orderByDesc('created_at')->take(5)->get();
        $carsList = Car::take(4)->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalCars' => $totalCars,
                'availableCars' => $availableCars,
                'rentedCars' => $rentedCars,
                'totalBookings' => $totalBookings,
                'pendingBookings' => $pendingBookings,
                'confirmedBookings' => $confirmedBookings,
                'totalRevenue' => $totalRevenue,
                'total_cars' => $totalCars,
                'available_cars' => $availableCars,
                'rented_cars' => $rentedCars,
                'total_bookings' => $totalBookings,
                'pending_bookings' => $pendingBookings,
                'confirmed_bookings' => $confirmedBookings,
                'total_revenue' => $totalRevenue,
            ],
            'recentBookings' => $recentBookings,
            'recent_bookings' => $recentBookings,
            'carsList' => $carsList,
            'featured_cars' => $carsList,
        ]);
    }

    public function fleet(): Response
    {
        $cars = Car::orderBy('name')->get();

        return Inertia::render('Admin/Fleet/Index', [
            'cars' => $cars,
        ]);
    }

    public function storeCar(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'service_type' => 'required|string|in:self_drive,with_driver,both',
            'transmission' => 'required|string|max:100',
            'capacity_passengers' => 'required|integer|min:1',
            'capacity_luggage' => 'required|integer|min:0',
            'fuel_type' => 'required|string|max:100',
            'price_per_day' => 'required|numeric|min:0',
            'custom_driver_price' => 'nullable|numeric|min:0',
            'image' => 'nullable|image|max:5120',
            'image_url' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $imageUrl = $validated['image_url'] ?? null;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('cars', 'public');
            $imageUrl = asset('storage/'.$path);
        }

        if (! $imageUrl) {
            $imageUrl = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80';
        }

        Car::create([
            'name' => $validated['name'],
            'brand' => $validated['brand'],
            'category' => $validated['category'],
            'service_type' => $validated['service_type'],
            'transmission' => $validated['transmission'],
            'capacity_passengers' => $validated['capacity_passengers'],
            'capacity_luggage' => $validated['capacity_luggage'],
            'fuel_type' => $validated['fuel_type'],
            'price_per_day' => $validated['price_per_day'],
            'custom_driver_price' => $validated['custom_driver_price'] ?? null,
            'image_url' => $imageUrl,
            'description' => $validated['description'] ?? null,
            'is_available' => true,
            'rating' => 5.0,
            'features' => ['Air Conditioning', 'Bluetooth', 'Backup Camera'],
        ]);

        return back()->with('success', 'Car added to fleet successfully.');
    }

    public function updateCar(Request $request, Car $car): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'service_type' => 'required|string|in:self_drive,with_driver,both',
            'transmission' => 'required|string|max:100',
            'capacity_passengers' => 'required|integer|min:1',
            'capacity_luggage' => 'required|integer|min:0',
            'fuel_type' => 'required|string|max:100',
            'price_per_day' => 'required|numeric|min:0',
            'custom_driver_price' => 'nullable|numeric|min:0',
            'image' => 'nullable|image|max:5120',
            'image_url' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $imageUrl = $car->image_url;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('cars', 'public');
            $imageUrl = asset('storage/'.$path);
        } elseif (! empty($validated['image_url'])) {
            $imageUrl = $validated['image_url'];
        }

        $car->update([
            'name' => $validated['name'],
            'brand' => $validated['brand'],
            'category' => $validated['category'],
            'service_type' => $validated['service_type'],
            'transmission' => $validated['transmission'],
            'capacity_passengers' => $validated['capacity_passengers'],
            'capacity_luggage' => $validated['capacity_luggage'],
            'fuel_type' => $validated['fuel_type'],
            'price_per_day' => $validated['price_per_day'],
            'custom_driver_price' => $validated['custom_driver_price'] ?? null,
            'image_url' => $imageUrl,
            'description' => $validated['description'] ?? null,
        ]);

        return back()->with('success', 'Vehicle details updated successfully.');
    }

    public function updateCarStatus(Car $car): RedirectResponse
    {
        $car->update(['is_available' => ! $car->is_available]);

        return back()->with('success', 'Car status updated.');
    }

    public function deleteCar(Car $car): RedirectResponse
    {
        $car->delete();

        return back()->with('success', 'Car deleted from fleet.');
    }

    public function bookings(): Response
    {
        $bookings = Booking::with(['car', 'user'])->orderByDesc('created_at')->get();

        return Inertia::render('Admin/Bookings/Index', [
            'bookings' => $bookings,
        ]);
    }

    public function updateBookingStatus(Request $request, Booking $booking): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,active,completed,cancelled',
        ]);

        $booking->update($validated);

        return back()->with('success', 'Booking status updated.');
    }

    public function customers(): Response
    {
        $customers = User::where('role', 'customer')->withCount('bookings')->orderByDesc('created_at')->get();

        return Inertia::render('Admin/Customers/Index', [
            'customers' => $customers,
        ]);
    }

    public function showCustomer(User $customer): Response
    {
        $customer->load(['bookings.car']);

        return Inertia::render('Admin/Customers/Show', [
            'customer' => $customer,
        ]);
    }

    public function blog(): Response
    {
        $posts = BlogPost::orderByDesc('created_at')->get();

        return Inertia::render('Admin/Blog/Index', [
            'posts' => $posts,
        ]);
    }

    public function createBlogPost(): Response
    {
        return Inertia::render('Admin/Blog/Create');
    }

    public function storeBlogPost(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'summary' => 'nullable|string',
            'content' => 'required|string',
            'category' => 'required|string|max:100',
            'image' => 'nullable|image|max:5120',
            'image_url' => 'nullable|string',
            'cover_image' => 'nullable|string',
        ]);

        $imageUrl = $validated['image_url'] ?? $validated['cover_image'] ?? null;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('blog', 'public');
            $imageUrl = asset('storage/'.$path);
        }

        if (! $imageUrl) {
            $imageUrl = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80';
        }

        BlogPost::create([
            'title' => $validated['title'],
            'summary' => $validated['excerpt'] ?? $validated['summary'] ?? Str::limit(strip_tags($validated['content']), 150),
            'content' => $validated['content'],
            'category' => $validated['category'],
            'cover_image' => $imageUrl,
            'slug' => Str::slug($validated['title']).'-'.rand(100, 999),
            'author_name' => auth()->user()?->name ?? 'Lombok Auto Admin',
            'read_time_minutes' => 5,
            'published_at' => now(),
        ]);

        return redirect()->route('admin.blog.index')->with('success', 'Blog post published.');
    }

    public function editBlogPost(BlogPost $post): Response
    {
        return Inertia::render('Admin/Blog/Edit', [
            'post' => $post,
        ]);
    }

    public function updateBlogPost(Request $request, BlogPost $post): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'summary' => 'nullable|string',
            'content' => 'required|string',
            'category' => 'required|string|max:100',
            'image' => 'nullable|image|max:5120',
            'image_url' => 'nullable|string',
            'cover_image' => 'nullable|string',
        ]);

        $imageUrl = $post->cover_image;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('blog', 'public');
            $imageUrl = asset('storage/'.$path);
        } elseif (! empty($validated['image_url'])) {
            $imageUrl = $validated['image_url'];
        }

        $post->update([
            'title' => $validated['title'],
            'summary' => $validated['excerpt'] ?? $validated['summary'] ?? Str::limit(strip_tags($validated['content']), 150),
            'content' => $validated['content'],
            'category' => $validated['category'],
            'cover_image' => $imageUrl,
        ]);

        return redirect()->route('admin.blog.index')->with('success', 'Blog post updated successfully.');
    }

    public function deleteBlogPost(BlogPost $post): RedirectResponse
    {
        $post->delete();

        return redirect()->route('admin.blog.index')->with('success', 'Blog post deleted.');
    }
}
