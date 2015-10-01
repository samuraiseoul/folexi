<?php

use Illuminate\Database\Migrations\Migration;

class CreateUsers extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function($table)
		{
		    $table->bigIncrements('id');
		    $table->string('email', 50);
		    $table->string('password', 65);
		    $table->string('first_name', 30);
		    $table->string('last_name', 30);
		    $table->string('username', 20);
		    $table->date('birthdate');
		    $table->integer('level');
		    $table->timestamps();
		    $table->softDeletes();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
	}

}