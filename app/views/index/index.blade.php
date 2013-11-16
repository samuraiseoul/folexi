@extends('template.template')

@section('js')
<script type="text/javascript" src="{{URL::asset('js/lean-slider.js')}}"></script>
<link rel="stylesheet" href="{{ URL::asset('css/lean-slider.css')}}" type="text/css" />
<script>
    $(document).ready(function() {
        $('#slider').leanSlider({
            pauseTime: 5000,
            directionNav: '#slider-direction-nav',
            controlNav: '#slider-control-nav',
            prevText: '<span class="arrow left"> < </span>',
            nextText: '<span class="arrow right"> > </span>'
        });
    });
</script>
@stop

@section('content')
<div class='showcase'>
    <div id="slider" class="slider">
        <div class="slide1">
            <img src="{{URL::asset('images/frontpage/slide1.png')}}" alt="" height='521' width='858'/>
            <p>Learn words to smite your enemies!</p>
        </div>
        <div class="slide2">
            <img src="{{URL::asset('images/frontpage/slide2.png')}}" alt="" height='521' width='858'/>
            <p>Spaced repetition of words for maximum retention!</p>
        </div>
    </div>    
    <div id="slider-direction-nav"></div>
</div>
<br>
<span class='play_now'><a href='{{URL::to("game")}}'>PLAY NOW!</a></span>
@stop