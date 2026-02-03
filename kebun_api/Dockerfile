FROM php:8.2-cli

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    git \
    unzip \
    libzip-dev \
    libpng-dev \
    libonig-dev \
  && docker-php-ext-install \
    pdo_mysql \
    mbstring \
    zip \
    bcmath \
    exif \
    pcntl \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
COPY . /app

RUN composer install --no-dev --optimize-autoloader --no-interaction \
  && chown -R www-data:www-data storage bootstrap/cache

ENV PORT=8080
EXPOSE 8080

CMD ["sh", "-c", "php artisan config:clear && php artisan migrate --force && php -S 0.0.0.0:${PORT} -t public"]
