<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'cover_image_path',
        'is_published',
        'published_at',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];

    protected $appends = ['cover_image_url'];

    public function getCoverImageUrlAttribute(): ?string
    {
        if (!$this->cover_image_path) return null;

        if (preg_match('#^https?://#', $this->cover_image_path)) {
            return $this->cover_image_path;
        }

        $segments = array_map('rawurlencode', explode('/', ltrim($this->cover_image_path, '/')));
        return url('/api/public/media/' . implode('/', $segments));
    }
}
