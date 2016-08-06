<?php
namespace Company;
use \FunctionalTester;

class CreateCompanyCest
{
    public function _before(FunctionalTester $I)
    {
    }

    public function _after(FunctionalTester $I)
    {
    }

    // 
    public function createCompany(FunctionalTester $I)
    {
        $I->amOnPage('/companies/create');
        $I->see('Create Company', 'h3');

        $I->submitForm('#create-company', [
            'name' => 'Acme'
        ]);

        $I->see('Company Created!!', '.alert-success');
    }
}
