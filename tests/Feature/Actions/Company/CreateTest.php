<?php

namespace Tests\Feature\Actions\Company;

use App\Actions\Company\Create as CompanyCreateAction;
use Tests\Feature\Actions\AbstractActionTest;

class CreateTest extends AbstractActionTest
{
    public function test_it_creates_a_company()
    {
        $result = (new CompanyCreateAction(['name' => 'FooBar inc.']))->run();

        $this->assertDatabaseHas('companies', [
            'id' => $result->id,
            'name' => $result->name
        ]);
    }
}
