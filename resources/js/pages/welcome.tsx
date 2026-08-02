import React from 'react';
import Home from './Home';
import { Car, BlogPost } from '../types/lombok';

interface WelcomeProps {
    featuredCars?: Car[];
    latestPosts?: BlogPost[];
}

export default function Welcome({ featuredCars = [], latestPosts = [] }: WelcomeProps) {
    const defaultCars: Car[] = [
        {
            id: 1,
            name: 'Toyota Alphard Executive Lounge',
            brand: 'Toyota',
            category: 'Luxury',
            transmission: 'Automatic',
            capacity_passengers: 6,
            capacity_luggage: 4,
            fuel_type: 'Gasoline',
            price_per_day: 2800000,
            is_available: true,
            rating: 4.95,
            image_url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
            features: ['VIP Captain Seats', 'Dual Sunroof', 'JBL Sound System'],
        },
        {
            id: 2,
            name: 'Toyota Fortuner GR Sport',
            brand: 'Toyota',
            category: 'SUV',
            transmission: 'Automatic',
            capacity_passengers: 7,
            capacity_luggage: 3,
            fuel_type: 'Diesel',
            price_per_day: 1250000,
            is_available: true,
            rating: 4.90,
            image_url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
            features: ['4x4 Terrain Mode', 'Leather Interior', 'Apple CarPlay'],
        },
        {
            id: 3,
            name: 'Toyota Innova Zenix Hybrid',
            brand: 'Toyota',
            category: 'MPV',
            transmission: 'Automatic',
            capacity_passengers: 7,
            capacity_luggage: 3,
            fuel_type: 'Hybrid',
            price_per_day: 950000,
            is_available: true,
            rating: 4.88,
            image_url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
            features: ['Panoramic Sunroof', 'Hybrid Fuel Efficiency'],
        },
    ];

    const defaultPosts: BlogPost[] = [
        {
            id: 1,
            title: 'The Ultimate Guide to Exploring South Lombok: Secret Beaches & Surf Spots',
            slug: 'ultimate-guide-exploring-south-lombok',
            summary: 'Discover hidden coastal gems from Selong Belanak to Tanjung Aan with your private rental car.',
            content: 'South Lombok is renowned for its turquoise bays...',
            category: 'Travel Guide',
            author_name: 'Lombok Travel Concierge',
            cover_image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
            read_time_minutes: 6,
            published_at: new Date().toISOString(),
        },
    ];

    const carsToDisplay = featuredCars.length > 0 ? featuredCars : defaultCars;
    const postsToDisplay = latestPosts.length > 0 ? latestPosts : defaultPosts;

    return <Home featuredCars={carsToDisplay} latestPosts={postsToDisplay} />;
}
