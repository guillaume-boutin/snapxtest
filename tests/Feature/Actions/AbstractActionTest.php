<?php

namespace Tests\Feature\Actions;

use DatabaseSeeder;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

abstract class AbstractActionTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp() : void
    {
        parent::setUp();
        app(DatabaseSeeder::class)->run();
    }
}
