<?php

use Carbon\Carbon;
use App\Transaction;
use App\PaymentMethod;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Transaction::create([
            'company_id' => 1,
            'payment_method_id' => PaymentMethod::CASH_ID,
            'subtotal' => 28.01,
            'tps' => 1.40,
            'tvq' => 2.79,
            'date_of_purchase' => Carbon::create(2019, 1, 1)
        ]);

        Transaction::create([
            'company_id' => 1,
            'payment_method_id' => PaymentMethod::CASH_ID,
            'subtotal' => 52.52,
            'tps' => 2.63,
            'tvq' => 5.24,
            'date_of_purchase' => Carbon::create(2019, 1, 4)
        ]);

        Transaction::create([
            'company_id' => 2,
            'payment_method_id' => PaymentMethod::CREDIT_CARD_ID,
            'subtotal' => 32.38,
            'tps' => 1.62,
            'tvq' => 3.23,
            'date_of_purchase' => Carbon::create(2019, 1, 1)
        ]);

        Transaction::create([
            'company_id' => 3,
            'payment_method_id' => PaymentMethod::DEBIT_CARD_ID,
            'subtotal' => 102.99,
            'tps' => 5.15,
            'tvq' => 10.27,
            'date_of_purchase' => Carbon::create(2019, 1, 4)
        ]);

        Transaction::create([
            'company_id' => 4,
            'payment_method_id' => PaymentMethod::CREDIT_CARD_ID,
            'subtotal' => 84.82,
            'date_of_purchase' => Carbon::create(2019, 2, 21)
        ]);

        Transaction::create([
            'company_id' => 5,
            'payment_method_id' => PaymentMethod::DEBIT_CARD_ID,
            'subtotal' => 20.32,
            'tps' => 1.02,
            'tvq' => 2.03,
            'date_of_purchase' => Carbon::create(2019, 2, 11)
        ]);
    }
}
