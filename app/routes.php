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
if (Config::get('database.log', false))
{           
    Event::listen('illuminate.query', function($query, $bindings, $time, $name)
    {
        $data = compact('bindings', 'time', 'name');

        // Format binding data for sql insertion
        foreach ($bindings as $i => $binding)
        {   
            if ($binding instanceof \DateTime)
            {   
                $bindings[$i] = $binding->format('\'Y-m-d H:i:s\'');
            }
            else if (is_string($binding))
            {   
                $bindings[$i] = "'$binding'";
            }   
        }       

        // Insert bindings into query
        $query = str_replace(array('%', '?'), array('%%', '%s'), $query);
        $query = vsprintf($query, $bindings); 

        Log::info($query, $data);
    });
}

Route::controller('users', 'UserController');
Route::controller('dic', 'DictionaryController');

Route::any("test/query", function(){
	$out = Word::with('synonyms')->get();
	return View::make( "index.test" , array("out" => $out->toArray()));
});

Route::any("/admin/{action}", function($action){
    if(Auth::check() && (Auth::user()->level >=100) ){
        if(View::exists('admin.'.$action)){
            return View::make("admin.".$action);
        }else{
            App::abort(404, 'Page not found');
        }
    }else{
        return Redirect::to("")->with("msg", "Must be an admin to access this page!");        
    }
});
Route::any("/admin", function(){
    if(Auth::check() && (Auth::user()->level >=100) ){
        return View::make("admin.index");
    }else{
        return Redirect::to("")->with("msg", "Must be an admin to access this page!");        
    }
});
Route::any('/',function(){
    $data = array('msg' => Session::get('msg'));
    return View::make('index.index', $data);
});
Route::any('/game/tutorial', function(){
    return View::make('game.tutorial');
});
Route::any('/game',function(){
    return View::make('game.index');
});
Route::any('/user/{action}',function($action){
    if(!Auth::check()){
        if(View::exists('user.'.$action)){
            return View::make('user.'.$action);
        }else{
            App::abort(404, 'Page not found');
        }
    }else{
        $data = array('msg' => "Already Logged in!");
        return View::make('index.index', $data);
    }    
});
Route::any('/logout', function(){
    Auth::logout();
    if(!Auth::check()){
        return Response::json(array('status' => 'OK'));
    }else{
        return Response::json(array('status' => 'FAIL'));        
    }
});
Route::any('/info/{action}', function($action){
        if(View::exists('info.'.$action)){
                return View::make("info." . $action);
        }else{
            App::abort(404, 'Page not found');
        }
});

Route::get('fabric', function(){return View::make('game.fabric');});