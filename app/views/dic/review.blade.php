@extends('template.template')

@section('js')
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

    {{ Form::open(array('url' => URL::to('dic/results'), 'method' => 'GET' , 'id' => 'langSelect')) }}
        Language : @include('dic.langSelect', array('lang' => 'lang1'))
        To: @include('dic.langSelect', array('lang' => "lang2"))
        {{Form::submit('Get Dictionary')}}
    {{ Form::close() }}
@stop