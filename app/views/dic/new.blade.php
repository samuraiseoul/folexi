@extends('template.template')

@section('js')
<script>
$(document).ready(function(){
    $('#addWord').ajaxForm(function(json){
        if(json.status === "OK"){
        	console.log(json);
        	$('input[type=text]').val("");
        }else{
        	console.log(json);
        }
    });
});
</script>
@stop

@section('content')
Add Word:
    {{ Form::open(array('url' => URL::to('dic/addnewword'), 'method' => 'POST' , 'id' => 'addWord')) }}
        Language 1: @include('dic.langSelect', array('lang' => 'lang1'))
        {{Form::text('word1')}}
        <br>
        Language 2: @include('dic.langSelect', array('lang' => "lang2"))
        {{Form::text('word2')}}
        <br>
        Difficulty: {{Form::SelectRange('diff_lvl', 1, 5) }}
        <br>
        {{Form::submit('Add Word')}}
    {{ Form::close() }}
@stop