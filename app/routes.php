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
Route::controller('users', 'UserController');

Route::any("/admin/{action}", function($action){
    return View::make("admin.".$action);
});

Route::any("dic/review", function(){
    return View::make('dic.review');
});

Route::post("dic/get", function(){
    header('Content-type: text/html; charset=utf-8');
    function file_get_contents_curl($url){
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

        $data = curl_exec($ch);
    //    error_log("i: ".$num);
        curl_close($ch);

        return $data;
    }
    
    $lang1 = Input::get('lang1');
    $lang2 = Input::get('lang2');
    $retLang = $lang2;
    
    $filename = URL::asset("dic/" . $lang1 . "_master.dic");
    $filetext =  file_get_contents_curl($filename);
    $lang1 = unserialize($filetext);
    
    $filename = URL::asset("dic/" . $lang2 . "_master.dic");
    $filetext =  file_get_contents_curl($filename);
    $lang2 = unserialize($filetext);
    
    $ret = array();
    if (count($lang1) == count($lang2)) {
        for ($i = 0; $i < count($lang1); $i++) {
            $ret[$lang1[$i]] = $lang2[$i];
        }
        return Response::json(array("status" => "OK", "data" => array("dic" => $ret, "lang" => $retLang)));
    } else {
        return Response::json(array("status" => 'FAIL', 'msg' => "Dictionaries are of different sizes!"));
    }
});

Route::post("dic/modify", function(){
    $input = Input::all();
    $lang = $input['lang'];
    $size = $input['size'];
    $words = array();
    for($i = 0 ; $i < $size ; $i++){
        $words["".$i] = $input["word_".$i];
    }
    
    $filename = base_path("dic/"."ko_master.dic");
    $file = fopen($filename, "a+"); // opens file
    if ($file == false) {
//        echo ( "Error in opening file" );
        exit(); 
    }
    ftruncate($file, 0); // clears the file
    fwrite($file, serialize($words));
    
    
});

Route::any('/',function(){
    return View::make('index.index');
});

Route::any('/game/tutorial', function(){
    return View::make('game.tutorial');
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

Route::any('/info/{action}', function($action){
    return View::make("info.".$action);
});