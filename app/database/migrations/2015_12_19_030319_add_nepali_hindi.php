<?php

use Illuminate\Database\Migrations\Migration;

class AddNepaliHindi extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('words', function($table) {
		    $table->string('hi', 50)->default("");
		    $table->string('ne', 50)->default("");
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