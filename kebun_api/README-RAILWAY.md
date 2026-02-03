# Deploy kebun_api ke Railway (gratis)

Gunakan Railway untuk hosting Laravel. Railway akan build dari `Dockerfile` di folder ini.

## Langkah di Railway
1. Buat project baru di Railway.
2. Connect repository GitHub `web_kebun_merdesa`.
3. Set **Root Directory** ke `kebun_api`.
4. Pastikan Railway memakai **Dockerfile** (auto-detect).
5. Tambahkan **MySQL** dari tab **Add New** → **Database** → **MySQL**.

## Environment Variables (Railway)
Isi di Railway → **Variables**:
- `APP_ENV=production`
- `APP_DEBUG=false`
- `APP_KEY=base64:...` (buat dengan `php artisan key:generate --show`)
- `APP_URL=https://<url-railway>`
- `DB_CONNECTION=mysql`
- `DB_HOST=<host dari Railway MySQL>`
- `DB_PORT=<port dari Railway MySQL>`
- `DB_DATABASE=<db dari Railway MySQL>`
- `DB_USERNAME=<user dari Railway MySQL>`
- `DB_PASSWORD=<password dari Railway MySQL>`
- `CORS_ALLOWED_ORIGINS=https://<domain-vercel-frontend>`

## Migrasi database
Setelah deploy pertama:
1. Buka Railway → Service → **Shell**.
2. Jalankan:
   - `php artisan migrate --force`

## Hubungkan ke Vercel
Di Vercel (frontend), set env:
- `VITE_API_URL=https://<url-railway>`

Lalu redeploy frontend.
