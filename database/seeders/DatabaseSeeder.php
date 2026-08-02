<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\Booking;
use App\Models\Car;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin User
        $admin = User::firstOrCreate(
            ['email' => 'admin@lombokautorentcar.com'],
            [
                'name' => 'Admin Lombok Auto',
                'phone' => '+62 812-3456-7890',
                'role' => 'admin',
                'password' => bcrypt('password'),
                'avatar_url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
            ]
        );

        // Sample Customers
        $customer1 = User::firstOrCreate(
            ['email' => 'rahmat.hidayat@example.com'],
            [
                'name' => 'Rahmat Hidayat',
                'phone' => '+62 819-8765-4321',
                'driver_license_number' => '5201091234560001',
                'role' => 'customer',
                'password' => bcrypt('password'),
                'avatar_url' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
            ]
        );

        $customer2 = User::firstOrCreate(
            ['email' => 'sarah.jenkins@example.com'],
            [
                'name' => 'Sarah Jenkins',
                'phone' => '+62 813-9988-7766',
                'driver_license_number' => 'DL-US-987654321',
                'role' => 'customer',
                'password' => bcrypt('password'),
                'avatar_url' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
            ]
        );

        // Cars
        $cars = [
            [
                'name' => 'Toyota Alphard Executive Lounge',
                'brand' => 'Toyota',
                'category' => 'Luxury',
                'transmission' => 'Automatic',
                'capacity_passengers' => 6,
                'capacity_luggage' => 4,
                'fuel_type' => 'Gasoline',
                'price_per_day' => 2800000,
                'is_available' => true,
                'rating' => 4.95,
                'image_url' => 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
                'features' => ['VIP Captain Seats', 'Dual Sunroof', 'JBL Sound System', 'Adaptive Cruise', 'Privacy Curtains'],
                'description' => 'The ultimate VIP transport for luxury travel around Lombok. Premium comfort with first-class captain seats and supreme smoothness.',
            ],
            [
                'name' => 'Toyota Fortuner GR Sport',
                'brand' => 'Toyota',
                'category' => 'SUV',
                'transmission' => 'Automatic',
                'capacity_passengers' => 7,
                'capacity_luggage' => 3,
                'fuel_type' => 'Diesel',
                'price_per_day' => 1250000,
                'is_available' => true,
                'rating' => 4.90,
                'image_url' => 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
                'features' => ['4x4 Terrain Mode', 'Leather Interior', 'Apple CarPlay', '360 Camera', 'Power Tailgate'],
                'description' => 'Conquer Lombok steep hills, Sembalun highlands, and coastal drives with high clearance and tough 4x4 diesel engine power.',
            ],
            [
                'name' => 'Toyota Innova Zenix Hybrid',
                'brand' => 'Toyota',
                'category' => 'MPV',
                'transmission' => 'Automatic',
                'capacity_passengers' => 7,
                'capacity_luggage' => 3,
                'fuel_type' => 'Hybrid',
                'price_per_day' => 950000,
                'is_available' => true,
                'rating' => 4.88,
                'image_url' => 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
                'features' => ['Panoramic Sunroof', 'Hybrid Fuel Efficiency', 'Ottoman Seats', 'Toyota Safety Sense', 'Rear Screen'],
                'description' => 'Modern, ultra-comfortable, and eco-friendly MPV ideal for family vacations around Senggigi and Kuta Lombok.',
            ],
            [
                'name' => 'Mitsubishi Pajero Sport Dakar',
                'brand' => 'Mitsubishi',
                'category' => 'SUV',
                'transmission' => 'Automatic',
                'capacity_passengers' => 7,
                'capacity_luggage' => 3,
                'fuel_type' => 'Diesel',
                'price_per_day' => 1200000,
                'is_available' => true,
                'rating' => 4.92,
                'image_url' => 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
                'features' => ['Super Select 4WD', 'Sunroof', 'Adaptive Cruise Control', 'Forward Collision Mitigation', 'Leather Seats'],
                'description' => 'Powerful performance with premium interior finish. Excellent handling for island hopping and mountain road trips.',
            ],
            [
                'name' => 'Honda HR-V RS Turbo',
                'brand' => 'Honda',
                'category' => 'Compact',
                'transmission' => 'Automatic',
                'capacity_passengers' => 5,
                'capacity_luggage' => 2,
                'fuel_type' => 'Gasoline',
                'price_per_day' => 750000,
                'is_available' => true,
                'rating' => 4.85,
                'image_url' => 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80',
                'features' => ['VTEC Turbo', 'Honda Sensing', 'Panoramic Glass Roof', 'Hands-free Tailgate'],
                'description' => 'Sleek crossover perfect for couples or solo travelers exploring Mataram city and coastal beach routes.',
            ],
            [
                'name' => 'Suzuki Jimny 5-Door 4x4',
                'brand' => 'Suzuki',
                'category' => 'SUV',
                'transmission' => 'Automatic',
                'capacity_passengers' => 4,
                'capacity_luggage' => 2,
                'fuel_type' => 'Gasoline',
                'price_per_day' => 1100000,
                'is_available' => true,
                'rating' => 4.96,
                'image_url' => 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80',
                'features' => ['AllGrip Pro 4WD', 'Retro Styling', 'Hill Descent Control', 'Rugged All-Terrain Tires'],
                'description' => 'Iconic off-road vehicle for adventurous roadtrips to Tanjung Aan, Pink Beach, and secret surf spots.',
            ],
        ];

        $createdCars = [];
        foreach ($cars as $carData) {
            $createdCars[] = Car::create($carData);
        }

        // Sample Bookings
        Booking::create([
            'booking_code' => 'LAK-20260803-01',
            'car_id' => $createdCars[0]->id,
            'user_id' => $customer1->id,
            'customer_name' => 'Rahmat Hidayat',
            'customer_email' => 'rahmat.hidayat@example.com',
            'customer_phone' => '+62 819-8765-4321',
            'driver_license' => '5201091234560001',
            'pickup_location' => 'Lombok International Airport (LOP)',
            'dropoff_location' => 'Hotel Oberoi Lombok, Medana Bay',
            'pickup_datetime' => Carbon::now()->addDays(2)->setHour(10)->setMinute(0),
            'dropoff_datetime' => Carbon::now()->addDays(5)->setHour(12)->setMinute(0),
            'driver_option' => 'with_driver',
            'total_price' => 8400000,
            'status' => 'confirmed',
            'payment_status' => 'paid',
            'notes' => 'Airport pickup with name sign. Flight GA402 arriving 09:45 AM.',
        ]);

        Booking::create([
            'booking_code' => 'LAK-20260803-02',
            'car_id' => $createdCars[1]->id,
            'user_id' => $customer2->id,
            'customer_name' => 'Sarah Jenkins',
            'customer_email' => 'sarah.jenkins@example.com',
            'customer_phone' => '+62 813-9988-7766',
            'driver_license' => 'DL-US-987654321',
            'pickup_location' => 'Kuta Lombok Center',
            'dropoff_location' => 'Lombok International Airport (LOP)',
            'pickup_datetime' => Carbon::now()->addDays(1)->setHour(9)->setMinute(0),
            'dropoff_datetime' => Carbon::now()->addDays(4)->setHour(17)->setMinute(0),
            'driver_option' => 'self_drive',
            'total_price' => 3750000,
            'status' => 'active',
            'payment_status' => 'paid',
            'notes' => 'Self-drive rental. Requested child seat included.',
        ]);

        // Sample Blog Posts
        BlogPost::create([
            'title' => 'The Ultimate Guide to Exploring South Lombok: Secret Beaches & Surf Spots',
            'slug' => 'ultimate-guide-exploring-south-lombok',
            'summary' => 'Discover hidden coastal gems from Selong Belanak to Tanjung Aan with your private rental car.',
            'content' => 'South Lombok is renowned for its turquoise bays, world-class surf breaks, and dramatically sculpted headlands. Having a rental car gives you total freedom to beat the tour buses and discover tranquil beaches at sunrise. In this comprehensive guide, we map out the best scenic driving routes, parking spots, and local dining recommendations.',
            'category' => 'Travel Guide',
            'author_name' => 'Lombok Travel Concierge',
            'cover_image' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
            'read_time_minutes' => 6,
            'published_at' => Carbon::now()->subDays(5),
        ]);

        BlogPost::create([
            'title' => 'Driving to Mount Rinjani: Scenic Highlands Roadtrip from Senggigi to Sembalun',
            'slug' => 'driving-to-mount-rinjani-sembalun-roadtrip',
            'summary' => 'Navigate mountain pass curves and breathtaking valley views with our high-clearance SUV recommendations.',
            'content' => 'The road to Sembalun offers some of Indonesia most stunning highland vistas. As you ascend from coastal Senggigi through Pusuk Monkey Forest toward Mount Rinjani, cool mountain breezes replace ocean warmth. Learn how to prepare your vehicle for steep gradients and fog conditions.',
            'category' => 'Road Trip',
            'author_name' => 'Lombok Travel Concierge',
            'cover_image' => 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
            'read_time_minutes' => 8,
            'published_at' => Carbon::now()->subDays(12),
        ]);
    }
}
