<?php

use Illuminate\Database\Migrations\Migration;

class AddArabicGerman extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('words', function($table) {
		    $table->string('de', 50)->default("");
		    $table->string('ar', 50)->default("");
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