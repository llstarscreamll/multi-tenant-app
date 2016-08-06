<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use \DB;

class Company extends Model
{

	protected $connection;

	public function __construct()
	{

	}

    public function createCompany($companyName)
    {
    	$currentDbName = $this->getConnection()->getDatabaseName();
    	$this->createDatabase($companyName);

    	return true;
    }

    private function createDatabase($name)
    {
    	return DB::statement("CREATE DATABASE IF NOT EXISTS $name");
    }
}
