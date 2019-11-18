<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    protected $fillable = [
        'id',
        'company_id',
        'payment_method_id',
        'subtotal',
        'tps',
        'tvq',
        'date_of_purchase'
    ];

    protected $casts = [
        'total' => 'string'
    ];

    protected $appends = ['total'];

    /**
     * @return BelongsTo
     */
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * @return BelongsTo
     */
    public function payment_method()
    {
        return $this->belongsTo(PaymentMethod::class);
    }

    public function getTotalAttribute() : string
    {
        $sum = (string) round(($this->subtotal + $this->tps + $this->tvq) * 100);
        return substr($sum, 0, -2) . '.' . substr($sum, -2);
    }
}
