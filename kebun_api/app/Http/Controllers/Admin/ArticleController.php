<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    public function index()
    {
        return response()->json(Article::query()->orderByDesc('published_at')->get());
    }

    private function uniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $base = Str::slug($title);
        $slug = $base ?: 'artikel';
        $i = 2;

        while (
            Article::query()
                ->where('slug', $slug)
                ->when($ignoreId, fn($q) => $q->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = $base . '-' . $i;
            $i++;
        }

        return $slug;
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'excerpt' => ['nullable', 'string'],
            'content' => ['required', 'string'],
            'is_published' => ['nullable', 'boolean'],
            'published_at' => ['nullable', 'date'],
            'cover' => ['nullable', 'image', 'max:10240'],
        ]);

        $data['slug'] = $this->uniqueSlug($data['title']);
        $data['is_published'] = $data['is_published'] ?? true;
        $data['published_at'] = isset($data['published_at'])
            ? Carbon::parse($data['published_at'])
            : Carbon::now();

        if ($request->hasFile('cover')) {
            $data['cover_image_path'] = $request->file('cover')->store('uploads/articles', 'public');
        }

        $article = Article::create($data);

        return response()->json($article, 201);
    }

    public function update(Request $request, Article $article)
    {
        $data = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'excerpt' => ['nullable', 'string'],
            'content' => ['sometimes', 'required', 'string'],
            'is_published' => ['nullable', 'boolean'],
            'published_at' => ['nullable', 'date'],
            'cover' => ['nullable', 'image', 'max:10240'],
        ]);

        if (isset($data['title'])) {
            $data['slug'] = $this->uniqueSlug($data['title'], $article->id);
        }

        if (isset($data['published_at'])) {
            $data['published_at'] = Carbon::parse($data['published_at']);
        }

        if ($request->hasFile('cover')) {
            if ($article->cover_image_path) {
                Storage::disk('public')->delete($article->cover_image_path);
            }
            $data['cover_image_path'] = $request->file('cover')->store('uploads/articles', 'public');
        }

        $article->update($data);

        return response()->json($article);
    }

    public function destroy(Article $article)
    {
        if ($article->cover_image_path) {
            Storage::disk('public')->delete($article->cover_image_path);
        }
        $article->delete();

        return response()->json(['message' => 'Artikel dihapus']);
    }
}
