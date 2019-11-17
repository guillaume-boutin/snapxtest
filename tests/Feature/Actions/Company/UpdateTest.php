<?php

namespace Tests\Feature\Actions\Company;

use App\Company;
use App\Actions\Company\Update;
use Tests\Feature\Actions\AbstractActionTest;

class UpdateTest extends AbstractActionTest
{
    public function test_it_updates_an_existing_company()
    {
        $company = Company::all()->random();
        $data = [
            'id' => $company->id,
            'name' => 'FooBar inc.'
        ];

        (new Update($data))->run();

        $this->assertDatabaseHas('companies', $data);
    }
}
