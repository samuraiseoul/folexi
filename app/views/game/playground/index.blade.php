@extends('template.template')

@section('js')
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css" rel="stylesheet">
    <script type="text/javascript" src="{{URL::asset('js/playground/playground.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/playground/main.js')}}"></script>
@stop

@section('content')
    <canvas width="800" height="400"></canvas>
@stop