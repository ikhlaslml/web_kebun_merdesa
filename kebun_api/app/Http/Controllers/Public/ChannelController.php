<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Channel;

class ChannelController extends Controller
{
    public function index()
    {
        $channels = Channel::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->latest('id')
            ->get();

        return response()->json($channels);
    }
}
