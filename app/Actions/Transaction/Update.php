<?php

namespace App\Actions\Transaction;

use App\Transaction;

class Update extends AbstractSave
{
    public function rules()
    {
        $rules = parent::rules();

        return array_merge(
            $rules,
            [
                'id' => ['required', 'integer'],
            ]
        );
    }

    public function handle()
    {
        $transaction = Transaction::find($this->get('id'));
        if (! $transaction) {
            return null;
        }

        if ($this->get('company.name')) {
            $company = $this->createComapny();
            $transaction->company()->associate($company);
        }

        $transaction->fill($this->all());
        $transaction->save();

        return $transaction;
    }

    public function jsonResponse($result)
    {
        return response()->json($result, 200);
    }
}
