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
        Schema::table('cars', function (Blueprint $table) {
            $table->string('service_type')->default('both')->after('category'); // 'self_drive', 'with_driver', 'both'
            $table->decimal('custom_driver_price', 12, 2)->nullable()->after('price_per_day');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->dropColumn(['service_type', 'custom_driver_price']);
        });
    }
};
