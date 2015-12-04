@extends('template.template')
@section('js')
<script type="text/javascript">
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
<div class="row">
    <span id='errors' class='error'></span>
</div>
<div class="row">
    <div class="offset col_3"></div>
    <div class='register col_6'>
        <div class="wrapper">
            {{ Form::open(array('action' => 'UserController@postRegister', 'method' => 'POST' , 'id' => 'register')) }}
            <div class="row">
                <!--<div class="offset col_1"></div>-->
                <div class="col_6">
                    {{ Form::label('username', 'USERNAME')}}
                </div>
                <div class="col_6">
                    {{ Form::text('username') }}
                </div>
                <!--<div class="offset col_1 last"></div>-->
            </div>
            <div class="row">
                <!--<div class="offset col_1"></div>-->
                <div class="col_6">
                    {{ Form::Label('email', 'EMAIL') }}
                </div>
                <div class="col_6">
                    {{ Form::text('email') }}
                </div>
                <!--<div class="offset col_1 last"></div>-->
            </div>
            <div class="row">
                <!--<div class="offset col_1"></div>-->
                <div class="col_6">
                    {{ Form::Label('password', 'PASSWORD') }}
                </div>
                <div class="col_6">
                    {{ Form::password('password') }}
                </div>
                <!--<div class="offset col_1 last"></div>-->
            </div>
            <div class="row">
                <!--<div class="offset col_1"></div>-->
                <div class="col_6">
                    {{ Form::Label('password_confirmation', 'CONFIRM PASSWORD') }}
                </div>
                <div class="col_6">
                    {{ Form::password('password_confirmation') }}
                </div>
                <!--<div class="offset col_1 last"></div>-->
            </div>
            <div class="row">
                <!--<div class="offset col_1"></div>-->
                <div class="col_6">
                    {{ Form::Label('first', 'FIRST NAME') }}
                </div>
                <div class="col_6">
                    {{ Form::text('first') }}
                </div>
                <!--<div class="offset col_1 last"></div>-->
            </div>
            <div class="row">
                <!--<div class="offset col_1"></div>-->
                <div class="col_6">
                    {{ Form::Label('last', 'LAST NAME') }}
                </div>
                <div class="col_6">
                    {{ Form::text('first') }}
                </div>
                <!--<div class="offset col_1 last"></div>-->
            </div>
            <div class="row">
                <!--<div class="offset col_1"></div>-->
                <div class="col_6">
                    {{ Form::Label('birthday', 'BIRTHDAY')}}
                </div>
                <div class="col_6">
                    {{ Form::dateThree()}}
                </div>
                <!--<div class="offset col_1 last"></div>-->
            </div>
            <div class="row">
                <div class="offset col_4"></div>
                <div class="col_4">
                    {{Form::submit('Register!')}}
                </div>
                <div class="offset col_4 last"></div>
            </div>
            {{ Form::close() }}
        </div>
    </div>
    <div class="offset col_3 last"></div>
</div>
@stop