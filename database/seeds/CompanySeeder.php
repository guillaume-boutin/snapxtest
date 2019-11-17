<?php

use App\Company;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Company::create([
            'id' => 1,
            'name' => 'Jean Coutu'
        ]);

        Company::create([
            'id' => 2,
            'name' => 'Canadian Tire'
        ]);

        Company::create([
            'id' => 3,
            'name' => 'Reno-Depot'
        ]);

        Company::create([
            'id' => 4,
            'name' => 'Assurance SSQ'
        ]);
        
        Company::create([
            'id' => 5,
            'name' => 'Tim Hortons'
        ]);
    }
}
