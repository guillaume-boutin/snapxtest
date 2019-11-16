<?php

namespace Tests\Feature\Actions\Transaction;

use App\Transaction;
use Illuminate\Support\Arr;
use Tests\Feature\Actions\AbstractActionTest;
use Illuminate\Validation\ValidationException;
use App\Actions\Transaction\Update as TransactionUpdateAction;

class UpdateTest extends AbstractActionTest
{
    public function test_it_updates_a_transaction()
    {
        $transaction = Transaction::all()->random();
        $transactionId = $transaction->id;

        $data = [
            'id' => $transactionId,
            'subtotal' => 100.00,
            'tps' => 5.00,
            'tvq' => 100,
            'date_of_purchase' => "2019-04-23"
        ];
        
        $result = (new TransactionUpdateAction($data))->run();
        $transaction = Transaction::find($transactionId);
        
        foreach ($data as $field => $value) {
            $this->assertEquals($result->{$field}, $transaction->{$field});
        }
    }

    public function test_it_wont_update_a_non_existing_transaction()
    {
        $data = [
            'id' => -1,
            'date_of_purchase' => "2019-07-09"
        ];
        $result = (new TransactionUpdateAction($data))->run();

        $this->assertNull($result);
        $this->assertDatabaseMissing('transactions', $data);
    }

    public function test_it_wont_update_a_transaction_with_invalid_data()
    {
        $transaction = Transaction::first();

        $data = [
            'company_id' => 999999,
            'payment_method_id' => 888888,
            'subtotal' => 'foobar',
            'tps' => -1582.36,
            'tvq' => 987654321098.76,
            'date_of_purchase' => "March 21st 2019"
        ];

        try {
            (new TransactionUpdateAction(
                array_merge(['id' => $transaction->id], $data)
            ))->run();
        } catch (ValidationException $e) {
            $errors = $e->errors();
            foreach($data as $field => $value) {
                $this->assertNotNull(Arr::get($errors, $field.".0", null));
            }

            $this->assertDatabaseMissing('transactions', array_merge(
                ['id' => $transaction->id],
                $data
            ));
        }
    }
}
