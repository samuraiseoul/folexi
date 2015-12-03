@extends('template.template')

@section('js')
@stop

@section('content')
@if(Auth::check() && Auth::user()->level >= 101)
    <a href="{{URL::to('dic/addnew')}}">Add New Word</a><br>
    <a href="{{URL::to('dic/review')}}">Review Words by Language</a><br>
    <a href="{{URL::to('dic/levelselect')}}">Review Words by Level</a><br>
@endif
@stop