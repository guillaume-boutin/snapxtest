<?php

namespace App\Actions\PaymentMethod;

use App\PaymentMethod;
use Lorisleiva\Actions\Action;

class Index extends Action
{
    public function handle()
    {
        return PaymentMethod::all();
    }

    public function jsonResponse($result)
    {
        return response()->json($result, 200);
    }
}
