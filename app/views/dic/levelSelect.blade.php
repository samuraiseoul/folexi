@extends('template.template')

@section('js')
@stop

@section('content')
    {{ Form::open(array('url' => URL::to('dic/levelresults'), 'method' => 'GET' , 'id' => 'langSelect')) }}
        Language : @include('dic.langSelect', array('lang' => 'lang'))        
        {{Form::submit('Get Dictionary')}}
    {{ Form::close() }}
@stop