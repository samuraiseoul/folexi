@extends('template.template')

@section('js')
<script>
$(document).ready(function(){
    $('#modify').ajaxForm(function(json){
        if(json.status === "OK"){
            window.location.replace("{{URL::to('dic/results?lang1='.Input::get('lang1').'&lang2='.Input::get('lang2'))}}");
        }else{
            $('#error').html(json.msg);
        }
    });
});
</script>
@stop

@section('content')
    <div class="row">
        <span class="error col_12 last" id="error"></span>
    </div>
        {{ Form::open(array('url' => URL::to('dic/modify'), 'method' => 'POST', 'id' => 'modify')) }}
            <input type="hidden" name="lang" value="{{Input::get('lang2')}}"/>
            @for($i = 0; $i < count($dic); $i++)
                @if($i % 3 == 0)
                    <div class="row">
                @endif
                <div class="entry col_4">
                    <div class="label">
                        {{$dic[$i][0]}}: 
                    </div>
                    <input class="word" type="textbox" name="{{$dic[$i][2]}}" value="{{$dic[$i][1]}}"/><br>
                </div>
                @if(($i+1) % 3 == 0)
                    </div>
                @endif
            @endfor
            {{Form::submit('Submit Changes')}}
        {{ Form::close() }}
    <div class="row">
        <div class="pages col_12 last">{{$links}}</div>
    </div>
@stop