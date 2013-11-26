<?php
class UserController extends Controller{
    
public function postRegister() {
        $rules = array(
            "email" => 'email|unique:users,email|required',
            "username" => "between:5,20|unique:users,username|required",
            "password" => "between:10,20|confirmed|required",
            "day" => "numeric|required",
            "month" => "numeric|required",
            "year" => "numeric|required",
            'first' => 'required|required', 
            'last' => 'required|required'
        );
        $messages = array(
            'username.unique' => "Username already taken!",
            'first.required' => "First Name can not be blank!",
            'last.required' => "Last Name can not be blank!",
            'day.numeric' => "Day must be a number!",
            'month.numeric' => "Month must be a number!",
            'year.numeric' => "Year must be a number!"
        );
        $validator = Validator::make(Input::all(), $rules, $messages);
        if(!$validator->passes()){
            return Response::json(array('status' => "FAIL", "msg" => $validator->messages()->all()));
        }
        
        
        $email = Input::get('email');
        $password = Input::get('password');
        $first = Input::get('first');
        $last = Input::get('last');
        $username = Input::get('username');
        $birthdate = Input::get('year') . "-" . Input::get('month') . "-" . Input::get('day');
        

        $user = new User;
        $user->username = $username;
        $user->email = $email;
        $user->password = Hash::make($password);
        $user->first_name = $first;
        $user->last_name = $last;
        $user->birthdate = $birthdate;
        $user = $user->save();
        if ($user) {
            return $this->login($email, $password, true);
        } else {
            return Response::json(array('user' => $user));
        }
//        }catch(Exception $e){
//            console.log(print_r($e, true));
//        }
    }

    public function postLogin() {
        $rules = array(
            "email" => 'email|exists:users,email|required',
            "password" => "between:10,20|required"
        );
        
        $messages = array(
            "email.exists" => "Email or password is incorrect."
        );
        
        $validator = Validator::make(Input::all(), $rules, $messages);
        if(!$validator->passes()){
            return Response::json(array('status' => "FAIL", "msg" => $validator->messages()->all()));
        }
        
        $password = Input::get('password');
        $email = Input::get('email');
        return $this->login($email, $password);
    }
    
    private function login($email, $password, $register = false) {
        $credentials = array('email' => $email, 'password' => $password);
        if (Auth::attempt($credentials)) {
            if($register){
                if(Cookie::has('knownWords')){
                    $words = unserialize(Cookie::get('knownWords'));
                    $lang1 = Cookie::get('lang1');
                    $lang2 = Cookie::geT('lang2');
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
                }
            }
            return Response::json(array('status' => 'OK'));
        } else {
            return Response::json(array('status' => 'FAIL'));
        }
    }
}