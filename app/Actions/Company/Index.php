<?php

namespace App\Actions\Company;

use App\Company;
use Lorisleiva\Actions\Action;

class Index extends Action
{
    public function handle()
    {
        return Company::all();
    }
}
