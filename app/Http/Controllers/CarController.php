<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CarController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Car::query();

        if ($request->filled('search')) {
            $query->where('name', 'like', '%'.$request->search.'%')
                ->orWhere('brand', 'like', '%'.$request->search.'%');
        }

        if ($request->filled('category') && $request->category !== 'All') {
            $query->where('category', $request->category);
        }

        if ($request->filled('transmission') && $request->transmission !== 'All') {
            $query->where('transmission', $request->transmission);
        }

        $cars = $query->orderBy('price_per_day')->get();

        return Inertia::render('Cars/Index', [
            'cars' => $cars,
            'filters' => [
                'search' => $request->search ?? '',
                'category' => $request->category ?? 'All',
                'transmission' => $request->transmission ?? 'All',
            ],
        ]);
    }

    public function show(Car $car): Response
    {
        return Inertia::render('Cars/Show', [
            'car' => $car,
        ]);
    }
}
