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
		    $table->string('en', 50);
		    $table->string('ko', 50);
		    $table->string('jp', 50);
		    $table->string('zh', 50);
		    $table->string('es', 50);
		    $table->string('fr', 50);
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