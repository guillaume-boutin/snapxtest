<?php

namespace App\Actions\Transaction;

use App\Company;
use App\Transaction;
use Lorisleiva\Actions\Action;
use App\Actions\Company\Update as CompanyUpdateAction;
use App\Actions\Company\Create as CompanyCreateAction;

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
            'id' => ['required', 'integer'],
            'company.name' => ["string", "min:2", "max:255"],
            'payment_method_id' => ["exists:payment_methods,id"],
            'subtotal' => ["required", "numeric", "min:0.01", "max:999999999.99"],
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

        if ($this->get('company.name')) {
            $company = $this->updateCompany();
            $transaction->company()->associate($company);
        }

        $transaction->fill($this->all());
        $transaction->save();

        return $transaction;
    }

    protected function updateCompany() : Company
    {
        $companyName = $this->get('company.name');
        $company = Company::where('name', $companyName)->first();

        if (! $company) {
            $company = (new CompanyCreateAction(['name' => $companyName]))->run();
        }

        if ($company->name != $companyName) {
            $company = (new CompanyUpdateAction([
                'id' => $company->id,
                'name' => $company->name
            ]))->run();
        }

        return $company;
    }
}
