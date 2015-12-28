<?php
class DictionaryController extends Controller{
    public function anyReview(){
        if(Auth::check() && (Auth::user()->level >= 101)){
        return View::make('dic.review');
        }else{
            return Redirect::to("")->with("msg", "Must be an admin with
                dictionary privledges to access this page!");
        }        
    }
	
    public function anyResults(){        
        header('Content-type: text/html; charset=utf-8');
        if(Auth::check() && (Auth::user()->level >= 101))
        {
            $lang1 = Input::get('lang1');
            $lang2 = Input::get('lang2');
            $words = Word::orderBy("id", "asc")->paginate(24);
            $dic = array();
            foreach ($words as $key) {
                array_push($dic, array($key[$lang1], $key[$lang2], $key['id']));
            }
            $data = array("dic" => $dic, "links" => $words->appends(Input::except(array('page')))->links());
            return View::make('dic.results', $data);
        }else{
            return Redirect::to("")->with("msg", "Must be an admin with
                dictionary privledges to access this page!");
        }        
    }
	
	public function anyAddnew(){
		if( Auth::check() && (Auth::user()->level >= 101)
		   ){
        	return View::make('dic.new');
        }else{
            return Redirect::to("")->with("msg", "Must be an admin with
                dictionary privledges to access this page!");
        }        
	}
	
	public function anyLevelselect(){
        if (Auth::check() && (Auth::user()->level >= 101)) {
            return View::make('dic.levelSelect');
        } else {
            return Redirect::to("")->with("msg", "Must be an admin with
                dictionary privledges to access this page!");
        }
    }
    
    public function anyLevelresults(){
        header('Content-type: text/html; charset=utf-8');
        if (Auth::check() && (Auth::user()->level >= 101)) {
            $lang = Input::get('lang');
            $words = Word::orderBy("id", "asc")->paginate(24);
            $dic = array();
            foreach ($words as $key) {
                array_push($dic, array($key[$lang], $key['id'], $key['diff_lvl']));
            }
            $data = array("dic" => $dic, "links" => $words->appends(Input::except(array('page')))->links());
            return View::make('dic.levelResults', $data);
        } else {
            return Redirect::to("")->with("msg", "Must be an admin with
                dictionary privledges to access this page!");
        }
    }
    
    public function anySynonymselect(){
        if (Auth::check() && (Auth::user()->level >= 101)) {
            return View::make('dic.synonymSelect');
        } else {
            return Redirect::to("")->with("msg", "Must be an admin with
                dictionary privledges to access this page!");
        }        
    }
    
    public function anySynonyms(){
        header('Content-type: text/html; charset=utf-8');
        if (Auth::check() && (Auth::user()->level >= 101)) {
            $lang = Input::get('lang');
            $words = Word::with('synonyms')->paginate(24);
            $dic = array();
            foreach ($words as $key) {
                array_push($dic, array($key[$lang], $key['id'], $key['synonyms']));
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
	
	public function postAddnewword(){
		$lang1 = Input::get('lang1');
		$lang2 = Input::get('lang2');
		$word1 = Input::get('word1');
		$word2 = Input::get('word2');
		$diff_lvl = Input::get('diff_lvl');
		
	    if($lang1 == $lang2) {
	        return Response::json(array("status" => "FAIL", "msg" => "Can't be same language!"));
	    }
	    
	    $wrd = Word::where($lang1, "=", $word1)->first();
		if(is_null($wrd)) {
		    $wrd = new Word;
		}
		
		$wrd->$lang1 = $word1;
		$wrd->$lang2 = $word2;
		$wrd->diff_lvl = $diff_lvl;
		$wrd = $wrd->save();
		
		if($wrd){
			return Response::json(array("status" => "OK"));			
		}else{
			return Response::json(array("status" => "FAIL", "msg" => "Could not save word at this time."));
		}
	}
    
    public function postModify(){
        //set utf-8 header
        header('Content-type: text/html; charset=utf-8');
        
        if (Auth::check() && (Auth::user()->level >= 101)) {
            $input = Input::except(array('lang', "_token"));
            $lang = Input::get('lang');
            try{
                foreach($input as $key => $value){
                    $word = Word::where('id', $key)->first();
                    $word->$lang = $value;
                    $word->save();
                }
            }catch(Exception $e){
                error_log(print_r($e, true));
            }
            return Response::json(array('status' => 'OK'));
        } else {
            return Response::json(array('status' => 'FAIL', 'msg' => "Not Authorized!"));
        }
    }
    
    public function postLevelmodify(){
        //set utf-8 header
        header('Content-type: text/html; charset=utf-8');
        
        if (Auth::check() && (Auth::user()->level >= 101)) 
            {
             $input = Input::except(array('lang', "_token"));
             try{
                foreach($input as $key => $value){
                    $word = Word::where('id', $key)->first();
                    $word->diff_lvl = $value;
                    $word->save();
                }
             }catch(Exception $e){
                error_log(print_r($e, true));
             }
                return Response::json(array('status' => 'OK'));
            } else {
                return Response::json(array('status' => 'FAIL', 'msg' => "Not Authorized!"));
         }
    }
    
    private function wordsToUserWords($lang1, $lang2, $words) {
        for ($i = 0; $i < count($words); $i++) {
            try {
                $user_word = UserWord::where("user_id", "=", Auth::user()->id)
                ->where('lang1', "=", $lang1)->where('lang2', "=", $lang2)->where("word_id", "=", $words[$i]['word']['id'])->first();
                if ($user_word != null) {
                    $user_word['right'] = $words[$i]['right'];
                    $user_word->save();
                } else {
                    $user_word = new UserWord();
                    $user_word->user_id = Auth::user()->id;
                    $user_word->lang1 = $lang1;
                    $user_word->lang2 = $lang2;
                    $user_word->word_id = $words[$i]['word']['id'];
                    $user_word->right = $words[$i]['right'];
                    $user_word->save();
                }
            } catch (Exception $e) {
                error_log(print_r($e, true));
                return Response::json(array('status' => "FAIL", "msg" => "Failed to update the database!"));
            }
        }
        return Response::json(array('status' => "OK", "msg" => "All good! Saved to DB!"));
    }
    
    public function postAddWords(){
        $lang1 = Input::get('lang1');
        $lang2 = Input::get('lang2');
        $words = Input::get('words');
        
        if (Auth::check()) {
            return $this->wordsToUserWords($lang1, $lang2, $words);
        }
    }
    
    private function retrieveUserWords($lang1, $lang2) {
        try {
            $words = UserWord::where("user_id", Auth::user()->id)->where("lang1", $lang1)->where("lang2", $lang2)->orderBy("id", "asc")->orderBy("id", "asc")->get();
			$words = $words->toArray();
			foreach ($words as $num => $word) { //get actual word with known words
				$words[$num]['word'] = Word::find($words[$num]['word_id'])->toArray();				
			}
        } catch (Exception $e) {
            return Response::json(array("status" => 'FAIL', "msg" => "Failed to get known words from the DB!"));
        }
        return Response::json(array('status' => "OK", "data" => $words));
    }
    
    public function postGetKnownWords(){
        $lang1 = Input::get('lang1');
        $lang2 = Input::get('lang2');
        if (Auth::check()) {
            return $this->retrieveUserWords($lang1, $lang2);
        } 
    }
    
    public function postGet(){
        //set utf-8 header
        header('Content-type: text/html; charset=utf-8');

        $lang1 = Input::get('lang1');
        $lang2 = Input::get('lang2');
        $level = Input::get('level');
        $words = Word::where('diff_lvl', $level)->orderBy("id", "asc")->get();
        $dic = array();
        foreach($words as $key){
            array_push($dic, array("lang1" => $lang1, "lang2" => $lang2, "word" => $key->toArray()));
        }
        return Response::json(array("status" => "OK", "data" => array("dic" => $dic)));
    }
}





