<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;

use App\Models\User;
use App\Models\Product;
use App\Models\Article;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin default
        User::updateOrCreate(
            ['email' => 'admin@kebunmerdesa.com'],
            [
                'name' => 'Admin Kebun Merdesa',
                'password' => Hash::make('admin123'),
            ]
        );

        // Sample Products
        Product::query()->delete();
        Product::insert([
            [
                'name' => 'Espresso Blend 250g',
                'category' => 'Beans',
                'description' => 'Blend cocok untuk espresso & susu. Profil rasa: cokelat, karamel, nutty.',
                'price' => 80000,
                'image_path' => null,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Single Origin Gayo 200g',
                'category' => 'Beans',
                'description' => 'Aroma floral, acidity seimbang. Cocok pour over.',
                'price' => 85000,
                'image_path' => null,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Workshop Brew Manual',
                'category' => 'Workshop',
                'description' => 'Belajar V60 & Aeropress (komunitas). Kuota terbatas.',
                'price' => 150000,
                'image_path' => null,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Sample Articles
        Article::query()->delete();
        Article::insert([
            [
                'title' => 'Kenapa Roasting Itu Penting?',
                'slug' => 'kenapa-roasting-itu-penting',
                'excerpt' => 'Roasting bukan cuma “menghitamkan biji”, tapi mengunci karakter rasa kopi.',
                'content' => "Roasting adalah proses mengubah biji kopi mentah menjadi biji kopi siap seduh.\n\nDi tahap ini, reaksi Maillard dan karamelisasi membentuk aroma serta rasa. Yang kita cari adalah keseimbangan: manis, body, acidity, dan aftertaste.\n\nTips: mulai dari profil light–medium kalau kamu suka rasa fruity/teh, dan medium–dark kalau kamu suka cokelat/karamel.",
                'cover_image_path' => null,
                'is_published' => true,
                'published_at' => Carbon::now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Panduan Singkat: V60 untuk Pemula',
                'slug' => 'panduan-singkat-v60-untuk-pemula',
                'excerpt' => 'Buat V60 tidak harus ribet. Kuncinya ada di grind size, rasio, dan pouring.',
                'content' => "Untuk pemula, pakai rasio 1:15.\n\nContoh: 15g kopi : 225ml air.\n\nLangkah singkat:\n1) Bloom 30–45 detik.\n2) Pouring pelan melingkar.\n3) Total waktu 2:30–3:00.\n\nKalau pahit: grind lebih kasar / kurangi waktu. Kalau asam: grind lebih halus / tambah suhu.",
                'cover_image_path' => null,
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(2),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
