<?php
class DictionaryController extends Controller{
    public function anyReview(){
        if(Auth::check() && 
                (Auth::user()->level >= 101)){
        return View::make('dic.review');
        }else{
            return Redirect::to("")->with("msg", "Must be an admin with
                dictionary privledges to access this page!");
        }        
    }
	
	public function anyAddnew(){
		if( Auth::check() && 
            (Auth::user()->level >= 101)
		   ){
        	return View::make('dic.new');
        }else{
            return Redirect::to("")->with("msg", "Must be an admin with
                dictionary privledges to access this page!");
        }        
	}
	
    public function getResults(){        
        header('Content-type: text/html; charset=utf-8');
        if(Auth::check() && 
                (Auth::user()->level >= 101))
        {
            $lang1 = Input::get('lang1');
            $lang2 = Input::get('lang2');
            $words = Word::paginate(24);
            $dic = array();
            foreach ($words as $k) {
                array_push($dic, array($k[$lang1], $k[$lang2], $k['id']));
            }
            $data = array("dic" => $dic, "links" => $words->appends(Input::except(array('page')))->links());
            return View::make('dic.results', $data);
        }else{
            return Redirect::to("")->with("msg", "Must be an admin with
                dictionary privledges to access this page!");
        }        
    }
    
    public function postModify(){
        header('Content-type: text/html; charset=utf-8');
        if (Auth::check() &&
             (Auth::user()->level >= 101)) 
            {
             $input = Input::except(array('lang', "_token"));
             $lang = Input::get('lang');
             try{
             foreach($input as $k => $v){
                 $word = Word::where('id', str_replace("word_", "", $k))
                         ->first();
                 $word->$lang = $v;
                 $word->save();
             }
             }catch(Exception $e){
                 error_log(print_r($e, true));
             }
             return Response::json(array('status' => 'OK'));
            } else {
             return Response::json(array('status' => 'FAIL',
                         'msg' => "Not Authorized!"));
         }
    }
    
    public function postLevelmodify(){
        header('Content-type: text/html; charset=utf-8');
        if (Auth::check() &&
             (Auth::user()->level >= 101)) 
            {
             $input = Input::except(array('lang', "_token"));
             error_log(print_r($input, true));
             try{
                foreach($input as $k => $v){
                    $word = Word::where('id', str_replace("word_", "", $k))
                            ->first();
                    $word->diff_lvl = $v;
                    $word->save();
                }
             }catch(Exception $e){
                 error_log(print_r($e, true));
             }
                return Response::json(array('status' => 'OK'));
            } else {
                return Response::json(array('status' => 'FAIL',
                         'msg' => "Not Authorized!"));
         }
    }
    
    public function postAddWords(){
        $lang1 = Input::get('lang1');
        $lang2 = Input::get('lang2');
        $words = Input::get('words');

        if (Auth::check()) {
            for ($i = 0; $i < count($words); $i++) {
                try {
                    $user_word = UserWord::whereRaw("user_id = " . Auth::user()->id
                                    . " AND lang1 = '" . $lang1
                                    . "' AND lang2 = '" . $lang2
                                    . "' AND word_id = " . $words[$i][2])->first();
                    if ($user_word != null) {
                        $user_word['right'] = $words[$i][3];
                        $user_word->save();
                    } else {
                        $user_word = new UserWord();
                        $user_word->user_id = Auth::user()->id;
                        $user_word->lang1 = $lang1;
                        $user_word->lang2 = $lang2;
                        $user_word->word_id = $words[$i][2];
                        $user_word->right = $words[$i][3];
                        $user_word->save();
                    }
                } catch (Exception $e) {
                    error_log(print_r($e, true));
                    return Response::json(array('status' => "FAIL",
                                "msg" => "Failed to update the database!"));
                }
            }
            return Response::json(array('status' => "OK",
                        "msg" => "All good!"));
        } else {
            if (Cookie::has('lang1') && Cookie::has('lang2')) {
                $langCook1 = Cookie::get('lang1');
                $langCook2 = Cookie::get('lang2');
                if ($langCook1 != $lang1 || $lang2 != $langCook2) {
                    Cookie::forget('knownWords');
                }
            }
            $wordCook = Cookie::forever('knownWords', serialize($words));
            $langCook1 = Cookie::forever('lang1', $lang1);
            $langCook2 = Cookie::forever('lang2', $lang2);
            return Response::json(array('status' => "FAIL",
                                "msg" => "Info stored in cookie!"))
                            ->withCookie($wordCook)
                            ->withCookie($langCook1)
                            ->withCookie($langCook2);
        }
    }
    
    public function postGetWords(){
        $lang1 = Input::get('lang1');
        $lang2 = Input::get('lang2');
        if (Auth::check()) {
            try {
                $words = UserWord::where("user_id", Auth::user()->id)
                        ->where("lang1", $lang1)
                        ->where("lang2", $lang2)
                        ->get();
				$words = $words->toArray();
				foreach ($words as $num => $word) {
					$words[$num]['word'] = Word::find($words[$num]['word_id'])->toArray();				
				}
            } catch (Exception $e) {
            }
            return Response::json(array('status' => "OK", "data" => $words));
        } else {
            $words = array();
            if (Cookie::has('lang1') && Cookie::has('lang2')) { // sees if langauge changed, if so, reset cookies
                $langCook1 = Cookie::get('lang1');
                $langCook2 = Cookie::get('lang2');
                if ($langCook1 != $lang1 || $lang2 != $langCook2) {
                    return Response::json(array('status' => "FAIL",
                                "msg" => "Not logged in! Cookie info attached.",
                                "data" => $words))->withCookie(Cookie::forget('knownWords'));
                }
            }
            if (Cookie::has('knownWords')) {
                $words = unserialize(Cookie::get('knownWords'));
            }
            return Response::json(array('status' => "FAIL",
                        "msg" => "Not logged in! Cookie info attached.",
                        "data" => $words));
        }
    }
    
    public function postGet(){
        header('Content-type: text/html; charset=utf-8');

        $lang1 = Input::get('lang1');
        $lang2 = Input::get('lang2');
        $level = Input::get('level');
        $words = Word::where('diff_lvl', $level)->with('synonyms')->get();
        // error_log(print_r($words, true));
        $dic = array();
        foreach($words as $k){
            $syns = array();
            $tmp = $k['synonyms'];
            for($i = 0 ; $i < count($tmp); $i++){
                array_push($syns, $tmp[$i]['word'][$lang1]);
            }
            array_push($dic, array($k[$lang1], $k[$lang2], $k['id'], 0, $syns));
        }
        return Response::json(array("status" => "OK", "data" => array("dic" => $dic, "lang" => $lang2)));
    }
    
    private function getURL($url){
    header('Content-type: text/html; charset=utf-8');
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

        $data = curl_exec($ch);
        curl_close($ch);

        return $data;
    }

    public function anyNew(){ 
        if(Auth::check() &&
          (Auth::user()->level >= 110))
        {
            ini_set('max_execution_time', 1500);
            header('Content-type: text/html; charset=utf-8');
            $words = Word::all();
            foreach($words as $k => $v){
                $html = $this->getURL("http://www.wikipedia.com/wiki/".$v->en);    
                $doc = new DOMDocument();
                @$doc->loadHTML('<?xml encoding="UTF-8">' . $html);
                $nodes = $doc->getElementsByTagName('a');
                foreach($nodes as $item){
    //                $newWords["".$i] = $words[$i];
                    if($item->getAttribute('lang') == "fr"){
                        $title = $item->getAttribute('title');
                        $v->fr = strstr($title, " –", true);
                        $v->save();
                    break;
                    }
                }
            }
        }else{
            return Redirect::to("")->with("msg", "Must be a full site admin to access this page!");
        }      
    }
    
    public function anyLevelselect(){
        if (Auth::check() &&
                (Auth::user()->level >= 101)) {
            return View::make('dic.levelSelect');
        } else {
            return Redirect::to("")->with("msg", "Must be an admin with
                dictionary privledges to access this page!");
        }
    }
    
    public function anyLevelresults(){
        header('Content-type: text/html; charset=utf-8');
        if (Auth::check() &&
                (Auth::user()->level >= 101)) {
            $lang = Input::get('lang');
            $words = Word::paginate(24);
            $dic = array();
            foreach ($words as $k) {
                array_push($dic, array($k[$lang], $k['id'], $k['diff_lvl']));
            }
            $data = array("dic" => $dic, "links" => $words->appends(Input::except(array('page')))->links());
            return View::make('dic.levelResults', $data);
        } else {
            return Redirect::to("")->with("msg", "Must be an admin with
                dictionary privledges to access this page!");
        }
    }
    
    public function anySynonymselect(){
        if (Auth::check() &&
                (Auth::user()->level >= 101)) {
            return View::make('dic.synonymSelect');
        } else {
            return Redirect::to("")->with("msg", "Must be an admin with
                dictionary privledges to access this page!");
        }        
    }
    
    public function anySynonyms(){
        header('Content-type: text/html; charset=utf-8');
        if (Auth::check() &&
                (Auth::user()->level >= 101)) {
            $lang = Input::get('lang');
            $words = Word::with('synonyms')->paginate(24);
            $dic = array();
            foreach ($words as $k) {
                array_push($dic, array($k[$lang], $k['id'], $k['synonyms']));
            }
            $data = array("dic" => $dic,
                "links" => $words->appends(Input::except(array('page')))->links(),
                "list" => Word::all()->lists($lang, "id"));
            return View::make('dic.synonymResults', $data);
        } else {
            return Redirect::to("")->with("msg", "Must be an admin with
                dictionary privledges to access this page!");
        }        
    }

    public function anyTest(){
        $words = Word::where('diff_lvl', 1)->with('synonyms.word')->get();
        error_log(print_r($words, true));
        return View::make('dic.test', array("words" => $words));
    }    
    
    public function postSynonymmodify(){
    	
        return Response::json(array('status' => "FAIL", 'data' => Input::all()));
    }
	
	public function postAddnewword(){
		error_log("HERE I am");
		$lang1 = Input::get('lang1');
		$lang2 = Input::get('lang2');
		$word1 = Input::get('word1');
		$word2 = Input::get('word2');
		$diff_lvl = Input::get('diff_lvl');
		error_log("HERE I am2");
		error_log("l1: ".$lang1." l2: ".$lang2." w1: ".$word1." w2: ".$word2." dl: ".$diff_lvl);
		$wrd = new Word;
		error_log("HERE I am2.5");
		$wrd->$lang1 = $word1;
		$wrd->$lang2 = $word2;
		$wrd->diff_lvl = $diff_lvl;
		error_log("HERE I am3");
		$wrd = $wrd->save();
		error_log("HERE I am4");
		
		if($wrd){
			return Response::json(array("status" => "OK"));			
		}else{
			return Response::json(array("status" => "FAIL"));
		}
	}
}





