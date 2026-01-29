<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Public\ProductController as PublicProductController;
use App\Http\Controllers\Public\ArticleController as PublicArticleController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\ArticleController as AdminArticleController;

Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});

Route::prefix('public')->group(function () {
    Route::get('/products', [PublicProductController::class, 'index']);
    Route::get('/articles', [PublicArticleController::class, 'index']);
    Route::get('/articles/{slug}', [PublicArticleController::class, 'show']);
});

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::prefix('admin')->group(function () {
        Route::apiResource('products', AdminProductController::class)->except(['show']);
        Route::apiResource('articles', AdminArticleController::class)->except(['show']);
    });
});
