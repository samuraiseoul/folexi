@extends('template.template')

@section('js')
@stop

@section('content')
<div class="row">
    <div class="offset col_2"></div>
    <div class="col_8">
        @if(Auth::check() && Auth::user()->level >= 101)
            <a href="{{URL::to('dic/addnew')}}">Add New Word</a><br><br>
            <a href="{{URL::to('dic/review')}}">Review Words by Language</a><br><br>
            <a href="{{URL::to('dic/levelselect')}}">Review Words by Level</a><br><br>
        @endif
    </div>
    <div class="offset col_2 last"></div>
</div>
@stop