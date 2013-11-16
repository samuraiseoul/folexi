@extends('template.template')
@section('js')
<script>
    $(document).ready(function(){
        //custom rule for selects
        $.validator.addMethod("valueNotEquals", function(value, element, arg){
                    return arg != value;
        }, "Value must not equal arg.");
                
        $("#register").validate({
            errorLabelContainer: "#errors",
            rules : {
                username : {
                    required : true,
                    minlength : 5,
                    maxlength : 20
                },
                email : {
                    required: true,
                    email : true
                 },
                 password : {
                    required: true,
                    minlength: 10,
                    maxlength: 20
                 },                       
                 password_confirmation : {
                    minlength: 10,
                    maxlength: 20,
                    equalTo : "#password"
                 },
                 first : {
                     required : true
                 },
                 last : {
                     required : true
                 },
                 month : {
                     valueNotEquals: "default"
                 },
                 day : {
                     valueNotEquals: "default"
                 },
                 year : {
                     valueNotEquals: "default"
                 }
                },
                messages : {
                    username : {
                        required : "Username must be set!<br>",
                        minlength : "Username not long enough!<br>",
                        maxlength : "Username too long!<br>"
                    },
                    email : {
                        required : "Must enter email!<br>",
                        email : "Please enter a valid email! Don't forget an '@' and '.'!<br>"
                    },
                    password : {
                        required : "Must enter password!<br>",
                        minlength : "Password not long enough!<br>",
                        maxlength : "Password too long!<br>"
                    },
                    password_confirmation : {
                        minlength : "Confirm password not long enough!<br>",
                        maxlength : "Confirm password too long!<br>",
                        equalTo : "Password and confirm password must match!<br>"
                    },
                    first : {
                        required : "Must enter first name!<br>"
                    },
                    last : {
                        required : "Must enter last name!<br>"
                    },
                 month : {
                     valueNotEquals: "Month must not be -Month- !<br>"
                 },
                 day : {
                     valueNotEquals: "Day must not be -Day- !<br>"
                 },
                 year : {
                     valueNotEquals: "Year must not be -Year- !<br>"
                 }
                }
            });
        $('#register').ajaxForm(function(json){
            if(json.status === "OK"){
                window.location.replace("{{URL::to('')}}");
            }else{
                $("#errors").html("");
                for(var i = 0 ; i < json.msg.length ; i++){
                $('#errors').append(json.msg[i]+"<br>");
                }
            }
        });
    });
</script>
@stop
@section('content')
    <span id='errors' class='error'></span>
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
                {{ Form::Label('password_confirmation', 'CONFIRM PASSWORD') }}
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
                {{ Form::password('password_confirmation') }}    
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