<?php
class UserController extends Controller{
    
    private static $registerRules = array(
            "email" => 'email|unique:users,email|required',
            "username" => "between:5,20|unique:users,username|required",
            "password" => "between:10,20|confirmed|required",
            "day" => "numeric|required",
            "month" => "numeric|required",
            "year" => "numeric|required",
            'first' => 'required|required', 
            'last' => 'required|required'
        );
        
    private static $registerMessages = array(
            'username.unique' => "Username already taken!",
            'first.required' => "First Name can not be blank!",
            'last.required' => "Last Name can not be blank!",
            'day.numeric' => "Day must be a number!",
            'month.numeric' => "Month must be a number!",
            'year.numeric' => "Year must be a number!"
        );
        
    private static $loginRules = array(
            "email" => 'email|exists:users,email|required',
            "password" => "between:10,20|required"
        );
        
    private static $loginMessages = array(
            "email.exists" => "Email or password is incorrect."
        );
    
    public function postRegister() {
        $validator = Validator::make(Input::all(), self::$registerRules, self::$registerMessages);
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
            return $this->login($email, $password);
        } else {
            return Response::json(array('user' => $user));
        }
    }

    public function postLogin() {
        $validator = Validator::make(Input::all(), self::$loginRules, self::$loginMessages);
        if(!$validator->passes()){
            return Response::json(array('status' => "FAIL", "msg" => $validator->messages()->all()));
        }
        
        $password = Input::get('password');
        $email = Input::get('email');
        return $this->login($email, $password);
    }
    
    private function login($email, $password) {
        $credentials = array('email' => $email, 'password' => $password);
        if (Auth::attempt($credentials)) {
            return Response::json(array('status' => 'OK'));
        } else {
            return Response::json(array('status' => 'FAIL'));
        }
    }
}