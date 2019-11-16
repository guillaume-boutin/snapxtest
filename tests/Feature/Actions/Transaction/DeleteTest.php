<?php

namespace Tests\Feature\Actions\Transaction;

use App\Actions\Transaction\Delete as TransactionDeleteAction;
use Tests\Feature\Actions\AbstractActionTest;

class DeleteTest extends AbstractActionTest
{
    public function test_it_deletes_a_transaction()
    {
        $id = 1;
        $this->assertDatabaseHas('transactions', compact('id'));

        $result = (new TransactionDeleteAction(compact('id')))->run();

        $this->assertTrue($result);
        $this->assertDatabaseMissing('transactions', compact('id'));
    }

    public function test_it_wont_delete_a_non_existing_product()
    {
        $id = 999999;
        $this->assertDatabaseMissing('transactions', compact('id'));

        $result = (new TransactionDeleteAction(compact('id')))->run();

        $this->assertFalse($result);
        $this->assertDatabaseMissing('transactions', compact('id'));
    }
}
