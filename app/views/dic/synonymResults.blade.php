@extends('template.template')

@section('js')
<link rel='stylesheet' href='{{URL::asset("css/select2.css")}}'>
<script type="text/javascript" src="{{URL::asset('js/select2.min.js')}}"></script> 
<script>
$(document).ready(function(){
    $('.tag').select2();
    $('#modify').ajaxForm(function(json){
        if(json.status === "OK"){
            window.location.replace("{{URL::to('dic/synonyms?page='.(Input::get('page')+1).'&lang='.Input::get('lang'))}}");
        }else{
            console.log(json);
//            $('#error').html(json.msg);
        }
    });
});
</script>
@stop

@section('content')
<span class="error" id="error"></span>
<div class="word_list">
{{ Form::open(array('url' => URL::to('dic/synonymmodify'), 'method' => 'POST', 'id' => 'modify')) }}
@foreach($dic as $word)
<div class="entry">
    <div class="label">
        {{$word[0]}}: 
    </div>
    <?php 
    $defaults = array();
    foreach($word[2] as $s){
      array_push($defaults, $s['synonym_id']);  
    }
    ?>
    {{Form::select(
    "word_".$word[1]."[]",
    $list,
    $defaults,
    array('class' => 'tag',
            "multiple",
            "id" => "word_".$word[1])
    )}}
</div>
@endforeach
</div>
<div>
{{Form::submit('Submit Changes')}}
{{ Form::close() }}
</div>
<div class="pages">{{$links}}</div>
@stop