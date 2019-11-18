<?php

namespace Tests\Feature\Actions\Transaction;

use App\Company;
use App\PaymentMethod;
use App\Actions\Transaction\Create;
use Tests\Feature\Actions\AbstractActionTest;

class CreateTest extends AbstractActionTest
{
    public function test_it_creates_a_transaction()
    {
        $company = Company::all()->random();
        $paymentMethod = PaymentMethod::all()->random();

        $subData = [
            'subtotal' => '100.00',
            'tps' => '5.00',
            'tvq' => '10.00',
            'payment_method_id' => $paymentMethod->id,
            'date_of_purchase' => "2019-05-09"
        ];

        $this->assertDatabaseMissing('transactions', $subData);

        $data = array_merge(
            $subData, [
                'company' => [ 'name' => $company->name ]
            ]
        );

        $result = (new Create($data))->run();

        $this->assertDatabaseHas('transactions', array_merge(
            ['id' => $result->id],
            $subData
        ));
    }

    public function test_it_creates_a_parent_company()
    {
        $paymentMethod = PaymentMethod::all()->random();

        $subData = [
            'subtotal' => '100.00',
            'tps' => '5.00',
            'tvq' => '10.00',
            'payment_method_id' => $paymentMethod->id,
            'date_of_purchase' => "2019-05-09"
        ];

        $companyName = 'FooBar inc.';

        $this->assertDatabaseMissing('companies', [
            'name' => $companyName
        ]);

        $data = array_merge(
            $subData, [
                'company' => [ 'name' => $companyName ]
            ]
        );

        (new Create($data))->run();

        $this->assertDatabaseHas('companies', ['name' => $companyName]);
    }
}
