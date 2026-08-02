<?php

use App\Models\Car;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed();
});

test('home page renders successfully with featured cars', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});

test('cars catalog page can be visited', function () {
    $response = $this->get('/cars');

    $response->assertStatus(200);
});

test('single car show page can be rendered', function () {
    $car = Car::first();

    $response = $this->get("/cars/{$car->id}");

    $response->assertStatus(200);
});

test('can create a car booking reservation', function () {
    $car = Car::first();

    $response = $this->post('/bookings', [
        'car_id' => $car->id,
        'customer_name' => 'John Doe',
        'customer_email' => 'john@example.com',
        'customer_phone' => '+62 812-0000-1111',
        'pickup_location' => 'Lombok International Airport (LOP)',
        'dropoff_location' => 'Kuta Lombok Center',
        'pickup_datetime' => now()->addDays(1)->toDateTimeString(),
        'dropoff_datetime' => now()->addDays(3)->toDateTimeString(),
        'driver_option' => 'with_driver',
    ]);

    $response->assertRedirect();
});

test('admin dashboard can be rendered', function () {
    $admin = User::first();

    $response = $this->actingAs($admin)->get('/admin/dashboard');

    $response->assertStatus(200);
});
