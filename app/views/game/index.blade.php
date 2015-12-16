@extends('template.template')

@section('js')
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css" rel="stylesheet">
    
    <script>
        const PUBLIC_URL = "{{URL::to('')}}" + "/";
    </script>
    
    <script type="text/javascript" src="{{URL::asset('js/game/pixi.min.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/game/pixi-cocoontext.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/game/states/startmenu/startmenu.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/game/states/startmenu/select.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/game/states/initialize/initialize.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/game/states/game/game.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/game/states/game/turret.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/game/states/game/life.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/game/states/game/laser.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/game/states/game/enemy.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/game/states/pause/pause.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/game/states/gameover/gameover.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/game/states/win/win.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/game/states/lose/lose.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/game/states/tutorial/tutorial.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/game/states/statemanager.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/game/main.js')}}"></script>
    
    <style type="text/css">
        #game-canvas{
            width:100%;
            border: solid;
        }
        textarea {
            resize: none;
            text-align: center;
        }
    </style>
@stop

@section('content')
    <div class="row">
        <div class="offset col_1"></div>
        <div class="offset col_10">
            <textarea id="typing-area" rows="1" cols="20"></textarea>
            <p>NEW WORDS</p>
            <p id="new_area"></p>
            <canvas id="game-canvas"></canvas>
            <p>OLD WORDS</p>
            <hr>
            <p id="old_area"></p>
        </div>
        <div class="offset col_1 last"></div>
    </div>
@stop