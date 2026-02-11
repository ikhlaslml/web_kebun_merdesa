<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    public function show(string $path)
    {
        $cleanPath = ltrim($path, '/');

        // Basic traversal guard
        if (str_contains($cleanPath, '..')) {
            abort(404);
        }

        if (!Storage::disk('public')->exists($cleanPath)) {
            abort(404);
        }

        return response()->file(Storage::disk('public')->path($cleanPath));
    }
}
