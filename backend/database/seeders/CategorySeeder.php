<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();
        $categories = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Health', 'Education'];
        foreach ($categories as $category) {
            Category::create([
                'user_id' => $user->id,
                'name' => $category,
                'description' => 'This is a description for ' . $category,
            ]);
        }
    }
}
