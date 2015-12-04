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
<div class="row">
    <span id='errors' class='error col_12 last'></span>
</div>
<div class="row">
    <div class="col_4 offset"></div>
    <div class='login col_4'>
        <div class='form_wrapper'>
            {{ Form::open(array('action' => 'UserController@postLogin', 'method' => 'POST' , 'id' => 'login')) }}
                    <p>
                        <p>
                            {{ Form::Label('email', 'EMAIL') }}
                        </p>
                        <p>
                            {{ Form::text('email') }}
                        </p>
                    </p>
                    <p>
                        <p>
                            {{ Form::Label('password', 'PASSWORD') }}
                        </p>
                        <p>
                            {{ Form::password('password') }}
                        </p>
                    </p>
                    <div class="submit">
                        {{Form::submit('Sign In')}}
                    </div>
            {{ Form::close() }} 
        </div>
        <a href="{{URL::to('user/register')}}" id="register_link">Not registered? Click here!</a>
    </div>
    <div class="last col_4 offset"></div>
</div>
@stop