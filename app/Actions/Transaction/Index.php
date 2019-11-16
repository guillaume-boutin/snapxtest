<?php

namespace App\Actions\Transaction;

use App\Transaction;
use Lorisleiva\Actions\Action;
use App\Http\Resources\Transaction as TransactionResource;

class Index extends Action
{
    /**
     * Determine if the user is authorized to make this action.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the action.
     *
     * @return array
     */
    public function rules()
    {
        return [];
    }

    /**
     * Execute the action and return a result.
     *
     * @return mixed
     */
    public function handle()
    {
        $query = Transaction::with([
            'company', 'payment_method'
        ]);

        if ($supplier = $this->get('supplier')) {
            $query->where('company_id', '=', $supplier);
        }

        if ($purchasedSince = $this->get('purchased_since')) {
            $query->where('date_of_purchase', '>=', $purchasedSince);
        }

        if ($purchasedUntil = $this->get('purchased_until')) {
            $query->where('date_of_purchase', '<=', $purchasedUntil);
        }

        return $query->get();
    }

    public function jsonResponse($result, $request)
    {
        return response()->json(TransactionResource::collection($result), 200);
    }
}
