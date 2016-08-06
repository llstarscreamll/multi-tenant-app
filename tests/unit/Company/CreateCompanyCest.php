<?php

namespace Company;

use \UnitTester;
use App\Company;
use \DB;

class CreateCompanyCest
{
    /**
     * El nombre de la empresa
     * @var string
     */
    private $companyName = 'lolipop';

    public function _before(UnitTester $I)
    {
    }

    /**
     * Borramos la base de datos creada.
     * @param  UnitTester $I
     * @return void
     */
    public function _after(UnitTester $I)
    {
        // elimino la base de datos creada
        DB::statement("DROP DATABASE IF EXISTS $this->companyName");
    }

    /**
     * Prueba el proceso de creación de una base de datos con los datos de la
     * empresa.
     * @param  UnitTester $I
     * @return void
     */
    public function createCompanyDatabase(UnitTester $I)
    {
        $companyName = $this->companyName;
        $companyModel = new Company;

        $spected = $companyModel->createCompany($companyName);

        $I->assertTrue($spected, 'Falló la creación de la empresa');

        $spected = DB::select(
            "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$companyName'"
        );

        $I->assertTrue(count($spected) > 0, 'No se encontró la base de datos de la empresa');
    }
}
