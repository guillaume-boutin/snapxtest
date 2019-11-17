<?php

namespace App\Actions\Company;

use App\Company;
use Lorisleiva\Actions\Action;

class Create extends Action
{
    public function rules()
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:255']
        ];
    }

    public function handle() : Company
    {
        return Company::create([
            'name' => $this->get('name')
        ]);
    }

    public function jsonResponse($result)
    {
        return response()->json($result, 201);
    }
}
