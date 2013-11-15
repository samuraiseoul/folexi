@extends('template.template')

@section('js')
<script>
    $(document).ready(function(){
        $('#login').ajaxForm(function(json){
            if(json.status === "OK"){
                window.location.replace("{{URL::to('')}}");
            }else{
                
            }
        });
    });
</script>
@stop

@section('content')
<div class='login'>
    <div class='form_wrapper'>
        {{ Form::open(array('action' => 'UserController@postLogin', 'method' => 'POST' , 'id' => 'login')) }}
        <div class='top'>    
            <div class='labels'>
                {{ Form::Label('email', 'EMAIL') }}
                <div class='seperator'></div>
                {{ Form::Label('password', 'PASSWORD') }}
            </div>
            <div class='inputs'> 
                {{ Form::text('email') }}
                <div class='seperator'></div>
                {{ Form::password('password') }}
            </div>
        </div>
        <div class='bottom'>
            <a href="{{URL::to('user/register')}}">Not registered? Click here!</a> {{Form::submit('Sign In')}}
        </div>
        {{ Form::close() }}
    </div>
</div>
@stop