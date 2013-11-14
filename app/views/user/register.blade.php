@extends('template.template')

@section('content')
Register:
{{ Form::open(array('action' => 'UserController@postRegister', 'method' => 'POST' , 'id' => 'register')) }}
    {{ Form::label('username', 'Username:')}} {{ Form::text('username') }}<br>
    {{ Form::Label('email', 'Email:') }} {{ Form::text('email') }} </br>
    {{ Form::Label('password', 'Password:') }} {{ Form::password('password') }} </br>
    {{ Form::Label('conf_password', 'Confirm Password:') }} {{ Form::password('conf_password') }} </br>
    {{ Form::Label('first', 'First Name:') }} {{ Form::text('first') }} </br>
    {{ Form::Label('last', 'Last Name:') }} {{ Form::text('last') }} </br>
    {{ Form::Label('birthday', 'Birthday:')}} {{ Form::dateThree()}} <br>
    {{Form::submit('Register!')}}
{{ Form::close() }}
@stop