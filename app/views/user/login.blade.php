@extends('template.template')

@section('js')
<script type="text/javascript">
    $(document).ready(function(){            
            $("#login").validate({
                errorLabelContainer: "#errors",
                rules : {
                    email : {
                           required: true,
                           email : true                 
                    },
                    password : {
                           required: true,
                           minlength: 10,
                           maxlength: 20
                       }
                },
                messages : {
                    email : {
                        required : "Must enter email!<br>",
                        email : "Please enter a valid email! Don't forget an '@' and '.'!<br>"
                    },
                    password : {
                        required : "Must enter password!<br>",
                        minlength : "Password not long enough!<br>",
                        maxlength : "Password too long!<br>"
                    }
                }
            });
            
            $('#login').ajaxForm(function(json){
                if (json.status === "OK") {
//                         console.log("Back from the server man!");
                     window.location.replace("{{URL::to('')}}");
                } else {
                    $("#errors").html("");
                    for (var i = 0; i < json.msg.length; i++) {
                        $('#errors').append(json.msg[i] + "<br>");
                    }
                }
            });
    });
</script>
@stop

@section('content')
<span id='errors' class='error'></span>
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