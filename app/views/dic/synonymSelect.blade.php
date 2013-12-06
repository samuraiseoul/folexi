@extends('template.template')

@section('js')
@stop

@section('content')
    {{ Form::open(array('url' => URL::to('dic/synonyms'), 'method' => 'GET' , 'id' => 'langSelect')) }}
        Language : @include('dic.langSelect', array('lang' => 'lang'))        
        {{Form::submit('Get Dictionary')}}
    {{ Form::close() }}
@stop