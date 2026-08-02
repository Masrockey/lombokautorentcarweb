<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'brand',
        'category',
        'service_type',
        'transmission',
        'capacity_passengers',
        'capacity_luggage',
        'fuel_type',
        'price_per_day',
        'custom_driver_price',
        'is_available',
        'rating',
        'image_url',
        'features',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'price_per_day' => 'decimal:2',
            'custom_driver_price' => 'decimal:2',
            'rating' => 'decimal:2',
            'is_available' => 'boolean',
            'capacity_passengers' => 'integer',
            'capacity_luggage' => 'integer',
            'features' => 'array',
        ];
    }

    protected $appends = ['driver_price_per_day'];

    public function getDriverPricePerDayAttribute(): float
    {
        if ($this->custom_driver_price > 0) {
            return (float) $this->custom_driver_price;
        }

        if ($this->price_per_day >= 1000000 || in_array(strtolower($this->category), ['luxury', 'premium'])) {
            return 250000;
        }

        if ($this->price_per_day >= 500000 || in_array(strtolower($this->category), ['suv', 'mpv', 'family'])) {
            return 200000;
        }

        return 150000;
    }

    /**
     * @return HasMany<Booking, $this>
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
}
