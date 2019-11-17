<?php

namespace Tests\Feature\Actions\Transaction;

use App\Company;
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

    public function test_it_can_update_its_parent_company()
    {
        $transaction = Transaction::all()->random();
        $company = Company::where('id', '!=', $transaction->company_id)->get()->random();

        $data = [
            'id' => $transaction->id,
            'company' => [
                'name' => $company->name
            ]
        ];

        $result = (new TransactionUpdateAction($data))->run();

        $this->assertEquals($company->id, $result->company_id);
    }

    public function test_it_can_create_a_parent_company()
    {
        $transaction = Transaction::all()->random();
        $newCompanyName = 'FooBarBaz inc';

        $this->assertDatabaseMissing('companies', [
            'name' => $newCompanyName
        ]);

        $data = [
            'id' => $transaction->id,
            'company' => [
                'name' => $newCompanyName
            ]
        ];

        $result = (new TransactionUpdateAction($data))->run();

        $this->assertDatabaseHas('companies', [
            'id' => $result->company_id,
            'name' => $data['company']['name']
        ]);
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
