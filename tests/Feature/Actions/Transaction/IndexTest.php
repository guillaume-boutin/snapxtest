<?php

namespace Tests\Feature\Actions\Transaction;

use App\Company;
use App\Transaction;
use App\Actions\Transaction\Index as TransactionIndexAction;
use Tests\Feature\Actions\AbstractActionTest;

class IndexTest extends AbstractActionTest
{
    public function test_it_fetches_all_transactions()
    {
        $results = (new TransactionIndexAction())->run();
        
        $this->assertEquals(
            Transaction::count(),
            $results->count()
        );
    }

    public function test_it_fetches_transactions_for_a_company()
    {
        $company = Company::all()->random();

        $transactions = Transaction::where('company_id', $company->id);
        $results = (new TransactionIndexAction(['company_id' => $company->id]))->run();

        $this->assertEquals(
            $transactions->count(),
            $results->count()
        );
    }

    public function test_it_fetches_transactions_since_a_date_of_purchase()
    {
        $purchasedSince = "2019-01-15";
        $transactions = Transaction::where('date_of_purchase', '>=', $purchasedSince);
        $results = (new TransactionIndexAction(['purchased_since' => $purchasedSince]))->run();

        $this->assertEquals(
            $transactions->count(),
            $results->count()
        );
    }

    public function test_it_fetches_transactions_until_a_date_of_purchase()
    {
        $purchasedUntil = "2019-01-15";
        $transactions = Transaction::where('date_of_purchase', '<=', $purchasedUntil);
        $results = (new TransactionIndexAction(['purchased_until' => $purchasedUntil]))->run();

        $this->assertEquals(
            $transactions->count(),
            $results->count()
        );
    }

    public function test_it_fetches_transactions_for_multiple_parameters()
    {
        $query = Transaction::query();
        $actionParams = [];

        if (rand(0 , 1) > 0) {
            $company = Company::all()->random();
            $query->where('company_id', $company->id);
            $actionParams['company_id'] = $company->id;
        }

        if (rand(0, 1) > 0) {
            $query->where('date_of_purchase', '>=', "2019-01-04");
            $actionParams['purchased_since'] = "2019-01-04";
        }

        if (rand(0, 1) > 0) {
            $query->where('date_of_purchase', '<=', "2019-02-11");
            $actionParams['purchased_until'] = "2019-02-11";
        }

        $results = (new TransactionIndexAction($actionParams))->run();

        $this->assertEquals(
            $query->count(),
            $results->count()
        );
    }
}
