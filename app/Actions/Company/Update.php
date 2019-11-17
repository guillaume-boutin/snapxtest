<?php

namespace App\Actions\Company;

use App\Company;
use Lorisleiva\Actions\Action;

class Update extends Action
{
    public function rules()
    {
        return [
            'id' => ['required', 'integer'],
            'name' => ['required', 'string', 'min:2', 'max:255']
        ];
    }

    function handle() : ?Company
    {
        $company = Company::find($this->get('id'));
        if (! $company) {
            return null;
        }

        $company->fill($this->all());
        $company->save();

        return $company;
    }
}
