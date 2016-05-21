<?php

use Illuminate\Database\Migrations\Migration;

class CreatePronunciations extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('pronounciations', function($table)
		{
		    $table->bigIncrements('id');
		    $table->bigInteger('word_id');
		    $table->string('jp');
		    $table->string('zh');
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