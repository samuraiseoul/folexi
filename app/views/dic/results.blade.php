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
<span class="error" id="error"></span>
<div class="word_list">
{{ Form::open(array('url' => URL::to('dic/modify'), 'method' => 'POST', 'id' => 'modify')) }}
    <input type="hidden" name="lang" value="{{Input::get('lang2')}}"/>
@foreach($dic as $word)
<div class="entry">
    <div class="label">
        {{$word[0]}}: 
    </div>
    <input class="word" type="textbox" name="{{$word[2]}}" value="{{$word[1]}}"/><br>
</div>
@endforeach
</div>
<div>
{{Form::submit('Submit Changes')}}
{{ Form::close() }}
</div>
<div class="pages">{{$links}}</div>
@stop