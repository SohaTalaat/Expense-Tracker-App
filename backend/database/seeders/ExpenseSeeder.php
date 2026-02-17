<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Expense;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class ExpenseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();
        $categories = Category::where('type', 'expense')->get();
        $titles = ['Grocery Shopping', 'Bus Fare', 'Restaurant Bill', 'Electricity Bill', 'Doctor Visit'];


        foreach ($categories as $category) {
            Expense::create([
                'user_id' => $user->id,
                'category_id' => $category->id,
                'title' => $titles[array_rand($titles)],
                'amount' => rand(50, 500),
                'date' => now()->subDays(rand(0, 30)),
                'notes' => 'Sample Expense Record'

            ]);
        }
    }
}
