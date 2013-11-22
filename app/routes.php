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
    function file_get_contents_curl($url){
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

        $data = curl_exec($ch);
        curl_close($ch);

        return $data;
    }
Route::controller('users', 'UserController');

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
Route::any("dic/review", function(){
    if(Auth::check() && 
            (Auth::user()->level >= 101)){
    return View::make('dic.review');
    }else{
        return Redirect::to("")->with("msg", "Must be an admin with
            dictionary privledges to access this page!");
    }
});
Route::post("dic/get", function(){
    header('Content-type: text/html; charset=utf-8');
    
    $lang1 = Input::get('lang1');
    $lang2 = Input::get('lang2');
    $words = Word::all();
    $dic = array();
    foreach($words as $k){
        array_push($dic, array($k[$lang1], $k[$lang2], $k['id'], 0));
    }
    return Response::json(array("status" => "OK", "data" => array("dic" => $dic, "lang" => $lang2)));
});
Route::post("dic/modify", function(){
    if(Auth::check() && 
            (Auth::user()->level >= 101)){
        $input = Input::all();
        $lang = $input['lang'];
        $size = $input['size'];
        $words = array();
        for($i = 0 ; $i < $size ; $i++){
            $words["".$i] = $input["word_".$i];
        }

        $filename = base_path("dic/".$lang."_master.dic");
        $file = fopen($filename, "a+"); // opens file
        if ($file == false) {
            exit(); 
        }
        ftruncate($file, 0); // clears the file
        fwrite($file, serialize($words));
        return Response::json(array('status' => 'OK'));
    }else{
        return Response::json(array('status' => 'FAIL', 
            'msg' => "Not Authorized!"));
    }
});
Route::post('dic/addWords', function(){
    $lang1 = Input::get('lang1');
    $lang2 = Input::get('lang2');
    $words = Input::get('words');
    
    if(Auth::check()){
        for($i = 0 ; $i < count($words) ; $i++){
            try{    
            $user_word = UserWord::whereRaw("user_id = ".Auth::user()->id
                        ." AND lang1 = '".$lang1
                        ."' AND lang2 = '".$lang2
                        ."' AND word_id = ".$words[$i][2])->first();        
            if($user_word != null){
                $user_word['right'] = $words[$i][3];
                $user_word->save();
            }else{
                $user_word = new UserWord();
                $user_word->user_id = Auth::user()->id;
                $user_word->lang1 = $lang1;
                $user_word->lang2 = $lang2;
                $user_word->word_id = $words[$i][2];
                $user_word->right = $words[$i][3];
                $user_word->save();
            }
            }catch(Exception $e){
                error_log(print_r($e, true));
                return Response::json(array('status' => "FAIL", 
                    "msg" => "Failed to update the database!"));
            }
        }
        return Response::json(array('status' => "OK", 
                "msg" => "All good!"));
    }else{
            $cookie = Cookie::forever('knownWords', serialize($words));
            error_log(print_r($words,true));
            return Response::json(array('status' => "FAIL", 
                "msg" => "Info stored in cookie!"))->withCookie($cookie);
    }
});
Route::post('dic/getWords', function(){
    $lang1 = Input::get('lang1');
    $lang2 = Input::get('lang2');
    if(Auth::check()){
        try{
        $words = UserWord::where("user_id" , Auth::user()->id)
                ->where("lang1", $lang1)
                ->where("lang2", $lang2)
                ->with("word")
                ->get();
        }catch(Exception $e){
            error_log(print_r($e, true));
        }
        return Response::json(array('status' => "OK", "data" => $words->toArray()));
    }else{
            $words = array();
            if(Cookie::has('knownWords')){
                $words = unserialize(Cookie::get('knownWords'));         
                error_log(print_r($words, true));
            }
            return Response::json(array('status' => "FAIL", 
                "msg" => "Not logged in! Cookie info attached.",
                "data" => $words));        
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
        if(View::exists('user.'.$action)){
            return View::make('user.'.$action);
        }else{
            App::abort(404, 'Page not found');
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
/*route::any('dic/toDB', function(){
    header('Content-type: text/html; charset=utf-8');
    $filename = URL::asset("dic/en_master.dic");
//    error_log($filename);
    $filetext =  file_get_contents_curl($filename);
    $lang1 = unserialize($filetext);
    $filename = URL::asset("dic/zh_master.dic");
//    error_log($filename);
    $filetext =  file_get_contents_curl($filename);
    $lang2 = unserialize($filetext);
    for($i = 0 ; count($lang1) ; $i++){
//        $word = new Word();
        $word = Word::where('en', '=', $lang1[$i])->first();
        error_log(print_r($word, true));
        $word->ch = $lang2[$i];
        $word->save();
    }
});*/