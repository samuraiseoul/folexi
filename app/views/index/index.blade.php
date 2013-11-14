@extends('template.template')

@section('content')
Homepage<br>
@if(Auth::check())
logged in!
@else
not logged in
@endif
<br>
<a href="{{URL::to('user/login')}}">Login</a>
@stop