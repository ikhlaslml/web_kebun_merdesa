<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{
    protected $fillable = [
        'title',
        'tag',
        'image_path',
        'cta_label',
        'whatsapp_message',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'sort_order' => 'integer',
        'is_active' => 'boolean',
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute(): ?string
    {
        if (!$this->image_path) {
            return null;
        }

        if (preg_match('#^https?://#', $this->image_path)) {
            return $this->image_path;
        }

        return asset('storage/' . ltrim($this->image_path, '/'));
    }
}
