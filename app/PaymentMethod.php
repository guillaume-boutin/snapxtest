<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    const CASH_ID = 1;
    const CREDIT_CARD_ID = 2;
    const DEBIT_CARD_ID = 3;

    protected $fillable = [
        'id', 'name', 'slug'
    ];
}
