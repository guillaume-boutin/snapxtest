<?php

namespace App\Actions\Transaction;

use App\Transaction;
use Lorisleiva\Actions\Action;

class Update extends Action
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
        return [
            // 'company_id' => "exists:companies,id",
            'payment_method_id' => "exists:payment_methods,id",
            'subtotal' => "numeric|min:0.01|max:999999999.99",
            'tps' => "nullable|numeric|min:0.01|max:999999999.99",
            'tvq' => "nullable|numeric|min:0.01|max:999999999.99",
            // 'date_of_purchase' => "date_format:Y-m-d"
        ];
    }

    /**
     * Execute the action and return a result.
     *
     * @return mixed
     */
    public function handle()
    {
        $transaction = Transaction::find($this->get('id'));
        if (! $transaction) {
            return null;
        }

        $transaction->fill($this->all());
        $transaction->save();

        return $transaction;
    }
}
