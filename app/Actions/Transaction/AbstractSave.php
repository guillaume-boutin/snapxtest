<?php

namespace App\Actions\Transaction;

use App\Company;
use Lorisleiva\Actions\Action;
use App\Actions\Company\Create as CompanyCreateAction;

class AbstractSave extends Action
{
    public function rules()
    {
        return [
            'company.name' => ["string", "min:2", "max:255"],
            'payment_method_id' => ["exists:payment_methods,id"],
            'subtotal' => ["numeric", "min:0.01", "max:999999999.99"],
            'tps' => ["nullable", "numeric", "min:0.01", "max:999999999.99"],
            'tvq' => ["nullable", "numeric", "min:0.01", "max:999999999.99"],
            'date_of_purchase' => ["date_format:Y-m-d"]
        ];
    }

    public function messages()
    {
        return [
            'company.name.string' => 'Cannot be empty.',
            'company.name.min' => 'Must have at least 2 characters.',
            'subtotal.min' => 'Must be greater than 0.00.',
            'tps.min' => 'Must be greater than 0.00.',
            'tvq.min' => 'Must be greater than 0.00.'
        ];
    }

    protected function createComapny() : Company
    {
        $companyName = $this->get('company.name');
        $company = Company::where('name', $companyName)->first();

        if (! $company) {
            $company = (new CompanyCreateAction(['name' => $companyName]))->run();
        }

        return $company;
    }
}
