<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\Car;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $featuredCars = Car::where('is_available', true)->take(6)->get();
        $latestPosts = BlogPost::orderByDesc('published_at')->take(3)->get();

        return Inertia::render('Home', [
            'featuredCars' => $featuredCars,
            'latestPosts' => $latestPosts,
        ]);
    }
}
