@extends('template.template')

@section('js')
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css" rel="stylesheet">
    
    <script>
        const PUBLIC_URL = "{{URL::to('')}}" + "/";
    </script>
    
    <script type="text/javascript" src="{{URL::asset('js/pixi/pixi.min.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/pixi/pixi-cocoontext.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/pixi/states/startmenu/startmenu.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/pixi/states/startmenu/select.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/pixi/states/initialize/initialize.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/pixi/states/game/game.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/pixi/states/game/turret.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/pixi/states/game/life.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/pixi/states/game/laser.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/pixi/states/game/enemy.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/pixi/states/pause/pause.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/pixi/states/gameover/gameover.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/pixi/states/win/win.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/pixi/states/lose/lose.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/pixi/states/tutorial/tutorial.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/pixi/states/statemanager.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/pixi/main.js')}}"></script>
    
    <style type="text/css">
        #game-canvas{
            width:100%;
            border: solid;
        }
        
    </style>
@stop

@section('content')
    <div class="row">
        <div class="offset col_1"></div>
        <div class="offset col_10">
            <textarea id="typing-area"></textarea>
            <canvas id="game-canvas"></canvas>
        </div>
        <div class="offset col_1 last"></div>
    </div>
@stop