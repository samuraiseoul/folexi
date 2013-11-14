<?php
class UserController extends Controller{
    
public function postRegister() {
        $email = Input::get('email');
        $password = Input::get('password');
        $conf_password = Input::get('conf_password');
        $first = Input::get('first');
        $last = Input::get('last');
        $username = Input::get('username');
        $birthdate = Input::get('year') . "-" . Input::get('month') . "-" . Input::get('day');
        if ($password != $conf_password) {
            return Response::json(array('status' => 'FAIL'));
        }

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