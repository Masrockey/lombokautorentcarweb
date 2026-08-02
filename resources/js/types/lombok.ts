export interface Car {
    id: number;
    name: string;
    brand: string;
    category: string;
    transmission: string;
    capacity_passengers: number;
    capacity_luggage: number;
    fuel_type: string;
    price_per_day: number;
    is_available: boolean;
    rating: number;
    image_url: string;
    service_type?: 'self_drive' | 'with_driver' | 'both' | string;
    custom_driver_price?: number;
    driver_price_per_day?: number;
    features?: string[];
    description?: string;
}

export interface Booking {
    id: number;
    booking_code: string;
    car_id: number;
    car?: Car;
    user_id?: number;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    driver_license?: string;
    pickup_location: string;
    dropoff_location: string;
    pickup_datetime: string;
    dropoff_datetime: string;
    driver_option: 'with_driver' | 'self_drive';
    total_price: number;
    status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
    payment_status: 'unpaid' | 'paid' | 'refunded';
    notes?: string;
    created_at?: string;
}

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    summary: string;
    content: string;
    category: string;
    author_name: string;
    cover_image: string;
    read_time_minutes: number;
    published_at: string;
}

export interface CustomerUser {
    id: number;
    name: string;
    email: string;
    phone?: string;
    driver_license_number?: string;
    avatar_url?: string;
    role: string;
    bookings_count?: number;
    bookings?: Booking[];
    created_at?: string;
}
