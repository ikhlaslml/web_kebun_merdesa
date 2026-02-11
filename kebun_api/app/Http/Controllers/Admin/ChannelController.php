<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Channel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ChannelController extends Controller
{
    public function index()
    {
        return response()->json(Channel::query()->orderBy('sort_order')->latest('id')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'tag' => ['nullable', 'string', 'max:80'],
            'cta_label' => ['nullable', 'string', 'max:100'],
            'whatsapp_message' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
            'image' => ['nullable', 'image', 'max:10240'],
        ]);

        $data['cta_label'] = $data['cta_label'] ?? 'Tanya Jadwal';
        $data['sort_order'] = $data['sort_order'] ?? 0;
        $data['is_active'] = $data['is_active'] ?? true;

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('uploads/channels', 'public');
        }

        $channel = Channel::create($data);

        return response()->json($channel, 201);
    }

    public function update(Request $request, Channel $channel)
    {
        $data = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'tag' => ['nullable', 'string', 'max:80'],
            'cta_label' => ['nullable', 'string', 'max:100'],
            'whatsapp_message' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
            'image' => ['nullable', 'image', 'max:10240'],
        ]);

        if ($request->hasFile('image')) {
            if ($channel->image_path) {
                Storage::disk('public')->delete($channel->image_path);
            }
            $data['image_path'] = $request->file('image')->store('uploads/channels', 'public');
        }

        $channel->update($data);

        return response()->json($channel);
    }

    public function destroy(Channel $channel)
    {
        if ($channel->image_path) {
            Storage::disk('public')->delete($channel->image_path);
        }

        $channel->delete();

        return response()->json(['message' => 'Channel dihapus']);
    }
}
