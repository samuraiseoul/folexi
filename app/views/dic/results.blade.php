@extends('template.template')

@section('js')
@stop

@section('content')
<div class="word_list">
{{ Form::open(array('url' => URL::to('dic/modify'), 'method' => 'POST', 'id' => 'modify')) }}
    <input type="hidden" name="lang" value="{{Input::get('lang2')}}"/>
@foreach($dic as $word)
<div class="entry">
    <div class="label">
        {{$word[0]}}: 
    </div>
    <input class="word" type="textbox" name="word_{{$word[2]}}" value="{{$word[1]}}"/><br>
</div>
@endforeach
</div>
{{Form::submit('Submit Changes')}}
{{ Form::close() }}
<div class="pages">{{$links}}</div>
@stop