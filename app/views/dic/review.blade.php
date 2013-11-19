@extends('template.template')

@section('js')
<script type="text/javascript">
    $(document).ready(function(){
        $("#button").hide();
    $('#langSelect').ajaxForm(function(json){
        if(json.status === "OK"){
            $('#entries').html("");
            $('#entries').append("<input type='hidden' name='lang' value='"+json.data.lang+"'/>");
            var dic = json.data.dic;
            var i = 0;
            for ( var i = 0 ; i < dic.length ; i++){
                $('#entries').append('<div class="entry">'
                        +(i+1)+". "+ dic[i][0] +
                        ": <input type='text' name='word_"+i+"' value='"+dic[i][1]+"'/>"
                        +'</div><br>');                
            }
            $('#entries').prepend("<input type='hidden' name='size' value='"+i+"'/>");
            $('#button').show();
        }
    });
    
    $('#modify').ajaxForm(function(json){
        if(json.status == "OK"){
            location.reload();
        }
    });
    });
</script>
@stop

@section('content')
<!--
<ruby>
<rb>紙芝居</rb>
<rp>(</rp>
<rt>かみしばい</rt>
<rp>)</rp>
</ruby>
-->

    {{ Form::open(array('url' => URL::to('dic/get'), 'method' => 'POST' , 'id' => 'langSelect')) }}
        Language : @include('dic.langSelect1')
        To: @include('dic.langSelect2')
        {{Form::submit('Get Dictionary')}}
    {{ Form::close() }}<br>
    
    {{ Form::open(array('url' => URL::to('dic/modify'), 'method' => 'POST', 'id' => 'modify')) }}
    <div id='entries'>
        
    </div>
    <span id="button">
    {{Form::submit('Submit Changes')}}
    </span>
    {{ Form::close() }}<br>
@stop