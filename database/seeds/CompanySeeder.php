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
            'name' => 'Jean Coutu',
            'slug' => 'jean-coutu'
        ]);

        Company::create([
            'id' => 2,
            'name' => 'Canadian Tire',
            'slug' => 'canadian-tire'
        ]);

        Company::create([
            'id' => 3,
            'name' => 'Reno-Depot',
            'slug' => 'reno-depot'
        ]);

        Company::create([
            'id' => 4,
            'name' => 'Assurance SSQ',
            'slug' => 'assurance-ssq'
        ]);
        
        Company::create([
            'id' => 5,
            'name' => 'Tim Hortons',
            'slug' => 'tim-hortons'
        ]);
    }
}
