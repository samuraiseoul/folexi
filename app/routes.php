<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

function hi(){
    
}

Route::controller('users', 'UserController');

Route::any('/',function(){
    return View::make('index.index');
});

Route::any('/game',function(){
    return View::make('game.index');
});


Route::any('/user/{action}',function($action){
    return View::make('user.'.$action);
});

Route::any('/logout', function(){
    Auth::logout();
    if(!Auth::check()){
        return Response::json(array('status' => 'OK'));
    }else{
        return Response::json(array('status' => 'FAIL'));        
    }
});