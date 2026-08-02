<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('brand');
            $table->string('category'); // Luxury, SUV, MPV, Compact
            $table->string('transmission'); // Automatic, Manual
            $table->integer('capacity_passengers')->default(5);
            $table->integer('capacity_luggage')->default(2);
            $table->string('fuel_type')->default('Gasoline'); // Gasoline, Hybrid, Diesel
            $table->decimal('price_per_day', 12, 2); // IDR per day
            $table->boolean('is_available')->default(true);
            $table->decimal('rating', 3, 2)->default(4.90);
            $table->string('image_url')->nullable();
            $table->json('features')->nullable(); // e.g. ["Leather Seats", "GPS", "Bluetooth", "Sunroof"]
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
