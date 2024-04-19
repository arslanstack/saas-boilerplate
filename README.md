# SAAS Laravel 11, Inertia, React, Tailwind, & Stripe

This repository contains a ready-to-use Laravel 11 and React JS boilerplate application for an AI/API-based SAAS. It provides a foundation for creating, integrating, and launching features, along with custom packages and credit consumption rules.

<img src="/screenshots/1.png" alt="Project Banner">

## Getting Started

### Clone the Repository

Clone the repository using the following command:

```bash
git clone https://github.com/arslanstack/saas-boilerplate.git
```
### Installation

After cloning the project, navigate into the project directory and install dependencies:

```bash
cd saas-boilerplate
composer install
npm install
```

### Environment Setup

Create a .env file and set up the necessary environment variables:

```bash
cp .env.example .env
php artisan key:generate
```

Set up your database and Stripe keys in the .env file:

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=yourdatabasename
DB_USERNAME=root
DB_PASSWORD=

STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_KEY=
```
### Database Migration and Seeding

Run migrations and seeders to set up the database:

```bash
php artisan migrate --seed
```

### Running the Application

Start the Laravel server and compile assets:

```bash
php artisan serve
npm run dev
```

### Contributing

After implementing a feature or fix, use the following commands to commit and push your changes:

```bash
git add .
git commit -m "Describe the feature"
git push -u origin
```

<img src="/screenshots/2.png" alt="Project Banner">
<img src="/screenshots/3.png" alt="Project Banner">
<img src="/screenshots/4.png" alt="Project Banner">
<img src="/screenshots/5.png" alt="Project Banner">