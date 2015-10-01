<?php

use Illuminate\Database\Migrations\Migration;

class CreateSynonyms extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('synonyms', function($table)
		{
		    $table->bigIncrements('id');
		    $table->bigInteger('word_id');
		    $table->bigInteger('synonym_id');
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