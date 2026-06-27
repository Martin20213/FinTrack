<?php

namespace Database\Factories;

use App\Models\Account;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Account>
 */
class AccountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
{
    return [
        'name'    => fake()->randomElement([
            'OTP folyószámla', 'Revolut', 'Lightyear ETF', 'TBSZ 2026',
            'Készpénz', 'MBH megtakarítás', 'Kripto'
        ]),
        'type'    => fake()->randomElement([
            'folyószámla', 'befektetés', 'készpénz', 'megtakarítás', 'egyéb'
        ]),
        'balance' => fake()->randomFloat(2, 10000, 5000000),
        'note'    => fake()->optional()->sentence(),
    ];
}
}
