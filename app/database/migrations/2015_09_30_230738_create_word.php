<?php

use Illuminate\Database\Migrations\Migration;

class CreateWord extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('words', function($table)
		{
		    $table->bigIncrements('id');
		    $table->string('en', 50)->default("");
		    $table->string('ko', 50)->default("");
		    $table->string('jp', 50)->default("");
		    $table->string('zh', 50)->default("");
		    $table->string('es', 50)->default("");
		    $table->string('fr', 50)->default("");
		    $table->string('de', 50)->default("");
		    $table->string('ar', 50)->default("");
		    $table->string('hi', 50)->default("");
		    $table->string('ne', 50)->default("");
		    $table->tinyInteger('diff_lvl');
		    $table->timestamps();
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