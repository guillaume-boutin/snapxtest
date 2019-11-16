<?php

namespace Tests\Feature\Actions\Transaction;

use App\Transaction;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\Feature\Actions\AbstractActionTest;
use App\Actions\Transaction\Show as TransactionShowAction;

class ShowTest extends AbstractActionTest
{
    public function test_it_fetches_a_transaction_by_id()
    {
        $transaction = Transaction::all()->random();
        $result = (new TransactionShowAction(['id' => $transaction->id]))->run();

        $this->assertEquals($transaction->id, $result->id);
    }

    public function test_it_doesnt_fetch_a_non_existing_transaction()
    {
        $result = (new TransactionShowAction(['id' => -1]))->run();
        $this->assertNull($result);
    }
}
