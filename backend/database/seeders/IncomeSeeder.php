<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Income;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IncomeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();
        $categories = Category::where('type', 'expense')->get();
        $titles = ['Salary', 'Freelance Project', 'Gift', 'Bonus', 'Investment Return'];

        foreach (range(1, 10) as $i) {
            Income::create([
                'user_id' => $user->id,
                'category_id' => $categories->random()->id ?? null,
                'title' => $titles[array_rand($titles)],
                'amount' => rand(1000, 10000),
                'date' => now()->subDays(rand(0, 30)),
                'notes' => 'Sample Income Record' . $i

            ]);
        }
    }
}
