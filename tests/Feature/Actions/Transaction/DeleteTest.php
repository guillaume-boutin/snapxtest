<?php

namespace Tests\Feature\Actions\Transaction;

use App\Transaction;
use Tests\Feature\Actions\AbstractActionTest;
use App\Actions\Transaction\Delete as TransactionDeleteAction;

class DeleteTest extends AbstractActionTest
{
    public function test_it_deletes_a_transaction()
    {
        $transaction = Transaction::all()->random();
        $id = $transaction->id;
        $this->assertDatabaseHas('transactions', compact('id'));

        $result = (new TransactionDeleteAction(compact('id')))->run();

        $this->assertDatabaseMissing('transactions', compact('id'));
    }

    public function test_it_wont_delete_a_non_existing_product()
    {
        $id = 999999;
        $this->assertDatabaseMissing('transactions', compact('id'));

        $result = (new TransactionDeleteAction(compact('id')))->run();

        $this->assertDatabaseMissing('transactions', compact('id'));
    }
}
