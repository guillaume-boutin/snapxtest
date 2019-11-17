<?php

use App\PaymentMethod;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PaymentMethod::create([
            'id' => PaymentMethod::CASH_ID,
            'name' => 'Cash',
            'slug' => 'cash'
        ]);

        PaymentMethod::create([
            'id' => PaymentMethod::CREDIT_CARD_ID,
            'name' => 'Credit Card',
            'slug' => 'credit-card'
        ]);
        
        PaymentMethod::create([
            'id' => PaymentMethod::DEBIT_CARD_ID,
            'name' => 'Debit Card',
            'slug' => 'dedit-card'
        ]);
    }
}
