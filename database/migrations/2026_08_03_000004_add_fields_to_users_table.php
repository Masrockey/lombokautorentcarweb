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
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->nullable()->after('email');
            $table->string('driver_license_number')->nullable()->after('phone');
            $table->string('avatar_url')->nullable()->after('driver_license_number');
            $table->string('role')->default('customer')->after('avatar_url'); // admin, customer
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['phone', 'driver_license_number', 'avatar_url', 'role']);
        });
    }
};
