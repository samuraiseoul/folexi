@extends('template.template')
@section('js')
<script>
    $(document).ready(function(){
        $('#register').ajaxForm(function(json){
            if(json.status === "OK"){
                window.location.replace("{{URL::to('')}}");
            }else{
                
            }
        });
    });
</script>
@stop
@section('content')
<div class='register'>
    <div class='form_wrapper'>
        {{ Form::open(array('action' => 'UserController@postRegister', 'method' => 'POST' , 'id' => 'register')) }}
        <div class='top'>    
            <div class='labels'>
                {{ Form::label('username', 'USERNAME')}}
                <div class='seperator'></div>
                {{ Form::Label('email', 'EMAIL') }}
                <div class='seperator'></div>
                {{ Form::Label('password', 'PASSWORD') }}
                <div class='seperator'></div>
                {{ Form::Label('conf_password', 'CONFIRM PASSWORD') }}
                <div class='seperator'></div>
                {{ Form::Label('first', 'FIRST NAME') }} 
                <div class='seperator'></div>
                {{ Form::Label('last', 'LAST NAME') }} 
                <div class='seperator'></div>
                {{ Form::Label('birthday', 'BIRTHDAY')}}
            </div>
            <div class='inputs'> 
                {{ Form::text('username') }}
                <div class='seperator'></div>
                {{ Form::text('email') }}
                <div class='seperator'></div>
                {{ Form::password('password') }}
                <div class='seperator'></div>
                {{ Form::password('conf_password') }}    
                <div class='seperator'></div>
                {{ Form::text('first') }}
                <div class='seperator'></div>
                {{ Form::text('last') }}
                <div class='seperator'></div> 
                {{ Form::dateThree()}} 
            </div>
        </div>
        <div class='bottom'>
            {{Form::submit('Register!')}}
        </div>
        {{ Form::close() }}
    </div>
</div>
@stop