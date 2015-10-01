<?php

use Illuminate\Database\Migrations\Migration;

class CreateUserWords extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('userwords', function($table)
		{
		    $table->bigIncrements('id');
		    $table->string('lang1', 4);
		    $table->string('lang2', 4);
		    $table->bigInteger('word_id');
		    $table->bigInteger('user_id');
		    $table->tinyInteger('right');
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