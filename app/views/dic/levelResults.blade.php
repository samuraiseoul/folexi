@extends('template.template')

@section('js')
<script>
$(document).ready(function(){
    $('#modify').ajaxForm(function(json){
        if(json.status === "OK"){
            window.location.replace("{{URL::to('dic/levelresults?lang='.Input::get('lang'))}}");
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
{{ Form::open(array('url' => URL::to('dic/levelmodify'), 'method' => 'POST', 'id' => 'modify')) }}
@foreach($dic as $word)
<div class="entry">
    <div class="label">
        {{$word[0]}}: 
    </div>
    {{
        Form::select(
            $word[1], 
            array(
                '1' => 'One',
                '2' => 'Two',
                '3' => 'Three',
                '4' => 'Four',
                '5' => 'Five',
                '6' => 'Six'
            ),
            $word[2]
        )
    }}
</div>
@endforeach
</div>
<div>
{{Form::submit('Submit Changes')}}
{{ Form::close() }}
</div>
<div class="pages">{{$links}}</div>
@stop