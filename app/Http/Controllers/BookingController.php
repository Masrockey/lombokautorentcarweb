<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Car;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'car_id' => 'required|exists:cars,id',
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'required|string|max:50',
            'driver_license' => 'nullable|string|max:100',
            'pickup_location' => 'required|string|max:255',
            'dropoff_location' => 'required|string|max:255',
            'pickup_datetime' => 'required|date',
            'dropoff_datetime' => 'required|date|after:pickup_datetime',
            'driver_option' => 'required|in:with_driver,self_drive',
            'notes' => 'nullable|string',
        ]);

        $car = Car::findOrFail($validated['car_id']);

        $pickup = Carbon::parse($validated['pickup_datetime']);
        $dropoff = Carbon::parse($validated['dropoff_datetime']);
        $days = max(1, $pickup->diffInDays($dropoff) ?: 1);

        $totalPrice = $car->price_per_day * $days;
        if ($validated['driver_option'] === 'with_driver') {
            $totalPrice += 150000 * $days; // Driver fee per day
        }

        $bookingCode = 'LAK-'.strtoupper(uniqid());

        $booking = Booking::create([
            ...$validated,
            'booking_code' => $bookingCode,
            'user_id' => auth()->id(),
            'total_price' => $totalPrice,
            'status' => 'confirmed',
            'payment_status' => 'paid',
        ]);

        return redirect()->route('bookings.confirmation', $booking->id);
    }

    public function confirmation(Booking $booking): Response
    {
        $booking->load('car');

        return Inertia::render('Bookings/Confirmation', [
            'booking' => $booking,
        ]);
    }
}
