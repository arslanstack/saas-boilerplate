<?php

namespace Database\Seeders;

use App\Models\Feature;
use App\Models\Package;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Jango Altair',
            'email' => 'jangaraltair@gmail.com',
            'phone' => '+923302430695',
            'image' => 'jango1212.png',
            'status' => 0,
            'is_admin' => 1,
            'password' => bcrypt('123456'),
        ]);

        Feature::create([
            'image' => 'https://static-00.iconduck.com/assets.00/plus-icon-512x512-hnjyaquo.png',
            'route_name' => 'feature1.index',
            'name' => 'Calculate Sum',
            'description' => 'Calculate sum of two numbers.',
            'required_credits' => 4,
            'status' => 1,
        ]);

        Package::create([
            'name' => 'Basic',
            'price' => 5,
            'credits' => 20,
        ]);
        Package::create([
            'name' => 'Silver',
            'price' => 20,
            'credits' => 100,
        ]);
        Package::create([
            'name' => 'Gold',
            'price' => 50,
            'credits' => 500,
        ]);
    }
}
