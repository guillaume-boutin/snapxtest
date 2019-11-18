<?php

namespace App\Actions\Transaction;

use App\Transaction;
use Lorisleiva\Actions\Action;
use App\Http\Resources\Transaction as TransactionResource;

class Show extends Action
{
    public function handle() : ?Transaction
    {
        $transaction = Transaction::with('company', 'payment_method')->find($this->get('id'));
        return $transaction;
    }

    public function jsonResponse($result)
    {
        return response()->json(new TransactionResource($result), 200);
    }
}
