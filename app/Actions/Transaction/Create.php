<?php

namespace App\Actions\Transaction;

use App\Transaction;

class Create extends AbstractSave
{
    public function rules()
    {
        $rules = parent::rules();
        return array_merge(
            $rules,
            [
                'company.name' => ["required", "string", "min:2", "max:255"],
                'subtotal' => ["required", "numeric", "min:0.01", "max:999999999.99"],
            ]
        );
    }

    public function messages()
    {
        $messages = parent::messages();
        $messages['company.name.required'] = 'Required.';
        
        return $messages;
    }

    public function handle()
    {
        $company = $this->createComapny();

        $transaction = Transaction::make($this->all());
        $transaction->company()->associate($company);
        $transaction->save();

        return $transaction;
    }
}
