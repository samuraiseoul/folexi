@extends('template.template')

@section('js')
<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css" rel="stylesheet">
<script type="text/javascript" src="{{URL::asset('js/raphael-min2.1.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('js/life.js')}}"></script>
<script>
    $(document).ready(function(){
        var paper = new Raphael($('#canvas')[0], 600, 400);
        var lv = new life($("#life-area"), 100, 50, 4, {'margin' : '10px 0 0 5px'});
//        lv.show();
        $('#bam').click(function(){
            lv.hide();
        });
        $('#plusOne').click(function(){
            lv.show();
        });
    });
</script>

@stop

@section('content')
<div id="game-area">
<div id="canvas" style="width:600px;height:400px;float:left;border:solid;"></div>
<div id="life-area">
</div>
</div>
<i class="fa fa-heart" id="plusOne"></i><i class="fa fa-heart-o" id="bam"></i>
@stop