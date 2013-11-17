@extends('template.template')

@section('js')
<script>
    $('#langSelect').ajaxForm(function(json){
        if(json.status === "OK"){
            $('#entries').html("");
            $('#entries').append("<input type='hidden' name='lang' value='"+json.data.lang+"'/>");
            var dic = json.data.dic;
            var i = 0;
            $.each(dic , function(k, v){ 
                $('#entries').append('<div class="entry">'
                        +(i+1)+". "+k + ": <input type='text' name='word_"+i+"' value='"+v+"'/>"
                        +'</div><br>');
                        i++;
            });
            $('#entries').prepend("<input type='hidden' name='size' value='"+i+"'/>");
        }
    });
</script>
@stop

@section('content')
<ruby>
<rb>紙芝居</rb>
<rp>(</rp>
<rt>かみしばい</rt>
<rp>)</rp>
</ruby>


    {{ Form::open(array('url' => URL::to('dic/get'), 'method' => 'POST' , 'id' => 'langSelect')) }}
        Language :{{Form::select('lang1', array('en' => 'English',
                                            'ko' => 'Korean',
                                             "es" => "Spanish",
                                             "ja" => "Japanese",
                                             "fr" => "French",
                                             "ru" => "Russian",
                                             "de" => "German",
                                             "hi" => "Hindi",
                                             "ar" => "Arabic",
                                             "zh" => "Chinese"))}}
        To: {{Form::select('lang2', array('en' => 'English',
                                         'ko' => 'Korean',
                                         "es" => "Spanish",
                                         "ja" => "Japanese",
                                         "fr" => "French",
                                         "ru" => "Russian",
                                         "de" => "German",
                                         "hi" => "Hindi",
                                         "ar" => "Arabic",
                                         "zh" => "Chinese"))}}
        {{Form::submit('Get Dictionary')}}
    {{ Form::close() }}<br>
    
    {{ Form::open(array('url' => URL::to('dic/modify'), 'method' => 'POST' , 'id' => 'dic')) }}
    <div id='entries'>
        
    </div>
    {{Form::submit('Submit Changes')}}
    {{ Form::close() }}<br>
@stop